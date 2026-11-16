const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const html = fs.readFileSync('website/index.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach(s => new vm.Script(s));
// Pin the full rain/logo engine recovered from production, including its constants
// and event handlers. Letter-shaped light uses the live logo canvas; particle physics stay unchanged.
const animationStart=html.indexOf('/* ================= PARTICLE LOGO ================= */');
const animationEnd=html.indexOf('/* ================= LOADER =================',animationStart);
const animation=html.slice(animationStart,animationEnd).replace(/\r\n/g,'\n');
assert.equal(require('crypto').createHash('sha256').update(animation).digest('hex'),
 '68896f0e5c03542ace7d84485fba732d53136da5cd3569d518dd136f489f4a0c',
 'Rain/logo engine must preserve the reference physics and delayed rain reveal');
const grains=[];
for(let x=100;x<=160;x+=5)for(let y=15;y<=45;y+=5)grains.push({x,y,ox:x,oy:y,vx:0,vy:0});
const distant={x:350,y:30,ox:350,oy:30,vx:0,vy:0};grains.push(distant);
const fragments=[];
const impactContext={
 reducedMotion:{matches:false},modal:{classList:{contains:()=>false}},logoStarted:true,animStart:1,lastRainImpact:-Infinity,dpr:1,
 logoWrap:{getBoundingClientRect:()=>({left:100,top:100,width:400,height:60})},particles:grains,
 Math:Object.assign(Object.create(Math),{random:()=>.2}),releaseLogoDot(p,rect,now,impactFragment){assert(impactFragment);fragments.push(p);return true;}
};
vm.createContext(impactContext);
vm.runInContext(scripts[1].match(/function collideRainWithLogo\([\s\S]*?\n\}/)[0],impactContext);
vm.runInContext('collideRainWithLogo({}, {y:100}, {x:222,y:160,scale:1}, 7000)',impactContext);
assert.equal(fragments.length,3,'A real rain crossing releases a handful of fragments');
assert(grains.some(p=>p.scatterUntil>7000 && Math.hypot(p.vx,p.vy)>0),'Nearby independent grains must scatter');
assert(grains.filter(p=>p.x>=140).every(p=>!p.scatterUntil),'The original 15px footprint must leave nearby regions intact');
assert.equal(distant.vy,0,'Distant logo regions must remain intact');
impactContext.lastRainImpact=-Infinity;
vm.runInContext('collideRainWithLogo({}, {y:100}, {x:222,y:110,scale:1}, 9000)',impactContext);
assert.equal(fragments.length,3,'A head that has not crossed the logo must not trigger a proximity burst');
impactContext.reducedMotion.matches=true;
vm.runInContext('collideRainWithLogo({}, {y:100}, {x:222,y:160,scale:1}, 9000)',impactContext);
assert.equal(fragments.length,3,'Reduced motion disables automatic collisions');
const events = {}, frames = new Map();
let next = 0, reveals = 0;
const elements = [];
const context = {
 document: {body:null,createElement:() => { const el={style:{},remove(){this.removed=true;}}; elements.push(el); return el;},addEventListener:(n,f)=>events[n]=f},
 window:{addEventListener(){},_loaderDone(){reveals++;}},
 requestAnimationFrame:f=>{frames.set(++next,f);return next;},cancelAnimationFrame:id=>frames.delete(id),setTimeout(){}
};
vm.runInNewContext(scripts[0], context);
events.keydown({key:'Enter',preventDefault(){}});
events.keydown({key:'Enter',preventDefault(){}});
assert.equal(reveals,1);
assert(elements.every(e=>e.removed));
const init=scripts[1].match(/function initLogo\(\) \{[\s\S]*?\n\}/)[0];
let logoBuilds = 0;
const logoContext={logoStarted:false,logoCanvas:{classList:{add(){}}},logoFrame:null,buildParticles(){logoBuilds++;},animStart:0,renderParticles(){},requestAnimationFrame:context.requestAnimationFrame,cancelAnimationFrame:context.cancelAnimationFrame};
vm.createContext(logoContext);
vm.runInContext(init,logoContext);
for(let i=0;i<10;i++)vm.runInContext('initLogo()',logoContext);
assert.equal(frames.size,1);
assert.equal(logoBuilds,1, 'Repeated starts must not replay the logo');
const resize=scripts[1].match(/function resizeLogo\(\) \{[\s\S]*?\n\}/)[0];
const resizeContext={logoStarted:false};
vm.createContext(resizeContext);
vm.runInContext(resize,resizeContext);
vm.runInContext('resizeLogo()',resizeContext); // Pre-loader resize must do nothing.
Object.assign(resizeContext, {logoStarted:true,logoWidth:200,logoHeight:40,dpr:1,
  window:{devicePixelRatio:1,innerWidth:1200,innerHeight:800},logoCanvas:{},
  logoWrap:{getBoundingClientRect:()=>({width:400,height:80})},
  particles:[{x:15,y:5,tx:10,ty:3,ox:10,oy:3,vx:2,vy:1,size:1}]});
vm.runInContext('resizeLogo()',resizeContext);
assert.equal(resizeContext.particles[0].x,30);
assert.equal(resizeContext.particles[0].ox,20);
assert.equal(resizeContext.particles[0].vx,4);
// A particle displaced above/left of the logo must still be drawn on the page.
const render = scripts[1].match(/function renderParticles\(now\) \{[\s\S]*?\n\}/)[0];
const draws = [];
let offset = [0, 0];
const particleContext = {
  motionField:{classList:{contains:()=>true}}, startField(){},
  reducedMotion:{matches:false},
  animStart: 1, dpr: 2, logoFrame: null,
  logoCanvas: {width: 2400, height: 1600, getBoundingClientRect: () => ({left: 0, top: 0})},
  logoWrap: {getBoundingClientRect: () => ({left: 200, top: 300})},
  lctx: {clearRect(){}, save(){}, restore(){}, translate(x,y){offset=[x,y];},
    fillRect(x,y){draws.push([x+offset[0], y+offset[1]]);}},
  window: {}, logoMouseX: -9999, logoMouseY: -9999, logoActive: false,
  particles: [{x:-20, y:-20, ox:0, oy:0, vx:0, vy:0, delay:0, duration:1, size:2}],
  requestAnimationFrame(){return 1;}
};
vm.createContext(particleContext);
vm.runInContext(render, particleContext);
vm.runInContext('renderParticles(10000)', particleContext);
assert(draws[0][0] > 0 && draws[0][0] < 400);
assert(draws[0][1] > 0 && draws[0][1] < 600);
// Parallax moves the drawing origin together with the layout anchor.
particleContext.logoWrap.getBoundingClientRect = () => ({left: 210, top: 305});
vm.runInContext('renderParticles(10016)', particleContext);
assert.deepEqual(offset, [420,610]);
const returning={x:140,y:120,ox:100,oy:100,vx:2,vy:1,delay:0,duration:1,size:2,scatterUntil:10300,recoverUntil:12500};
particleContext.particles=[returning];
for(let now=10000;now<=14500;now+=1000/60)vm.runInContext(`renderParticles(${now})`,particleContext);
assert(Math.hypot(returning.x-returning.ox,returning.y-returning.oy)<1,'Scattered grains must reform through the live spring recovery');
// Handoff preserves screen position and velocity across the two canvas spaces.
const rainContext = {
  mouseMomentum: {x:0,y:0,time:0}, rainStreams: [],
  reducedMotion: {matches:false}, lastDotRelease:-Infinity, releasedDots:[],
  fieldWidth:1200, fieldHeight:800, fieldX:0.7, fieldY:0.3, dpr:2
};
vm.createContext(rainContext);
for (const name of ['projectRain', 'centerVisibility', 'releaseLogoDot', 'updateReleasedDot']) {
  vm.runInContext(scripts[1].match(new RegExp('function '+name+'\\([^]*?\\n\\}'))[0], rainContext);
}
assert(vm.runInContext('releaseLogoDot({x:80,y:40,vx:2,vy:4,size:2}, {left:200,top:300}, 1000)', rainContext));
const projected = vm.runInContext('projectRain(releasedDots[0].x,releasedDots[0].y,0)', rainContext);
assert.equal(projected.x,240);
assert.equal(projected.y,320);
assert.equal(rainContext.releasedDots[0].vx,16);
assert(!vm.runInContext('releaseLogoDot({}, {}, 1020)', rainContext));
assert(vm.runInContext('projectRain(100,100,1800).scale < projectRain(100,100,100).scale', rainContext));
assert(vm.runInContext('centerVisibility(600,400) < centerVisibility(60,400)', rainContext));
rainContext.reducedMotion.matches = true;
assert(!vm.runInContext('releaseLogoDot({}, {}, 2000)', rainContext));
rainContext.rainStreams = [{x:100,y:200,z:500,speed:120,count:60,gap:7}];
rainContext.dot = {x:0,y:0,z:0,vx:200,vy:-80,age:0,target:null,joinedAt:null};
vm.runInContext('updateReleasedDot(dot,0.1,0.1)',rainContext);
assert(rainContext.dot.x > 0 && rainContext.dot.y < 0);
assert.equal(rainContext.dot.joinedAt,null);
vm.runInContext('for(let i=1;i<400 && dot.joinedAt==null;i++){rainStreams[0].y+=120/60;updateReleasedDot(dot,1/60,i/60);}',rainContext);
assert(rainContext.dot.joinedAt != null, 'Escaped dot must catch the falling stream');
assert.equal(rainContext.dot.x,100);
assert.equal(rainContext.dot.z,500);
assert(!/data:image|href="#/.test(html));
assert.equal(fs.readdirSync('website').filter(n=>n.endsWith('.html')).length,1);
console.log('PASS: swept rain contact, detached fragments, spring recovery, script syntax, loader completion, one animation loop, resize and parallax geometry, one HTML entry point.');


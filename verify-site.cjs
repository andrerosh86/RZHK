const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const html = fs.readFileSync('website/index.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
scripts.forEach(s => new vm.Script(s));
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
console.log('PASS: script syntax, loader completion once, one frame after 10 restarts, particles beyond logo bounds, parallax alignment, no embedded images or dead fragment links, one HTML.');


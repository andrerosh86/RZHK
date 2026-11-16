// Original letter-shaped light scattering, visually inspired by sztanki.com.
// Uses the live logo canvas as its source: no copied artwork or external renderer.
(() => {
  const canvas = document.getElementById('logoLight');
  const ctx = canvas.getContext('2d');
  const source = document.createElement('canvas');
  const sc = source.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = {x:.5,y:.5,sx:.5,sy:.5,active:false};
  const resolution = .5;
  let last=0, strength=0, width=0, height=0;
  function clear() {ctx.clearRect(0,0,canvas.width,canvas.height);last=0;strength=0;}
  window.addEventListener('pointermove',e=>{
    if(e.pointerType==='touch') return;
    pointer.x=e.clientX/innerWidth;pointer.y=e.clientY/innerHeight;pointer.active=true;
  },{passive:true});
  function leave(){pointer.active=false;}
  document.documentElement.addEventListener('pointerleave',leave);
  window.addEventListener('blur',leave);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){leave();clear();}});
  reduce.addEventListener('change',clear);
  window.addEventListener('pagehide',clear);
  window.logoLight = {
    render(now, logo, rect, dpr, ready) {
      if(document.hidden || reduce.matches || !ready) {clear();return;}
      if(last && now-last<33) return;
      const dt=last?Math.min((now-last)/1000,.06):1/30;last=now;
      if(width!==innerWidth || height!==innerHeight) {
        width=innerWidth;height=innerHeight;
        canvas.width=Math.ceil(width*resolution);canvas.height=Math.ceil(height*resolution);
      }
      const modalOpen=document.getElementById('modal').classList.contains('open');
      const follow=1-Math.exp(-dt*4);
      pointer.sx+=(pointer.x-pointer.sx)*follow;
      pointer.sy+=(pointer.y-pointer.sy)*follow;
      strength+=((pointer.active && !modalOpen ? 1 : 0)-strength)*(1-Math.exp(-dt*3));
      ctx.clearRect(0,0,canvas.width,canvas.height);
      if(strength<.003){strength=0;return;}
      const pad=24;
      const left=Math.max(0,rect.left-pad),top=Math.max(0,rect.top-pad);
      const w=Math.min(width-left,rect.width+pad*2),h=Math.min(height-top,rect.height+pad*2);
      const sw=Math.ceil(w*resolution),sh=Math.ceil(h*resolution);
      if(source.width!==sw || source.height!==sh){source.width=sw;source.height=sh;}
      sc.clearRect(0,0,sw,sh);
      sc.globalCompositeOperation='source-over';
      // The actual drawn particles drive the mask, including their scattering.
      sc.filter='blur(1.2px)';
      sc.drawImage(logo,left*dpr,top*dpr,w*dpr,h*dpr,0,0,sw,sh);
      sc.filter='none';
      sc.globalCompositeOperation='source-in';
      sc.fillStyle='#d7e2ee';sc.fillRect(0,0,sw,sh);
      const focusX=(pointer.sx*width-left)*resolution;
      const focusY=sh*.5;
      const focus=sc.createRadialGradient(focusX,focusY,0,focusX,focusY,Math.max(sw*.85,180));
      focus.addColorStop(0,'rgba(255,255,255,1)');
      focus.addColorStop(.5,'rgba(255,255,255,.65)');
      focus.addColorStop(1,'rgba(255,255,255,.18)');
      sc.globalCompositeOperation='destination-in';sc.fillStyle=focus;sc.fillRect(0,0,sw,sh);
      sc.globalCompositeOperation='source-over';
      // Radial samples fan out from a mouse-driven vanishing point.
      const ox=(rect.left+rect.width*.5+(pointer.sx-.5)*width*.65)*resolution;
      const oy=(rect.top+rect.height*.5+(pointer.sy-.5)*height*.8)*resolution;
      ctx.globalCompositeOperation='lighter';
      const steps=48;
      for(let i=steps;i>=1;i--){
        const depth=i/steps,scale=1+depth*.72;
        ctx.globalAlpha=strength*.17*Math.pow(1-depth,1.65);
        ctx.drawImage(source,ox+(left*resolution-ox)*scale,oy+(top*resolution-oy)*scale,sw*scale,sh*scale);
      }
      ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';
    }
  };
})();

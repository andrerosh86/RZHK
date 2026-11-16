// Service rims absorb rain; the background falls continuously.
(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const canvas=document.getElementById('serviceSparks'),ctx=canvas.getContext('2d');
  const nodes=[...document.querySelectorAll('.svc-orbit')];
  const circles=nodes.map(()=>({x:0,y:0,r:0,lastHit:-Infinity}));
  const flashes=[];
  let width=0,height=0,dpr=1,currentTime=0;
  function blocked(){return document.hidden || reduce.matches || document.getElementById('modal').classList.contains('open') || !document.getElementById('motionField').classList.contains('visible');}
  document.addEventListener('visibilitychange',()=>{if(document.hidden){flashes.length=0;ctx.clearRect(0,0,canvas.width,canvas.height);}});
  reduce.addEventListener('change',()=>{flashes.length=0;ctx.clearRect(0,0,canvas.width,canvas.height);});
  function begin(now,dt){
    currentTime=now;
    if(width!==innerWidth||height!==innerHeight){
      width=innerWidth;height=innerHeight;dpr=Math.min(devicePixelRatio||1,1.5);
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
      flashes.length=0;
    }
    const visible=document.getElementById('services-strip').classList.contains('show');
    for(let i=0;i<nodes.length;i++){
      const rect=nodes[i].getBoundingClientRect(),c=circles[i];
      c.x=rect.left+rect.width/2;c.y=rect.top+rect.height/2;c.r=visible?rect.width/2:0;
    }
  }

  function flash(c,x,y){
    if(reduce.matches || currentTime-c.lastHit<65 || flashes.length>=36)return;
    c.lastHit=currentTime;
    flashes.push({circle:c,angle:Math.atan2(y-c.y,x-c.x),born:currentTime});
  }
  function absorb(x,previousY,y,size=1){
    for(const c of circles){
      if(!c.r)continue;
      const dx=x-c.x,r=c.r+size*.5;
      if(Math.abs(dx)>r)continue;
      const half=Math.sqrt(Math.max(0,r*r-dx*dx));
      const top=c.y-half,bottom=c.y+half;
      const down=y>=previousY;
      const crossed=down ? previousY<top && y>=top : previousY>bottom && y<=bottom;
      if(crossed){flash(c,x,down?top:bottom);return true;}
      if(y>=top && y<=bottom)return true;
    }
    return false;
  }
  function finish(now){
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,width,height);
    if(blocked()){flashes.length=0;return;}
    for(let i=flashes.length-1;i>=0;i--){
      const f=flashes[i],age=(now-f.born)/1000;
      if(age>.55){flashes.splice(i,1);continue;}
      const c=f.circle,x=c.x+Math.cos(f.angle)*c.r,y=c.y+Math.sin(f.angle)*c.r;
      const blink=Math.exp(-age*18),ember=Math.pow(1-age/.55,3);
      const glow=ctx.createRadialGradient(x,y,0,x,y,7);
      glow.addColorStop(0,`rgba(235,244,255,${blink*.4})`);glow.addColorStop(1,'rgba(235,244,255,0)');
      ctx.fillStyle=glow;ctx.fillRect(x-7,y-7,14,14);
      ctx.strokeStyle=`rgba(235,244,255,${ember*.45})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,f.angle-.055,f.angle+.055);ctx.stroke();
      ctx.fillStyle=`rgba(255,255,255,${Math.max(blink,ember*.4)})`;ctx.fillRect(x-.7,y-.7,1.4,1.4);
      if(age<.16){const ray=2.5*blink;ctx.strokeStyle=`rgba(255,255,255,${blink*.75})`;ctx.lineWidth=.65;ctx.beginPath();ctx.moveTo(x-ray,y);ctx.lineTo(x+ray,y);ctx.moveTo(x,y-ray);ctx.lineTo(x,y+ray);ctx.stroke();}
    }
  }
  window.rainInteraction={begin,absorb,finish};
})();

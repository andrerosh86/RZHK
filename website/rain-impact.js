// Spatial index: check neighboring cells instead of every logo/rain pair.
const RainImpact = (() => {
  const cellSize = 24, cells = new Map();
  let density = 1;
  function rebuild(particles, dpr) {
    cells.clear(); density = dpr;
    for (const p of particles) {
      const key = `${Math.floor(p.ox / dpr / cellSize)},${Math.floor(p.oy / dpr / cellSize)}`;
      if (!cells.has(key)) cells.set(key, []);
      cells.get(key).push(p);
    }
  }
  function strike(x, y, radius, strength, now, direction) {
    let affected = 0;
    const minX = Math.floor((x-radius)/cellSize), maxX = Math.floor((x+radius)/cellSize);
    const minY = Math.floor((y-radius)/cellSize), maxY = Math.floor((y+radius)/cellSize);
    for (let cy=minY;cy<=maxY;cy++) for(let cx=minX;cx<=maxX;cx++) {
      const bucket=cells.get(`${cx},${cy}`);
      if (!bucket) continue;
      for (const p of bucket) {
        const dx=p.ox/density-x, dy=p.oy/density-y;
        const distance2=dx*dx+dy*dy;
        if(distance2>=radius*radius) continue;
        const influence=1-Math.sqrt(distance2)/radius;
        p.vx += (dx/radius*2.2+direction*.65)*strength*influence*density;
        p.vy += strength*influence*density;
        p.impactAt=now;
        affected++;
      }
    }
    return affected;
  }
  return {rebuild,strike};
})();

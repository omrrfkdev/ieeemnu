/**
 * Mass3dPuzzle — Phase 7 (Mechanical Engineering)
 * Player draws a polygon on a grid → area computed via Shoelace formula →
 * mass = area × depth × density. Goal: hit target mass ±tolerance.
 */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager } from '../../../game/audioManager';

const PF = { fontFamily: "'Press Start 2P', monospace" };
const GRID  = 12;   // cells (1 cell = 1 cm)
const CPIX  = 20;   // px per cell
const CW    = GRID * CPIX; // 240px canvas

function shoelace(pts) {
  if (pts.length < 3) return 0;
  let a = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    a += pts[i].x * pts[j].y - pts[j].x * pts[i].y;
  }
  return Math.abs(a) / 2;
}

// Isometric projection helper
function isoProject(px, py, pz, cx, cy, S) {
  return {
    x: cx + (px - py) * S * 0.866,
    y: cy + (px + py) * S * 0.5 - pz * S * 0.75,
  };
}


const STR = {
  en: {
    step1:    '① Click & drag to draw a custom shape',
    step2:    '② Release near the start point to close it',
    step3:    '③ Adjust Depth → press CALCULATE',
    drawTip:  'Hold click and draw • Release near ① to close',
    area:     'Area', depth: 'Depth', density: 'Density',
    mass:     'Calculated Mass', target: 'Target',
    calc:     '▸ CALCULATE', clear: 'CLEAR', solved: '✓ TARGET REACHED!',
    light:    '▲ Too light — draw larger or add depth',
    heavy:    '▼ Too heavy — draw smaller or reduce depth',
    hint:     '💡 Mass = Area × Depth × Density.',
    noShape:  'No shape drawn',
  },
  ar: {
    step1:    '① انقر واسحب لرسم شكل مخصص',
    step2:    '② أفلت قريباً من نقطة البداية للإغلاق',
    step3:    '③ اضبط العمق واضغط احسب',
    drawTip:  'استمر بالنقر وارسم • أفلت قرب ① للإغلاق',
    area:     'المساحة', depth: 'العمق', density: 'الكثافة',
    mass:     'الكتلة المحسوبة', target: 'الهدف',
    calc:     '▸ احسب', clear: 'مسح', solved: '✓ تم الوصول للهدف!',
    light:    '▲ خفيف — ارسم أكبر أو زد العمق',
    heavy:    '▼ ثقيل — ارسم أصغر أو قلل العمق',
    hint:     '💡 الكتلة = المساحة × العمق × الكثافة.',
    noShape:  'لم يُرسم شكل بعد',
  },
};

const Mass3dPuzzle = ({ challenge, lang = 'en', onSolve, onClose }) => {
  const [pts, setPts]         = useState([]);
  const [closed, setClosed]   = useState(false);
  const [mouse, setMouse]     = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [depth, setDepth]     = useState(5);
  const [solved, setSolved]   = useState(false);
  const [checked, setChecked] = useState(false); // did user press CALCULATE
  const [attempts, setAttempts] = useState(0);
  const canvasRef = useRef(null);

  const s     = STR[lang] || STR.en;
  const isRTL = lang === 'ar';

  const area = useMemo(() => {
    if (!closed || pts.length < 3) return 0;
    return Math.round(shoelace(pts) * 10) / 10;
  }, [pts, closed]);

  const mass = useMemo(() => Math.round(area * depth * challenge.density * 10) / 10,
    [area, depth, challenge.density]);

  const diff    = mass - challenge.targetMass;
  const inRange = closed && Math.abs(diff) <= challenge.tolerance;

  // ── Canvas draw ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // High-DPI support
    const dpr = window.devicePixelRatio || 1;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    
    ctx.clearRect(0, 0, CW, CW);

    // Background
    ctx.fillStyle = '#060d14';
    ctx.fillRect(0, 0, CW, CW);

    // Grid lines
    for (let g = 0; g <= GRID; g++) {
      ctx.strokeStyle = g % 2 === 0 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)';
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(g * CPIX, 0); ctx.lineTo(g * CPIX, CW); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, g * CPIX); ctx.lineTo(CW, g * CPIX); ctx.stroke();
    }

    // Axis labels
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = '8px sans-serif';
    for (let i = 2; i <= GRID; i += 2) {
      ctx.fillText(`${i}`, i * CPIX - 6, CW - 3);
      ctx.fillText(`${i}`, 2, i * CPIX + 4);
    }
    ctx.fillText('cm', CW - 16, CW - 3);

    // ── SHAPE GUIDE OVERLAY ──
    if (challenge.shapeHint) {
      ctx.save();
      ctx.strokeStyle = inRange ? 'rgba(0,255,159,0.3)' : 'rgba(167,139,250,0.4)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      
      const sc = CPIX;
      switch(challenge.shapeHint) {
        case 'rect':
          // 8x5 rectangle, centered roughly
          ctx.rect(2 * sc, 3.5 * sc, 8 * sc, 5 * sc);
          break;
        case 'L':
          // 4x6 L-shape
          ctx.moveTo(4 * sc, 3 * sc);
          ctx.lineTo(8 * sc, 3 * sc);
          ctx.lineTo(8 * sc, 5 * sc);
          ctx.lineTo(6 * sc, 5 * sc);
          ctx.lineTo(6 * sc, 9 * sc);
          ctx.lineTo(4 * sc, 9 * sc);
          ctx.closePath();
          break;
        case 'triangle':
          // base 6, height 6
          ctx.moveTo(6 * sc, 3 * sc);
          ctx.lineTo(9 * sc, 9 * sc);
          ctx.lineTo(3 * sc, 9 * sc);
          ctx.closePath();
          break;
        case 'circle':
          // radius 3
          ctx.arc(6 * sc, 6 * sc, 3 * sc, 0, Math.PI * 2);
          break;
        case 'T':
          // 6x2 top bar + 2x4 stem
          ctx.moveTo(3 * sc, 3 * sc);
          ctx.lineTo(9 * sc, 3 * sc);
          ctx.lineTo(9 * sc, 5 * sc);
          ctx.lineTo(7 * sc, 5 * sc);
          ctx.lineTo(7 * sc, 9 * sc);
          ctx.lineTo(5 * sc, 9 * sc);
          ctx.lineTo(5 * sc, 5 * sc);
          ctx.lineTo(3 * sc, 5 * sc);
          ctx.closePath();
          break;
      }
      ctx.stroke();
      ctx.restore();
    }

    if (pts.length === 0) return;

    // Filled polygon (if closed)
    if (closed) {
      ctx.beginPath();
      ctx.moveTo(pts[0].x * CPIX, pts[0].y * CPIX);
      pts.forEach(p => ctx.lineTo(p.x * CPIX, p.y * CPIX));
      ctx.closePath();
      ctx.fillStyle = inRange ? 'rgba(0,255,159,0.18)' : 'rgba(56,189,248,0.12)';
      ctx.fill();
    }

    // Edges
    ctx.strokeStyle = inRange ? '#00ff9f' : '#38bdf8';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0].x * CPIX, pts[0].y * CPIX);
    pts.forEach(p => ctx.lineTo(p.x * CPIX, p.y * CPIX));
    if (closed) ctx.closePath();
    ctx.stroke();

    // Edge length labels helper
    const drawLabel = (p1, p2, color, minLen = 1.5) => {
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < minLen) return;

      const midX = (p1.x + p2.x) / 2 * CPIX;
      const midY = (p1.y + p2.y) / 2 * CPIX;
      let angle = Math.atan2(dy, dx);
      if (angle > Math.PI / 2 || angle < -Math.PI / 2) angle += Math.PI; // Keep text upright

      ctx.save();
      ctx.translate(midX, midY);
      ctx.rotate(angle);
      
      // Text setup
      const txt = `${dist.toFixed(1)}cm`;
      ctx.font = 'bold 9px sans-serif';
      
      // Background for text
      const txtW = ctx.measureText(txt).width;
      ctx.fillStyle = 'rgba(6,13,20,0.85)';
      ctx.fillRect(-txtW/2 - 3, -11, txtW + 6, 11);
      
      // Text
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(txt, 0, -2);
      ctx.restore();
    };

    // Permanent edges lengths
    if (pts.length > 1) {
      for (let i = 0; i < pts.length - 1; i++) {
        drawLabel(pts[i], pts[i+1], inRange ? '#00ff9f' : 'rgba(56,189,248,0.8)');
      }
      if (closed) {
        drawLabel(pts[pts.length - 1], pts[0], inRange ? '#00ff9f' : 'rgba(56,189,248,0.8)');
      }
    }

    // Preview line to mouse
    if (!closed && mouse) {
      const last = pts[pts.length - 1];
      ctx.setLineDash([4, 3]);
      ctx.strokeStyle = 'rgba(56,189,248,0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(last.x * CPIX, last.y * CPIX);
      ctx.lineTo(mouse.x * CPIX, mouse.y * CPIX);
      ctx.stroke();
      ctx.setLineDash([]);
      // Preview length label
      drawLabel(last, mouse, '#fde68a', 0.5);
    }

    // Vertices
    pts.forEach((p, i) => {
      const x = p.x * CPIX, y = p.y * CPIX;
      ctx.beginPath();
      ctx.arc(x, y, i === 0 ? 6 : 4, 0, Math.PI * 2);
      ctx.fillStyle = i === 0 ? '#fbbf24' : '#38bdf8';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
      // First vertex label
      if (i === 0) {
        ctx.fillStyle = '#000';
        ctx.font = 'bold 7px monospace';
        ctx.fillText('①', x - 3.5, y + 2.5);
      }
    });
  }, [pts, closed, mouse, inRange]);

  // ── Grid snap from canvas coords ─────────────────────────────────────────
  const snapToGrid = useCallback((e, freehand = false) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = CW / rect.width;
    const scaleY = CW / rect.height;
    const cx = (e.clientX - rect.left) * scaleX;
    const cy = (e.clientY - rect.top)  * scaleY;
    const px = cx / CPIX;
    const py = cy / CPIX;
    if (freehand) {
      return { x: Math.max(0, Math.min(GRID, px)), y: Math.max(0, Math.min(GRID, py)) };
    }
    return {
      x: Math.max(0, Math.min(GRID, Math.round(px))),
      y: Math.max(0, Math.min(GRID, Math.round(py))),
    };
  }, []);

  const handlePointerDown = useCallback((e) => {
    if (closed || solved) return;
    const pt = snapToGrid(e, true);
    setPts(prev => prev.length === 0 ? [pt] : [...prev, pt]);
    setIsDrawing(true);
    setChecked(false);
    e.target.setPointerCapture(e.pointerId);
  }, [closed, solved, snapToGrid]);

  const handlePointerMove = useCallback((e) => {
    if (closed || solved) return;
    const pt = snapToGrid(e, true);
    setMouse(snapToGrid(e, false)); // keep hover preview snapped for UI
    
    if (isDrawing) {
      setPts(prev => {
        if (prev.length === 0) return [pt];
        const last = prev[prev.length - 1];
        const dx = pt.x - last.x, dy = pt.y - last.y;
        // Only add point if mouse moved at least 0.3 grid units (smoother curves)
        if (Math.sqrt(dx*dx + dy*dy) > 0.3) {
          return [...prev, pt];
        }
        return prev;
      });
    }
  }, [closed, solved, isDrawing, snapToGrid]);

  const handlePointerUp = useCallback((e) => {
    if (!isDrawing || closed || solved) return;
    setIsDrawing(false);
    e.target.releasePointerCapture(e.pointerId);
    
    if (pts.length >= 3) {
      const first = pts[0];
      const pt = snapToGrid(e, true);
      const dx = pt.x - first.x, dy = pt.y - first.y;
      // Close shape if released near the start point
      if (Math.sqrt(dx*dx + dy*dy) < 1.5) {
        setClosed(true);
      }
    }
  }, [isDrawing, closed, solved, pts, snapToGrid]);

  const handleCalculate = () => {
    if (!closed || area === 0) return;
    audioManager.play('confirm', { forceRestart: true });
    setChecked(true);
    setAttempts(a => a + 1);
    if (inRange) {
      setSolved(true);
      setTimeout(() => onSolve(), 900);
    }
  };

  const clearCanvas = () => {
    audioManager.play('confirm', { forceRestart: true });
    setPts([]); setClosed(false); setMouse(null); setChecked(false); setIsDrawing(false);
  };

  // ── Isometric 3D preview ────────────────────────────────────────────────
  const isoSVG = useMemo(() => {
    if (!closed || pts.length < 3) return null;
    const S  = 6, cx = 110, cy = 90;
    const avgX = pts.reduce((s,p)=>s+p.x,0)/pts.length;
    const avgY = pts.reduce((s,p)=>s+p.y,0)/pts.length;
    const topPts = pts.map(p => isoProject(p.x-avgX, p.y-avgY, depth, cx, cy, S));
    const botPts = pts.map(p => isoProject(p.x-avgX, p.y-avgY, 0,     cx, cy, S));
    const toPath = (arr) => arr.map((p,i)=>`${i===0?'M':'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')+'Z';
    const topColor = inRange ? '#00ff9f' : '#38bdf8';
    const sideColor= inRange ? 'rgba(0,200,120,0.35)' : 'rgba(30,120,180,0.35)';
    const edgeColor= inRange ? '#00cc80' : '#1d78b4';
    return { topPts, botPts, toPath, topColor, sideColor, edgeColor };
  }, [pts, closed, depth, inRange]);

  const showHint = attempts >= 2;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-40 p-2"
      style={{ background:'rgba(0,0,0,0.93)', overflowY:'auto' }}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <motion.div
        initial={{ scale:0.88, y:20, opacity:0 }}
        animate={solved ? {scale:1.02,opacity:1} : {scale:1,y:0,opacity:1}}
        transition={{ type:'spring', stiffness:290, damping:24 }}
        className="w-full flex flex-col"
        style={{
          maxWidth:480,
          background:'#0d1117',
          border:`2px solid ${solved?'#00ff9f':'rgba(139,92,246,0.5)'}`,
          boxShadow: solved
            ? '0 0 0 1px #000,0 0 0 4px #00ff9f,0 0 40px rgba(0,255,159,0.4)'
            : '0 0 0 1px #000,0 0 0 3px rgba(139,92,246,0.35),0 0 20px rgba(139,92,246,0.15)',
          transition:'border-color 0.3s,box-shadow 0.3s',
        }}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2"
          style={{ background:'#161b22', borderBottom:'1px solid rgba(139,92,246,0.25)' }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div style={{width:9,height:9,background:'#ef4444'}}/>
              <div style={{width:9,height:9,background:'#fbbf24'}}/>
              <div style={{width:9,height:9,background:'#22c55e'}}/>
            </div>
            <span style={{...PF,fontSize:'5.5px',color:'rgba(139,92,246,0.7)',letterSpacing:'0.12em'}}>
              IEEE_MECH_LAB — design.cad
            </span>
          </div>
          <button onClick={() => { audioManager.play('confirm'); onClose(); }}
            style={{...PF,fontSize:'7px',color:'rgba(255,255,255,0.2)',background:'none',border:'none',cursor:'pointer'}}>✕</button>
        </div>

        {/* Goal panel */}
        <div className="px-4 py-2.5" style={{background:'#0a0f18',borderBottom:'2px solid #1e293b'}}>
          <p style={{...PF,fontSize:'6.5px',color:'rgba(255,255,255,0.55)',lineHeight:2.3,marginBottom:5,direction:isRTL?'rtl':'ltr'}}>
            {isRTL ? challenge.dimensionsTextAr : challenge.dimensionsText}
          </p>
          <div className="flex flex-col gap-0.5" style={{marginBottom:5}}>
            {[s.step1, s.step2, s.step3].map((step, i) => (
              <p key={i} style={{...PF,fontSize:'5.5px',lineHeight:2,direction:isRTL?'rtl':'ltr',
                color: i===2 ? 'rgba(139,92,246,0.9)' : 'rgba(255,255,255,0.32)'}}>
                {step}
              </p>
            ))}
          </div>
          {/* Target mass badge */}
          <div className="flex items-center gap-3">
            <span style={{...PF,fontSize:'5px',color:'rgba(255,255,255,0.3)'}}>
              {s.target}:
            </span>
            <span style={{...PF,fontSize:'7px',color:'#a78bfa',letterSpacing:'0.05em'}}>
              {challenge.targetMass} g ±{challenge.tolerance} g
            </span>
          </div>
        </div>

        {/* Main layout: canvas + side info */}
        <div className="flex gap-0" style={{minHeight:0}}>

          {/* ── Canvas column ── */}
          <div className="flex flex-col" style={{padding:'10px 8px 8px 10px'}}>
            <p style={{...PF,fontSize:'5.5px',color:'rgba(255,255,255,0.3)',marginBottom:5,lineHeight:1.8}}>
              {s.drawTip}
            </p>
            <canvas
              ref={canvasRef}
              width={CW * (window.devicePixelRatio || 1)} 
              height={CW * (window.devicePixelRatio || 1)}
              style={{width:CW,height:CW,cursor:closed?'default':'crosshair',border:'1px solid rgba(139,92,246,0.25)',display:'block'}}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={(e) => { handlePointerUp(e); setMouse(null); }}
            />
            {/* Clear button */}
            <div className="flex gap-1 mt-2 flex-wrap">
              <button onClick={clearCanvas}
                style={{...PF,fontSize:'5px',padding:'4px 6px',background:'#1a0a0a',
                  border:'1px solid rgba(239,68,68,0.4)',color:'rgba(239,68,68,0.7)',cursor:'pointer'}}>
                {s.clear}
              </button>
            </div>
          </div>

          {/* ── Info + 3D column ── */}
          <div className="flex flex-col gap-2 flex-1" style={{padding:'10px 10px 8px 4px',minWidth:0}}>

            {/* Dimensions table */}
            <div style={{background:'#0a0f18',border:'1px solid #1e293b',padding:'8px 10px'}}>
              {[
                [s.area,    closed ? `${area} cm²` : '—'],
                [s.depth,   `${depth} cm`],
                [s.density, `${challenge.density} g/cm³`],
              ].map(([label,val])=>(
                <div key={label} className="flex justify-between items-center" style={{marginBottom:4}}>
                  <span style={{...PF,fontSize:'5px',color:'rgba(255,255,255,0.35)'}}>{label}</span>
                  <span style={{...PF,fontSize:'6px',color:'rgba(255,255,255,0.7)'}}>{val}</span>
                </div>
              ))}
              {/* Depth slider */}
              <div style={{marginTop:6}}>
                <input type="range" min="1" max="10" step="0.5"
                  value={depth} onChange={e=>{ setDepth(Number(e.target.value)); setChecked(false); }}
                  style={{width:'100%',accentColor:'#a78bfa',height:4}}/>
                <div className="flex justify-between">
                  <span style={{...PF,fontSize:'4.5px',color:'rgba(255,255,255,0.2)'}}>1cm</span>
                  <span style={{...PF,fontSize:'4.5px',color:'rgba(255,255,255,0.2)'}}>10cm</span>
                </div>
              </div>
            </div>

            {/* Mass readout */}
            <div style={{background:'#0a0f18',border:`1px solid ${
              !closed?'#1e293b':inRange?'rgba(0,255,159,0.4)':checked?'rgba(239,68,68,0.4)':'#1e293b'}`,padding:'8px 10px'}}>
              <p style={{...PF,fontSize:'5px',color:'rgba(255,255,255,0.3)',marginBottom:4}}>{s.mass}</p>
              <p style={{...PF,fontSize:'13px',
                color:!closed?'#374151':inRange?'#00ff9f':checked?'#ef4444':'#a78bfa',
                lineHeight:1,marginBottom:6}}>
                {closed ? `${mass} g` : '— g'}
              </p>
              {/* Progress bar */}
              {closed && (
                <div style={{position:'relative',height:6,background:'#1e293b',borderRadius:3,overflow:'hidden',marginBottom:4}}>
                  <div style={{
                    position:'absolute',left:0,top:0,height:'100%',borderRadius:3,
                    width:`${Math.min(100,(mass/(challenge.targetMass+challenge.tolerance+30))*100)}%`,
                    background: inRange ? '#00ff9f' : mass < challenge.targetMass ? '#38bdf8' : '#ef4444',
                    transition:'width 0.4s,background 0.4s',
                  }}/>
                  {/* Target marker */}
                  <div style={{
                    position:'absolute',top:0,height:'100%',width:2,background:'#fbbf24',
                    left:`${(challenge.targetMass/(challenge.targetMass+challenge.tolerance+30))*100}%`,
                  }}/>
                </div>
              )}
              {checked && !inRange && closed && (
                <p style={{...PF,fontSize:'5px',color:'#ef4444',lineHeight:1.8}}>
                  {diff < 0 ? s.light : s.heavy}
                </p>
              )}
            </div>

            {/* Isometric 3D preview */}
            <div style={{background:'#070d14',border:'1px solid #1e293b',overflow:'hidden'}}>
              <p style={{...PF,fontSize:'4.5px',color:'rgba(255,255,255,0.2)',padding:'4px 6px'}}>3D PREVIEW</p>
              <svg viewBox="0 0 220 120" style={{width:'100%',display:'block'}}>
                <rect width="220" height="120" fill="#070d14"/>
                {isoSVG ? (
                  <g>
                    {/* Side faces */}
                    {isoSVG.topPts.map((tp, i) => {
                      const ni  = (i+1) % isoSVG.topPts.length;
                      const bp  = isoSVG.botPts[i];
                      const nbp = isoSVG.botPts[ni];
                      const ntp = isoSVG.topPts[ni];
                      const path = `M${tp.x.toFixed(1)},${tp.y.toFixed(1)} L${ntp.x.toFixed(1)},${ntp.y.toFixed(1)} L${nbp.x.toFixed(1)},${nbp.y.toFixed(1)} L${bp.x.toFixed(1)},${bp.y.toFixed(1)} Z`;
                      return <path key={i} d={path} fill={isoSVG.sideColor} stroke={isoSVG.edgeColor} strokeWidth="0.8"/>;
                    })}
                    {/* Top face */}
                    <path d={isoSVG.toPath(isoSVG.topPts)}
                      fill={inRange ? 'rgba(0,255,159,0.28)' : 'rgba(56,189,248,0.2)'}
                      stroke={isoSVG.topColor} strokeWidth="1.2"/>
                    {/* Bottom edges */}
                    <path d={isoSVG.toPath(isoSVG.botPts)}
                      fill="none" stroke={isoSVG.edgeColor} strokeWidth="0.6" strokeDasharray="3 2"/>
                    {/* Depth label */}
                    <text x="4" y="115" fill="rgba(255,255,255,0.3)" fontSize="5" fontFamily="monospace">
                      depth: {depth}cm
                    </text>
                  </g>
                ) : (
                  <text x="110" y="65" textAnchor="middle"
                    fill="rgba(255,255,255,0.18)" fontSize="6" fontFamily="monospace">
                    {s.noShape}
                  </text>
                )}
              </svg>
            </div>

            {/* Calculate button */}
            <button onClick={handleCalculate}
              disabled={!closed || solved}
              className="w-full py-2 transition-all active:translate-y-px"
              style={{
                ...PF,fontSize:'7px',letterSpacing:'0.05em',
                color: solved?'#00ff9f':inRange&&closed?'#00ff9f':'#a78bfa',
                background: solved?'#052e16':inRange&&closed?'rgba(0,255,159,0.1)':'#160f2e',
                border:`2px solid ${solved?'#00ff9f':inRange&&closed?'#00ff9f':'#7c3aed'}`,
                boxShadow:'2px 2px 0 #000',
                cursor:!closed||solved?'default':'pointer',
                opacity:!closed?0.4:1,
              }}>
              {solved ? s.solved : s.calc}
            </button>
          </div>
        </div>

        {/* Hint */}
        <AnimatePresence>
          {(showHint || solved) && (
            <motion.div key="hint"
              initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              className="px-4 py-2.5 overflow-hidden"
              style={{background:solved?'rgba(0,255,159,0.06)':'#1c1a00',
                borderTop:`1px solid ${solved?'rgba(0,255,159,0.3)':'#854d0e'}`}}>
              <p style={{...PF,fontSize:'6.5px',color:solved?'#00ff9f':'#fde68a',lineHeight:2.2,direction:isRTL?'rtl':'ltr'}}>
                {solved ? s.solved : s.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};

export default Mass3dPuzzle;

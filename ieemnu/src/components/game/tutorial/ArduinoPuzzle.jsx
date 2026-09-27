/**
 * ArduinoPuzzle — supports 9 circuit variants via circuitVariants.jsx config.
 * Drag-and-drop wire to the correct Arduino pin.
 */
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VARIANT_CONFIGS, ArduinoBoard, Breadboard } from './circuitVariants.jsx';

const PIXEL_FONT = { fontFamily: "'Press Start 2P', monospace" };
const SNAP_RADIUS = 26;
const PROX_RADIUS = 50;

function toSVGCoords(svgEl, cx, cy) {
  const pt = svgEl.createSVGPoint();
  pt.x = cx; pt.y = cy;
  return pt.matrixTransform(svgEl.getScreenCTM().inverse());
}
function dist(a, b) { return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2); }

// Variant scene labels shown inside the SVG
const VARIANT_LABELS = {
  led_gnd:       { title:'LED Circuit', sub:'220Ω current limiting resistor' },
  led_5v:        { title:'LED Circuit', sub:'Anode (+) connection' },
  diode_cathode: { title:'Rectifier Diode', sub:'1N4007 — stripe = cathode' },
  motor_dc:      { title:'DC Motor', sub:'5V brushed motor' },
  lcd_vss:       { title:'16×2 LCD Display', sub:'VSS = Ground pin' },
  lcd_vdd:       { title:'16×2 LCD Display', sub:'VDD = Power pin' },
  keypad_row:    { title:'4×4 Matrix Keypad', sub:'ROW0 wire missing' },
  ldr_circuit:   { title:'LDR Voltage Divider', sub:'Light Dependent Resistor + 10kΩ' },
  rfid_sda:      { title:'RC522 RFID Module', sub:'SDA (Slave Select) missing' },
};

// Simple component shapes drawn per variant
function VariantScene({ variant, solved }) {
  const color = solved ? '#00ff9f' : '#4b5563';
  switch(variant) {
    case 'led_gnd':
    case 'led_5v':
      return (
        <>
          <ellipse cx="78" cy="104" rx="14" ry="16" fill={solved?'rgba(239,68,68,0.3)':'#1f2937'} stroke={solved?'#ef4444':color} strokeWidth="1.5"/>
          <line x1="73" y1="120" x2="73" y2="148" stroke="#9ca3af" strokeWidth="1.8"/>
          <line x1="83" y1="120" x2="83" y2="148" stroke="#9ca3af" strokeWidth="1.8"/>
          <rect x="156" y="85" width="36" height="10" rx="3" fill="#d4b483" stroke="#92714a" strokeWidth="1"/>
          <rect x="163" y="85" width="4" height="10" rx="0.5" fill="#ef4444"/>
          <rect x="170" y="85" width="4" height="10" rx="0.5" fill="#ef4444"/>
          <rect x="177" y="85" width="4" height="10" rx="0.5" fill="#92400e"/>
          <text x="78" y="165" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace">LED + 220Ω</text>
        </>
      );
    case 'diode_cathode':
      return (
        <>
          <polygon points="80,88 110,108 80,128" fill="rgba(56,189,248,0.15)" stroke={color} strokeWidth="1.5"/>
          <line x1="110" y1="88" x2="110" y2="128" stroke={solved?'#00ff9f':color} strokeWidth="2"/>
          <line x1="60" y1="108" x2="80" y2="108" stroke="#9ca3af" strokeWidth="2"/>
          <line x1="110" y1="108" x2="130" y2="108" stroke="#9ca3af" strokeWidth="2"/>
          <text x="95" y="145" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace">1N4007</text>
        </>
      );
    case 'motor_dc':
      return (
        <>
          <circle cx="90" cy="110" r="30" fill="rgba(56,189,248,0.08)" stroke={color} strokeWidth="1.5"/>
          <circle cx="90" cy="110" r="18" fill="#111" stroke={color} strokeWidth="1"/>
          {solved && [0,1,2,3].map(i=>(
            <line key={i} x1="90" y1="110"
              x2={90+20*Math.cos(i*Math.PI/2)} y2={110+20*Math.sin(i*Math.PI/2)}
              stroke="#fbbf24" strokeWidth="1.5">
              <animateTransform attributeName="transform" type="rotate" from="0 90 110" to="360 90 110" dur="0.6s" repeatCount="indefinite"/>
            </line>
          ))}
          <text x="90" y="155" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace">DC MOTOR</text>
        </>
      );
    case 'lcd_vss':
    case 'lcd_vdd':
      return (
        <>
          <rect x="30" y="75" width="150" height="60" rx="3" fill={solved?'rgba(0,255,159,0.07)':'#111'} stroke={solved?'#00ff9f':color} strokeWidth="1.5"/>
          <rect x="40" y="85" width="130" height="40" rx="2" fill={solved?'rgba(0,255,159,0.12)':'#0a0f18'} stroke={color} strokeWidth="0.8"/>
          {solved ? (
            <text x="105" y="111" textAnchor="middle" fill="#00ff9f" fontSize="7" fontFamily="monospace">HELLO!</text>
          ) : (
            <text x="105" y="111" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontFamily="monospace">16x2 LCD</text>
          )}
          {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(i=>(
            <rect key={i} x={36+i*9} y="138" width="6" height="10" rx="0.5" fill="#9ca3af"/>
          ))}
        </>
      );
    case 'keypad_row':
      return (
        <>
          {[0,1,2,3].map(r=>[0,1,2,3].map(c=>(
            <rect key={`k${r}${c}`} x={34+c*32} y={64+r*28} width="26" height="22" rx="2"
              fill={solved?'rgba(0,255,159,0.08)':'#111'} stroke={color} strokeWidth="0.8"/>
          )))}
          <text x="98" y="183" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace">4x4 KEYPAD</text>
        </>
      );
    case 'ldr_circuit':
      return (
        <>
          <rect x="60" y="80" width="24" height="40" rx="3" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1.2"/>
          <line x1="48" y1="80" x2="48" y2="60" stroke="#fbbf24" strokeWidth="1"/>
          <line x1="72" y1="80" x2="72" y2="60" stroke="#fbbf24" strokeWidth="1"/>
          <text x="72" y="75" fill="#fbbf24" fontSize="4" fontFamily="monospace">LDR</text>
          <rect x="48" y="120" width="48" height="12" rx="3" fill="#d4b483" stroke="#92714a" strokeWidth="1"/>
          <text x="72" y="128" textAnchor="middle" fill="#374151" fontSize="5" fontFamily="monospace">10kΩ</text>
          <line x1="72" y1="132" x2="72" y2="145" stroke="#9ca3af" strokeWidth="1.5"/>
          {solved && (
            <circle cx="72" cy="148" r="5" fill="none" stroke="#00ff9f" strokeWidth="1.5">
              <animate attributeName="r" values="4;8;4" dur="0.6s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="1;0.2;1" dur="0.6s" repeatCount="indefinite"/>
            </circle>
          )}
          <text x="72" y="168" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="4.5" fontFamily="monospace">LDR DIVIDER</text>
        </>
      );
    case 'rfid_sda':
      return (
        <>
          <rect x="28" y="60" width="140" height="100" rx="4" fill={solved?'rgba(139,92,246,0.1)':'#0a0f18'} stroke={solved?'#a78bfa':color} strokeWidth="1.5"/>
          <text x="98" y="80" textAnchor="middle" fill={solved?'#a78bfa':'rgba(255,255,255,0.4)'} fontSize="6" fontFamily="monospace">RC522</text>
          <text x="98" y="92" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="4.5" fontFamily="monospace">RFID MODULE</text>
          {['VCC','GND','RST','IRQ','MISO','MOSI','SCK','SDA'].map((label,i)=>(
            <g key={label}>
              <rect x="36" y={98+i*7} width="20" height="5" rx="0.5" fill="#9ca3af"/>
              <text x="60" y={103+i*7} fill="rgba(255,255,255,0.5)" fontSize="4" fontFamily="monospace">{label}</text>
            </g>
          ))}
          {solved && (
            <ellipse cx="98" cy="110" rx="30" ry="20" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.6">
              <animate attributeName="rx" values="28;36;28" dur="1s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1s" repeatCount="indefinite"/>
            </ellipse>
          )}
        </>
      );
    default:
      return null;
  }
}

const ArduinoPuzzle = ({ challenge, lang = 'en', onSolve, onClose }) => {
  const variant = challenge?.circuitVariant || 'led_gnd';
  const cfg = VARIANT_CONFIGS[variant] || VARIANT_CONFIGS.led_gnd;
  const PINS = cfg.pins;
  const CORRECT_PIN = cfg.correctPin;
  const WIRE_START = cfg.wireStart;

  const [wireEnd, setWireEnd]       = useState({ ...WIRE_START });
  const [isDragging, setIsDragging] = useState(false);
  const [solved, setSolved]         = useState(false);
  const [wrongPin, setWrongPin]     = useState(null);
  const [nearPin, setNearPin]       = useState(null);
  const [attempts, setAttempts]     = useState(0);
  const svgRef = useRef(null);

  const showHint = attempts >= 2;
  const labels = VARIANT_LABELS[variant] || { title: 'Circuit', sub: '' };

  const onPointerDown = useCallback((e) => {
    if (solved) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  }, [solved]);

  const onPointerMove = useCallback((e) => {
    if (!isDragging || solved) return;
    const c = toSVGCoords(svgRef.current, e.clientX, e.clientY);
    setWireEnd({ x: c.x, y: c.y });
    let closest = null, minD = Infinity;
    for (const [name, pin] of Object.entries(PINS)) {
      const d = dist(c, pin);
      if (d < PROX_RADIUS && d < minD) { closest = name; minD = d; }
    }
    setNearPin(closest);
  }, [isDragging, solved, PINS]);

  const onPointerUp = useCallback((e) => {
    if (!isDragging || solved) return;
    setIsDragging(false); setNearPin(null);
    const drop = toSVGCoords(svgRef.current, e.clientX, e.clientY);
    let snapped = null;
    for (const [name, pin] of Object.entries(PINS)) {
      if (dist(drop, pin) <= SNAP_RADIUS) { snapped = name; break; }
    }
    if (snapped === CORRECT_PIN) {
      setWireEnd({ ...PINS[CORRECT_PIN] });
      setSolved(true);
      setTimeout(() => onSolve(), 900);
    } else if (snapped) {
      setWrongPin(snapped);
      setAttempts(a => a + 1);
      setTimeout(() => { setWrongPin(null); setWireEnd({ ...WIRE_START }); }, 700);
    } else {
      setWireEnd({ ...WIRE_START });
    }
  }, [isDragging, solved, PINS, CORRECT_PIN, WIRE_START, onSolve]);

  const pinColor = (name) => {
    if (name === 'GND') return '#94a3b8';
    if (name === 'FIVE' || name === '5V') return '#f97316';
    if (name.startsWith('A')) return '#a78bfa';
    return '#22c55e';
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-40 p-4"
      style={{ background: 'rgba(0,0,0,0.93)', touchAction: 'none' }}>
      <motion.div
        initial={{ scale:0.88, y:20, opacity:0 }}
        animate={solved ? {scale:1.02,opacity:1} : {scale:1,y:0,opacity:1}}
        transition={{ type:'spring', stiffness:290, damping:24 }}
        className="w-full flex flex-col"
        style={{
          maxWidth:440, background:'#0d1117',
          border:`2px solid ${solved?'#00ff9f':'rgba(56,189,248,0.5)'}`,
          boxShadow: solved
            ? '0 0 0 1px #000,0 0 0 4px #00ff9f,0 0 40px rgba(0,255,159,0.4)'
            : '0 0 0 1px #000,0 0 0 3px rgba(56,189,248,0.3),0 0 20px rgba(56,189,248,0.12)',
        }}>

        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2"
          style={{ background:'#161b22', borderBottom:'1px solid rgba(56,189,248,0.2)' }}>
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              {['#ef4444','#fbbf24','#22c55e'].map(c=>(
                <div key={c} style={{width:9,height:9,background:c}}/>
              ))}
            </div>
            <span style={{...PIXEL_FONT,fontSize:'5.5px',color:'rgba(56,189,248,0.6)',letterSpacing:'0.12em'}}>
              IEEE_CIRCUIT_LAB — {variant}.ino
            </span>
          </div>
          <button onClick={onClose}
            style={{...PIXEL_FONT,fontSize:'7px',color:'rgba(255,255,255,0.2)',background:'none',border:'none',cursor:'pointer'}}>
            ✕
          </button>
        </div>

        {/* Goal panel */}
        <div className="px-4 py-2.5" style={{background:'#0a0f18',borderBottom:'2px solid #1e293b'}}>
          <p style={{...PIXEL_FONT,fontSize:'6.5px',color:'rgba(255,255,255,0.55)',lineHeight:2.3,marginBottom:4}}>
            {cfg.instruction}
          </p>
          <div className="flex flex-col gap-0.5">
            {cfg.steps.map((step,i)=>(
              <p key={i} style={{...PIXEL_FONT,fontSize:'5px',lineHeight:2,
                color:i===2?'rgba(56,189,248,0.85)':'rgba(255,255,255,0.32)'}}>
                {step}
              </p>
            ))}
          </div>
        </div>

        {/* SVG Circuit */}
        <div style={{background:'#060d14'}}>
          <svg ref={svgRef} viewBox="0 0 380 230"
            style={{width:'100%',display:'block',userSelect:'none',touchAction:'none'}}>
            <defs>
              <pattern id={`dots_${variant}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.06)"/>
              </pattern>
            </defs>

            <rect width="380" height="230" fill="#060d14"/>
            <rect width="380" height="230" fill={`url(#dots_${variant})`}/>

            {/* Variant scene */}
            <VariantScene variant={variant} solved={solved}/>

            {/* Arduino board */}
            <ArduinoBoard solved={solved}/>

            {/* Circuit label */}
            <text x="98" y="40" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="5.5" fontFamily="monospace">{labels.title}</text>
            <text x="98" y="50" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="4" fontFamily="monospace">{labels.sub}</text>

            {/* Pins */}
            {Object.entries(PINS).map(([name, pin]) => {
              const isWrong  = name === wrongPin;
              const isSolved = solved && name === CORRECT_PIN;
              const isNear   = isDragging && name === nearPin;
              const col      = pinColor(name);
              const stroke   = isSolved?'#00ff9f':isWrong?'#ef4444':isNear?'#38bdf8':'#475569';
              return (
                <g key={name}>
                  {isNear && (
                    <circle cx={pin.x} cy={pin.y} r="14" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5">
                      <animate attributeName="r" values="12;17;12" dur="0.6s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  {isSolved && (
                    <circle cx={pin.x} cy={pin.y} r="15" fill="none" stroke="#00ff9f" strokeWidth="2" opacity="0.5">
                      <animate attributeName="r" values="13;18;13" dur="0.8s" repeatCount="indefinite"/>
                    </circle>
                  )}
                  <rect x={pin.x-10} y={pin.y-8} width="20" height="16" rx="2"
                    fill="#0f172a" stroke={stroke} strokeWidth={isSolved||isWrong||isNear?2:1}/>
                  <rect x={pin.x-6} y={pin.y-5} width="12" height="10" rx="1"
                    fill={isSolved?'#064e3b':isNear?'#0c2a3f':'#1c1008'}
                    stroke={isSolved?'#00ff9f':isNear?'#38bdf8':'#b45309'}
                    strokeWidth={isNear?1.5:0.8}/>
                  <rect x={pin.x-2} y={pin.y-2} width="4" height="4" rx="0.5"
                    fill={isSolved?'#00ff9f':'#ca8a04'} opacity={isSolved?1:0.8}/>
                  <text x={pin.x-14} y={pin.y+3.5} textAnchor="end"
                    fill={isSolved?'#00ff9f':isWrong?'#ef4444':isNear?'#38bdf8':'rgba(255,255,255,0.65)'}
                    fontSize="6" fontFamily="monospace" fontWeight="bold">
                    {name === 'FIVE' ? '5V' : name}
                  </text>
                  <circle cx={pin.x-3} cy={pin.y} r="1.8" fill={col} opacity="0.7"/>
                  {isNear && (
                    <g>
                      <rect x={pin.x+12} y={pin.y-12} width="60" height="14" rx="2"
                        fill="#0c1a2e" stroke="#38bdf8" strokeWidth="1"/>
                      <text x={pin.x+42} y={pin.y-2} textAnchor="middle"
                        fill="#38bdf8" fontSize="5.5" fontFamily="monospace">
                        {name===CORRECT_PIN?`✓ ${name} — correct!`:`× ${name}`}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Draggable wire */}
            <line x1={WIRE_START.x} y1={WIRE_START.y} x2={wireEnd.x} y2={wireEnd.y}
              stroke={solved?'#00ff9f':isDragging?'#38bdf8':'#9ca3af'}
              strokeWidth={isDragging?2.8:2}
              strokeDasharray={solved?'0':'5 3'}/>
            <circle cx={wireEnd.x} cy={wireEnd.y}
              r={isDragging?9:7}
              fill={solved?'#00ff9f':isDragging?'#38bdf8':'#475569'}
              stroke={isDragging?'#fff':solved?'#00ff9f':'#94a3b8'}
              strokeWidth="2"
              style={{cursor:solved?'default':'grab'}}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}/>
            <circle cx={wireEnd.x} cy={wireEnd.y} r="3"
              fill={isDragging?'#fff':solved?'#00ff9f':'#1e293b'}
              style={{pointerEvents:'none'}}/>

            {!solved && !isDragging && (
              <g>
                <line x1={wireEnd.x+12} y1={wireEnd.y-4} x2={wireEnd.x+30} y2={wireEnd.y-20}
                  stroke="rgba(56,189,248,0.45)" strokeWidth="1" strokeDasharray="2 2"/>
                <text x={wireEnd.x+32} y={wireEnd.y-22}
                  fill="rgba(56,189,248,0.75)" fontSize="5.5" fontFamily="monospace">DRAG →</text>
              </g>
            )}

            {solved && (
              <g>
                <rect x="44" y="8" width="178" height="22" rx="3"
                  fill="rgba(0,0,0,0.75)" stroke="#00ff9f" strokeWidth="1.2"/>
                <text x="133" y="23" textAnchor="middle"
                  fill="#00ff9f" fontSize="7.5" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                  ✓ CIRCUIT COMPLETE
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Hint strip */}
        <AnimatePresence>
          {(showHint || solved) && (
            <motion.div key="hint"
              initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}}
              className="px-4 py-2.5 overflow-hidden"
              style={{background:solved?'rgba(0,255,159,0.06)':'#1c1a00',
                borderTop:`1px solid ${solved?'rgba(0,255,159,0.3)':'#854d0e'}`}}>
              <p style={{...PIXEL_FONT,fontSize:'6.5px',color:solved?'#00ff9f':'#fde68a',lineHeight:2.2}}>
                {solved ? '✓ CIRCUIT COMPLETE!' : `💡 HINT: ${challenge?.hint || cfg.steps[2]}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ArduinoPuzzle;

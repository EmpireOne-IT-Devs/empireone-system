import{r as i,R as N,j as e,s as $}from"./app-larK_2PJ.js";import{a as W}from"./raffle-thunk-DW5FQtY0.js";import{u as G,a as u,b as P}from"./index-BT8ykzEL.js";import{m as M}from"./proxy-CuYdE99u.js";const F=100,z=10,m=F+2*z,D=370,B=D/2,C=m*1.5,V=N.memo(({item:p,itemIndex:y,listY:a,isSpinning:r,spinPhase:c})=>{const s=y*m+m/2,l=P(a,f=>{const k=s+f,h=Math.abs(k-B),n=1.2-.2*(Math.min(h,C)/C);let t=1;return c>=3?t=1.3:c>=1&&(t=1.15),r?n*t:n}),d=i.useMemo(()=>({width:"90%",height:`${F}px`,margin:`${z}px 5%`,display:"flex",justifyContent:"center",alignItems:"center",color:"#fff",borderRadius:"12px",fontWeight:"700",flexShrink:0,scale:l}),[l]),g=i.useMemo(()=>c>=4?{backgroundColor:"#1E40AF",boxShadow:"0 0 25px rgba(30, 64, 175, 0.8), 0 0 50px rgba(59, 130, 246, 0.4)",border:"2px solid rgba(255, 215, 0, 0.8)",fontSize:"1.5em",textShadow:"0 0 10px rgba(59, 130, 246, 0.8)"}:c>=3?{backgroundColor:"#2563EB",boxShadow:"0 0 20px rgba(37, 99, 235, 0.6)",border:"1px solid rgba(255, 215, 0, 0.6)",fontSize:"1.45em"}:c>=1?{backgroundColor:"#3B82F6",boxShadow:"0 0 15px rgba(59, 130, 246, 0.4)",border:"1px solid rgba(255, 215, 0, 0.3)",fontSize:"1.4em"}:{backgroundColor:"#1F2937",boxShadow:"0 0 3px rgba(255,255,255,0.1)",fontSize:"1.4em"},[c]);return e.jsx(M.div,{style:{...d,...g},children:p.name})}),K=({participants:p,getWinner:y})=>{const a=G(0),[r,c]=i.useState(!1),[s,l]=i.useState(0),[d,g]=i.useState(null),[f,k]=i.useState([]),[h,j]=i.useState(!1),n=i.useRef(null),t=i.useRef(null),v=i.useRef(null),w=i.useRef(null),E=30,Y=()=>s>=4?"btn-phase-4":s>=3?"btn-phase-3":r?"btn-spinning":"btn-idle",H=()=>s>=4?"container-phase-4":s>=3?"container-phase-3":r?"container-spinning":"container-idle";N.useEffect(()=>{const o=Array.from({length:E},()=>p).flat();k(o)},[p]),N.useEffect(()=>{const o=()=>{n.current&&(n.current.stop(),n.current=null)},x=()=>{if(!r&&!h&&f.length>0){const I=a.get();n.current=u(a,I-1e4,{duration:350,repeat:1/0,ease:"linear"})}};if(r||h)o();else if(f.length>0){const I=setTimeout(x,500);return()=>{clearTimeout(I),o()}}return o},[r,h,f]);const L=async()=>{if(r)return;c(!0),l(1),g(null),j(!1),await $.dispatch(W());const o=Array.from({length:E},()=>p).flat();if(k(o),t.current){t.current.currentTime=0,t.current.loop=!0;const S=t.current.play();S!==void 0&&S.catch(O=>{console.log("Audio play failed:",O)})}n.current&&(n.current.stop(),n.current=null),a.set(0);const A=12*p.length,_=o.length-p.length,T=Math.floor(Math.random()*(_-A))+A,b=-(T*m-(B-m/2));l(1),await u(a,b*.4,{duration:3,ease:"linear"}),l(2),await u(a,b*.75,{duration:3.5,ease:[.2,0,.8,1]}),l(3),t.current&&(t.current.playbackRate=.7),await u(a,b*.95,{duration:4.5,ease:[.4,0,.6,1]}),l(4),t.current&&(t.current.playbackRate=.4),await u(a,b,{duration:7,ease:[.08,.82,.17,1]}),l(5),t.current&&t.current.pause(),await u(a,b+m*.15,{duration:.4,ease:"easeOut"}),await u(a,b,{duration:1.2,ease:[.25,.46,.45,.94]}),w.current&&(w.current.volume=1,w.current.currentTime=0,w.current.play().catch(S=>{console.log("Tada audio play failed:",S)})),c(!1),l(0),j(!0);const R=o[T];y&&y(R),t.current&&(t.current.playbackRate=1),n.current&&(n.current.stop(),n.current=null),setTimeout(()=>{v.current&&(v.current.currentTime=0,v.current.play()),g(R)},3e3)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }

                    @keyframes scaleIn {
                        from { 
                            transform: scale(0.5);
                            opacity: 0;
                        }
                        to { 
                            transform: scale(1);
                            opacity: 1;
                        }
                    }

                    @keyframes flashBorder {
                        0%, 100% { 
                            box-shadow: 0 0 20px 5px rgba(255, 215, 0, 0.8);
                        }
                        50% { 
                            box-shadow: 0 0 40px 15px rgba(255, 215, 0, 1);
                        }
                    }

                    @keyframes gradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    @keyframes confetti {
                        0% {
                            transform: translateY(0) rotate(0deg);
                            opacity: 1;
                        }
                        100% {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }

                    @keyframes pulse {
                        0% { transform: scale(1); }
                        50% { transform: scale(1.05); }
                        100% { transform: scale(1); }
                    }

                    @keyframes glow {
                        0%, 100% { 
                            box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.8);
                        }
                        50% { 
                            box-shadow: 0 0 40px 15px rgba(59, 130, 246, 1), 0 0 60px 25px rgba(147, 197, 253, 0.5);
                        }
                    }

                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        25% { transform: translateX(-5px); }
                        75% { transform: translateX(5px); }
                    }

                    @keyframes dramaticPulse {
                        0%, 100% { 
                            transform: scale(1);
                            box-shadow: 0 0 20px rgba(30, 64, 175, 0.8);
                        }
                        50% { 
                            transform: scale(1.08);
                            box-shadow: 0 0 60px rgba(30, 64, 175, 1), 0 0 100px rgba(59, 130, 246, 0.6);
                        }
                    }

                    @keyframes slowMotionGlow {
                        0%, 100% { 
                            filter: brightness(1) contrast(1);
                        }
                        50% { 
                            filter: brightness(1.3) contrast(1.2);
                        }
                    }

                    @keyframes finalMomentShake {
                        0%, 100% { transform: translateY(0) scale(1); }
                        25% { transform: translateY(-2px) scale(1.02); }
                        50% { transform: translateY(0) scale(1.05); }
                        75% { transform: translateY(-1px) scale(1.02); }
                    }

                    .winner-modal-fade {
                        animation: fadeIn 0.3s ease-out;
                    }

                    .winner-modal-scale {
                        animation: scaleIn 0.5s ease-out;
                    }

                    .winner-flash-border {
                        animation: flashBorder 1s infinite;
                    }

                    .winner-gradient-text {
                        background-size: 200% 200%;
                        animation: gradient 3s ease infinite;
                    }

                    .winner-confetti {
                        animation: confetti linear forwards;
                    }

                    .spinning-glow {
                        animation: glow 1s infinite;
                    }

                    .spinning-pulse {
                        animation: pulse 2s infinite;
                    }

                    /* Button styles for better performance */
                    .btn-base {
                        padding: 20px 40px;
                        font-weight: bold;
                        border-radius: 15px;
                        margin-top: 20px;
                        transition: all 0.15s ease;
                    }

                    .btn-idle {
                        font-size: 1.5em;
                        border: 3px solid #FFD700;
                        background-color: #1E3A8A;
                        color: #FFD700;
                        cursor: pointer;
                        box-shadow: 0 0 15px rgba(255,215,0,0.9);
                        transform: scale(1);
                    }

                    .btn-spinning {
                        font-size: 1.8em;
                        border: 4px solid #3b82f6;
                        background-color: #3B82F6;
                        color: #e0f2fe;
                        cursor: not-allowed;
                        box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 50px rgba(59, 130, 246, 0.6);
                        text-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
                        transform: scale(1.1);
                    }

                    .btn-phase-3 {
                        font-size: 2em;
                        border: 4px solid #2563EB;
                        background-color: #2563EB;
                        color: #e0f2fe;
                        cursor: not-allowed;
                        box-shadow: 0 0 50px rgba(37, 99, 235, 0.8), 0 0 80px rgba(59, 130, 246, 0.6);
                        text-shadow: 0 0 12px rgba(37, 99, 235, 0.8);
                        transform: scale(1.15);
                    }

                    .btn-phase-4 {
                        font-size: 2.2em;
                        border: 5px solid #1E40AF;
                        background-color: #1E40AF;
                        color: #e0f2fe;
                        cursor: not-allowed;
                        box-shadow: 0 0 60px rgba(30, 64, 175, 1), 0 0 100px rgba(59, 130, 246, 0.8);
                        text-shadow: 0 0 15px rgba(30, 64, 175, 0.8);
                        transform: scale(1.2);
                        animation: dramaticPulse 0.8s infinite;
                    }

                    /* Container styles for better performance */
                    .container-base {
                        width: 320px;
                        height: ${D}px;
                        overflow: hidden;
                        margin: 50px auto;
                        border-radius: 24px;
                        background-color: #000;
                        position: relative;
                        transition: all 0.15s ease;
                    }

                    .container-idle {
                        border: 4px solid #FFD700;
                        box-shadow: 0 0 20px rgba(255,215,0,0.6);
                        transform: scale(1);
                    }

                    .container-spinning {
                        border: 5px solid #3b82f6;
                        box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
                        transform: scale(1);
                    }

                    .container-phase-3 {
                        border: 5px solid #2563EB;
                        box-shadow: 0 0 40px rgba(37, 99, 235, 0.8), 0 0 80px rgba(59, 130, 246, 0.4);
                        transform: scale(1.02);
                    }

                    .container-phase-4 {
                        border: 6px solid #1E40AF;
                        box-shadow: 0 0 50px rgba(30, 64, 175, 1), 0 0 100px rgba(59, 130, 246, 0.5);
                        transform: scale(1.05);
                    }
                `}),e.jsxs("div",{style:{textAlign:"center",fontFamily:"sans-serif",backgroundColor:s>=4?"#0A0A0A":s>=3?"#0D0D0D":r?"#0F0F0F":"#111",minHeight:"100vh",paddingTop:"50px",transition:"background-color 0.5s ease",animation:s>=4?"finalMomentShake 0.3s infinite":"none",filter:s>=3?"brightness(1.1) contrast(1.1)":"none"},children:[r&&e.jsx("div",{className:"fixed inset-0 z-10 pointer-events-none",children:e.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(circle at center, rgba(255,215,0,0.05) 30%, rgba(0,0,0,0.3) 80%)"}})}),e.jsx("audio",{ref:t,src:"/mp3/1209.WAV",loop:!0,preload:"auto",onEnded:()=>{r&&t.current&&(t.current.currentTime=0,t.current.play())}}),e.jsx("audio",{ref:v,src:"/mp3/win.wav",preload:"auto"}),e.jsx("audio",{ref:w,src:"/mp3/tada.wav",preload:"auto",volume:"9.0"}),e.jsxs("div",{className:`container-base ${H()} ${r?"spinning-glow":""}`,children:[e.jsx(M.div,{style:{display:"flex",flexDirection:"column",minHeight:m*f.length+"px",y:a},children:f.map((o,x)=>e.jsx(V,{item:o,itemIndex:x,listY:a,isSpinning:r,spinPhase:s},x))}),e.jsxs("div",{style:{position:"absolute",top:"50%",left:0,transform:"translateY(-50%)",display:"flex",alignItems:"center",zIndex:10,width:"10%"},children:[e.jsx("div",{style:{height:"10px",backgroundColor:"red",flex:1}}),e.jsx("div",{style:{width:0,height:0,borderTop:"10px solid transparent",borderBottom:"10px solid transparent",borderLeft:"16px solid red"}})]}),e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundImage:"linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)",pointerEvents:"none",zIndex:5}})]}),e.jsx("button",{onClick:L,disabled:r,className:`btn-base ${Y()} ${r?"spinning-pulse":""}`,children:r?"🎰 SPINNING... 🎰":"🎯 SPIN THE SLOT MACHINE! 🎯"}),d&&e.jsxs("div",{className:"fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-90",children:[e.jsx("div",{className:"absolute z-50 inset-0 overflow-hidden pointer-events-none",children:[...Array(20)].map((o,x)=>e.jsx("div",{className:"absolute",style:{left:`${Math.random()*100}%`,top:"-10%",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:["#ff6b6b","#4ecdc4","#45b7d1","#f7b731","#5f27cd"][Math.floor(Math.random()*5)],animation:`confetti ${2+Math.random()*1}s linear forwards`,animationDelay:`${Math.random()*1}s`}},x))}),e.jsxs("div",{className:"relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 rounded-3xl shadow-2xl max-w-4xl w-full mx-8 overflow-hidden animate-scaleIn",children:[e.jsx("button",{onClick:()=>{g(null),j(!1),setTimeout(()=>{if(!r&&f.length>0){const o=a.get();n.current=u(a,o-1e4,{duration:350,repeat:1/0,ease:"linear"})}},100)},className:"absolute top-6 right-6 bg-white hover:bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-10",children:e.jsx("svg",{className:"w-6 h-6 text-gray-700",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),e.jsxs("div",{className:"relative p-12 text-center space-y-8",children:[e.jsx("div",{className:"text-9xl animate-bounce",children:"🏆"}),e.jsx("h2",{className:"text-7xl font-black text-white drop-shadow-2xl animate-pulse",children:"🎉 WINNER! 🎉"}),e.jsx("p",{className:"text-3xl font-bold text-yellow-900",children:"Congratulations!"}),e.jsx("div",{className:"bg-white rounded-2xl p-8 shadow-2xl animate-pulse",children:e.jsx("p",{className:"text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600",children:d.name})}),d.email&&e.jsxs("p",{className:"text-2xl text-gray-700 font-semibold",children:["📧 ",d.email]}),d.contact&&e.jsxs("p",{className:"text-2xl text-gray-700 font-semibold",children:["📱 ",d.contact]})]})]})]})]})]})};export{K as default};

import{r as a,s as P,R as T,j as e}from"./app-BA2ImsWW.js";import{d as U,a as Z}from"./raffle-thunk-BavMAB3d.js";import J from"./select-prize-section-DOztUXjk.js";import{u as K,a as m,b as Q}from"./index-D-AGYoKq.js";import{m as Y}from"./proxy--yarw93A.js";const H=100,D=10,g=H+2*D,A=370,O=A/2,B=g*1.5,ee=T.memo(({item:p,itemIndex:v,listY:s,isSpinning:r,spinPhase:f})=>{const o=v*g+g/2,c=Q(s,u=>{const I=o+u,y=Math.abs(I-O),i=1.2-.2*(Math.min(y,B)/B);let x=1;return f>=3?x=1.3:f>=1&&(x=1.15),r?i*x:i}),d=a.useMemo(()=>({width:"90%",height:`${H}px`,margin:`${D}px 5%`,display:"flex",justifyContent:"center",alignItems:"center",color:"#fff",borderRadius:"12px",fontWeight:"700",flexShrink:0,scale:c}),[c]),w=a.useMemo(()=>f>=4?{backgroundColor:"#1E40AF",boxShadow:"0 0 25px rgba(30, 64, 175, 0.8), 0 0 50px rgba(59, 130, 246, 0.4)",border:"2px solid rgba(255, 215, 0, 0.8)",fontSize:"1.5em",textShadow:"0 0 10px rgba(59, 130, 246, 0.8)"}:f>=3?{backgroundColor:"#2563EB",boxShadow:"0 0 20px rgba(37, 99, 235, 0.6)",border:"1px solid rgba(255, 215, 0, 0.6)",fontSize:"1.45em"}:f>=1?{backgroundColor:"#3B82F6",boxShadow:"0 0 15px rgba(59, 130, 246, 0.4)",border:"1px solid rgba(255, 215, 0, 0.3)",fontSize:"1.4em"}:{backgroundColor:"#1F2937",boxShadow:"0 0 3px rgba(255,255,255,0.1)",fontSize:"1.4em"},[f]);return e.jsx(Y.div,{style:{...d,...w},children:p.name})}),oe=({participants:p,getWinner:v})=>{const s=K(0),[r,f]=a.useState(!1),[o,c]=a.useState(0),[d,w]=a.useState(null),[u,I]=a.useState([]),[y,S]=a.useState(!1),i=a.useRef(null),[x,j]=a.useState(!1),C=a.useRef(null),n=a.useRef(null),E=a.useRef(null),k=a.useRef(null),[l,z]=a.useState(null);a.useEffect(()=>{d&&P.dispatch(U())},[d]);const M=30;a.useEffect(()=>{const t=()=>{j(!!document.fullscreenElement)};return document.addEventListener("fullscreenchange",t),()=>{document.removeEventListener("fullscreenchange",t)}},[]);const W=()=>{const t=C.current;document.fullscreenElement?document.exitFullscreen().then(()=>j(!1)).catch(console.error):t.requestFullscreen?t.requestFullscreen().then(()=>j(!0)).catch(console.error):t.webkitRequestFullscreen?(t.webkitRequestFullscreen(),j(!0)):t.msRequestFullscreen&&(t.msRequestFullscreen(),j(!0))},G=()=>o>=4?"btn-phase-4":o>=3?"btn-phase-3":r?"btn-spinning":"btn-idle",_=()=>o>=4?"container-phase-4":o>=3?"container-phase-3":r?"container-spinning":"container-idle";T.useEffect(()=>{const t=Array.from({length:M},()=>p).flat();I(t)},[p]),T.useEffect(()=>{const t=()=>{i.current&&(i.current.stop(),i.current=null)},b=()=>{if(!r&&!y&&u.length>0){const N=s.get();i.current=m(s,N-1e4,{duration:350,repeat:1/0,ease:"linear"})}};if(r||y)t();else if(u.length>0){const N=setTimeout(b,500);return()=>{clearTimeout(N),t()}}return t},[r,y,u]);const q=async()=>{if(!l&&l!==0){alert("Please select a prize first!");return}if(r)return;f(!0),c(1),w(null),S(!1),P.dispatch(Z());const t=Array.from({length:M},()=>p).flat();if(I(t),n.current){n.current.currentTime=0,n.current.loop=!0;const R=n.current.play();R!==void 0&&R.catch(X=>{console.log("Audio play failed:",X)})}i.current&&(i.current.stop(),i.current=null),s.set(0);const $=12*p.length,V=t.length-p.length,L=Math.floor(Math.random()*(V-$))+$,h=-(L*g-(O-g/2));c(1),await m(s,h*.4,{duration:3,ease:"linear"}),c(2),await m(s,h*.75,{duration:3.5,ease:[.2,0,.8,1]}),c(3),n.current&&(n.current.playbackRate=.7),await m(s,h*.95,{duration:4.5,ease:[.4,0,.6,1]}),c(4),n.current&&(n.current.playbackRate=.4),await m(s,h,{duration:7,ease:[.08,.82,.17,1]}),c(5),n.current&&n.current.pause(),await m(s,h+g*.15,{duration:.4,ease:"easeOut"}),await m(s,h,{duration:1.2,ease:[.25,.46,.45,.94]}),k.current&&(k.current.volume=1,k.current.currentTime=0,k.current.play().catch(R=>{console.log("Tada audio play failed:",R)})),f(!1),c(0),S(!0);const F=t[L];w(F),v&&v({...F,participant_id:F.id,prize_id:l.id}),n.current&&(n.current.playbackRate=1),i.current&&(i.current.stop(),i.current=null),setTimeout(()=>{E.current&&(E.current.currentTime=0,E.current.play())},1e3)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
                        height: ${A}px;
                        overflow: hidden;
                        margin: 50px auto;
                        border-radius: 24px;
                        color: #ffffffff;
                        background-color: #000;
                        position: relative;
                        transition: all 0.15s ease;
                    }

                    .container-idle {
                        border: 4px solid #FFD700;
                        box-shadow: 0 0 20px rgba(255,215,0,0.6);
                        transform: scale(1);
                    } base

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
                `}),e.jsx("button",{onClick:W,className:"btn-base border border-gray-400 bg-gray-800 text-white hover:bg-gray-700",children:x?"🡽 Exit Fullscreen":"🡾 Fullscreen"}),e.jsxs("div",{ref:C,className:`container-base ${_()} ${r?"spinning-glow":""}`,style:{width:"100%",height:`${A}px`,textAlign:"center",fontFamily:"sans-serif",background:o>=4?"radial-gradient(circle at center, #4714ffff 0%, #3d1bd6ff 30%, #2b0bb8ff 60%, #000000 100%)":o>=3?"radial-gradient(circle at center, #2a03d8ff 0%, #4137d4ff 40%, #1a1a1a 100%)":r?"linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)":"linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",minHeight:"100vh",paddingTop:"50px",transition:"background 0.5s ease",animation:o>=4?"finalMomentShake 0.3s infinite, goldShine 2s ease-in-out infinite":o>=3?"goldShine 2s ease-in-out infinite":"none",filter:o>=3?"brightness(1.2) contrast(1.15) saturate(1.3)":"none",boxShadow:o>=4?"inset 0 0 100px rgba(86, 74, 255, 0.4)":o>=3?"inset 0 0 60px rgba(72, 7, 192, 0.2)":"none"},children:[r&&e.jsx("div",{className:"pointer-events-none fixed inset-0 z-10",children:e.jsx("div",{className:"absolute inset-0",style:{background:"radial-gradient(circle at center, rgba(255,215,0,0.05) 30%, rgba(0,0,0,0.3) 80%)"}})}),e.jsx("audio",{ref:n,src:"/mp3/1209.WAV",loop:!0,preload:"auto",onEnded:()=>{r&&n.current&&(n.current.currentTime=0,n.current.play())}}),e.jsx("audio",{ref:E,src:"/mp3/win.wav",preload:"auto"}),e.jsx("audio",{ref:k,src:"/mp3/tada.wav",preload:"auto",volume:"9.0"}),e.jsxs("div",{className:"flex flex-row-reverse items-center justify-center gap-3",children:[e.jsx("div",{className:x?"w-1/2":"",children:x&&e.jsx(J,{selectedPrize:l,setSelectedPrize:z})}),e.jsxs("div",{className:`${x?"w-1/2":""} container-base ${_()} ${r?"spinning-glow":""}`,children:[e.jsx(Y.div,{style:{display:"flex",flexDirection:"column",minHeight:g*u.length+"px",y:s},children:u.map((t,b)=>e.jsx(ee,{item:t,itemIndex:b,listY:s,isSpinning:r,spinPhase:o},b))}),e.jsxs("div",{style:{position:"absolute",top:"50%",left:0,transform:"translateY(-50%)",display:"flex",alignItems:"center",zIndex:10,width:"10%"},children:[e.jsx("div",{style:{height:"10px",backgroundColor:"red",flex:1}}),e.jsx("div",{style:{width:0,height:0,borderTop:"10px solid transparent",borderBottom:"10px solid transparent",borderLeft:"16px solid red"}})]}),e.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundImage:"linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 80%, rgba(0,0,0,1) 100%)",pointerEvents:"none",zIndex:5}})]})]}),e.jsx("button",{onClick:q,disabled:r||!l&&l!==0,className:`btn-base ${G()} ${r?"spinning-pulse":""} ${!l&&l!==0?"cursor-not-allowed opacity-50":""}`,children:!l&&l!==0?"⚠️ SELECT A PRIZE FIRST! ⚠️":r?"🎰 SPINNING... 🎰":"🎯 SPIN THE SLOT MACHINE! 🎯"}),d&&e.jsxs("div",{className:"bg-opacity-90 fixed inset-0 z-30 flex items-center justify-center bg-black",children:[e.jsx("div",{className:"pointer-events-none absolute inset-0 z-50 overflow-hidden",children:[...Array(20)].map((t,b)=>e.jsx("div",{className:"absolute",style:{left:`${Math.random()*100}%`,top:"-10%",width:"8px",height:"8px",borderRadius:"50%",backgroundColor:["#ff6b6b","#4ecdc4","#45b7d1","#f7b731","#5f27cd"][Math.floor(Math.random()*5)],animation:`confetti ${2+Math.random()*1}s linear forwards`,animationDelay:`${Math.random()*1}s`}},b))}),e.jsxs("div",{className:"animate-scaleIn relative w-full max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 shadow-2xl",children:[e.jsx("button",{onClick:()=>{w(null),S(!1),z(null),setTimeout(()=>{if(!r&&u.length>0){const t=s.get();i.current=m(s,t-1e4,{duration:350,repeat:1/0,ease:"linear"})}},100)},className:"absolute top-6 right-6 z-10 flex h-12 w-12 transform items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-gray-100",children:e.jsx("svg",{className:"h-6 w-6 text-gray-700",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),e.jsxs("div",{className:"relative space-y-8 p-12 text-center",children:[e.jsx("div",{className:"animate-bounce text-9xl",children:"🏆"}),e.jsx("h2",{className:"animate-pulse text-7xl font-black text-white drop-shadow-2xl",children:"🎉 WINNER! 🎉"}),e.jsx("p",{className:"text-3xl font-bold text-yellow-900",children:"Congratulations!"}),e.jsx("div",{className:"animate-pulse rounded-2xl bg-white p-8 shadow-2xl",children:e.jsx("p",{className:"bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600 bg-clip-text text-6xl font-extrabold text-transparent",children:d.name})}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-3xl font-bold text-yellow-900",children:"Prize Won"}),e.jsxs("div",{className:"flex items-center justify-center gap-6 rounded-2xl bg-white p-6 shadow-2xl",children:[e.jsx("img",{src:l.url,alt:l.name,className:"h-32 w-auto animate-pulse object-contain",onError:t=>{t.target.src="/images/placeholder.jpg"}}),e.jsx("div",{className:"text-left",children:e.jsx("p",{className:"bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-600 bg-clip-text text-4xl font-extrabold text-transparent",children:l.name})})]})]}),d.email&&e.jsxs("p",{className:"text-2xl font-semibold text-gray-700",children:["📧 ",d.email]}),d.contact&&e.jsxs("p",{className:"text-2xl font-semibold text-gray-700",children:["📱 ",d.contact]})]})]})]})]})]})};export{oe as default};

import{r as d,j as e}from"./app-VfSeH-kV.js";import{S as M}from"./sweetalert2.esm.all-O8mKH-HY.js";import{z as S}from"./index-C9rFZuM4.js";const F=({participants:A,getWinner:g})=>{const[l,p]=d.useState(!1),[C,z]=d.useState(0),[a,x]=d.useState(null),[W,f]=d.useState(!1),n=A.filter(t=>!t.is_winner),w=["#d62828","#2872d6","#1f9a41","#e5a823"],$=n.map((t,s)=>w[s%w.length]),B=()=>{const t=n.length;return t<=8?26:t<=15?20:t<=25?14:t<=40?11:t<=60?9:7},I=()=>{const t=n.length;return t<=8?160:t<=15?170:t<=25?180:t<=40?190:t<=60?200:210},R=B(),b=I(),P=async()=>{if(l||n.length===0)return;if(n.length===0){M.fire({title:"No Eligible Participants",text:"All participants have already won!",icon:"warning",confirmButtonColor:"#3b82f6"});return}if(!(await M.fire({title:"🎰 Ready to Spin?",text:`${n.length} participants are eligible for the draw`,icon:"question",showCancelButton:!0,confirmButtonColor:"#3b82f6",cancelButtonColor:"#6b7280",confirmButtonText:"Yes, Spin Now!",cancelButtonText:"Cancel"})).isConfirmed)return;p(!0),x(null),f(!1),S.loading("Spinning the wheel...",{id:"spinning"});const s=Math.floor(Math.random()*n.length),o=n[s],r=360/n.length,c=360-(s*r+r/2)+90,m=(Math.floor(Math.random()*3)+5)*360+c;z(u=>u+m),setTimeout(()=>{p(!1),S.dismiss("spinning"),x(o),setTimeout(()=>{f(!0)},500),g&&g(o)},5e3)},_=()=>{f(!1),x(null)},i=360/(n.length||1);return n.length===0?e.jsxs("div",{className:"flex flex-col items-center justify-center space-y-6 py-20",children:[e.jsx("div",{className:"text-8xl",children:"🎉"}),e.jsx("h2",{className:"text-3xl font-bold text-gray-700",children:"All Prizes Awarded!"}),e.jsx("p",{className:"text-xl text-gray-500",children:"All participants have already won."})]}):e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
                `}),e.jsxs("div",{className:"flex flex-col items-center space-y-6",children:[e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:"absolute left-1/2 -translate-x-1/2 -top-6 z-20"}),e.jsx("div",{className:"relative w-[600px] h-[600px]",children:e.jsxs("svg",{width:"600",height:"600",viewBox:"0 0 600 600",className:"drop-shadow-xl",style:{transform:`rotate(${C}deg)`,transition:l?"transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)":"none"},children:[e.jsx("defs",{children:e.jsx("filter",{id:"textShadow",children:e.jsx("feDropShadow",{dx:"0",dy:"0",stdDeviation:"2",floodColor:"#000000",floodOpacity:"0.8"})})}),e.jsx("circle",{cx:"300",cy:"300",r:"298",fill:"white",stroke:"#555",strokeWidth:"6"}),n.map((t,s)=>{const o=(s*i-90)*(Math.PI/180),r=((s+1)*i-90)*(Math.PI/180),h=300+290*Math.cos(o),c=300+290*Math.sin(o),y=300+290*Math.cos(r),m=300+290*Math.sin(r),u=i>180?1:0,E=`M 300 300 L ${h} ${c} A 290 290 0 ${u} 1 ${y} ${m} Z`,j=(s+.5)*i-90,v=j*Math.PI/180,N=300+b*Math.cos(v),k=300+b*Math.sin(v),T=j+360;return t.attendee_name.split(" ")[0],e.jsxs("g",{children:[e.jsx("path",{d:E,fill:$[s],stroke:"#fff",strokeWidth:"0"}),e.jsx("line",{x1:"300",y1:"300",x2:h,y2:c,stroke:"white",strokeWidth:"0"}),e.jsx("text",{x:N,y:k,fill:"#ffffff",fontSize:R,fontWeight:"bold",textAnchor:"middle",dominantBaseline:"middle",filter:"url(#textShadow)",style:{fontSize:n.length<=10?24:n.length<=50?14:n.length<=150?8:4},transform:`rotate(${T}, ${N}, ${k})`,children:t.attendee_name})]},t.id)}),e.jsx("circle",{cx:"300",cy:"300",r:"60",fill:"#ffffff",stroke:"#444",strokeWidth:"5"}),e.jsx("text",{x:"300",y:"315",fontSize:"40",fontWeight:"bold",textAnchor:"middle",fill:"#444",children:"🎯"})]})})]}),e.jsx("button",{onClick:P,disabled:l||n.length===0,className:"px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-xl shadow-lg disabled:bg-gray-400 transition-all transform hover:scale-105 disabled:transform-none flex items-center space-x-2",children:l?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin h-6 w-6",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),e.jsx("span",{children:"SPINNING..."})]}):e.jsx("span",{children:"SPIN THE WHEEL! 🎰"})})]}),W&&a&&e.jsxs("div",{className:"fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-90 winner-modal-fade",children:[e.jsx("div",{className:"absolute z-50 inset-0 overflow-hidden pointer-events-none",children:[...Array(50)].map((t,s)=>e.jsx("div",{className:"absolute winner-confetti",style:{left:`${Math.random()*100}%`,top:"-10%",animationDelay:`${Math.random()*2}s`,animationDuration:`${3+Math.random()*2}s`},children:e.jsx("div",{className:"w-3 h-3 rounded-full",style:{backgroundColor:["#ff6b6b","#4ecdc4","#45b7d1","#f7b731","#5f27cd"][Math.floor(Math.random()*5)]}})},s))}),e.jsxs("div",{className:"relative bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 rounded-3xl shadow-2xl max-w-4xl w-full mx-8 overflow-hidden winner-modal-scale",children:[e.jsx("div",{className:"absolute inset-0 border-8 border-yellow-500 rounded-3xl animate-pulse"}),e.jsx("button",{onClick:_,className:"absolute top-6 right-6 bg-white hover:bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all transform hover:scale-110 z-10",children:e.jsx("svg",{className:"w-6 h-6 text-gray-700",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})})}),e.jsxs("div",{className:"relative p-12 text-center space-y-8",children:[e.jsx("div",{className:"text-9xl animate-bounce",children:"🏆"}),e.jsxs("div",{className:"space-y-2",children:[e.jsx("h2",{className:"text-7xl font-black text-white drop-shadow-2xl animate-pulse",children:"🎉 WINNER! 🎉"}),e.jsx("p",{className:"text-3xl font-bold text-yellow-900",children:"Congratulations!"})]}),e.jsx("div",{className:"bg-white rounded-2xl p-8 shadow-2xl winner-flash-border",children:e.jsx("p",{className:"text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-red-600 to-yellow-600 winner-gradient-text",children:a.attendee_name})}),e.jsxs("div",{className:"bg-white bg-opacity-90 rounded-xl p-6 space-y-3",children:[a.email&&e.jsxs("p",{className:"text-2xl text-gray-700 font-semibold",children:["📧 ",a.email]}),a.contact_number&&e.jsxs("p",{className:"text-2xl text-gray-700 font-semibold",children:["📱 ",a.contact_number]})]})]})]})]})]})};export{F as default};

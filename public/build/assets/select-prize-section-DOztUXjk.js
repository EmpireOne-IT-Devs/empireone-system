import{u as i,j as e}from"./app-BA2ImsWW.js";function d({selectedPrize:t,setSelectedPrize:n}){const{prizes:o}=i(s=>s.raffles);return e.jsxs("div",{className:"space-y-4 p-4",children:[e.jsx("style",{children:`
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
                    }
                }
                
                @keyframes pulse-blue {
                    0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(236, 232, 0, 0.7);
                    }
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 8px rgba(59, 130, 246, 0);
                    }
                }
                
                .pulse-grand {
                    animation: pulse 2s infinite;
                }
                
                .pulse-regular {
                    animation: pulse-blue 3s infinite;
                }
            `}),e.jsx("div",{className:"flex w-full flex-row flex-wrap items-center justify-center gap-4",children:o.map((s,c)=>{const a=s?.winner,l=t?.id===s?.id;return console.log("prize",s?.winner),e.jsxs("button",{onClick:()=>!a&&n(s),disabled:a,className:`pulse-regular relative flex h-24 w-40 flex-col items-center justify-center rounded-md border-2 p-1.5 transition-all ${a?"cursor-not-allowed border-gray-400 bg-gray-200 opacity-60":l?"scale-105 border-blue-500 bg-blue-50 text-blue-700":"border-gray-300 hover:border-gray-400"}`,children:[e.jsx("div",{className:"absolute top-0.5 right-0 left-0",children:e.jsx("span",{className:`text-[10px] font-semibold tracking-wider uppercase ${a?"text-gray-400":"text-yellow-500"}`,children:e.jsx("strong",{children:a?"✓ Won":"Prize"})})}),e.jsx("div",{className:"mt-3 flex h-full flex-col items-center justify-center gap-1",children:a?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:s.url,alt:s.name,className:"max-h-10 max-w-full object-contain opacity-50",onError:r=>{r.target.src="/images/placeholder.jpg"}}),e.jsxs("span",{className:"text-center text-[8px] font-bold text-green-600",children:["🏆 ",a.name]})]}):l?e.jsx("img",{src:s.url,alt:s.name,className:"max-h-full max-w-full object-contain",onError:r=>{r.target.src="/images/placeholder.jpg"}}):e.jsx("span",{className:"px-1 text-center text-sm leading-tight font-semibold",children:e.jsx("strong",{children:s.name})})})]},c)})})]})}export{d as default};

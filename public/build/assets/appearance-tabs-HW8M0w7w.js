import{r as c,j as r}from"./app-CvaAx_e9.js";import{c as l}from"./utils-DL16pZsE.js";import{c as s}from"./createLucideIcon-BYvixOmi.js";import"./bundle-mjs-BJeS7sC5.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],h=s("Monitor",u);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]],y=s("Moon",k);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],g=s("Sun",x),f=()=>typeof window>"u"?!1:window.matchMedia("(prefers-color-scheme: dark)").matches,b=(e,a,n=365)=>{if(typeof document>"u")return;const t=n*24*60*60;document.cookie=`${e}=${a};path=/;max-age=${t};SameSite=Lax`},p=e=>{const a=e==="dark"||e==="system"&&f();document.documentElement.classList.toggle("dark",a),document.documentElement.style.colorScheme=a?"dark":"light"},w=()=>typeof window>"u"?null:window.matchMedia("(prefers-color-scheme: dark)"),v=()=>{const e=localStorage.getItem("appearance");p(e||"system")};function M(){const[e,a]=c.useState("system"),n=c.useCallback(t=>{a(t),localStorage.setItem("appearance",t),b("appearance",t),p(t)},[]);return c.useEffect(()=>{const t=localStorage.getItem("appearance");return n(t||"system"),()=>w()?.removeEventListener("change",v)},[n]),{appearance:e,updateAppearance:n}}function E({className:e="",...a}){const{appearance:n,updateAppearance:t}=M(),i=[{value:"light",icon:g,label:"Light"},{value:"dark",icon:y,label:"Dark"},{value:"system",icon:h,label:"System"}];return r.jsx("div",{className:l("inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800",e),...a,children:i.map(({value:o,icon:d,label:m})=>r.jsxs("button",{onClick:()=>t(o),className:l("flex items-center rounded-md px-3.5 py-1.5 transition-colors",n===o?"bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100":"text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60"),children:[r.jsx(d,{className:"-ml-1 h-4 w-4"}),r.jsx("span",{className:"ml-1.5 text-sm",children:m})]},o))})}export{E as default};

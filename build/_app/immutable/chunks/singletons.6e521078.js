import{L as d,s as E}from"./index.a6e83f8f.js";const u=[];function p(e,t=d){let n;const o=new Set;function r(s){if(E(e,s)&&(e=s,n)){const l=!u.length;for(const i of o)i[1](),u.push(i,e);if(l){for(let i=0;i<u.length;i+=2)u[i][0](u[i+1]);u.length=0}}}function c(s){r(s(e))}function a(s,l=d){const i=[s,l];return o.add(i),o.size===1&&(n=t(r)||d),s(e),()=>{o.delete(i),o.size===0&&n&&(n(),n=null)}}return{set:r,update:c,subscribe:a}}var g;const w=((g=globalThis.__sveltekit_1dboivk)==null?void 0:g.base)??"/env";var k;const A=((k=globalThis.__sveltekit_1dboivk)==null?void 0:k.assets)??w,R="1690030960241",I="sveltekit:snapshot",x="sveltekit:scroll",L="sveltekit:index",_={tap:1,hover:2,viewport:3,eager:4,off:-1};function O(e){let t=e.baseURI;if(!t){const n=e.getElementsByTagName("base");t=n.length?n[0].href:e.URL}return t}function U(){return{x:pageXOffset,y:pageYOffset}}function f(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const b={..._,"":_.hover};function v(e){let t=e.assignedSlot??e.parentNode;return(t==null?void 0:t.nodeType)===11&&(t=t.host),t}function N(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=v(e)}}function P(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const o=e instanceof SVGAElement?e.target.baseVal:e.target,r=!n||!!o||T(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),c=(n==null?void 0:n.origin)===location.origin&&e.hasAttribute("download");return{url:n,external:r,target:o,download:c}}function V(e){let t=null,n=null,o=null,r=null,c=null,a=null,s=e;for(;s&&s!==document.documentElement;)o===null&&(o=f(s,"preload-code")),r===null&&(r=f(s,"preload-data")),t===null&&(t=f(s,"keepfocus")),n===null&&(n=f(s,"noscroll")),c===null&&(c=f(s,"reload")),a===null&&(a=f(s,"replacestate")),s=v(s);function l(i){switch(i){case"":case"true":return!0;case"off":case"false":return!1;default:return null}}return{preload_code:b[o??"off"],preload_data:b[r??"off"],keep_focus:l(t),noscroll:l(n),reload:l(c),replace_state:l(a)}}function h(e){const t=p(e);let n=!0;function o(){n=!0,t.update(a=>a)}function r(a){n=!1,t.set(a)}function c(a){let s;return t.subscribe(l=>{(s===void 0||n&&l!==s)&&a(s=l)})}return{notify:o,set:r,subscribe:c}}function S(){const{set:e,subscribe:t}=p(!1);let n;async function o(){clearTimeout(n);try{const r=await fetch(`${A}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const a=(await r.json()).version!==R;return a&&(e(!0),clearTimeout(n)),a}catch{return!1}}return{subscribe:t,check:o}}function T(e,t){return e.origin!==location.origin||!e.pathname.startsWith(t)}let m;function Y(e){m=e.client}function j(e){return(...t)=>m[e](...t)}const q={url:h({}),page:h({}),navigating:p(null),updated:S()};export{L as I,_ as P,x as S,I as a,P as b,V as c,q as d,w as e,N as f,O as g,Y as h,T as i,j,U as s};

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))g(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&g(c)}).observe(document,{childList:!0,subtree:!0});function r(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function g(a){if(a.ep)return;a.ep=!0;const o=r(a);fetch(a.href,o)}})();const X=(s,e=4)=>{const r={};return s.forEach(([g,a])=>{const o=document.createElement("canvas"),c=o.getContext("2d"),n=50;o.width=n,o.height=n,c.imageSmoothingEnabled=!1,c.font=`${n}px sans-serif`,c.textAlign="center",c.textBaseline="middle",c.fillText(g,n/2,n/2);const p=n/e,w=document.createElement("canvas");w.width=p,w.height=p;const y=w.getContext("2d");y.imageSmoothingEnabled=!1,y.drawImage(o,0,0,p,p),c.clearRect(0,0,n,n),c.drawImage(w,0,0,p,p,0,0,n,n),c.drawImage(o,0,0);const M=c.getImageData(0,0,n,n),m=M.data;for(let b=0;b<m.length;b+=4){const S=m[b],T=m[b+1],L=m[b+2];S<30&&T<30&&L<30&&(m[b+3]=0)}c.putImageData(M,0,0);const v=o.toDataURL("image/png");r[a]=v}),r},H=()=>({sound:!1,flowers:0,mushrooms:0,turn:0,misses:0,score:0,page:"main",mapPopulated:!1,gridSize:4,selectedType:"mushroom",lockedX:[],lockedY:[],correct:[],incorrect:[]}),O=(s,e)=>({events:{play:()=>x("puzzle"),playWithSound:()=>{e.sound=!0,x("puzzle")},scores:()=>{x("scores")}}}),F=s=>{const e=Array(s).fill(null).map(()=>Array(s).fill("")),r=Array(s).fill(null).map(()=>Array(s).fill("")),g=[],a=Math.floor(Math.random()*(s*s/3))+s;for(let o=0;o<a;o++){let c,n;do c=Math.floor(Math.random()*s),n=Math.floor(Math.random()*s);while(e[c][n]==="tree");e[c][n]="tree",r[c][n]="tree",g.push([c,n])}g.forEach(([o,c])=>{const n=[[0,-1],[-1,0],[1,0],[0,1]];for(let[i,p]of n){const w=o+i,y=c+p;$(w,y,s)&&e[w][y]===""&&Math.random()<.7&&(e[w][y]="mushroom")}});for(let o=0;o<s;o++)for(let c=0;c<s;c++)e[o][c]===""&&R(o,c,e,s)&&Math.random()<.7&&(e[o][c]="flower");return{playerSelections:r,board:e}};function R(s,e,r,g){const a=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let[o,c]of a){const n=s+o,i=e+c;if($(n,i,g)&&r[n][i]==="tree")return!1}return!0}function $(s,e,r){return s>=0&&s<r&&e>=0&&e<r}const A=s=>document.querySelector(s);function E(s,e){const r=A(".stats-value.score"),g=A(".stats-value.misses");r.textContent=s,g.textContent=e}const z=(s,e)=>{const r=document.getElementById("particleCanvas"),g=r.getContext("2d");let a;function o(m,v,b){return{x:m,y:v,image:b,size:Math.random()*20+10,speedY:Math.random()*-3-2,speedX:Math.random()*2-1,gravity:.1,opacity:1}}function c(m){m.speedY+=m.gravity,m.x+=m.speedX,m.y+=m.speedY,m.opacity-=.02,m.opacity<0&&(m.opacity=0)}function n(m){g.globalAlpha=m.opacity,g.drawImage(m.image,m.x,m.y,m.size,m.size),g.globalAlpha=1}const i=[];function p(m,v,b,S){const T=new Image;T.src=S,T.onload=()=>{for(let L=0;L<b;L++)i.push(o(m,v,T))}}function w(){g.clearRect(0,0,r.width,r.height);for(let m=i.length-1;m>=0;m--){const v=i[m];c(v),n(v),(v.y>r.height||v.opacity===0)&&i.splice(m,1)}a=requestAnimationFrame(w)}function y(){cancelAnimationFrame(a)}function M(m,v){m&&v?(r.width=m,r.height=v):(r.width=window.innerWidth,r.height=window.innerHeight)}return w(),{initParticles:p,stopParticles:y,setCanvasSize:M}},Y=()=>{const s=[{note:"E5",duration:"sixteenth"},{note:"C5",duration:"sixteenth"},{note:"G4",duration:"sixteenth"}],e={C5:523.25,E5:659.25,G4:392,Rest:0},r={sixteenth:.25},g=.05,a=new(window.AudioContext||window.webkitAudioContext);function o(n,i,p){if(n===0)return;const w=a.createOscillator(),y=a.createGain();w.frequency.setValueAtTime(n,p),w.type="square";const M=.005,m=.01,v=.6,b=.02;y.gain.setValueAtTime(0,p),y.gain.linearRampToValueAtTime(1,p+M),y.gain.linearRampToValueAtTime(v,p+M+m),y.gain.setValueAtTime(v,p+i-b),y.gain.linearRampToValueAtTime(0,p+i),w.connect(y),y.connect(a.destination),w.start(p),w.stop(p+i)}function c(){let n=a.currentTime;s.forEach(i=>{const p=e[i.note],w=g*r[i.duration];p!==void 0&&(o(p,w,n),n+=w)})}return a.resume().then(()=>{console.log("AudioContext is ready for playback")}),{playCoinClinkSound:c}},D=(s,e)=>{const r=localStorage.getItem("scores"),{playCoinClinkSound:g}=Y(),{gridSize:a,images:o}=e,{playerSelections:c,board:n}=F(a),{initParticles:i,stopParticles:p,setCanvasSize:w}=z();function y(h){const d=Array(h[0].length).fill(0),u=Array(h.length).fill(0),t=Array(h.length).fill(0),f=Array(h[0].length).fill(0);for(let C=0;C<h.length;C++)for(let l=0;l<h[C].length;l++)h[C][l]==="flower"?(d[l]++,t[C]++):h[C][l]==="mushroom"&&(f[l]++,u[C]++);return{top:d,right:u,left:t,bottom:f}}const{top:M,right:m,left:v,bottom:b}=y(n);function S(){E(e.score,e.misses);const h=s.querySelector("#game-board");if(h){h.style.gridTemplateColumns=`40px repeat(${n[0].length}, 40px) 40px`,h.style.gridTemplateRows=`40px repeat(${n.length}, 40px) 40px`,h.innerHTML="";for(let d=-1;d<=n.length;d++)for(let u=-1;u<=n[0].length;u++){const t=document.createElement("div");if(t.classList.add("cell"),(e.lockedY.includes(u+"")||e.lockedX.includes(d+""))&&t.classList.add("disabled"),e.correct.some(f=>f[0]===d&&f[1]===u)&&t.classList.add("correct"),e.incorrect.some(f=>f[0]===d&&f[1]===u)&&t.classList.add("incorrect"),u===-1&&d===-1){const f=document.createElement("img");f.src=o.flower3,f.classList.add("tile-image"),t.appendChild(f)}else if(u===n[0].length&&d===n.length){const f=document.createElement("img");f.src=o.mushroom,f.classList.add("tile-image"),t.appendChild(f)}else if(u===n[0].length&&d===-1)t.classList.add("clear-cell");else if(u===-1&&d===n.length)t.classList.add("clear-cell");else if(d===-1&&u>=0&&u<n[0].length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`x--${u}`,t.textContent=M[u];else if(u===-1&&d>=0&&d<n.length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`y--${d}`,t.textContent=v[d];else if(u===n[0].length&&d>=0&&d<n.length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`y--${d}`,t.textContent=m[d];else if(d===n.length&&u>=0&&u<n[0].length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`x--${u}`,t.textContent=b[u];else if(u>=0&&u<n[0].length&&d>=0&&d<n.length){t.setAttribute("data-x",u),t.setAttribute("data-y",d),t.dataset.event="cellClick";const f=document.createElement("img");n[d][u]==="tree"?(f.src=o.tree2,f.classList.add("tile-image"),t.appendChild(f),t.dataset.type="tree"):c[d][u]==="flower"?(f.src=o.flower3,f.classList.add("tile-image"),t.appendChild(f),t.dataset.type="flower"):c[d][u]==="mushroom"&&(f.src=o.mushroom,f.classList.add("tile-image"),t.appendChild(f),t.dataset.type="mushroom")}h.appendChild(t)}w(h.offsetWidth,h.offsetHeight)}}const T=h=>{const d=parseInt(h.target.getAttribute("data-x")),u=parseInt(h.target.getAttribute("data-y"));c[u][d]==="flower"||c[u][d]==="mushroom"?c[u][d]="":e.selectedType&&n[u][d]!=="tree"&&(c[u][d]=e.selectedType),S()},L=()=>{e.selectedType="flower",s.querySelector(".button.selected").classList.remove("selected"),s.querySelector(".button[data-event='flowerButton']").classList.add("selected")},N=()=>{e.selectedType="mushroom",s.querySelector(".button.selected").classList.remove("selected"),s.querySelector(".button[data-event='mushroomButton']").classList.add("selected")},q=(h,d)=>{const[u,t]=d.split("--"),{correct:f,incorrect:C}=W(c,n,u==="x"?"y":"x",parseInt(t));u==="y"&&!e.lockedX.includes(t)&&e.lockedX.push(t),u==="x"&&!e.lockedY.includes(t)&&e.lockedY.push(t),e.misses+=C,e.score+=f,e.misses>=13&&(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],p(),x("lose"),l(),e.score=0,e.misses=0,E(e.score,e.misses)),(e.lockedX.length===n.length||e.lockedY.length===n[0].length)&&e.gridSize===13&&e.misses<13&&(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],l(),p(),x("win")),(e.lockedX.length===n.length||e.lockedY.length===n[0].length&&e.misses<13)&&(e.gridSize++,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],p(),x("next")),S();function l(){const B=[...r?JSON.parse(r):[],e.score];localStorage.setItem("scores",JSON.stringify(B))}};function W(h,d,u,t){let f=0,C=0;if(u==="x")for(let l=0;l<d[0].length;l++)e.lockedY.includes(l.toString())||(h[t][l]===d[t][l]?(h[t][l]==="flower"||h[t][l]==="mushroom")&&(f++,e.correct.push([t,l]),setTimeout(()=>{i(l*50+50,t*50+50,100,o.star),e.sound&&g()},l*100)):(h[t][l]==="flower"||h[t][l]==="mushroom"||h[t][l]==="")&&(setTimeout(()=>{i(l*50+50,t*50+50,100,o.fail)},l*30),e.incorrect.push([t,l]),C++));else if(u==="y")for(let l=0;l<d.length;l++)e.lockedX.includes(l.toString())||(h[l][t]===d[l][t]?(h[l][t]==="flower"||h[l][t]==="mushroom")&&(f++,e.correct.push([l,t]),setTimeout(()=>{i(t*50+50,l*50+50,100,o.star),e.sound&&g()},l*100)):(h[l][t]==="flower"||h[l][t]==="mushroom"||h[l][t]==="")&&(setTimeout(()=>{i(t*50+50,l*50+50,100,o.fail)},l*50),e.incorrect.push([l,t]),C++));return{correct:f,incorrect:C}}return S(),{events:{flowerButton:L,mushroomButton:N,headerCellClick:q,cellClick:T}}},V=(s,e)=>{const r=()=>x("puzzle"),g=document.querySelector(".next-level");return g.textContent=e.gridSize-3,{events:{continueSearch:r}}},j=[["🌲","tree"],["🌳","tree2"],["🏔️","mountain"],["💧","water"],["🌿","flower"],["🌱","flower2"],["🌺","flower3"],["🪷","flower4"],["🍄","mushroom"],["⭐️","star"],["🌟","star2"],["✨","star3"],["🌙","star4"],["🔴","fail"]],G=(s,e)=>{const r=()=>x("main"),{playCoinClinkSound:g}=Y(),a=s.querySelector(".final-score");a.textContent=e.score;let o;const{initParticles:c,stopParticles:n,setCanvasSize:i}=z();i();function p(){for(let y=0;y<10;y++){const M=Math.random()>.5?e.images.star:e.images.star2;c(Math.random()*window.innerWidth,Math.random()*window.innerHeight,10,M)}if(e.sound)for(let y=0;y<5;y++)setTimeout(()=>{g()},y*100);o=setTimeout(p,2e3)}return p(),{events:{continueSearch:()=>{x("puzzle"),clearTimeout(o),n(),e.score=0,e.misses=0,E(e.score,e.misses)},backToMain:r}}},J=()=>({events:{continueSearch:()=>x("puzzle"),backToMain:()=>x("main")}}),K=()=>{const s=()=>x("main"),e=localStorage.getItem("scores"),r=JSON.parse(e),g=r?[...new Set(r)].sort((a,o)=>o-a):[];return document.querySelector(".scores-list").innerHTML=g.map(a=>`<li><h3>${a}</h3></li>`).join(""),{events:{backToMain:s}}},I=A("#app"),k=H(),U=X(j);k.images=U;k.vWidth=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);k.vHeight=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0);k.xOrigin=Math.floor(7e3/2);k.yOrigin=Math.floor(7e3/2);let P;function Q(s){const e=document.querySelector(".stars-moon");for(let a=0;a<s;a++)r(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),Math.random()*100/5,k.images.star3);g(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),Math.random()*50,k.images.star4);function r(a,o,c,n){const i=document.createElement("div");i.classList.add("star"),i.style.left=`${a}px`,i.style.top=`${o}px`,i.style.width=`${c}px`,i.style.height=`${c}px`,i.style.backgroundImage=`url(${n})`,i.style.animation=`twinkle ${Math.random()*2+8}s infinite`,e.appendChild(i)}function g(a,o,c,n){const i=document.createElement("div");i.classList.add("moon"),i.style.left=`${a}px`,i.style.top=`${o}px`,i.style.width=`${c}px`,i.style.height=`${c}px`,i.style.backgroundImage=`url(${n})`,e.appendChild(i)}}Q(20);const Z={main:{html:`
    <div class="general-container">
      <h2>Welcome to the Mushroom Kingdom</h2>
      <h4>Goal: Find all mushrooms and flowers correctly over 9 levels without getting 13 incorrect answers.</h4>
      <p><button class="unstyled-button" data-event="play">Play</button> <button class="unstyled-button" data-event="playWithSound">Play With Sound</button> <button class="unstyled-button" data-event="scores">Hi Scores</button></p>
      <p>
      <h4>Rules:</h4>
      <ul>
        <li>Flowers must not be placed adjacent to trees.</li>
        <li>Mushrooms must be placed adjacent to trees.</li>
        <li>Numbers on the right and bottom are mushrooms in that row or column</li>
        <li>Numbers on the top and left are flowers in that row or column</li>
        <li>Click a number to score that row and column</li>
        <li>When all spaces on the grid are scored progress to the next level if you have fewer than 13 misses.</li>
      </ul>

      </p>
    </div>
    `,funct:O},puzzle:{html:`
    <div class="puzzle-container"><canvas id="particleCanvas"></canvas><div id="game-board"></div></div>
    <div class="button-container"> 
      <button class="button unstyled-button" data-event="flowerButton"><img src="${k.images.flower3}" class="button-image" /> Flower</button>
      <button class="button unstyled-button selected" data-event="mushroomButton"><img src="${k.images.mushroom}" class="button-image" /> Mushroom</button>
    </div>`,funct:D},next:{html:`
    <div class="general-container">
      <h2>Continue your search?</h2>
      <p>Next Level: <span class="next-level"></span></p>
      <button class="continue unstyled-button" data-event="continueSearch">Continue</button>
    </div>
    `,funct:V},win:{html:`
    <canvas id="particleCanvas"></canvas>
    <div class="general-container">
      <h2>You win</h2>
      <h3>Your final score is <span class="final-score"></span>!</h3>
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <p>
        <button class="continue unstyled-button" data-event="continueSearch">Play again</button>
      </p>
    </div>
    `,funct:G},lose:{html:`
    <div class="general-container">
      <h2>You lose</h2>
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <p>
        <button class="continue unstyled-button" data-event="continueSearch">Play again</button>
      </p>
    </div>`,funct:J},scores:{html:`
    <div class="general-container">
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <h2>Hi Scores</h2>
      <p>
        <ol class="scores-list">
        </ol>
      </p>
    </div>`,funct:K}};function x(s){k.page=s;const e=Z[s];I.innerHTML=e.html,setTimeout(()=>{const r=e.funct(I,k);r!=null&&r.events&&(P=r.events)},0)}I.addEventListener("click",s=>{if(P[s.target.dataset.event]){const e=s.target.dataset.payload?s.target.dataset.payload:null;P[s.target.dataset.event](s,e)}});x("main");

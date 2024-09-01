(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))g(c);new MutationObserver(c=>{for(const o of c)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&g(a)}).observe(document,{childList:!0,subtree:!0});function r(c){const o={};return c.integrity&&(o.integrity=c.integrity),c.referrerPolicy&&(o.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?o.credentials="include":c.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function g(c){if(c.ep)return;c.ep=!0;const o=r(c);fetch(c.href,o)}})();const X=(s,e=4)=>{const r={};return s.forEach(([g,c])=>{const o=document.createElement("canvas"),a=o.getContext("2d"),n=50;o.width=n,o.height=n,a.imageSmoothingEnabled=!1,a.font=`${n}px sans-serif`,a.textAlign="center",a.textBaseline="middle",a.fillText(g,n/2,n/2);const p=n/e,v=document.createElement("canvas");v.width=p,v.height=p;const y=v.getContext("2d");y.imageSmoothingEnabled=!1,y.drawImage(o,0,0,p,p),a.clearRect(0,0,n,n),a.drawImage(v,0,0,p,p,0,0,n,n),a.drawImage(o,0,0);const M=a.getImageData(0,0,n,n),m=M.data;for(let b=0;b<m.length;b+=4){const S=m[b],T=m[b+1],L=m[b+2];S<30&&T<30&&L<30&&(m[b+3]=0)}a.putImageData(M,0,0);const w=o.toDataURL("image/png");r[c]=w}),r},H=()=>({sound:!1,flowers:0,mushrooms:0,turn:0,misses:0,score:0,page:"main",mapPopulated:!1,gridSize:4,selectedType:"mushroom",lockedX:[],lockedY:[],correct:[],incorrect:[]}),O=(s,e)=>({events:{play:()=>x("puzzle"),playWithSound:()=>{e.sound=!0,x("puzzle")},scores:()=>{x("scores")}}}),F=s=>{const e=Array(s).fill(null).map(()=>Array(s).fill("")),r=Array(s).fill(null).map(()=>Array(s).fill("")),g=[],c=Math.floor(Math.random()*(s*s/3))+s;for(let o=0;o<c;o++){let a,n;do a=Math.floor(Math.random()*s),n=Math.floor(Math.random()*s);while(e[a][n]==="tree");e[a][n]="tree",r[a][n]="tree",g.push([a,n])}g.forEach(([o,a])=>{const n=[[0,-1],[-1,0],[1,0],[0,1]];for(let[l,p]of n){const v=o+l,y=a+p;$(v,y,s)&&e[v][y]===""&&Math.random()<.7&&(e[v][y]="mushroom")}});for(let o=0;o<s;o++)for(let a=0;a<s;a++)e[o][a]===""&&R(o,a,e,s)&&Math.random()<.7&&(e[o][a]="flower");return{playerSelections:r,board:e}};function R(s,e,r,g){const c=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let[o,a]of c){const n=s+o,l=e+a;if($(n,l,g)&&r[n][l]==="tree")return!1}return!0}function $(s,e,r){return s>=0&&s<r&&e>=0&&e<r}const A=s=>document.querySelector(s);function E(s,e){const r=A(".stats-value.score"),g=A(".stats-value.misses");r.textContent=s,g.textContent=e}const z=(s,e)=>{const r=document.getElementById("particleCanvas"),g=r.getContext("2d");let c;function o(m,w,b){return{x:m,y:w,image:b,size:Math.random()*20+10,speedY:Math.random()*-3-2,speedX:Math.random()*2-1,gravity:.1,opacity:1}}function a(m){m.speedY+=m.gravity,m.x+=m.speedX,m.y+=m.speedY,m.opacity-=.02,m.opacity<0&&(m.opacity=0)}function n(m){g.globalAlpha=m.opacity,g.drawImage(m.image,m.x,m.y,m.size,m.size),g.globalAlpha=1}const l=[];function p(m,w,b,S){const T=new Image;T.src=S,T.onload=()=>{for(let L=0;L<b;L++)l.push(o(m,w,T))}}function v(){g.clearRect(0,0,r.width,r.height);for(let m=l.length-1;m>=0;m--){const w=l[m];a(w),n(w),(w.y>r.height||w.opacity===0)&&l.splice(m,1)}c=requestAnimationFrame(v)}function y(){cancelAnimationFrame(c)}function M(m,w){m&&w?(r.width=m,r.height=w):(r.width=window.innerWidth,r.height=window.innerHeight)}return v(),{initParticles:p,stopParticles:y,setCanvasSize:M}},Y=()=>{const s=[{note:"E5",duration:"sixteenth"},{note:"C5",duration:"sixteenth"},{note:"G4",duration:"sixteenth"}],e={C5:523.25,E5:659.25,G4:392,Rest:0},r={sixteenth:.25},g=.05,c=new(window.AudioContext||window.webkitAudioContext);function o(n,l,p){if(n===0)return;const v=c.createOscillator(),y=c.createGain();v.frequency.setValueAtTime(n,p),v.type="square";const M=.005,m=.01,w=.6,b=.02;y.gain.setValueAtTime(0,p),y.gain.linearRampToValueAtTime(1,p+M),y.gain.linearRampToValueAtTime(w,p+M+m),y.gain.setValueAtTime(w,p+l-b),y.gain.linearRampToValueAtTime(0,p+l),v.connect(y),y.connect(c.destination),v.start(p),v.stop(p+l)}function a(){let n=c.currentTime;s.forEach(l=>{const p=e[l.note],v=g*r[l.duration];p!==void 0&&(o(p,v,n),n+=v)})}return c.resume().then(()=>{console.log("AudioContext is ready for playback")}),{playCoinClinkSound:a}},D=(s,e)=>{const r=localStorage.getItem("scores"),{playCoinClinkSound:g}=Y(),{gridSize:c,images:o}=e,{playerSelections:a,board:n}=F(c),{initParticles:l,stopParticles:p,setCanvasSize:v}=z();function y(h){const d=Array(h[0].length).fill(0),u=Array(h.length).fill(0),t=Array(h.length).fill(0),f=Array(h[0].length).fill(0);for(let C=0;C<h.length;C++)for(let i=0;i<h[C].length;i++)h[C][i]==="flower"?(d[i]++,t[C]++):h[C][i]==="mushroom"&&(f[i]++,u[C]++);return{top:d,right:u,left:t,bottom:f}}const{top:M,right:m,left:w,bottom:b}=y(n);function S(){E(e.score,e.misses);const h=s.querySelector("#game-board");if(h){h.style.gridTemplateColumns=`40px repeat(${n[0].length}, 40px) 40px`,h.style.gridTemplateRows=`40px repeat(${n.length}, 40px) 40px`,h.innerHTML="";for(let d=-1;d<=n.length;d++)for(let u=-1;u<=n[0].length;u++){const t=document.createElement("div");if(t.classList.add("cell"),(e.lockedY.includes(u+"")||e.lockedX.includes(d+""))&&t.classList.add("disabled"),e.correct.some(f=>f[0]===d&&f[1]===u)&&t.classList.add("correct"),e.incorrect.some(f=>f[0]===d&&f[1]===u)&&t.classList.add("incorrect"),u===-1&&d===-1){const f=document.createElement("img");f.src=o.flower3,f.classList.add("tile-image"),t.appendChild(f)}else if(u===n[0].length&&d===n.length){const f=document.createElement("img");f.src=o.mushroom,f.classList.add("tile-image"),t.appendChild(f)}else if(u===n[0].length&&d===-1)t.classList.add("clear-cell");else if(u===-1&&d===n.length)t.classList.add("clear-cell");else if(d===-1&&u>=0&&u<n[0].length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`x--${u}`,t.textContent=M[u];else if(u===-1&&d>=0&&d<n.length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`y--${d}`,t.textContent=w[d];else if(u===n[0].length&&d>=0&&d<n.length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`y--${d}`,t.textContent=m[d];else if(d===n.length&&u>=0&&u<n[0].length)t.classList.add("header-cell"),t.dataset.event="headerCellClick",t.dataset.payload=`x--${u}`,t.textContent=b[u];else if(u>=0&&u<n[0].length&&d>=0&&d<n.length){t.setAttribute("data-x",u),t.setAttribute("data-y",d),t.dataset.event="cellClick";const f=document.createElement("img");n[d][u]==="tree"?(f.src=o.tree2,f.classList.add("tile-image"),t.appendChild(f),t.dataset.type="tree"):a[d][u]==="flower"?(f.src=o.flower3,f.classList.add("tile-image"),t.appendChild(f),t.dataset.type="flower"):a[d][u]==="mushroom"&&(f.src=o.mushroom,f.classList.add("tile-image"),t.appendChild(f),t.dataset.type="mushroom")}h.appendChild(t)}v(h.offsetWidth,h.offsetHeight)}}const T=h=>{const d=parseInt(h.target.getAttribute("data-x")),u=parseInt(h.target.getAttribute("data-y"));a[u][d]==="flower"||a[u][d]==="mushroom"?a[u][d]="":e.selectedType&&n[u][d]!=="tree"&&(a[u][d]=e.selectedType),S()},L=()=>{e.selectedType="flower",s.querySelector(".button.selected").classList.remove("selected"),s.querySelector(".button[data-event='flowerButton']").classList.add("selected")},N=()=>{e.selectedType="mushroom",s.querySelector(".button.selected").classList.remove("selected"),s.querySelector(".button[data-event='mushroomButton']").classList.add("selected")},q=(h,d)=>{const[u,t]=d.split("--"),{correct:f,incorrect:C}=B(a,n,u==="x"?"y":"x",parseInt(t));u==="y"&&!e.lockedX.includes(t)&&e.lockedX.push(t),u==="x"&&!e.lockedY.includes(t)&&e.lockedY.push(t),e.misses+=C,e.score+=f,e.misses>=13&&(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],p(),x("lose"),i(),e.score=0,e.misses=0,E(e.score,e.misses)),(e.lockedX.length===n.length||e.lockedY.length===n[0].length)&&e.gridSize===13&&e.misses<13&&(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],i(),p(),x("win")),(e.lockedX.length===n.length||e.lockedY.length===n[0].length&&e.misses<13)&&(e.gridSize++,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],p(),x("next")),S();function i(){const W=[...r?JSON.parse(r):[],e.score];localStorage.setItem("scores",JSON.stringify(W))}};function B(h,d,u,t){let f=0,C=0;if(u==="x")for(let i=0;i<d[0].length;i++)e.lockedY.includes(i.toString())||(h[t][i]===d[t][i]?(h[t][i]==="flower"||h[t][i]==="mushroom")&&(f++,e.correct.push([t,i]),setTimeout(()=>{l(i*50+50,t*50+50,100,o.star),e.sound&&g()},i*100)):(h[t][i]==="flower"||h[t][i]==="mushroom"||h[t][i]==="")&&(setTimeout(()=>{l(i*50+50,t*50+50,100,o.fail)},i*30),e.incorrect.push([t,i]),C++));else if(u==="y")for(let i=0;i<d.length;i++)e.lockedX.includes(i.toString())||(h[i][t]===d[i][t]?(h[i][t]==="flower"||h[i][t]==="mushroom")&&(f++,e.correct.push([i,t]),setTimeout(()=>{l(t*50+50,i*50+50,100,o.star),e.sound&&g()},i*100)):(h[i][t]==="flower"||h[i][t]==="mushroom"||h[i][t]==="")&&(setTimeout(()=>{l(t*50+50,i*50+50,100,o.fail)},i*50),e.incorrect.push([i,t]),C++));return{correct:f,incorrect:C}}return S(),{events:{flowerButton:L,mushroomButton:N,headerCellClick:q,cellClick:T}}},V=(s,e)=>{const r=()=>x("puzzle"),g=document.querySelector(".next-level");return g.textContent=e.gridSize-3,{events:{continueSearch:r}}},j=[["🌲","tree"],["🌳","tree2"],["🏔️","mountain"],["💧","water"],["🌿","flower"],["🌱","flower2"],["🌺","flower3"],["🪷","flower4"],["🍄","mushroom"],["⭐️","star"],["🌟","star2"],["✨","star3"],["🌙","star4"],["🔴","fail"]],G=(s,e)=>{const r=()=>x("main"),{playCoinClinkSound:g}=Y(),c=s.querySelector(".final-score");c.textContent=e.score;let o;const{initParticles:a,stopParticles:n,setCanvasSize:l}=z();l();function p(){for(let y=0;y<10;y++){const M=Math.random()>.5?e.images.star:e.images.star2;a(Math.random()*window.innerWidth,Math.random()*window.innerHeight,10,M)}if(e.sound)for(let y=0;y<5;y++)setTimeout(()=>{g()},y*100);o=setTimeout(p,2e3)}return p(),{events:{continueSearch:()=>{x("puzzle"),clearTimeout(o),n(),e.score=0,e.misses=0,E(e.score,e.misses)},backToMain:r}}},J=()=>({events:{continueSearch:()=>x("puzzle"),backToMain:()=>x("main")}}),U=()=>{const s=()=>x("main"),e=localStorage.getItem("scores"),r=JSON.parse(e),g=r?[...new Set(r)].sort((c,o)=>o-c):[];return document.querySelector(".scores-list").innerHTML=g.map(c=>`<li><h3>${c}</h3></li>`).join(""),{events:{backToMain:s}}},I=A("#app"),k=H(),K=X(j);k.images=K;k.vWidth=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);k.vHeight=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0);k.xOrigin=Math.floor(7e3/2);k.yOrigin=Math.floor(7e3/2);let P;function Q(s){const e=document.querySelector(".stars-moon");for(let c=0;c<s;c++)r(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),Math.random()*100/5,k.images.star3);g(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),Math.random()*50,k.images.star4);function r(c,o,a,n){const l=document.createElement("div");l.classList.add("star"),l.style.left=`${c}px`,l.style.top=`${o}px`,l.style.width=`${a}px`,l.style.height=`${a}px`,l.style.backgroundImage=`url(${n})`,l.style.animation=`twinkle ${Math.random()*2+8}s infinite`,e.appendChild(l)}function g(c,o,a,n){const l=document.createElement("div");l.classList.add("moon"),l.style.left=`${c}px`,l.style.top=`${o}px`,l.style.width=`${a}px`,l.style.height=`${a}px`,l.style.backgroundImage=`url(${n})`,e.appendChild(l)}}Q(20);const Z={main:{html:`
    <div class="general-container">
      <h2>Miles to Mend</h2>
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
      <p>A game by <a href="https://github.com/vivianeasley">Vivian Easley</a></p>
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
      <h2>High Scores</h2>
      <p>
        <ol class="scores-list">
        </ol>
      </p>
    </div>`,funct:U}};function x(s){k.page=s;const e=Z[s];I.innerHTML=e.html,setTimeout(()=>{const r=e.funct(I,k);r!=null&&r.events&&(P=r.events)},0)}I.addEventListener("click",s=>{if(P[s.target.dataset.event]){const e=s.target.dataset.payload?s.target.dataset.payload:null;P[s.target.dataset.event](s,e)}});x("main");

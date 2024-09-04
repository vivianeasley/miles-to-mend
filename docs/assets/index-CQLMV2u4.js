(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const O=(n,e=4)=>{const t={};return n.forEach(([r,i])=>{const s=document.createElement("canvas"),c=s.getContext("2d"),o=50;s.width=o,s.height=o,c.imageSmoothingEnabled=!1,c.font=`${o}px sans-serif`,c.textAlign="center",c.textBaseline="middle",c.fillText(r,o/2,o/2);const f=o/e,y=document.createElement("canvas");y.width=f,y.height=f;const w=y.getContext("2d");w.imageSmoothingEnabled=!1,w.drawImage(s,0,0,f,f),c.clearRect(0,0,o,o),c.drawImage(y,0,0,f,f,0,0,o,o),c.drawImage(s,0,0);const S=c.getImageData(0,0,o,o),h=S.data;for(let b=0;b<h.length;b+=4){const M=h[b],L=h[b+1],A=h[b+2];M<30&&L<30&&A<30&&(h[b+3]=0)}c.putImageData(S,0,0);const v=s.toDataURL("image/png");t[i]=v}),t},F=()=>({sound:!1,flowers:0,mushrooms:0,turn:0,misses:0,score:0,page:"main",mapPopulated:!1,gridSize:4,selectedType:"mushroom",lockedX:[],lockedY:[],correct:[],incorrect:[],gameType:"puzzle"}),R=(n,e)=>{document.querySelector(".stats-container").style.display="none";const t=()=>C("puzzle"),r=()=>{e.sound=!0,C("puzzle")},i=()=>{C("scores")},s=n.querySelector("#game-type");return e.gameType==="guessing"?s.checked=!0:s.checked=!1,{events:{play:t,playWithSound:r,scores:i,setGameType:o=>{o.target.checked?e.gameType="guessing":e.gameType="puzzle"}}}};let Y=[];const D=(n,e)=>{Y=[];const t=Array(n).fill(null).map(()=>Array(n).fill("")),r=Array(n).fill(null).map(()=>Array(n).fill("")),i=[];if(G(t,[],n),V(t,i,n),j(t,i,n),J(t,n),e.gameType==="guessing"){const c=Math.floor(n/2)-1;for(let o=0;o<c;o++){const l=Math.floor(Math.random()*Y.length),[f,y]=Y[l];t[f][y]=""}}return{playerSelections:r,board:t}};function G(n,e,t){const r=Math.floor(t/3);for(let i=0;i<r;i++){let s,c;do s=Math.floor(Math.random()*t),c=Math.floor(Math.random()*t);while(n[c][s]!=="");n[c][s]="mountain",e.push([s,c])}}function V(n,e,t){const r=Math.floor(t*t*.2);let i=0;for(;i<r;){let s,c;do s=Math.floor(Math.random()*t),c=Math.floor(Math.random()*t);while(n[c][s]!==""||!U(s,c,n,t));n[c][s]="tree",e.push([s,c]),i++}}function j(n,e,t){e.forEach(([r,i])=>{[[0,-1],[-1,0],[1,0],[0,1]].forEach(([c,o])=>{const l=r+c,f=i+o;q(l,f,t)&&n[f][l]===""&&!Q(l,f,n,"mountain")&&(Y.push([f,l]),n[f][l]="mushroom")})})}function J(n,e){for(let t=0;t<e;t++)for(let r=0;r<e;r++)n[t][r]===""&&K(r,t,n,e)&&(n[t][r]="flower")}function U(n,e,t,r){const i=[[-1,0],[1,0],[0,-1],[0,1]];for(let[s,c]of i){const o=n+s,l=e+c;if(q(o,l,r)&&t[l][o]==="tree")return!1}return!0}function K(n,e,t,r){const i=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let[s,c]of i){const o=n+s,l=e+c;if(q(o,l,r)&&(t[l][o]==="tree"||t[l][o]==="mountain"))return!1}return!0}function Q(n,e,t,r){const i=[[0,-1],[-1,0],[1,0],[0,1]];for(let[s,c]of i){const o=n+s,l=e+c;if(q(o,l,t.length)&&t[l][o]===r)return!0}return!1}function q(n,e,t){return n>=0&&n<t&&e>=0&&e<t}const P=n=>document.querySelector(n);function I(n,e,t){const r=P(".stats-value.score"),i=P(".stats-value.level"),s=P(".stats-value.misses");r.textContent=n,s.textContent=e,i.textContent=t}const B=(n,e)=>{const t=document.getElementById("particleCanvas"),r=t.getContext("2d");let i;function s(h,v,b){return{x:h,y:v,image:b,size:Math.random()*20+10,speedY:Math.random()*-3-2,speedX:Math.random()*2-1,gravity:.1,opacity:1}}function c(h){h.speedY+=h.gravity,h.x+=h.speedX,h.y+=h.speedY,h.opacity-=.02,h.opacity<0&&(h.opacity=0)}function o(h){r.globalAlpha=h.opacity,r.drawImage(h.image,h.x,h.y,h.size,h.size),r.globalAlpha=1}const l=[];function f(h,v,b,M){const L=new Image;L.src=M,L.onload=()=>{for(let A=0;A<b;A++)l.push(s(h,v,L))}}function y(){r.clearRect(0,0,t.width,t.height);for(let h=l.length-1;h>=0;h--){const v=l[h];c(v),o(v),(v.y>t.height||v.opacity===0)&&l.splice(h,1)}i=requestAnimationFrame(y)}function w(){cancelAnimationFrame(i)}function S(h,v){h&&v?(t.width=h,t.height=v):(t.width=window.innerWidth,t.height=window.innerHeight)}return y(),{initParticles:f,stopParticles:w,setCanvasSize:S}},X=()=>{const n=[{note:"E5",duration:"sixteenth"},{note:"C5",duration:"sixteenth"},{note:"G4",duration:"sixteenth"}],e={C5:523.25,E5:659.25,G4:392,Rest:0},t={sixteenth:.25},r=.05,i=new(window.AudioContext||window.webkitAudioContext);function s(o,l,f){if(o===0)return;const y=i.createOscillator(),w=i.createGain();y.frequency.setValueAtTime(o,f),y.type="square";const S=.005,h=.01,v=.6,b=.02;w.gain.setValueAtTime(0,f),w.gain.linearRampToValueAtTime(1,f+S),w.gain.linearRampToValueAtTime(v,f+S+h),w.gain.setValueAtTime(v,f+l-b),w.gain.linearRampToValueAtTime(0,f+l),y.connect(w),w.connect(i.destination),y.start(f),y.stop(f+l)}function c(){let o=i.currentTime;n.forEach(l=>{const f=e[l.note],y=r*t[l.duration];f!==void 0&&(s(f,y,o),o+=y)})}return i.resume().then(()=>{console.log("AudioContext is ready for playback")}),{playCoinClinkSound:c}},Z=(n,e)=>{document.querySelector(".stats-container").style.display="flex";const t=localStorage.getItem("scores"),{playCoinClinkSound:r}=X(),{gridSize:i,images:s}=e,{playerSelections:c,board:o}=D(i,e),{initParticles:l,stopParticles:f,setCanvasSize:y}=B();function w(p){const u=Array(p[0].length).fill(0),d=Array(p.length).fill(0),a=Array(p.length).fill(0),m=Array(p[0].length).fill(0);for(let x=0;x<p.length;x++)for(let g=0;g<p[x].length;g++)p[x][g]==="flower"?(u[g]++,a[x]++):p[x][g]==="mushroom"&&(m[g]++,d[x]++);return{top:u,right:d,left:a,bottom:m}}const{top:S,right:h,left:v,bottom:b}=w(o);function M(){I(e.score,e.misses,e.gridSize-3);const p=n.querySelector("#game-board");if(p){p.style.width=(o.length+2)*52+20+"px",p.innerHTML="";for(let u=-1;u<=o.length;u++)for(let d=-1;d<=o[0].length;d++){const a=document.createElement("div");if(a.classList.add("cell"),(e.lockedY.includes(d+"")||e.lockedX.includes(u+""))&&a.classList.add("disabled"),e.correct.some(m=>m[0]===u&&m[1]===d)&&a.classList.add("correct"),e.incorrect.some(m=>m[0]===u&&m[1]===d)&&a.classList.add("incorrect"),d===-1&&u===-1){const m=document.createElement("img");m.src=s.flower3,m.classList.add("tile-image"),a.appendChild(m),a.classList.add("corner","top-left")}else if(d===o[0].length&&u===o.length){const m=document.createElement("img");m.src=s.mushroom,m.classList.add("tile-image"),a.appendChild(m),a.classList.add("corner","bottom-right")}else if(d===o[0].length&&u===-1)a.classList.add("clear-cell","corner","bottom-left");else if(d===-1&&u===o.length)a.classList.add("clear-cell","corner");else if(u===-1&&d>=0&&d<o[0].length)a.classList.add("header-cell","top"),a.dataset.event="headerCellClick",a.dataset.payload=`x--${d}`,a.textContent=S[d];else if(d===-1&&u>=0&&u<o.length)a.classList.add("header-cell","left"),a.dataset.event="headerCellClick",a.dataset.payload=`y--${u}`,a.textContent=v[u];else if(d===o[0].length&&u>=0&&u<o.length)a.classList.add("header-cell","right"),a.dataset.event="headerCellClick",a.dataset.payload=`y--${u}`,a.textContent=h[u];else if(u===o.length&&d>=0&&d<o[0].length)a.classList.add("header-cell","bottom"),a.dataset.event="headerCellClick",a.dataset.payload=`x--${d}`,a.textContent=b[d];else if(d>=0&&d<o[0].length&&u>=0&&u<o.length){a.setAttribute("data-x",d),a.setAttribute("data-y",u),a.dataset.event="cellClick";const m=document.createElement("img");o[u][d]==="tree"?(m.src=s.tree2,m.classList.add("tile-image"),a.appendChild(m),a.dataset.type="tree"):o[u][d]==="mountain"?(m.src=s.mountain,m.classList.add("tile-image"),a.appendChild(m),a.dataset.type="mountain"):c[u][d]==="flower"?(m.src=s.flower3,m.classList.add("tile-image"),a.appendChild(m),a.dataset.type="flower"):c[u][d]==="mushroom"&&(m.src=s.mushroom,m.classList.add("tile-image"),a.appendChild(m),a.dataset.type="mushroom")}p.appendChild(a)}y(p.offsetWidth,p.offsetHeight)}}const L=p=>{const u=parseInt(p.target.getAttribute("data-x")),d=parseInt(p.target.getAttribute("data-y"));c[d][u]==="flower"||c[d][u]==="mushroom"?c[d][u]="":e.selectedType&&o[d][u]!=="tree"&&o[d][u]!=="mountain"&&(c[d][u]=e.selectedType),M()},A=()=>{e.selectedType="flower",n.querySelector(".button.selected").classList.remove("selected"),n.querySelector(".button[data-event='flowerButton']").classList.add("selected")},W=()=>{e.selectedType="mushroom",n.querySelector(".button.selected").classList.remove("selected"),n.querySelector(".button[data-event='mushroomButton']").classList.add("selected")},N=(p,u)=>{const[d,a]=u.split("--"),{correct:m,incorrect:x}=H(c,o,d==="x"?"y":"x",parseInt(a));d==="y"&&!e.lockedX.includes(a)&&e.lockedX.push(a),d==="x"&&!e.lockedY.includes(a)&&e.lockedY.push(a),e.misses+=x,e.score+=m,e.gameType==="guessing"&&(e.score+=m),e.misses>=13?(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],f(),C("lose"),g(),e.selectedType="mushroom"):(e.lockedX.length===o.length||e.lockedY.length===o[0].length)&&e.gridSize===13?(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],e.selectedType="mushroom",g(),f(),C("win")):(e.lockedX.length===o.length||e.lockedY.length===o[0].length)&&setTimeout(()=>{e.gridSize++,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],e.selectedType="mushroom",f(),C("next")},1e3),M();function g(){const k=[...t?JSON.parse(t):[],e.score];localStorage.setItem("scores",JSON.stringify(k))}};function H(p,u,d,a){let m=0,x=0;if(d==="x")for(let g=0;g<u[0].length;g++){if(e.lockedY.includes(g.toString()))continue;const E=p[a][g],k=u[a][g];(k==="flower"||k==="mushroom")&&(E===k?(m++,e.correct.push([a,g]),setTimeout(()=>{l(g*60+60,a*60+60,100,s.star),e.sound&&r()},g*50)):(setTimeout(()=>{l(g*60+60,a*60+60,100,s.fail)},g*30),e.incorrect.push([a,g]),x++))}else if(d==="y")for(let g=0;g<u.length;g++){if(e.lockedX.includes(g.toString()))continue;const E=p[g][a],k=u[g][a];(k==="flower"||k==="mushroom")&&(E===k?(m++,e.correct.push([g,a]),setTimeout(()=>{l(a*60+60,g*60+60,100,s.star),e.sound&&r()},g*50)):(setTimeout(()=>{l(a*60+60,g*60+60,100,s.fail)},g*50),e.incorrect.push([g,a]),x++))}return{correct:m,incorrect:x}}return M(),{events:{flowerButton:A,mushroomButton:W,headerCellClick:N,cellClick:L}}},_=(n,e)=>{const t=()=>C("puzzle"),r=document.querySelector(".next-level");return r.textContent=e.gridSize-3,{events:{continueSearch:t}}},ee=[["🌳","tree2"],["⛰️","mountain"],["🌼","flower3"],["🍄","mushroom"],["⭐️","star"],["🌟","star2"],["✨","star3"],["🌙","star4"],["🔴","fail"]],te=(n,e)=>{const t=()=>{C("main"),clearTimeout(s),o(),e.score=0,e.misses=0,I(0,0,0)},{playCoinClinkSound:r}=X(),i=n.querySelector(".final-score");i.textContent=e.score;let s;const{initParticles:c,stopParticles:o,setCanvasSize:l}=B();l();function f(){for(let w=0;w<10;w++){const S=Math.random()>.5?e.images.star:e.images.star2;c(Math.random()*window.innerWidth,Math.random()*window.innerHeight,10,S)}if(e.sound)for(let w=0;w<5;w++)setTimeout(()=>{r()},w*100);s=setTimeout(f,2e3)}return f(),{events:{continueSearch:()=>{C("puzzle"),clearTimeout(s),o(),e.score=0,e.misses=0,I(0,0,0)},backToMain:t}}},ne=(n,e)=>{const t=n.querySelector(".final-score");return t.textContent=e.score,{events:{continueSearch:()=>{C("puzzle"),e.score=0,e.misses=0,I(0,0,0)},backToMain:()=>{C("main"),e.score=0,e.misses=0,I(0,0,0)}}}},oe=()=>{document.querySelector(".stats-container").style.display="none";const n=()=>C("main"),e=localStorage.getItem("scores"),t=JSON.parse(e),r=t?[...new Set(t)].sort((i,s)=>s-i):[];return document.querySelector(".scores-list").innerHTML=r.map(i=>`<li><h3>${i}</h3></li>`).join(""),{events:{backToMain:n}}},z=P("#app"),T=F(),se=O(ee);T.images=se;T.vWidth=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);T.vHeight=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0);T.xOrigin=Math.floor(7e3/2);T.yOrigin=Math.floor(7e3/2);let $;function ie(n){const e=document.querySelector(".stars-moon");for(let i=0;i<n;i++)t(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),Math.random()*100/5,T.images.star3);r(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),50,T.images.star4);function t(i,s,c,o){const l=document.createElement("div");l.classList.add("star"),l.style.left=`${i}px`,l.style.top=`${s}px`,l.style.width=`${c}px`,l.style.height=`${c}px`,l.style.backgroundImage=`url(${o})`,l.style.animation=`twinkle ${Math.random()*2+8}s infinite`,e.appendChild(l)}function r(i,s,c,o){const l=document.createElement("div");l.classList.add("moon"),l.style.left=`${i}px`,l.style.top=`${s}px`,l.style.width=`${c}px`,l.style.height=`${c}px`,l.style.backgroundImage=`url(${o})`,e.appendChild(l)}}ie(20);const ae={main:{html:`
    <div class="general-container">
      <h2>Miles to Mend</h2>
      <h4>Goal: Find all mushrooms and flowers correctly over 10 levels without getting 13 incorrect answers.</h4>
      <p><button class="unstyled-button" data-event="play">Play</button> <button class="unstyled-button" data-event="playWithSound">Play With Sound</button> <button class="unstyled-button" data-event="scores">High Scores</button></p>
      <p><input type="checkbox" id="game-type" name="game-type" data-event="setGameType"> <label for="game-type">Add guessing (removes perfect information but scores more points each round)</label></p>
      <p>
      <h4>Rules:</h4>
      <p>
      <ul>
        <li>Collect your ingredients by selecting the ingredient tab (mushroom or flower) and clicking an empty square on the board.</li>
        <li>The numbers along the borders show how many mushrooms and flowers to include in each row and column. Bottom and right show how many mushrooms. Top and left show how many flowers.</li>
        <li>Flowers need sun: they must not be placed next to trees.</li>
        <li>Mushrooms need shade: they must be placed next to trees.</li>
        <li>Neither mushrooms or flowers grow in the mountains: they must not be placed next to a mounatin.</li>
        <li>To remove an ingredient from the board, click on it.</li>
        <li>When you've finished collecting, click a border number to score that row or column.</li>
        <li>When all spaces on the grid are scored, if you have fewer than 13 incorrect placements you progress to the next level.</li>
        <li>Beat 10 levels to win!</li>
      </ul>
      </p>
      <p class="story">
        In the dimming embrace of twilight, you wander through the shadowed woods, a young apothecary driven by a quiet desperation. The light fades faster than your hopes, casting long, mournful shadows over the earth. The leaves whisper secrets of the night as you search, your hands trembling as they sift through the undergrowth, seeking the elusive plants and fungi that may hold the cure. Time is slipping away, as relentless as the fever burning within your small, distant home. You know the night is closing in, and with it, the chance to save a life.
      </p>
      <p>© <a href="https://github.com/vivianeasley">Vivian Easley</a></p>
    </div>
    `,funct:R},puzzle:{html:`
    <div class="puzzle-container"><canvas id="particleCanvas"></canvas><div id="game-board"></div></div>
    <div class="button-container"> 
      <button class="button unstyled-button" data-event="flowerButton"><img src="${T.images.flower3}" class="button-image" /> Flower</button>
      <button class="button unstyled-button selected" data-event="mushroomButton"><img src="${T.images.mushroom}" class="button-image" /> Mushroom</button>
    </div>`,funct:Z},next:{html:`
    <div class="general-container">
      <h2>Continue your search?</h2>
      <p>Next Level: <span class="next-level"></span></p>
      <button class="continue unstyled-button" data-event="continueSearch">Continue</button>
    </div>
    `,funct:_},win:{html:`
    <canvas id="particleCanvas"></canvas>
    <div class="general-container">
      <h2>You win</h2>
      <h3>Your final score is <span class="final-score"></span>!</h3>
      <p class="story">You return just as the last flames flicker, mere whispers of light in the crumbling hearth. You want to collapse, to let the weight of it all crush you into the earth. With trembling, mud-caked hands, you stoke the dying embers, coaxing them back into life. You begin to mix the medicine so desperately needed to save someone dear to you. Time is slipping through your fingers, but there's still enough.</p>
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <p>
        <button class="continue unstyled-button" data-event="continueSearch">Play again</button>
      </p>
    </div>
    `,funct:te},lose:{html:`
    <div class="general-container">
      <h2>You lose</h2>
      <h3>Your final score is <span class="final-score"></span>!</h3>
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <p>
        <button class="continue unstyled-button" data-event="continueSearch">Play again</button>
      </p>
    </div>`,funct:ne},scores:{html:`
    <div class="general-container">
      <p>
        <button class="unstyled-button" data-event="backToMain">Back to Main</button>
      </p>
      <h2>High Scores</h2>
      <p>
        <ol class="scores-list">
        </ol>
      </p>
    </div>`,funct:oe}};function C(n){T.page=n;const e=ae[n];z.innerHTML=e.html,setTimeout(()=>{const t=e.funct(z,T);t!=null&&t.events&&($=t.events)},0)}z.addEventListener("click",n=>{if($[n.target.dataset.event]){const e=n.target.dataset.payload?n.target.dataset.payload:null;$[n.target.dataset.event](n,e)}});function ce(n){const e=document.getElementById("favicon");e&&(e.href=n)}ce(T.images.star4);C("main");

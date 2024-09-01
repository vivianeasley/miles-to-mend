(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))p(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const t of l.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&p(t)}).observe(document,{childList:!0,subtree:!0});function d(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function p(s){if(s.ep)return;s.ep=!0;const l=d(s);fetch(s.href,l)}})();const X=(o,e=4)=>{const d={};return o.forEach(([p,s])=>{const l=document.createElement("canvas"),t=l.getContext("2d"),i=50;l.width=i,l.height=i,t.imageSmoothingEnabled=!1,t.font=`${i}px sans-serif`,t.textAlign="center",t.textBaseline="middle",t.fillText(p,i/2,i/2);const y=i/e,g=document.createElement("canvas");g.width=y,g.height=y;const w=g.getContext("2d");w.imageSmoothingEnabled=!1,w.drawImage(l,0,0,y,y),t.clearRect(0,0,i,i),t.drawImage(g,0,0,y,y,0,0,i,i),t.drawImage(l,0,0);const M=t.getImageData(0,0,i,i),m=M.data;for(let C=0;C<m.length;C+=4){const A=m[C],L=m[C+1],S=m[C+2];A<30&&L<30&&S<30&&(m[C+3]=0)}t.putImageData(M,0,0);const v=l.toDataURL("image/png");d[s]=v}),d},N=()=>({sound:!1,flowers:0,mushrooms:0,turn:0,misses:0,score:0,page:"main",mapPopulated:!1,gridSize:4,selectedType:"mushroom",lockedX:[],lockedY:[],correct:[],incorrect:[]}),B=(o,e)=>({events:{play:()=>k("puzzle"),playWithSound:()=>{e.sound=!0,k("puzzle")}}}),H=o=>{const e=Array(o).fill(null).map(()=>Array(o).fill("")),d=Array(o).fill(null).map(()=>Array(o).fill("")),p=[],s=Math.floor(Math.random()*(o*o/3))+o;for(let l=0;l<s;l++){let t,i;do t=Math.floor(Math.random()*o),i=Math.floor(Math.random()*o);while(e[t][i]==="tree");e[t][i]="tree",d[t][i]="tree",p.push([t,i])}p.forEach(([l,t])=>{const i=[[0,-1],[-1,0],[1,0],[0,1]];for(let[a,y]of i){const g=l+a,w=t+y;$(g,w,o)&&e[g][w]===""&&Math.random()<.7&&(e[g][w]="mushroom")}});for(let l=0;l<o;l++)for(let t=0;t<o;t++)e[l][t]===""&&O(l,t,e,o)&&Math.random()<.7&&(e[l][t]="flower");return{playerSelections:d,board:e}};function O(o,e,d,p){const s=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];for(let[l,t]of s){const i=o+l,a=e+t;if($(i,a,p)&&d[i][a]==="tree")return!1}return!0}function $(o,e,d){return o>=0&&o<d&&e>=0&&e<d}const T=o=>document.querySelector(o);function E(o,e){const d=T(".stats-value.score"),p=T(".stats-value.misses");d.textContent=o,p.textContent=e}const z=(o,e)=>{const d=document.getElementById("particleCanvas"),p=d.getContext("2d");let s;function l(m,v,C){return{x:m,y:v,image:C,size:Math.random()*20+10,speedY:Math.random()*-3-2,speedX:Math.random()*2-1,gravity:.1,opacity:1}}function t(m){m.speedY+=m.gravity,m.x+=m.speedX,m.y+=m.speedY,m.opacity-=.02,m.opacity<0&&(m.opacity=0)}function i(m){p.globalAlpha=m.opacity,p.drawImage(m.image,m.x,m.y,m.size,m.size),p.globalAlpha=1}const a=[];function y(m,v,C,A){const L=new Image;L.src=A,L.onload=()=>{for(let S=0;S<C;S++)a.push(l(m,v,L))}}function g(){p.clearRect(0,0,d.width,d.height);for(let m=a.length-1;m>=0;m--){const v=a[m];t(v),i(v),(v.y>d.height||v.opacity===0)&&a.splice(m,1)}s=requestAnimationFrame(g)}function w(){cancelAnimationFrame(s)}function M(m,v){m&&v?(d.width=m,d.height=v):(d.width=window.innerWidth,d.height=window.innerHeight)}return g(),{initParticles:y,stopParticles:w,setCanvasSize:M}},Y=()=>{const o=[{note:"E5",duration:"sixteenth"},{note:"C5",duration:"sixteenth"},{note:"G4",duration:"sixteenth"}],e={C5:523.25,E5:659.25,G4:392,Rest:0},d={sixteenth:.25},p=.05,s=new(window.AudioContext||window.webkitAudioContext);function l(i,a,y){if(i===0)return;const g=s.createOscillator(),w=s.createGain();g.frequency.setValueAtTime(i,y),g.type="square";const M=.005,m=.01,v=.6,C=.02;w.gain.setValueAtTime(0,y),w.gain.linearRampToValueAtTime(1,y+M),w.gain.linearRampToValueAtTime(v,y+M+m),w.gain.setValueAtTime(v,y+a-C),w.gain.linearRampToValueAtTime(0,y+a),g.connect(w),w.connect(s.destination),g.start(y),g.stop(y+a)}function t(){let i=s.currentTime;o.forEach(a=>{const y=e[a.note],g=p*d[a.duration];y!==void 0&&(l(y,g,i),i+=g)})}return s.resume().then(()=>{console.log("AudioContext is ready for playback")}),{playCoinClinkSound:t}},F=(o,e)=>{const{playCoinClinkSound:d}=Y(),{gridSize:p,images:s}=e,{playerSelections:l,board:t}=H(p),{initParticles:i,stopParticles:a,setCanvasSize:y}=z();function g(h){const r=Array(h[0].length).fill(0),c=Array(h.length).fill(0),n=Array(h.length).fill(0),f=Array(h[0].length).fill(0);for(let x=0;x<h.length;x++)for(let u=0;u<h[x].length;u++)h[x][u]==="flower"?(r[u]++,n[x]++):h[x][u]==="mushroom"&&(f[u]++,c[x]++);return{top:r,right:c,left:n,bottom:f}}const{top:w,right:M,left:m,bottom:v}=g(t);function C(){E(e.score,e.misses);const h=o.querySelector("#game-board");if(h){h.style.gridTemplateColumns=`40px repeat(${t[0].length}, 40px) 40px`,h.style.gridTemplateRows=`40px repeat(${t.length}, 40px) 40px`,h.innerHTML="";for(let r=-1;r<=t.length;r++)for(let c=-1;c<=t[0].length;c++){const n=document.createElement("div");if(n.classList.add("cell"),(e.lockedY.includes(c+"")||e.lockedX.includes(r+""))&&n.classList.add("disabled"),e.correct.some(f=>f[0]===r&&f[1]===c)&&n.classList.add("correct"),e.incorrect.some(f=>f[0]===r&&f[1]===c)&&n.classList.add("incorrect"),c===-1&&r===-1){const f=document.createElement("img");f.src=s.flower3,f.classList.add("tile-image"),n.appendChild(f)}else if(c===t[0].length&&r===t.length){const f=document.createElement("img");f.src=s.mushroom,f.classList.add("tile-image"),n.appendChild(f)}else if(c===t[0].length&&r===-1)n.classList.add("clear-cell");else if(c===-1&&r===t.length)n.classList.add("clear-cell");else if(r===-1&&c>=0&&c<t[0].length)n.classList.add("header-cell"),n.dataset.event="headerCellClick",n.dataset.payload=`x--${c}`,n.textContent=w[c];else if(c===-1&&r>=0&&r<t.length)n.classList.add("header-cell"),n.dataset.event="headerCellClick",n.dataset.payload=`y--${r}`,n.textContent=m[r];else if(c===t[0].length&&r>=0&&r<t.length)n.classList.add("header-cell"),n.dataset.event="headerCellClick",n.dataset.payload=`y--${r}`,n.textContent=M[r];else if(r===t.length&&c>=0&&c<t[0].length)n.classList.add("header-cell"),n.dataset.event="headerCellClick",n.dataset.payload=`x--${c}`,n.textContent=v[c];else if(c>=0&&c<t[0].length&&r>=0&&r<t.length){n.setAttribute("data-x",c),n.setAttribute("data-y",r),n.dataset.event="cellClick";const f=document.createElement("img");t[r][c]==="tree"?(f.src=s.tree2,f.classList.add("tile-image"),n.appendChild(f),n.dataset.type="tree"):l[r][c]==="flower"?(f.src=s.flower3,f.classList.add("tile-image"),n.appendChild(f),n.dataset.type="flower"):l[r][c]==="mushroom"&&(f.src=s.mushroom,f.classList.add("tile-image"),n.appendChild(f),n.dataset.type="mushroom")}h.appendChild(n)}y(h.offsetWidth,h.offsetHeight)}}const A=h=>{const r=parseInt(h.target.getAttribute("data-x")),c=parseInt(h.target.getAttribute("data-y"));l[c][r]==="flower"||l[c][r]==="mushroom"?l[c][r]="":e.selectedType&&t[c][r]!=="tree"&&(l[c][r]=e.selectedType),C()},L=()=>{e.selectedType="flower",o.querySelector(".button.selected").classList.remove("selected"),o.querySelector(".button[data-event='flowerButton']").classList.add("selected")},S=()=>{e.selectedType="mushroom",o.querySelector(".button.selected").classList.remove("selected"),o.querySelector(".button[data-event='mushroomButton']").classList.add("selected")},W=(h,r)=>{const[c,n]=r.split("--"),{correct:f,incorrect:x}=q(l,t,c==="x"?"y":"x",parseInt(n));c==="y"&&!e.lockedX.includes(n)&&e.lockedX.push(n),c==="x"&&!e.lockedY.includes(n)&&e.lockedY.push(n),e.misses+=x,e.score+=f,e.misses>=13&&(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],a(),k("lose"),e.score=0,e.misses=0,E(e.score,e.misses)),(e.lockedX.length===t.length||e.lockedY.length===t[0].length)&&e.gridSize===13&&e.misses<13&&(e.gridSize=4,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],a(),k("win")),(e.lockedX.length===t.length||e.lockedY.length===t[0].length&&e.misses<13)&&(e.gridSize++,e.lockedX=[],e.lockedY=[],e.correct=[],e.incorrect=[],a(),k("next")),C()};function q(h,r,c,n){let f=0,x=0;if(c==="x")for(let u=0;u<r[0].length;u++)e.lockedY.includes(u.toString())||(h[n][u]===r[n][u]?(h[n][u]==="flower"||h[n][u]==="mushroom")&&(f++,e.correct.push([n,u]),setTimeout(()=>{i(u*50+50,n*50+50,100,s.star),e.sound&&d()},u*100)):(h[n][u]==="flower"||h[n][u]==="mushroom"||h[n][u]==="")&&(setTimeout(()=>{i(u*50+50,n*50+50,100,s.fail)},u*30),e.incorrect.push([n,u]),x++));else if(c==="y")for(let u=0;u<r.length;u++)e.lockedX.includes(u.toString())||(h[u][n]===r[u][n]?(h[u][n]==="flower"||h[u][n]==="mushroom")&&(f++,e.correct.push([u,n]),setTimeout(()=>{i(n*50+50,u*50+50,100,s.star),e.sound&&d()},u*100)):(h[u][n]==="flower"||h[u][n]==="mushroom"||h[u][n]==="")&&(setTimeout(()=>{i(n*50+50,u*50+50,100,s.fail)},u*50),e.incorrect.push([u,n]),x++));return{correct:f,incorrect:x}}return C(),{events:{flowerButton:L,mushroomButton:S,headerCellClick:W,cellClick:A}}},R=(o,e)=>{const d=()=>k("puzzle"),p=document.querySelector(".next-level");return p.textContent=e.gridSize-3,{events:{continueSearch:d}}},D=[["🌲","tree"],["🌳","tree2"],["🏔️","mountain"],["💧","water"],["🌿","flower"],["🌱","flower2"],["🌺","flower3"],["🪷","flower4"],["🍄","mushroom"],["⭐️","star"],["🌟","star2"],["✨","star3"],["🌙","star4"],["🔴","fail"]],V=(o,e)=>{const{playCoinClinkSound:d}=Y(),p=o.querySelector(".final-score");p.textContent=e.score;let s;const{initParticles:l,stopParticles:t,setCanvasSize:i}=z();i();function a(){for(let g=0;g<10;g++){const w=Math.random()>.5?e.images.star:e.images.star2;l(Math.random()*window.innerWidth,Math.random()*window.innerHeight,10,w)}if(e.sound)for(let g=0;g<5;g++)setTimeout(()=>{d()},g*100);s=setTimeout(a,2e3)}return a(),{events:{continueSearch:()=>{k("puzzle"),clearTimeout(s),t(),e.score=0,e.misses=0,E(e.score,e.misses)}}}},G=()=>({events:{continueSearch:()=>k("puzzle")}}),P=T("#app"),b=N(),j=X(D);b.images=j;b.vWidth=Math.max(document.documentElement.clientWidth||0,window.innerWidth||0);b.vHeight=Math.max(document.documentElement.clientHeight||0,window.innerHeight||0);b.xOrigin=Math.floor(7e3/2);b.yOrigin=Math.floor(7e3/2);let I;function K(o){const e=document.querySelector(".stars-moon");for(let s=0;s<o;s++)d(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),Math.random()*100/5,b.images.star3);p(Math.random()*window.innerWidth,Math.random()*(window.innerHeight/1.5),Math.random()*50,b.images.star4);function d(s,l,t,i){const a=document.createElement("div");a.classList.add("star"),a.style.left=`${s}px`,a.style.top=`${l}px`,a.style.width=`${t}px`,a.style.height=`${t}px`,a.style.backgroundImage=`url(${i})`,a.style.animation=`twinkle ${Math.random()*2+8}s infinite`,e.appendChild(a)}function p(s,l,t,i){const a=document.createElement("div");a.classList.add("moon"),a.style.left=`${s}px`,a.style.top=`${l}px`,a.style.width=`${t}px`,a.style.height=`${t}px`,a.style.backgroundImage=`url(${i})`,e.appendChild(a)}}K(20);const J={main:{html:`
    <div class="general-container">
      <h2>Welcome to the Mushroom Kingdom</h2>
      <h4>Goal: Find all mushrooms and flowers correctly over 9 levels without getting 13 incorrect answers.</h4>
      <p><button class="play" data-event="playWithSound">Play With Sound</button></p>
      <p><button class="play" data-event="play">Play</button></p>
      <p>
      <h4>Rules:</h4>
      <ul>
        <li>Flowers must not be placed adjacent to trees.</li>
        <li>Mushrooms must be placed adjacent to trees.</li>
        <li>Number on the right and bottom are mushrooms in that row or column</li>
        <li>Number on the top and left are flowers in that row or column</li>
        <li>Click a number to score that row and column</li>
        <li>When all spaces on the grid are scored progress to the next level if you have fewer than 13 misses.</li>
      </ul>

      </p>
    </div>
    `,funct:B},puzzle:{html:`
    <div class="puzzle-container"><canvas id="particleCanvas"></canvas><div id="game-board"></div></div>
    <div class="button-container"> 
      <button class="button unstyled-button" data-event="flowerButton"><img src="${b.images.flower3}" class="button-image" /> Flower</button>
      <button class="button unstyled-button selected" data-event="mushroomButton"><img src="${b.images.mushroom}" class="button-image" /> Mushroom</button>
    </div>`,funct:F},next:{html:`
    <div class="general-container">
      <h2>Continue your search?</h2>
      <p>Next Level: <span class="next-level"></span></p>
      <button class="continue unstyled-button" data-event="continueSearch">Continue</button>
    </div>
    `,funct:R},win:{html:`
    <canvas id="particleCanvas"></canvas>
    <div class="general-container">
      <h2>You win</h2>
      <h3>Your final score is <span class="final-score"></span>!</h3>
      <button class="continue unstyled-button" data-event="continueSearch">Play again?</button>
    </div>
    `,funct:V},lose:{html:`
    <div class="general-container">
      <h2>You lose</h2>
      <button class="continue unstyled-button" data-event="continueSearch">Play again?</button>
    </div>`,funct:G}};function k(o){b.page=o;const e=J[o];P.innerHTML=e.html,setTimeout(()=>{const d=e.funct(P,b);d!=null&&d.events&&(I=d.events)},0)}P.addEventListener("click",o=>{if(I[o.target.dataset.event]){const e=o.target.dataset.payload?o.target.dataset.payload:null;I[o.target.dataset.event](o,e)}});k("main");

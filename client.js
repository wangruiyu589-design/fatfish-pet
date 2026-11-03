var FatFishLive2D=(()=>{var Ta=Object.defineProperty;var hr=Object.getOwnPropertyDescriptor;var ur=Object.getOwnPropertyNames;var dr=Object.prototype.hasOwnProperty;var fr=(o,n)=>()=>(o&&(n=o(o=0)),n);var Va=(o,n)=>{for(var M in n)Ta(o,M,{get:n[M],enumerable:!0})},pr=(o,n,M,a)=>{if(n&&typeof n=="object"||typeof n=="function")for(let I of ur(n))!dr.call(o,I)&&I!==M&&Ta(o,I,{get:()=>n[I],enumerable:!(a=hr(n,I))||a.enumerable});return o};var gr=o=>pr(Ta({},"__esModule",{value:!0}),o);var Ya={};Va(Ya,{createRig:()=>ca});function qa(o,n,M){let a=o.createShader(n);if(o.shaderSource(a,M),o.compileShader(a),!o.getShaderParameter(a,o.COMPILE_STATUS))throw new Error(o.getShaderInfoLog(a));return a}function ca(o,n){let M={premultipliedAlpha:!0,alpha:!0,antialias:!0,preserveDrawingBuffer:!0},a=o.getContext("webgl2",M)||o.getContext("webgl",M);if(!a)throw new Error("webgl unavailable");let I=A=>(A&A-1)===0,D=typeof WebGL2RenderingContext<"u"&&a instanceof WebGL2RenderingContext,Ee=A=>D||I(A.width)&&I(A.height),L=n.deformers,C=n.view,O=new Map,ee=new Map;function p(A,X){if(e)return null;ee.set(A,X);let N=O.get(A);N||(N=a.createTexture(),O.set(A,N)),a.bindTexture(a.TEXTURE_2D,N),a.pixelStorei(a.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!0),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,X);let j=Ee(X);return j&&a.generateMipmap(a.TEXTURE_2D),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,j?a.LINEAR_MIPMAP_LINEAR:a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),N}let i=A=>{let X=[];for(let N=A;N;N=L[N].parent)X.push(N);return X},x,u,_e=[],Ye=[];function Xe(){Ye=[qa(a,a.VERTEX_SHADER,mr),qa(a,a.FRAGMENT_SHADER,yr)],x=a.createProgram();for(let A of Ye)a.attachShader(x,A);if(a.linkProgram(x),!a.getProgramParameter(x,a.LINK_STATUS))throw new Error(a.getProgramInfoLog(x));u={aPos:a.getAttribLocation(x,"aPos"),aUv:a.getAttribLocation(x,"aUv"),uView:a.getUniformLocation(x,"uView"),uTex:a.getUniformLocation(x,"uTex"),uAlpha:a.getUniformLocation(x,"uAlpha"),uTint:a.getUniformLocation(x,"uTint"),uTex2:a.getUniformLocation(x,"uTex2"),uMix:a.getUniformLocation(x,"uMix")},_e=n.parts.map(A=>{let[X,N]=A.grid||[6,6],[j,U,oe,_]=A.box,[R,Ae,$e,Qe]=A.uvBox||[0,0,1,1],Fe=new Float32Array((X+1)*(N+1)*2),g=new Float32Array(Fe.length),fe=0;for(let Je=0;Je<=N;Je++)for(let He=0;He<=X;He++)Fe[fe]=j+oe*He/X,Fe[fe+1]=U+_*Je/N,g[fe]=R+($e-R)*He/X,g[fe+1]=Ae+(Qe-Ae)*Je/N,fe+=2;let dt=[];for(let Je=0;Je<N;Je++)for(let He=0;He<X;He++){let et=Je*(X+1)+He,Pe=et+1,ft=et+X+1,Ht=ft+1;dt.push(et,Pe,ft,Pe,Ht,ft)}let v=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,v),a.bufferData(a.ARRAY_BUFFER,Fe.byteLength,a.DYNAMIC_DRAW);let Ze=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,Ze),a.bufferData(a.ARRAY_BUFFER,g,a.STATIC_DRAW);let Te=a.createBuffer();return a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,Te),a.bufferData(a.ELEMENT_ARRAY_BUFFER,new Uint16Array(dt),a.STATIC_DRAW),{part:A,rest:Fe,out:new Float32Array(Fe.length),pos:v,uvb:Ze,ib:Te,count:dt.length}}),_e.forEach(A=>{A.chain=i(A.part.parent)}),a.enableVertexAttribArray(u.aPos),a.enableVertexAttribArray(u.aUv)}let ie=!1;o.addEventListener("webglcontextlost",A=>{A.preventDefault(),ie=!0}),o.addEventListener("webglcontextrestored",()=>{if(!e){ie=!1,O.clear(),Xe();for(let[A,X]of ee)p(A,X)}}),Xe();let e=!1;function H(){if(!e){e=!0,ie=!0;try{for(let A of O.values())a.deleteTexture(A);for(let A of _e)a.deleteBuffer(A.pos),a.deleteBuffer(A.uvb),a.deleteBuffer(A.ib);x&&a.deleteProgram(x);for(let A of Ye)a.deleteShader(A)}finally{a.getExtension("WEBGL_lose_context")?.loseContext()}}}function te(A,X,N,j){for(let U of A){let oe=L[U],_=X[U];if(_){if(oe.kind==="rot"){let[R,Ae]=oe.pivot,$e=(_.a||0)*Math.PI/180,Qe=Math.cos($e),Fe=Math.sin($e),g=_.sx??_.s??1,fe=_.sy??_.s??1,dt=(N-R)*g,v=(j-Ae)*fe;N=R+(_.tx||0)+dt*Qe-v*Fe,j=Ae+(_.ty||0)+dt*Fe+v*Qe}else if(oe.kind==="warp"&&_.fn){let[R,Ae,$e,Qe]=oe.rect,Fe=Math.min(1,Math.max(0,(N-R)/($e-R))),g=Math.min(1,Math.max(0,(j-Ae)/(Qe-Ae))),fe=_.fn(Fe,g,N,j);N+=fe[0],j+=fe[1]}}}return[N,j]}function bt(A,X={}){if(ie||a.isContextLost())return;let N=o.width,j=o.height;a.viewport(0,0,N,j),a.clearColor(0,0,0,0),a.clear(a.COLOR_BUFFER_BIT),a.useProgram(x),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.uniform4f(u.uView,C[0],C[1],1/(C[2]-C[0]),1/(C[3]-C[1])),a.uniform1i(u.uTex,0),a.uniform1i(u.uTex2,1);let U=Math.min(1,Math.max(0,A.mix||0)),oe=_e.filter(_=>!(X.hidden&&X.hidden[_.part.id])).map(_=>({m:_,z:A.z?.[_.part.id]??_.part.z})).sort((_,R)=>_.z-R.z);for(let{m:_}of oe){let R=_.part,Ae=A.alpha?.[R.id]??R.alpha??1,$e=O.get(R.tex);if(!$e||Ae<=.001)continue;for(let g=0;g<_.rest.length;g+=2){let fe=te(_.chain,A,_.rest[g],_.rest[g+1]);_.out[g]=fe[0],_.out[g+1]=fe[1]}a.bindBuffer(a.ARRAY_BUFFER,_.pos),a.bufferSubData(a.ARRAY_BUFFER,0,_.out),a.vertexAttribPointer(u.aPos,2,a.FLOAT,!1,0,0),a.bindBuffer(a.ARRAY_BUFFER,_.uvb),a.vertexAttribPointer(u.aUv,2,a.FLOAT,!1,0,0),a.bindBuffer(a.ELEMENT_ARRAY_BUFFER,_.ib);let Qe=U>0?O.get(R.tex+"@mix"):null;a.activeTexture(a.TEXTURE1),a.bindTexture(a.TEXTURE_2D,Qe||$e),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,$e),a.uniform1f(u.uMix,Qe?U:0),a.uniform1f(u.uAlpha,Ae);let Fe=A.tint?.[R.id];a.uniform4f(u.uTint,...Fe||[1,1,1,0]),R.blend==="multiply"&&a.blendFuncSeparate(a.DST_COLOR,a.ONE_MINUS_SRC_ALPHA,a.ZERO,a.ONE),a.drawElements(a.TRIANGLES,_.count,a.UNSIGNED_SHORT,0),R.blend==="multiply"&&a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA)}}return{gl:a,upload:p,render:bt,dispose:H,point(A,X,N,j){return te(i(A),X,N,j)},setView(A){C=A},get view(){return C}}}var mr,yr,ha=fr(()=>{mr=`
attribute vec2 aPos; attribute vec2 aUv;
uniform vec4 uView; // x0, y0, 1/w, 1/h
varying vec2 vUv;
void main() {
  vec2 n = (aPos - uView.xy) * uView.zw;
  gl_Position = vec4(n.x * 2.0 - 1.0, 1.0 - n.y * 2.0, 0.0, 1.0);
  vUv = aUv;
}`,yr=`
precision mediump float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform sampler2D uTex2;
uniform float uMix;
uniform float uAlpha;
uniform vec4 uTint; // rgb multiply, a = mix toward it
void main() {
  vec4 c = mix(texture2D(uTex, vUv), texture2D(uTex2, vUv), uMix);
  c.rgb = mix(c.rgb, c.rgb * uTint.rgb, uTint.a);
  gl_FragColor = c * uAlpha;
}`});var Lr={};Va(Lr,{mountLivePet:()=>Ir});var kr={},me=o=>Math.round(o*100)/100,W=(o,n,M)=>Math.max(n,Math.min(M,o)),Q=(o,n,M)=>o+(n-o)*M,Ue=(o,n)=>1-Math.exp(-o*n),ua=o=>Math.sin(Math.PI*W(o,0,1)),vt=(o,n,M)=>{let a=W((M-o)/(n-o),0,1);return a*a*(3-2*a)},da="http://www.w3.org/2000/svg",de={x:520,y:578,w:390,h:252},fa=[30,12,215,168];function Xa([o,n],M,a){let I=Math.cos(M*Math.PI/180),D=Math.sin(M*Math.PI/180);return(Ee,L,C,O)=>{let ee=vt(n-6,n+14,O),p=C-o,i=O-n;return[(p*I-i*D-p)*ee,(p*D+i*I-i+a)*ee]}}var Ha=!1;function it(o,n,M=1/0){return{x:0,v:0,step(a,I){return!Number.isFinite(a)||!Number.isFinite(I)?(Ha||(Ha=!0,console.warn(`[\u5927\u80A5\u9C7C] \u5F39\u7C27\u6536\u5230\u7684\u76EE\u6807\u4E0D\u662F\u6709\u9650\u6570,\u8FD9\u4E00\u5E27\u4E0D\u52A8:target=${a} dt=${I}`)),this.x):(this.v+=((a-this.x)*o-this.v*n)*I,this.x+=this.v*I,Math.abs(this.x)>M&&(this.x=Math.sign(this.x)*M,this.v=0),this.x)}}}function xr(o){return new Promise((n,M)=>{let a=new Image;a.onload=()=>n(a),a.onerror=M,a.src=o})}async function ja(o=new URL("./",kr.url),n={}){let M=n.kit?.createRig??(await Promise.resolve().then(()=>(ha(),Ya))).createRig,a=n.model||await(await fetch(new URL("model.json",o))).json(),I=n.asset||(s=>new URL(s,o)),D=n.loadImage||xr,{S:Ee,X0:L,FEET:C}=a.units,O=s=>128+(s-L)*Ee,ee=s=>256-(C-s)*Ee,p=a.feat,i=["eyeL","eyeR"],x=[...Object.keys(p.sprites),...i.flatMap(s=>["lash","ball","iris",...p.eyes[s].rim?["rim"]:[]].map(h=>`${s}_${h}`))],u=(a.schemes||[{id:"deepseek"}]).filter(s=>s.ready!==!1),_e=s=>u.find(h=>h.id===s)||u[0],Ye=a.outfits||[{id:"maid"}],Xe=s=>Ye.find(h=>h.id===s)||Ye[0],ie=s=>{let[h,r]=String(s??"").split("-");return{scheme:_e(h).id,outfit:Xe(r).id}},e=s=>Xe(s).parts||a.parts,H=()=>_e(X).accent||"#4d6bfe",te={},bt={};function A(s,h){let r=`${s}-${h}`;if(te[r])return te[r];let d=s===u[0].id?"":`schemes/${s}/`,f={tex:{},img:{}};return te[r]=Promise.all([...e(h).map(async b=>{f.tex[b.tex]=await D(I(b.src||`${d}tex/${b.tex}.png`))}),...x.map(async b=>{f.img[b]=await D(I(`${d}feat/${b}.png`))}),..._e(s).eyeHighlights?i.map(async b=>{f.img[`${b}_hl`]=await D(I(`${d}feat/${b}_hl.png`))}):[]]).then(()=>bt[r]=f),te[r]}let{scheme:X,outfit:N}=ie(n.scheme),{tex:j,img:U}=await A(X,N),oe=[{outer:[610,559.5],inner:[703,548.7],x0:596,x1:765},{outer:[890,560.8],inner:[837,555.6],x0:765,x1:904}];function _(s){let h=e(s),r={...a.pivots,...Xe(s).pivots},d=Object.fromEntries([...a.parts,...h].map(P=>[P.id,P.box])),f=P=>{let[ge,E,at,Ce]=d[P];return[ge,E,ge+at,E+Ce]},b={body:{kind:"rot",pivot:r.body},skirt:{kind:"warp",parent:"body",rect:f("skirt")},skirtSit:{kind:"warp",parent:"body",rect:f("skirt_sit")},waist:{kind:"rot",parent:"body",pivot:r.waist},armNear:{kind:"rot",parent:"waist",pivot:r.armNear},armFar:{kind:"rot",parent:"waist",pivot:r.armFar},legBack:{kind:"warp",parent:"body",rect:f("leg_back")},legFront:{kind:"warp",parent:"body",rect:f("leg_front")},tail:{kind:"rot",parent:"body",pivot:r.tail},tailBend:{kind:"warp",parent:"tail",rect:f("tail")},neck:{kind:"rot",parent:"waist",pivot:r.neck},headBack:{kind:"warp",parent:"neck",rect:fa},headMid:{kind:"warp",parent:"neck",rect:fa},headFeat:{kind:"warp",parent:"neck",rect:fa},headFront:{kind:"warp",parent:"neck",rect:fa},hairSway:{kind:"warp",parent:"headBack",rect:f("hair_back")},bangsSway:{kind:"warp",parent:"headFront",rect:f("bangs")},finNear:{kind:"rot",parent:"headMid",pivot:r.finNear},finFar:{kind:"rot",parent:"headBack",pivot:r.finFar},ahoge:{kind:"rot",parent:"headFront",pivot:r.ahoge}},y=Xe(s).deformers||{};for(let[P,ge]of Object.entries(y))b[P]={kind:"rot",parent:ge.parent,pivot:ge.pivot};let k=h.map(P=>({...P,parent:P.id==="torso_up"?"waist":P.parent}));k.push({id:"faceFx",tex:"faceFx",box:[O(de.x),ee(de.y),de.w*Ee,de.h*Ee],z:9,parent:"headFeat",grid:[4,4]});let S=k.find(P=>P.id==="brows");if(S){k.splice(k.indexOf(S),1);let[P,ge,E,at]=S.box;oe.forEach((Ce,ne)=>{let Me=Math.max(P,O(Ce.x0)),ht=Math.min(P+E,O(Ce.x1)),Oe=(Me-P)/E,xt=(ht-P)/E,rt=[O((Ce.outer[0]+Ce.inner[0])/2),ee((Ce.outer[1]+Ce.inner[1])/2)];b[`brow${ne}`]={kind:"rot",parent:"headFeat",pivot:rt},b[`browBend${ne}`]={kind:"warp",parent:`brow${ne}`,rect:[Me,ge,ht,ge+at]},b[`browOver${ne}`]={kind:"rot",parent:`browBend${ne}`,pivot:rt};for(let[kt,Le,nt]of[["",S.z,1],["_through",13.2,.55]])k.push({...S,id:`brow${ne}${kt}`,box:[Me,ge,ht-Me,at],uvBox:[Oe,0,xt,1],parent:`browBend${ne}`,z:Le,alpha:nt,grid:[12,2]}),k.push({...S,id:`browOver${ne}${kt}`,box:[Me,2*rt[1]-ge-at,ht-Me,at],uvBox:[Oe,1,xt,0],parent:`browOver${ne}`,z:Le,alpha:nt,grid:[12,2]})})}let J=k.find(P=>P.id==="eye_creases");J&&(b.creases={kind:"warp",parent:"headFeat",rect:f("eye_creases")},J.parent="creases");let re=Xe(s).heldArms??1,Ke=Xe(s).tailRoot?{x:r.tail[0],tip:f("tail")[0]}:null;return{PV:r,deformers:b,parts:k,brows:S,creases:J,swings:y,heldArms:re,tailRoot:Ke}}let R=_(N),Ae=document.createElement("canvas");Ae.width=de.w,Ae.height=de.h;let $e=document.createElement("canvas");$e.width=de.w,$e.height=de.h;let Qe=Ae.getContext("2d"),Fe=$e.getContext("2d"),g=Qe,fe=document.createElement("canvas"),dt="#5a2330",v=(s,h)=>s[0]*h*h+s[1]*h+s[2],Ze=Object.fromEntries(i.map(s=>{let h=p.eyes[s],[r,,d]=h.ball,f=0;for(let y=r+4;y<d-4;y+=2)f=Math.max(f,v(h.rimFit,y)-v(h.lidFit,y));let b=(h.iris[0]+h.iris[2])/2;return[s,{...h,travel:f+2,cx:b,cy:v(h.lidFit,b)}]})),Te={dx:0,dy:0,scale:1,quiver:0,alpha:1},Je={sad:{scale:1.12,quiver:1},worried:{scale:1.1,quiver:.8},shy:{scale:1.1,quiver:.6},pout:{scale:1.06,quiver:.4},excited:{scale:1.18},listening:{scale:1.06},angry:{scale:.78},determined:{scale:.86},sleepy:{scale:.92,alpha:.7},content:{alpha:.8},waking:{alpha:.75}};function He(s,h,r,d,f,b=0,y=0){let k=Ze[s],[S,J,re,Ke]=k.ball,P=re-S,ge=Ke-J;(fe.width!==P+40||fe.height!==ge+40)&&(fe.width=P+40,fe.height=ge+40);let E=fe.getContext("2d");E.setTransform(1,0,0,1,20-S,20-J),E.clearRect(S-20,J-20,P+40,ge+40),E.globalCompositeOperation="source-over",E.drawImage(U[`${s}_ball`],S,J),E.globalCompositeOperation="source-atop",E.drawImage(U[`${s}_iris`],k.iris[0]+r,k.iris[1]+d);let at=(1-W(h,0,1))*k.travel,Ce=Math.tan(f),ne=U[`${s}_hl`];if(ne&&k.hl){let Oe=s==="eyeL"?1:.35,xt=s==="eyeL"?0:1.7,rt=Te.quiver,kt=ne.width*Te.scale,Le=ne.height*Te.scale,nt=(k.hl[0]+k.hl[2])/2+r+(Te.dx+rt*.8*Math.sin(y*29+xt))*Oe,ut=(k.hl[1]+k.hl[3])/2+d+Te.dy+rt*.6*Math.sin(y*37+xt),We=v(k.lidFit,W(nt,S,re))+at+Ce*(nt-k.cx)+2;ut-Le/2<We&&(ut=Math.max(ut,Math.min(We+Le/2,(k.iris[1]+k.iris[3])/2+d))),E.globalAlpha=Te.alpha,E.drawImage(ne,nt-kt/2,ut-Le/2,kt,Le),E.globalAlpha=1}if(k.rim&&(E.globalCompositeOperation="source-over",E.drawImage(U[`${s}_rim`],k.rim[0],k.rim[1])),b>0){E.globalCompositeOperation="source-atop";let Oe=s==="eyeL"?1:.6,xt=[(k.iris[0]+k.iris[2])/2+r,(k.iris[1]+k.iris[3])/2+d];[[-.16,-.2,24],[.2,.2,13]].forEach(([rt,kt,Le],nt)=>{let ut=Le*b*(.8+.3*Math.sin(y*7+nt*2+(s==="eyeL"?0:1))),We=ut*.28,Dt=xt[0]+rt*(k.iris[2]-k.iris[0]),Gt=xt[1]+kt*(k.iris[3]-k.iris[1]);E.save(),E.translate(Dt,Gt),E.scale(Oe,1),E.fillStyle="rgba(255,255,255,.95)",E.beginPath(),E.moveTo(0,-ut),E.quadraticCurveTo(We,-We,ut,0),E.quadraticCurveTo(We,We,0,ut),E.quadraticCurveTo(-We,We,-ut,0),E.quadraticCurveTo(-We,-We,0,-ut),E.fill(),E.restore()})}E.globalCompositeOperation="destination-out",E.beginPath(),E.moveTo(S-20,J-20);for(let Oe=S-20;Oe<=re+20;Oe+=3)E.lineTo(Oe,v(k.lidFit,W(Oe,S,re))+at+Ce*(Oe-k.cx)-1);E.lineTo(re+20,J-20),E.closePath(),E.fill(),E.globalCompositeOperation="source-over",g.drawImage(fe,S-20-de.x,J-20-de.y);let Me=k.lash,ht=.55+.45*W(h,0,1);g.save(),g.translate(k.cx-de.x,k.cy+at-de.y),g.rotate(f),g.scale(1,ht),g.drawImage(U[`${s}_lash`],Me[0]-k.cx,Me[1]-k.cy),g.restore()}let et={happy_mouth:9,drag_mouth:16,sleep_mouth:4};function Pe(s,h={}){let r=p.sprites[s];if(!r)return;let d=(r[0]+r[2])/2,f=(r[1]+r[3])/2;g.save(),g.globalAlpha=h.alpha??1,g.translate(d-de.x,f+(et[s]||0)-de.y),h.rot&&g.rotate(h.rot),g.scale(h.sx??h.s??1,h.sy??h.s??1),g.drawImage(U[s],r[0]-d,r[1]-f),g.restore()}let ft=[[618,770,40,20],[852,762,22,15]];function Ht(s){if(!(s<.02))for(let[h,r,d,f]of ft){g.save(),g.translate(h-de.x,r-de.y),g.scale(1,f/d);let b=g.createRadialGradient(0,0,0,0,0,d);b.addColorStop(0,`rgba(255,120,140,${me(.55*s)})`),b.addColorStop(1,"rgba(255,120,140,0)"),g.fillStyle=b,g.beginPath(),g.arc(0,0,d,0,Math.PI*2),g.fill(),g.restore()}}function Zt(s,h=1){let r=766-de.x,d=772-de.y;g.save(),g.strokeStyle=dt,g.lineWidth=3,g.lineCap="round",g.beginPath(),g.moveTo(r-9*h,d-s*3),g.quadraticCurveTo(r,d+s*5,r+9*h,d-s*3),g.stroke(),g.restore()}let ga={neutral:"neutral_mouth",happy:"happy_mouth",wink:["happy_mouth",.8],love:"love_mouth",shy:["drag_mouth",.7],surprised:"surprised_mouth",sleepy:"sleep_mouth",sleep:"sleep_mouth",dizzy:"dizzy_mouth",dragged:"drag_mouth",content:"neutral_mouth",waking:["surprised_mouth",.6],squeeze:"sleep_mouth",listening:"neutral_mouth",thinking:"sleep_mouth",run:["happy_mouth",.7],angry:-1,sad:-1.2,smug:.7,pout:["surprised_mouth",.45],worried:["drag_mouth",.6],determined:.15,flustered:["drag_mouth",.8],scared:["drag_mouth",.8],excited:"happy_mouth",cry:["surprised_mouth",.8],confused:-.35},ma={eyeL:816,eyeR:786};function ya(s){g.save(),i.forEach((h,r)=>{let d=Ze[h],[f,,b,y]=d.ball,k=(b-f)*(h==="eyeL"?.22:.2),S=f+(b-f)*(h==="eyeL"?.55:.5)-de.x,J=y-6-de.y,re=Math.min(de.h-4,ma[h]-de.y,J+110),Ke=4*Math.sin(s*6+r),P=g.createLinearGradient(0,J,0,re);P.addColorStop(0,"rgba(120,195,255,.95)"),P.addColorStop(1,"rgba(120,195,255,.3)"),g.fillStyle=P,g.beginPath(),g.moveTo(S-k*.15,J),g.bezierCurveTo(S-k*.5+Ke,J+25,S-k*.55+Ke,re-20,S-k*.4,re),g.quadraticCurveTo(S,re+6,S+k*.4,re),g.bezierCurveTo(S+k*.55+Ke,re-20,S+k*.5+Ke,J+25,S+k*.15,J),g.closePath(),g.fill()}),g.restore()}function Jt(s,h,r,d){g.setTransform(1,0,0,1,0,0),g.clearRect(0,0,de.w,de.h),Ht(s.blush||0),s.streams&&ya(d);let f=Math.max(r.blink||0,r.eyeClose||0),b=W(r.look[0],-6,6),y=W(r.look[1],-5,5),k=s.brows==="angry"?.2:s.brows==="sad"?-.16:0;s.eyes.forEach((P,ge)=>{let E=i[ge],at=E==="eyeL"?1:-1,Ce={sy:1-.85*(r.eyeClose||0)};if((h==="surprised"||s.wide)&&P.shape==="ring"){Pe(`surprised_${E}`,Ce);return}switch(P.shape){case"ring":case"lid":{let ne=(P.shape==="ring"?W(P.ry/P.rx,0,1)*(k?.8:1):W(P.ry/16,0,1))*(1-f),Me=E==="eyeL"?1:.35,ht=W((b+(P.dx||0))*Me,-6*Me,6*Me),Oe=W(y*.7+(P.dy||0)*.7,-3.5,3.5);He(E,ne,ht,Oe+(P.shape==="lid"?3:0),k*at,s.sparkle?1:0,d);break}case"up":Pe(`happy_${E}`,Ce);break;case"down":Pe(`sleep_${E}`,Ce);break;case"gt":case"lt":Pe(`drag_${E}`,{s:1+.03*Math.sin(d*22+ge)});break;case"heart":Pe(`love_${E}`,{s:.94+.06*(P.s??1)/.8});break;case"spiral":Pe(`dizzy_${E}`,{rot:(P.rot||0)*.6});break}});let S=r.talk||0,J=W((Math.max(s.gap[0],s.gap[1])-50)/14,0,1),re=ga[h]??"neutral_mouth",Ke=Math.max(S*(.45+.45*Math.abs(Math.sin(d*17))),h==="sleepy"||h==="waking"?J:0);Ke>.12?Pe(h==="surprised"?"surprised_mouth":"happy_mouth",{sy:.35+.65*Ke,sx:.85+.15*Ke}):typeof re=="number"?Zt(re):Array.isArray(re)?Pe(re[0],{s:re[1]}):Pe(re)}let Se=a.view,Be=null,tt=null,Ft=null,pe=null,Et=null,Pt=0,Ut=0;function ea(s){s.textContent="",pe?.dispose(),pe=null;let h=r=>(r.setAttribute("x",Se[0]),r.setAttribute("y",Se[1]),r.setAttribute("width",Se[2]-Se[0]),r.setAttribute("height",Se[3]-Se[1]),r);tt=document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),n.raster?Be=h(document.createElementNS(da,"image")):(Be=h(document.createElementNS(da,"foreignObject")),tt.style.cssText="width:100%;height:100%;display:block",Be.appendChild(tt)),Ft=document.createElementNS(da,"g"),s.append(Be,Ft),pe=M(tt,{deformers:R.deformers,parts:R.parts,view:Se});for(let r in j)pe.upload(r,j[r]);if(Ie)for(let r in Ie.set.tex)pe.upload(r+"@mix",Ie.set.tex[r]);Et=s,Pt=0}let Ie=null;function jt(){if(Ie&&(j=Ie.set.tex,U=Ie.set.img,Ie=null,pe))for(let s in j)pe.upload(s,j[s])}function xa(s,h={}){let r=ie(s),d=`${r.scheme}-${r.outfit}`,f=b=>{if(jt(),!(X===r.scheme&&N===r.outfit&&j===b.tex)){if(X=r.scheme,N!==r.outfit){N=r.outfit,R=_(N),j=b.tex,U=b.img,pe?.dispose(),pe=null,Et=null;return}if(h.fade>0&&pe){Ie={set:b,dur:h.fade,t0:h.at??null};for(let y in b.tex)pe.upload(y+"@mix",b.tex[y]);return}if(j=b.tex,U=b.img,pe)for(let y in j)pe.upload(y,j[y])}};return bt[d]?(f(bt[d]),Promise.resolve()):A(r.scheme,r.outfit).then(f)}let ta=null,It=0;function ka(){let s=It?null:Et.getScreenCTM();if(!s&&!It)return;let h=It||Math.hypot(s.c,s.d)*(window.devicePixelRatio||1)*1.25;Math.abs(h-Pt)/(Pt||1)<.08||(Pt=h,tt.width=Math.max(16,Math.round((Se[2]-Se[0])*Math.min(h,6))),tt.height=Math.max(16,Math.round((Se[3]-Se[1])*Math.min(h,6))))}let Re={hair:it(55,7,1.8),hairY:it(50,8,1.2),bangs:it(110,10,1.6),skirt:it(100,9,1.6),skirtY:it(90,10,1.1),tail:it(40,5,32),fins:it(90,9,30),ahoge:it(140,6,38),head:it(70,10,16),armN:it(60,9,125),armF:it(60,9,95),hlX:it(160,9,3),hlY:it(160,9,3)},Lt=null,Kt=0,t=0,c=0,l=0,F="",V=null,le=0,ye={},De={air:[1,1],drag:[1,1],crouch:[1,1],land:[1,1],walk:[1,.5],run:[1,.5],dance:[.6,0],tumble:[1,1]},we=0,ot=0,ce=1,xe=0,pt=0,lt=0,he=0,ct=0,je=0,mt=0,_t=(s,h,r)=>h*we+r*ot+je*14*ce,T={z:{},alpha:{}},$t={happy:[.8,1],love:[.9,1],wink:[.5,.7],surprised:[1,.2],angry:[.9,.15],sad:[-1,0],shy:[-.5,.3],sleepy:[-.7,0],sleep:[-.9,0],dizzy:[-.3,0],dragged:[.6,.6],content:[-.2,.25],listening:[.6,.2],thinking:[.1,.15],run:[.2,.4],waking:[-.4,0],squeeze:[-.3,0],neutral:[0,.25],smug:[.5,.6],pout:[.3,0],worried:[-.3,.1],determined:[.9,.3],flustered:[.4,.8],scared:[-1,0],excited:[1,1],cry:[-1,0],confused:[.2,.1],bowing:[-.2,.2]},K=(s,h=0,r=0,d=0)=>[[s,h,r,d],[s,h*.6,r*.6,d*.6]],be={surprised:K(32,4,12),excited:K(20,2,9),happy:K(9,0,6),love:K(9,4,6),listening:K(9,0,4),waking:K(6,6),wink:[[9,0,6,0],[-5,0,3,0]],angry:K(-14,-44,-6,8),determined:K(-6,-28,-3,5),pout:K(-6,-22,-6,5),run:K(2,-12,-3),squeeze:K(-12,-14,-8,6),shy:K(0,16,-4,4),sad:K(-10,30,-2,6),cry:K(-10,38,-4,8),worried:K(-6,24,0,5),scared:K(6,26,0,5),flustered:K(2,22,0,4),dragged:K(-4,24,0,6),sleepy:K(-10,2,-4),sleep:K(-10,4,-2),content:K(-3,0,3),bowing:K(-3,3),dizzy:[[12,14,0,0],[-6,-10,0,0]],thinking:[[-6,-14,-4,4],[14,4,6,0]],smug:[[-8,-18,0,0],[14,-6,4,0]],confused:[[-10,-12,-4,3],[22,6,8,0]]},St=new Set(["sad","cry","worried","scared","flustered","dragged"]),gt={surprised:18,scared:18,excited:14,angry:16,dragged:16,squeeze:16,sad:4,cry:4,worried:6,sleepy:3,sleep:3,content:4},At=new Set(["angry","sad","cry","sleepy","sleep","squeeze","dizzy"]),m={shy:7,thinking:-8,smug:-6,pout:-4,confused:-7,worried:3,cry:4},w={sad:.35,cry:.45,worried:.15},B=O(765),ae=[[0,0,0,0],[0,0,0,0]],ue=0,yt=-1/0,Nt=-1/0,Bt=(s,h,r)=>{let d=s.shape==="ring"?W((s.ry??16)/(s.rx??16),0,1)*(r?.8:1):s.shape==="lid"?W(s.ry/16,0,1):1;return Ze[h].travel*(1-d)*.75},Ct=s=>s.shape==="ring"||s.shape==="lid"?1:0,Mt=[0,0],Ot=1;function Wt(s,h,r){(Et!==s||!s.contains(Be))&&ea(s),Ut++%20===0&&ka();let d=r.t,f=Lt==null?1/60:W(d-Lt,0,.05);Lt=d;let b=r.mode||"idle",y=r.face||"neutral";ce=Math.sign(r.facing||1);let k=b==="walk"||b==="run",S=b==="drag",J=b==="air";he=Q(he,W(r.sit??0,0,1),Ue(12,f));let re=r.low||0,Ke=(re-c)/Math.max(f,.001);c=re;let P=Math.sin(d*(b==="sleep"?1.7:2.4)),ge=r.look[0]*.7+Math.sin(d*.9)*1.2+r.look[1]*.4;b==="sleep"&&(ge+=6),ge+=m[y]||0,y==="dizzy"&&(ge+=3*Math.sin(d*4.5)),S&&(ge+=r.swing*.25),l=Re.head.step(ge,f);let[E,at]=De[b]||[0,0],Ce=(r.tilt??0)*(1-we)+(r.lean??0)*Math.sign(r.facing||1)*(1-ot);we=Q(we,E,Ue(10,f)),ot=Q(ot,at,Ue(10,f));let ne=r.gesture,Me=ne?ne.k:0,ht=($,z)=>vt(0,$,Me)*(1-vt(z,1,Me)),Oe=ne?.kind==="nod"?Math.sin(Me*Math.PI*2)**2*(1-.3*Me):0,xt=ne?.kind==="shake"?Math.sin(Me*Math.PI*6)*vt(0,.12,Me)*(1-Me):0,rt=ne?.kind==="wave"?ht(.15,.8):0,kt=ne?.kind==="bow"?ht(.25,.7):0,Le=ne?.kind==="shiver"?ht(.08,.85):0,nt=ne?.kind==="flap"?ht(.05,.75):0,ut=Oe*7+xt*2.5+kt*10+rt*4,We=xt*1.1,Dt=l+ut,Gt=(Dt-Kt)/Math.max(f,.001);Kt=Dt;let aa=(We-t)/Math.max(f,.001);t=We;let ra=W(W(r.look[0]/5,-1,1)*.9+We,-1.4,1.4),er=W(W(r.look[1]/4,-1,1)*.7+(b==="sleep"?.8:0)+(w[y]||0)+Oe*.9+kt*.5,-1.4,1.4),Rt=W(r.swing/26,-1.6,1.6),_a=J||S?1:0,$a=Re.hair.step(Rt*1.1-Gt*.004-aa*.02+(k?-.25:0)-je*.5,f),wa=Re.hairY.step(_a*-1+Ke*.006,f),tr=Re.bangs.step(Rt*.7-Gt*.004-aa*.03,f),Sa=Re.skirt.step(Rt*.8+(k?-.2:0),f),Ra=Re.skirtY.step(_a*.8+he*.6+W(-Ke*.01,-.3,.6),f),[ar,rr]=$t[y]||$t.neutral;xe=Q(xe,Q(ar,-.6,Le),Ue(6,f)),lt=Q(lt,rr,Ue(3,f)),pt=Q(pt,b==="sleep"||y==="sad"||y==="cry"||y==="scared"?-1:0,Ue(3,f));let Fa=Re.fins.step(xe*14+Rt*10,f)+(y==="angry"?2.5*Math.sin(d*40):0)+nt*13*Math.sin(d*26),nr=Re.ahoge.step(-Gt*.12-aa*.5+Rt*18+(y==="surprised"?-16:0)+(y==="confused"?20:0)+(b==="sleep"?22:0)-wa*12,f)+nt*12*Math.sin(d*19),ba=Re.tail.step(Rt*14+pt*12,f)+lt*13*Math.sin(d*(4+5*lt))+Math.sin(d*1.3)*3+nt*14*Math.sin(d*17),Vt=r.legs.map($=>-Math.atan2($[2]-$[0],Math.max(4,$[3]-$[1]))*180/Math.PI),Pa=r.legs.map($=>W(29-Math.hypot($[2]-$[0],$[3]-$[1]),-8,20)),Ia=vt(.44,.54,he),La=Math.sin(Math.PI*vt(.3,.8,he));ct=Q(ct,k?1:0,Ue(8,f)),je=Q(je,b==="run"?1:0,Ue(7,f));let Ne=4,Ve=-2,na=k?1:0;if(J&&(Ne=40,Ve=-30),S&&(Ne=(70+16*Math.sin(d*13))*R.heldArms,Ve=(-45-12*Math.sin(d*13+1.3))*R.heldArms),he>.5&&!k&&(Ne=Q(Ne,-4,he),Ve=Q(Ve,-6,he)),(y==="happy"||y==="love")&&(Ne+=12+5*Math.sin(d*8),Ve-=8+4*Math.sin(d*8)),y==="angry"&&(Ne=20+3*Math.sin(d*30),Ve=-18-3*Math.sin(d*30),na=0),y==="determined"&&(Ne=14,Ve=-10,na=0),y==="excited"&&(Ne+=18,Ve-=12),b==="dance"){let $=Math.sin((r.modeT||0)*Math.PI*2*1.1);Ne=16+24*Math.max(0,$),Ve=-8-22*Math.max(0,-$)}je>.001&&(Ne=Q(Ne,38,je),Ve=Q(Ve,32,je)),rt&&(Ne=Q(Ne,108,rt)),Le&&(Ne=Q(Ne,-10,Le),Ve=Q(Ve,8,Le));let Ma=W(r.reach||0,0,1);if(Ma>.01){let $=Number.isFinite(r.reachNear)?r.reachNear:r.reachHigh?124:92,z=Number.isFinite(r.reachFar)?r.reachFar:r.reachHigh?-124:-92;Ne=Q(Ne,$,Ma),Ve=Q(Ve,z,Ma),na=0}mt=Q(mt,na,Ue(8,f));let Na=mt*(1-je)*(1-rt)*(1-Le)*.5,sr=Re.armN.step(Ne,f)-Vt[0]*Na+rt*13*Math.sin(d*15)+Le*1.4*Math.sin(d*47)+nt*9*Math.sin(d*24),Ca=Re.armF.step(Ve,f)-Vt[1]*Na-Le*1.2*Math.sin(d*43+1)-nt*9*Math.sin(d*24+1);T.body={a:-Rt*1.2+(S?r.swing*.15:0),ty:re-9.6*he,sx:(1+.006*P+.04*La)*(1-.03*Le),sy:1-.012*P-.06*La},T.waist={a:kt*20},T.skirt={fn:($,z)=>{let ke=z*z;return[Sa*4*ke+Ra*($-.45)*9*z+he*($-.45)*10*z,-Ra*ke*3-he*ke*8]}},T.skirtSit={fn:($,z)=>[Sa*1.5*z*z,-Math.max(0,P)*.4*z]},T.alpha.skirt=T.alpha.waist_bow_front=T.alpha.skirt_shadow=1-Ia,T.alpha.leg_back=T.alpha.leg_front=1-vt(.42,.52,he),T.alpha.skirt_sit=T.alpha.waist_bow_sit_front=Ia,T.armNear={a:sr},T.armFar={a:Ca},T.alpha.arm_far_end_front=1-vt(12,30,Ca);let Oa=r.legs.map($=>Math.max(0,$[0]-$[2])*.3*ct);T.legBack={fn:Xa(R.PV.legBack,Q(Vt[0],-55,he),(-Pa[0]*.9-Oa[0])*(1-he))},T.legFront={fn:Xa(R.PV.legFront,Q(Vt[1],-60,he),(-Pa[1]*.9-Oa[1])*(1-he))},T.tail={a:ba-10*he};let sa=R.tailRoot;T.tailBend=sa?{fn:($,z,ke)=>{let Ge=W((sa.x-ke)/(sa.x-sa.tip),0,1);return[0,ba*.3*Ge*Ge]}}:{fn:$=>[0,-ba*.5*$*$]},T.neck={a:Dt+W(Ce*.8,-10,12)-je*12,ty:(b==="sleep"?2.5:0)+P*.35};let ia=($,z)=>(ke,Ge)=>[ra*$*ua(ke)*(.4+.6*ua(Ge)),er*z*ua(Ge)*(.4+.6*ua(ke))];if(T.headFront={fn:ia(4.2,2.8)},T.headFeat={fn:ia(2,1.4)},R.brows){(r.talk||0)>.2&&((d-Nt>.8||d-yt>2.5&&Math.random()<f*.4)&&(yt=d),Nt=d);let $=(d-yt)/.5,z=$>=0&&$<1&&!At.has(y)?7*Math.sin(Math.PI*$)**2:0,ke=be[y]||K(0),Ge=gt[y]||9;ae.forEach((ze,qe)=>{ze[0]=Q(ze[0],ke[qe][0]+z-2*(r.blink||0),Ue(Ge,f));for(let st=1;st<4;st++)ze[st]=Q(ze[st],ke[qe][st],Ue(Ge*.75,f))}),ue=Q(ue,St.has(y)?1:0,Ue(14,f)),oe.forEach((ze,qe)=>{let[st,qt,Yt,wt]=ae[qe],Tt=O(ze.outer[0]),Aa=O(ze.inner[0]),Ba=Math.sign(Aa-Tt);T[`brow${qe}`]={a:-Ba*Math.atan2(qt,Math.abs(ze.inner[0]-ze.outer[0]))*180/Math.PI,tx:wt*Ba*Ee,ty:-st*Ee},T[`browBend${qe}`]={fn:(Nr,Cr,cr)=>{let Da=W((2*cr-Tt-Aa)/(Aa-Tt),-1,1);return[0,-Yt*(1-Da*Da)*Ee]}},T[`browOver${qe}`]={a:2*Math.atan((ze.outer[1]-ze.inner[1])/(ze.outer[0]-ze.inner[0]))*180/Math.PI},T.alpha[`brow${qe}`]=1-ue,T.alpha[`browOver${qe}`]=ue,T.alpha[`brow${qe}_through`]=.55*(1-ue),T.alpha[`browOver${qe}_through`]=.55*ue})}R.creases&&(h.eyes.forEach(($,z)=>{Mt[z]=Q(Mt[z],Bt($,i[z],h.wide&&$.shape==="ring"?0:h.brows),Ue(12,f))}),Ot=Q(Ot,(Ct(h.eyes[0])+Ct(h.eyes[1]))/2,Ue(12,f)),T.alpha.eye_creases=Ot,T.creases={fn:($,z,ke)=>[0,(ke<B?Mt[0]:Mt[1])*Ee]}),T.headMid={fn:ia(2,1.4)},T.headBack={fn:ia(-1.4,-1)};let oa=R.PV.neck,ir=Dt*Math.PI/180;T.hairSway={fn:($,z,ke,Ge)=>{let ze=vt(.3,.8,z),qe=-ir*ze,st=Math.cos(qe),qt=Math.sin(qe),Yt=ke-oa[0],wt=Ge-oa[1],Tt=Math.pow(z,1.6);return[oa[0]+Yt*st-wt*qt-ke+$a*8*Tt+Math.sin(d*1.6+z*3)*Tt,oa[1]+Yt*qt+wt*st-Ge+wa*12*Tt*Tt-Math.abs($a)*1.5*Tt]}},T.bangsSway={fn:($,z)=>[tr*3.2*z*z+Math.sin(d*1.9+$*2)*.5*z*z,wa*3*z*z]},T.ahoge={a:nr*.5+Math.sin(d*2.1)*2},T.finNear={a:Fa+Math.sin(d*1.4)*1.5},T.finFar={a:-Fa*.8-Math.sin(d*1.4)*1.2};let or=(ra-(ye.face??ra))/Math.max(f,.001);ye.face=ra;for(let[$,z]of Object.entries(R.swings)){let ke=(r.groupRot||0)*ce,Ge=!1;for(let wt=z.parent;wt;wt=R.deformers[wt].parent)R.deformers[wt].kind==="rot"&&(ke+=T[wt]?.a||0),wt==="neck"&&(Ge=!0);let ze=(ke-(ye[$]??ke))/Math.max(f,.001);ye[$]=ke;let qe=Re[`pend_${$}`]||=it(28,1.8,55),st=z.pivot[0]*.05,qt=qe.step((-Rt*34-ze*.15+(Ge?or*8:0)+ct*(Vt[0]-Vt[1])*.3)*z.gain,f),Yt=Ge?Math.sin(d*1.7+st)*6+Math.sin(d*2.9+st*1.3)*2.5:Math.sin(d*1.7+st)*2;T[$]={a:qt+Yt*z.gain-ke*Math.min(1,z.gain)}}let la=[W(r.look[0],-6,6),W(r.look[1],-5,5)],za=V||la;V=la;let Ua=Math.max(r.blink||0,r.eyeClose||0),lr=(Ua-le)/Math.max(f,.001);le=Ua,Te.dx=Re.hlX.step(-(la[0]-za[0])/Math.max(f,.001)*.03-aa*.8,f),Te.dy=Re.hlY.step(-(la[1]-za[1])/Math.max(f,.001)*.03+lr*.12,f);let va=Je[y]||{};if(Te.scale=Q(Te.scale,va.scale??1,Ue(6,f)),Te.quiver=Q(Te.quiver,va.quiver??0,Ue(4,f)),Te.alpha=Q(Te.alpha,va.alpha??1,Ue(4,f)),Jt(h,y,r,d),pe.upload("faceFx",Ae),T.mix=0,Ie){Ie.t0==null&&(Ie.t0=d),T.mix=vt(0,1,(d-Ie.t0)/Ie.dur);let $=U;U=Ie.set.img,g=Fe,Jt(h,y,r,d),U=$,g=Qe,pe.upload("faceFx@mix",$e)}pe.render(T),n.raster&&(Be.setAttribute("href",tt.toDataURL("image/png")),ta=Be.decode?Be.decode().catch(()=>{}):null),Ie&&T.mix>=1&&jt(),Ja(h,d)}let zt=(s,h)=>pe.point("neck",T,s,h);function Ja(s,h){let r="",d=H(),f=zt(124,34),b=zt(204,52);if(s.orbit)for(let y=0;y<3;y++){let k=h*3.2+y*2.094,S=Math.sin(k);r+=`<path fill="#ffd23f" stroke="#3a2f7a" stroke-width="1.6" stroke-linejoin="round" opacity="${S<0?.55:1}" transform="translate(${me(f[0]+56*Math.cos(k))} ${me(f[1]-4+10*S)}) scale(${S<0?.7:1})" d="M0 -7L2 -2L7 -2L3 1L4.5 6.5L0 3.3L-4.5 6.5L-3 1L-7 -2L-2 -2Z"/>`}if(s.listen)for(let y=0;y<3;y++){let k=(h*.9+y/3)%1,S=36-24*k,J=zt(214,116);r+=`<path fill="none" stroke="${d}" stroke-width="5" stroke-linecap="round" opacity="${me(Math.sin(Math.PI*k))}" d="M${me(J[0]+S*Math.cos(-.55))} ${me(J[1]+S*Math.sin(-.55))}A${me(S)} ${me(S)} 0 0 1 ${me(J[0]+S*Math.cos(.55))} ${me(J[1]+S*Math.sin(.55))}"/>`}if(s.think)for(let y=0;y<3;y++){let k=(h*.8+y/3)%1;r+=`<circle fill="#e8f0ff" stroke="${d}" stroke-width="3" cx="${me(b[0]+10*y)}" cy="${me(b[1]-20*y-6*k)}" r="${4+3*y}" opacity="${me(.4+.6*Math.sin(Math.PI*k))}"/>`}if(s.sweat){let y=zt(196,88+3*Math.sin(h*7));r+=`<path fill="#8fd0ff" stroke="#2f5fae" stroke-width="1.4" transform="translate(${me(y[0])} ${me(y[1])}) scale(1.4)" d="M0 -9C4 -3 6 0 6 3.5A6 6 0 0 1 -6 3.5C-6 0 -4 -3 0 -9Z"/>`}if(s.anger){let y=zt(190,62),k=1+.12*Math.sin(h*10);r+=`<g transform="translate(${me(y[0])} ${me(y[1])}) scale(${me(k)})" fill="none" stroke="#e5484d" stroke-width="5" stroke-linecap="round"><path d="M-11 -3Q-3 -3 -3 -11M3 -11Q3 -3 11 -3M11 3Q3 3 3 11M-3 11Q-3 3 -11 3"/></g>`}if(s.bang){let y=zt(206,36);r+=`<g transform="translate(${me(y[0])} ${me(y[1])})"><path fill="none" stroke="#252049" stroke-width="8" stroke-linecap="round" d="M0 -16V3"/><circle fill="#252049" cx="0" cy="14" r="4.5"/></g>`}if(s.question){let y=zt(206,36),k=1+.06*Math.sin(h*3);r+=`<g transform="translate(${me(y[0])} ${me(y[1])}) scale(${me(k)})"><path fill="none" stroke="#252049" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" d="M-8 -9Q-8 -19 0 -19Q9 -19 9 -11Q9 -4 0 -1V4"/><circle fill="#252049" cx="0" cy="14" r="4.5"/></g>`}F!==r&&(Ft.innerHTML=r,F=r)}return{draw:Wt,groupTilt:_t,gestures:["nod","shake","wave","bow"],setScheme:xa,snapshot(s,h,r=3,d=60){It=r;let f=document.createElementNS(da,"g");for(let y=0;y<d;y++)Wt(f,s,{...h,t:(h.t||0)+y/60});let b=tt.toDataURL("image/png");return pe.dispose(),pe=null,Et=null,It=0,`<image href="${b}" x="${Se[0]}" y="${Se[1]}" width="${Se[2]-Se[0]}" height="${Se[3]-Se[1]}"/>`},dispose(){pe?.dispose(),pe=null,tt=null,Be=null,Ft=null,Et=null},reset(){jt();for(let s in Re)Re[s].x=0,Re[s].v=0;Lt=null,ye={},Kt=0,t=0,c=0,l=0,we=0,ot=0,xe=0,pt=0,lt=0,he=0,ct=0,je=0,mt=0,V=null,le=0,Object.assign(Te,{dx:0,dy:0,scale:1,quiver:0,alpha:1})},preload:()=>Promise.all(u.flatMap(s=>Ye.map(h=>A(s.id,h.id)))),get scheme(){return`${X}-${N}`},get painted(){return ta||Promise.resolve()},get colors(){return{z:H()}},schemes:u,anchors:{gaze:[O(745),ee(690)],tear:[O(640),ee(752)],tears:[[O(654),ee(752)],[O(852),ee(750)]],z:[196,44],hearts:[96,176,62],bubble:[128,18]},model:a}}ha();var G=o=>Math.round(o*10)/10,Y=(o,n,M)=>Math.max(n,Math.min(M,o)),se=(o,n,M)=>o+(n-o)*M,q=(o,n)=>o+Math.random()*(n-o),ve=(o,n)=>1-Math.exp(-o*n),Xt=o=>o*o*(3-2*o),Ka=(o,n,M)=>Xt(Y(o/n,0,1))*(1-Xt(Y((o-M)/(1-M),0,1))),Qt=[[104,212],[150,212]],wr=30,Ea=256-wr/2,br=Qt.map(o=>[o[0],o[1],o[0],Ea]),Mr="M0 -9C4 -3 6 0 6 3.5A6 6 0 0 1 -6 3.5C-6 0 -4 -3 0 -9Z";function vr(o,n,M){let a=(I,D)=>`${G(o+I*M)} ${G(n+D*M)}`;return`M${a(0,14)}C${a(-7,8)} ${a(-19,1)} ${a(-19,-6)}C${a(-19,-15)} ${a(-8,-18)} ${a(0,-9)}C${a(8,-18)} ${a(19,-15)} ${a(19,-6)}C${a(19,1)} ${a(7,8)} ${a(0,14)}Z`}var Z=o=>({shape:"ring",rx:16,ry:16,...o}),Ar=o=>{let n=o%4.2/1.6;return n<1?Math.sin(Math.PI*n)**2:0},pa={neutral:{label:"\u5E73\u9759",kao:"(0 0",f:()=>({gap:[50,50],eyes:[Z(),Z()]})},happy:{label:"\u5F00\u5FC3",kao:"(^ ^",f:()=>({gap:[58,58],eyes:[{shape:"up"},{shape:"up"}],blush:.45})},wink:{label:"\u7728\u773C",kao:"(0 ^",f:()=>({gap:[56,52],eyes:[Z(),{shape:"up"}]})},love:{label:"\u559C\u6B22",kao:"(\u2661 \u2661",f:o=>{let n=.8+.08*Math.sin(o*9);return{gap:[56,56],eyes:[{shape:"heart",s:n,sw:8},{shape:"heart",s:n,sw:8}],blush:.7,emit:"heart"}}},shy:{label:"\u5BB3\u7F9E",kao:"(o o *",f:()=>({gap:[40,40],eyes:[Z({rx:13,ry:12,dx:-3,dy:5}),Z({rx:13,ry:12,dx:-3,dy:5})],blush:1,lookLock:!0})},surprised:{label:"\u60CA\u8BB6",kao:"(O O",f:()=>({gap:[62,62],eyes:[Z({rx:20,ry:21}),Z({rx:20,ry:21})],bang:!0})},angry:{label:"\u751F\u6C14",kao:"(\xF2 \xF3",f:()=>({gap:[36,36],eyes:[Z({ry:11,dy:4}),Z({ry:11,dy:4})],brows:"angry",anger:!0,shake:!0})},sad:{label:"\u96BE\u8FC7",kao:"(\xF3 \xF2",f:()=>({gap:[34,40],eyes:[Z({ry:14,dy:4}),Z({ry:14,dy:4})],brows:"sad",emit:"tear"})},sleepy:{label:"\u72AF\u56F0",kao:"(- -",f:o=>{let n=Ar(o);return{gap:[50+14*n,50+14*n],eyes:[{shape:"lid",ry:10-5*n},{shape:"lid",ry:10-5*n}]}}},sleep:{label:"\u7761\u7740",kao:"(u u",f:o=>{let n=40+6*Math.sin(o*1.7);return{gap:[n,n],eyes:[{shape:"down"},{shape:"down"}],emit:"z"}}},dizzy:{label:"\u6655\u4E4E",kao:"(@ @",f:o=>({gap:[54+5*Math.sin(o*5),48],eyes:[{shape:"spiral",rot:o*7},{shape:"spiral",rot:o*7+1.4}],orbit:!0})},dragged:{label:"\u88AB\u62CE\u8D77",kao:"(> <",f:o=>{let n=55+3*Math.sin(o*22);return{gap:[n,n],eyes:[{shape:"gt"},{shape:"lt"}],sweat:!0}}},content:{label:"\u60EC\u610F",f:(o,n)=>{let M=n?n.drowse:0,a=M>.7?{shape:"down"}:{shape:"lid",ry:13.5-10*M};return{gap:[46,46],eyes:[a,{...a}]}}},waking:{label:"\u9192\u6765",f:(o,n)=>{let M=n?n.modeT:1,a=Y(M/.5,0,1),I=M>.5?Math.sin(Y((M-.5)/.9,0,1)*Math.PI):0,D=Math.max(0,10*a*(1-.7*I));return{gap:[50+12*I,50+12*I],eyes:[{shape:"lid",ry:D},{shape:"lid",ry:D}]}}},squeeze:{label:"\u56DE\u795E",f:()=>({gap:[44,44],eyes:[{shape:"lid",ry:0},{shape:"lid",ry:0}]})},listening:{label:"\u503E\u542C",f:()=>({gap:[44,44],eyes:[Z({rx:17,ry:18,dy:-1}),Z({rx:17,ry:18,dy:-1})],listen:!0})},thinking:{label:"\u601D\u8003",f:o=>({gap:[46,46],eyes:[Z({rx:14,ry:15,dx:3,dy:-4}),Z({rx:14,ry:15,dx:3,dy:-4})],think:!0})},run:{label:"\u51B2\u523A",f:o=>{let n=55+4*Math.sin(o*16);return{gap:[n,n],eyes:[Z(),Z()],sweat:!0}}},smug:{label:"\u5F97\u610F",kao:"(\xAC \xAC",f:()=>({gap:[52,46],eyes:[{shape:"lid",ry:8,dx:4},{shape:"lid",ry:8,dx:4}],blush:.25})},pout:{label:"\u561F\u5634",kao:"(o o 3",f:()=>({gap:[28,28],eyes:[Z({rx:14,ry:13}),Z({rx:14,ry:13})],blush:.6,lookAt:[-5,-1]})},worried:{label:"\u62C5\u5FC3",kao:"(\xF3 \xF2 ;",f:()=>({gap:[40,44],eyes:[Z({ry:17,dy:2}),Z({ry:17,dy:2})],brows:"sad",sweat:!0})},determined:{label:"\u8BA4\u771F",kao:"(\xF2 \xF3",f:()=>({gap:[42,42],eyes:[Z({ry:13,dy:1}),Z({ry:13,dy:1})],brows:"angry"})},flustered:{label:"\u614C\u5F20",kao:"(> <;",f:o=>({gap:[50+3*Math.sin(o*22),48],eyes:[{shape:"gt"},{shape:"lt"}],blush:1,sweat:!0})},scared:{label:"\u5BB3\u6015",kao:"(O O;",f:()=>({gap:[38,38],eyes:[Z({rx:18,ry:19}),Z({rx:18,ry:19})],brows:"sad",wide:!0,shake:!0,sweat:!0})},excited:{label:"\u671F\u5F85",kao:"(\u2606 \u2606",f:()=>({gap:[60,60],eyes:[Z({rx:18,ry:19,dy:-1}),Z({rx:18,ry:19,dy:-1})],sparkle:!0,blush:.4})},cry:{label:"\u5927\u54ED",kao:"(T T",f:o=>{let n=36+6*Math.abs(Math.sin(o*9));return{gap:[n,n],eyes:[{shape:"lid",ry:0},{shape:"lid",ry:0}],brows:"sad",emit:"tears",streams:!0}}},bowing:{label:"\u97A0\u8EAC",f:()=>({gap:[48,48],eyes:[{shape:"lid",ry:0},{shape:"lid",ry:0}]})},confused:{label:"\u7591\u60D1",kao:"(0 o ?",f:()=>({gap:[44,40],eyes:[Z(),Z({rx:14,ry:11})],question:!0})}},Ga=["neutral","happy","wink","love","shy","surprised","angry","sad","sleepy","thinking","smug","pout","worried","determined","flustered","scared","excited","cry","confused"],Qa=["stand","jump","hop","look","turn","nod","shake","spin","sit","sleep","dizzy","walk","run","wave","bow","shiver","flap","dance"],Tr={happy:"happy",wink:"wink",love:"love",surprised:"surprised",angry:"angry",sad:"sad",shy:"shy",sleepy:"yawn",smug:"wink",worried:"hmm",determined:"pop",flustered:"shy",scared:"surprised",excited:"sparkle",cry:"sad",confused:"hmm"},Wa=new Set(["drag","air","crouch","land","walk","run","dance","tumble"]),Er={gaze:[140,117],tear:[166,136],z:[196,40],hearts:[90,175,34],bubble:[128,0]},_r=[20,12,236,256],$r=[[128,128,108]];function Sr(o,n){let{petG:M,shadowEl:a,fxG:I}=o,D=n.figure,Ee=n.sfx,L=(t,c,...l)=>Ee.play?Ee.play(t,c,...l):Ee[t]?.(...l),C=n.onEvent||(()=>{}),O=n.words||{},ee=0,p=0,i=0,x=.42,u=0,_e=n.roam??"free",Ye=n.skin||null,Xe=0,ie=n.ground==="free",e={x:260,fy:0,gy:0,gvy:0,targetY:0,vx:0,vy:0,facing:1,faceVis:1,mode:"idle",modeT:0,dur:0,target:0,speed:0,stride:0,lift:0,bob:0,phase:0,lastHalf:0,lean:0,tilt:0,tiltV:0,sq:0,sqv:0,sitK:0,stretch:0,low:0,gap:[50,50],look:[0,0],drowse:0,feet:br.map(t=>[t[2],t[3]]),blinkT:1.5,blinkAge:9,expr:null,exprUntil:0,nextAt:1.2,emitAt:0,airKind:"jump",turned:!1,startle:!1,lastAct:"",turnAcc:0,dx:0,dy:0,jumpV:700,jumpVx:0,xf:null,blushK:0,eyeSig:"",eyeCur:null,eyePrev:null,eyeDims:[[16,16,0,0],[16,16,0,0]],swapAge:9,glance:[0,0],glanceAt:0,swing:0,swingV:0,prevA:null,velX:0,talkK:0,sfxAt:0,skid:!1,cue:0,pulse:null,walkId:0,walkWord:null,listening:!1,thinking:!1,thoughtShown:!1,placed:!1,noteAt:0,tearN:0,reachK:0,reachTarget:0,reachHigh:!1,reachNear:null,reachFar:null,reachAt:-1,cursor:"",status:null},H={x:-1e4,y:-1e4,inside:!1,vx:0,samples:[]},te=null,bt=0,A=0,X=!1,N=[],j=()=>({...Er,...D?.anchors}),U=j(),oe=()=>104*x+8,_=()=>ee-104*x-8,R=()=>Math.min(i,250*x+8),Ae=()=>ie?e.gy:i,$e=()=>({x:Math.round(e.x),...ie?{y:Math.round(e.gy)}:{}}),Qe=t=>pa[t]??pa[O[t]?.expression?.like]??pa.neutral;function Fe(){let t=n.bounds();ee=t.W,p=t.H,i=t.floorY,x=t.S,!e.placed&&ee>0&&(e.x=n.startX!=null?n.startX:ee*.7,e.placed=!0,e.gy=ie&&n.startY!=null?n.startY:i,n.enter==="drop"&&(e.fy=-8,e.vy=0,e.vx=0,e.airKind="drop",v("air"))),e.x=Y(e.x,oe(),_()),e.target=Y(e.target,oe(),_()),e.gy=ie?Y(e.gy,R(),i):i,e.targetY=ie?Y(e.targetY,R(),i):i,e.mode!=="air"&&e.mode!=="drag"&&(e.fy=e.gy)}function g(t,c){let l=e.xf;if(!l)return{x:e.x,y:Ae()};let F=(t-l.ax)*l.kx,V=(c-l.ay)*l.ky,le=l.rot*Math.PI/180;return{x:l.AX+F*Math.cos(le)-V*Math.sin(le),y:l.AY+F*Math.sin(le)+V*Math.cos(le)}}function fe(){return(D?.hits??$r).map(([t,c,l])=>({...g(t,c),r:l*x}))}function dt(t){return fe().some(c=>Math.hypot(t.x-c.x,t.y-c.y)<c.r)}function v(t,c={}){let l=e.mode;(l==="walk"||l==="run")&&e.walkId&&(C("interrupted",{walkId:e.walkId,...$e(),by:t}),e.walkId=0),(l==="walk"||l==="run")&&e.walkWord&&t!==l&&(C("done",{word:e.walkWord}),e.walkWord=null),e.mode=t,e.modeT=0,e.turned=!1,e.startle=!1,e.skid=!1,e.cue=0,Object.assign(e,c),l!==t&&C("mode",{mode:t})}let Ze=()=>e.mode==="drag"||e.mode==="air"||e.mode==="crouch";function Te(t){for(let c=0;c<12;c++){let l=q(oe(),_());if(Math.abs(l-e.x)>t)return l}return e.x-oe()>_()-e.x?oe():_()}let Je=()=>ie?q(R(),i):e.gy;function He(t){if(Ze())return!1;e.expr=null,e.lastAct=t;let c=e.mode==="sleep"||e.mode==="sit";switch(t){case"stand":v(c?"wake":"idle",c?{startle:!1}:{}),e.nextAt=u+3;break;case"walk":v("walk",{target:Te(160),targetY:Je()});break;case"run":v("run",{target:e.x<ee/2?_()-q(0,30):oe()+q(0,30),targetY:Je()});break;case"jump":v("crouch",{jumpV:720,jumpVx:e.facing*40});break;case"hop":v("crouch",{jumpV:480,jumpVx:0});break;case"look":v("look");break;case"turn":c||v("idle"),e.facing*=-1,L("tick","move");break;case"nod":et("nod",.7),L("nod","move");break;case"shake":et("shake",.7),L("shake","move");break;case"spin":c||v("idle"),et("spin",.6),L("spin","move");break;case"sit":v("sit",{dur:1e9,willSleep:!1});break;case"sleep":v("sleep",{dur:1e9});break;case"dizzy":v("dizzy");break;case"wave":et("wave",1.6),Pe("happy",1.8);break;case"bow":c||v("idle"),et("bow",1.6),Pe("bowing",1.5),L("tick","move");break;case"shiver":et("shiver",1.8),L("shiver","move");break;case"flap":v("crouch",{jumpV:540,jumpVx:0}),et("flap",1.4),Pe("happy",1.6),L("chirps","move");break;case"dance":v("dance",{dur:3.2}),Pe("happy",3.4),L("dance","move");break;default:{let l=O[t]?.motion;if(!l)return!1;c||v("idle"),et(t,l.seconds),l.face&&Pe(l.face,l.seconds),l.sound&&L(l.sound,"move")}}return!0}function et(t,c){e.pulse={kind:t,t0:u,dur:c}}function Pe(t,c){e.expr=t,e.exprUntil=u+c,e.nextAt=Math.max(e.nextAt,e.exprUntil+.6)}function ft(t,c){if(t==="sleep"){He("sleep");return}if(Ze())return;if(t==="dragged"){e.expr=null,e.vy=-1150,e.vx=q(-120,120),e.airKind="throw",e.sqv-=3,L("whoosh","move"),L("jump","move"),v("air");return}if(t==="dizzy"){e.expr=null,v("dizzy");return}(e.mode==="look"||e.mode==="land")&&v("idle");let l=O[t]?.expression;e.expr=t,e.exprUntil=u+(c??l?.seconds??(t==="sleepy"?4.4:3.2)),e.nextAt=Math.max(e.nextAt,e.exprUntil+.6),e.sqv+=t==="surprised"?-2.2:.8;let F=l?.sound??Tr[t];if(F&&L(F,"face"),t==="love")for(let V=0;V<4;V++)tt()}function Ht(t){if(t==="neutral")return ft("neutral",.1),!0;if(t==="walk"||t==="run"){let c=e.x<ee/2?ee*(.55+Math.random()*.35):ee*(.1+Math.random()*.35);return Zt(c,t==="run",0,Je())?(e.mode===t?e.walkWord=t:C("done",{word:t}),!0):!1}return Qa.includes(t)||O[t]?.motion?He(t):Ga.includes(t)||O[t]?.expression?Ze()?!1:(ft(t),!0):!1}function Zt(t,c,l,F){if(Ze())return!1;(e.mode==="sleep"||e.mode==="sit")&&v("wake",{startle:!0});let V=Y(t,oe(),_()),le=ie&&typeof F=="number"&&Number.isFinite(F)?Y(F,R(),i):e.gy;return e.expr=null,Math.hypot(V-e.x,le-e.gy)<2?(C("arrived",{walkId:l,...$e()}),!0):(v(c?"run":"walk",{target:V,targetY:le,walkId:l}),!0)}function ga(t){(e.mode==="walk"||e.mode==="run")&&e.walkId===t&&v("idle")}function ma(t={}){if(Ze())return!1;let c=!!t.heavy,l=t.dir===-1||t.dir===1?t.dir:e.facing;return v("tumble",{heavy:c,tumbleDir:l,fallT:c?.3:.22}),e.expr=c?"cry":"surprised",e.exprUntil=u+(c?5:1.4),L(c?"thud":"tick","touch"),!0}function ya(t,c={}){e.reachTarget=Y(Number(t)||0,0,1),e.reachHigh=!!c.high,e.reachNear=Number.isFinite(c.near)?c.near:null,e.reachFar=Number.isFinite(c.far)?c.far:null,e.reachAt=u}function Jt(){let t=e.mode;return t==="drag"?"dragged":t==="air"&&e.airKind==="throw"?e.vy<0?"dragged":"surprised":t==="air"&&e.airKind==="drop"?"surprised":t==="dizzy"?e.modeT<2.4?"dizzy":"squeeze":t==="wake"?e.startle?"surprised":"waking":e.listening&&t!=="sleep"?"listening":t==="sleep"?"sleep":e.expr&&u<e.exprUntil?e.expr:e.thinking?"thinking":t==="sit"?"content":t==="run"?"run":"neutral"}function Se(){let t=_e==="calm",c=[["walk",t?10:28],["run",t?0:12],["look",14],["jump",t?2:8],["sit",16],["wait",t?30:10]].filter(V=>V[1]>0&&(V[0]!==e.lastAct||V[0]==="wait")),l=Math.random()*c.reduce((V,le)=>V+le[1],0),F="wait";for(let V of c)if((l-=V[1])<0){F=V[0];break}F==="look"?(v("look"),e.lastAct="look"):F==="expr"?(ft(["happy","wink","love","sleepy","surprised","shy"][Math.floor(Math.random()*6)]),e.lastAct="expr"):F==="sit"?(v("sit",{dur:q(6,9),willSleep:Math.random()<.6}),e.lastAct="sit"):F!=="wait"&&He(F),e.mode==="idle"&&u>=e.nextAt&&(e.nextAt=u+q(2,4))}function Be(t,c,l={}){N.push({type:t,x:c.x,y:c.y,vx:0,vy:0,age:0,life:1,...l})}function tt(){Be("heart",g(q(U.hearts[0],U.hearts[1]),U.hearts[2]+e.low),{vx:q(-20,20),vy:q(-70,-45),life:1.6})}function Ft(t,c,l){for(let F=0;F<c;F++)Be("dust",g(t,250),{vx:q(-l,l)-e.facing*q(10,40),vy:q(-30,-8),life:q(.4,.65)})}function pe(t){if(!(t>0&&t<1/0))return;u+=t,e.modeT+=t,U=j();let c=e.mode,l=e.modeT,F=0,V=0,le=0,ye=0,De=0,we=0,ot=0,ce=[0,0],xe=0,pt=160,lt=12,he=0,ct=_e!=="off"&&u>Xe&&!n.dialogOpen?.();e.blinkT-=t,e.blinkAge+=t,e.blinkT<=0&&(e.blinkAge=0,e.blinkT=Math.random()<.2?.28:q(2.2,5.2));let je=g(U.gaze[0],U.gaze[1]),mt=H.x-je.x,_t=H.y-je.y,T=Math.hypot(mt,_t)||1,$t=()=>{if(!H.inside)return u>e.glanceAt&&(e.glance=Math.random()<.45?[0,0]:[q(-3,5),q(-3,3)],e.glanceAt=u+q(1.2,3)),e.glance;let m=Math.min(1,T/120);return[mt*e.facing/T*5*m,_t/T*4*m]};switch(c){case"idle":{ce=$t(),H.inside&&!te&&mt*e.facing<-50&&T<600?(e.turnAcc+=t,e.turnAcc>.9&&(e.facing*=-1,e.turnAcc=0)):e.turnAcc=0,e.listening&&(ce=[3,-4],xe=-7,ye=-2),ct&&!e.listening&&u>e.nextAt&&!(e.expr&&u<e.exprUntil)&&Se();break}case"walk":case"run":{let m=c==="run",w=e.target-e.x,B=e.targetY-e.gy,ae=Math.hypot(w,B),ue=Math.sign(w)||e.facing;(!ie||Math.abs(w)>2)&&(e.facing=ue);let yt=m?250:78,Nt=Math.min(yt,m?ae*4+20:ae*3+14);V=m?17:10,le=m?15:8,we=m?7:3,ot=m?4.4:2.1,ye=m?ae<50&&e.speed>120?-6:11:4,ye<0&&!e.skid&&(e.skid=!0,L("skid","move"));let Bt=Math.min(1,l/(m?.35:.25));e.speed=se(e.speed,Nt*Xt(Bt),ve(m?6:9,t));let Ct=Math.min(ae,e.speed*t);ae>0&&(e.x+=w/ae*Ct,e.gy+=B/ae*Ct,e.fy=e.gy);let Mt=Y(e.speed/yt,0,1);V*=.4+.6*Mt,le*=.4+.6*Mt,e.phase+=Math.PI*2*ot*t*Math.max(.35,Mt),ce=[m?4:3,m?1:0];let Ot=Math.floor(e.phase/Math.PI);if(Ot!==e.lastHalf&&(L("step","move",m,Ot&1),m&&e.speed>120&&Ft(128,ae<50?3:1,20)),e.lastHalf=Ot,ae<1.5){e.speed=0;let Wt=e.walkId;e.walkId=0,v("idle"),e.nextAt=u+q(1.2,3.2),Wt&&C("arrived",{walkId:Wt,...$e()})}break}case"look":{e.cue||(e.cue=1,L("look","move")),l<.9?ce=[4,-4]:l<1.8?(e.turned||(e.turned=!0,e.facing*=-1),ce=[5,0]):l<2.6?ce=[1,4]:(v("idle"),e.nextAt=u+q(1,2.5));break}case"sit":{De=1,ce=$t().map(m=>m*(1-e.drowse)),e.listening&&(ce=[3,-4],xe=-7),he=e.willSleep&&ct?Y((l-(e.dur-1.6))/1.2,0,1):.15,e.drowse>.5&&(ye=7*e.drowse*Math.pow(Math.max(0,Math.sin(u*1.3)),6)),ct&&l>e.dur&&(e.willSleep?v("sleep",{dur:q(8,12)}):(v("idle"),e.sqv-=1.2,e.nextAt=u+q(1.5,3)));break}case"sleep":{De=1,he=1,ye=5,ct&&l>e.dur&&v("wake");break}case"wake":{e.startle?(De=0,ce=[3,-2],l>.9&&(v("idle"),e.nextAt=u+q(1.5,3))):(De=l<1.1?1:0,l>.5&&!e.cue&&(e.cue=1,L("yawn","face")),F=l>.5&&l<1.3?-.1:0,ye=l<.5?5:l<1.2?-5:0,ce=l>1.2?$t():[0,0],l>1.8&&(v("idle"),e.nextAt=u+q(1,2)));break}case"crouch":{F=.24,De=.3,l>.16&&(e.vy=-e.jumpV,e.vx=e.jumpVx,e.airKind="jump",e.sqv-=2.6,L("jump","move"),v("air"));break}case"air":{e.vy+=2300*t,e.vx*=Math.exp(-t*.4),e.x+=e.vx*t,e.fy+=e.vy*t,ie&&e.gvy&&(e.gvy*=Math.exp(-t*1.2),e.gy+=e.gvy*t,e.fy+=e.gvy*t,e.gy<R()&&(e.fy+=R()-e.gy,e.gy=R(),e.gvy=Math.abs(e.gvy)*.55,e.sqv+=.6),e.gy>i&&(e.fy-=e.gy-i,e.gy=i,e.gvy=-Math.abs(e.gvy)*.55,e.sqv+=.6)),e.x<oe()&&(e.x=oe(),e.vx=Math.abs(e.vx)*.55,e.sqv+=.6),e.x>_()&&(e.x=_(),e.vx=-Math.abs(e.vx)*.55,e.sqv+=.6),e.fy-250*x<0&&e.vy<0&&(e.fy=250*x,e.vy=Math.abs(e.vy)*.3),F=-Math.min(.12,Math.abs(e.vy)/6e3),xe=Y(e.vx*.025,-30,30),pt=70,lt=8,e.fy>=e.gy&&e.vy>0&&Et();break}case"land":{De=.35*(1-Xt(Y(l/.35,0,1))),ce=[2,2],l>.4&&v("idle");break}case"dizzy":{if(De=l<2.6?1:0,l<2.4&&u>e.sfxAt&&(L("chirps","move"),e.sfxAt=u+.9),l>=2.4&&!e.cue&&(e.cue=1,L("shake","move")),l<2.4)xe=8*Math.sin(u*4.5)*Math.min(1,l*2);else if(l<3){let m=(l-2.4)/.6;xe=12*Math.sin(l*34)*(1-m)}else v("idle"),e.sqv-=1,e.nextAt=u+q(1.5,3);break}case"dance":{V=5,le=10,we=3,e.phase+=Math.PI*2*1.1*t,xe=7*Math.sin(e.phase),ce=[3,-2];let m=Math.floor(e.phase/Math.PI);m!==e.lastHalf&&L("step","move",!1,m&1),e.lastHalf=m,u>e.noteAt&&(Be("note",g(U.z[0],U.z[1]+e.low),{vx:e.facing*q(10,30),vy:-34,life:1.8}),e.noteAt=u+.6),l>e.dur&&(v("idle"),e.nextAt=u+q(1.5,3));break}case"tumble":{let m=e.heavy?1.05:.42,w=e.fallT||.26,B=e.heavy?.6:.34,ae=e.tumbleDir||e.facing;l<w?(xe=ae*84*Xt(Y(l/w,0,1)),F=.12):l<w+m?xe=ae*84:xe=ae*84*(1-Xt(Y((l-w-m)/B,0,1))),ce=[0,2],l>=w+m+B&&(e.heavy?(v("sit",{dur:1e9}),e.expr="cry",e.exprUntil=u+6,e.nextAt=u+6):(v("idle"),e.nextAt=u+q(1,2)));break}case"drag":{e.dx=se(e.dx,H.x,ve(28,t)),e.dy=se(e.dy,Math.min(H.y,i-245*x),ve(28,t)),xe=Y(H.vx*.035,-40,40),pt=90,lt=5,Math.abs(H.vx)>500&&u>e.sfxAt&&(L("squeak","touch"),e.sfxAt=u+q(.4,.7));break}}if(e.pulse){let m=(u-e.pulse.t0)/e.pulse.dur;m>=1?e.pulse=null:D?.gestures?.includes(e.pulse.kind)||(e.pulse.kind==="nod"?ye+=9*Math.abs(Math.sin(m*Math.PI*2)):e.pulse.kind==="shake"?xe+=10*Math.sin(m*Math.PI*6)*(1-m):e.pulse.kind==="wave"?xe+=6*Math.sin(m*Math.PI*6)*Math.sin(m*Math.PI):e.pulse.kind==="bow"?ye+=16*Ka(m,.25,.7):e.pulse.kind==="flap"?(xe+=7*Math.sin(m*Math.PI*8)*(1-m),F-=.06*Math.abs(Math.sin(m*Math.PI*8))*(1-m)):e.pulse.kind==="spin"&&m>.5&&!e.pulse.flipped?(e.pulse.flipped=!0,e.facing*=-1):e.pulse.kind==="spin"&&m<.5&&!e.pulse.first&&(e.pulse.first=!0,e.facing*=-1,e.sqv-=1))}let K=Jt(),be=Qe(K).f(u,e);e.reachAt>=0&&u-e.reachAt>.35&&(e.reachTarget=0),e.reachK=se(e.reachK,e.reachTarget,ve(16,t)),e.thinking&&e.thoughtShown&&K==="thinking"&&(be.think=!1),be.lookLock||e.mode==="sleep"||e.mode==="drag"?ce=[0,0]:be.lookAt&&(ce=be.lookAt);let St=be.eyes.map(m=>m.shape).join();St!==e.eyeSig&&(e.eyeCur&&(e.eyePrev=e.eyeCur,e.swapAge=0),e.eyeSig=St,be.eyes.forEach((m,w)=>{e.eyeDims[w]=[m.rx??16,m.ry??16,m.dx||0,m.dy||0]})),e.swapAge+=t,e.eyeCur=be.eyes.map((m,w)=>{if(m.shape!=="ring"&&m.shape!=="lid")return m;let B=e.eyeDims[w],ae=[m.rx??16,m.ry??16,m.dx||0,m.dy||0];for(let ue=0;ue<4;ue++)B[ue]=se(B[ue],ae[ue],ve(16,t));return{...m,rx:B[0],ry:B[1],dx:B[2],dy:B[3]}}),e.blushK=se(e.blushK,be.blush||0,ve(6,t)),e.sqv+=((F-e.sq)*280-e.sqv*14)*t,e.sq=Y(e.sq+e.sqv*t,-.35,.45),e.tiltV+=((xe-e.tilt)*pt-e.tiltV*lt)*t,e.tilt+=e.tiltV*t,e.lean=se(e.lean,ye,ve(7,t)),e.sitK=se(e.sitK,De,ve(c==="land"?18:6,t)),e.drowse=se(e.drowse,he,ve(c==="sleep"?1.5:c==="sit"?4:6,t)),e.stretch=se(e.stretch,c==="drag"?1:0,ve(8,t)),e.stride=se(e.stride,V,ve(10,t)),e.lift=se(e.lift,le,ve(10,t)),e.bob=se(e.bob,we,ve(10,t)),e.look[0]=se(e.look[0],ce[0],ve(9,t)),e.look[1]=se(e.look[1],ce[1],ve(9,t)),e.gap[0]=se(e.gap[0],be.gap[0],ve(8,t)),e.gap[1]=se(e.gap[1],be.gap[1],ve(8,t)),e.faceVis=se(e.faceVis,e.facing,ve(15,t)),c!=="walk"&&c!=="run"&&c!=="dance"&&(e.phase=se(e.phase,Math.round(e.phase/Math.PI)*Math.PI,ve(6,t))),H.vx*=Math.exp(-t*6);let gt=e.mode==="drag"?e.dx:e.x;e.prevA!=null&&(e.velX=se(e.velX,(gt-e.prevA)/t,.25)),Number.isFinite(e.velX)?X=!1:(X||console.warn(`[pet] \u6A2A\u5411\u901F\u5EA6\u4E0D\u662F\u6709\u9650\u6570,\u5DF2\u5F52\u96F6:velX=${e.velX} x=${gt} \u4E0A\u4E00\u5E27x=${e.prevA} dt=${t} \u6A21\u5F0F=${c}`),X=!0,e.velX=0),e.prevA=gt;let At=Y(-(e.velX*.06+(c==="dance"?e.tiltV*.22:0))*Math.sign(e.faceVis||1),-28,28);if(e.swingV+=((At-e.swing)*110-e.swingV*7)*t,e.swing=Y(e.swing+e.swingV*t,-40,40),e.low=e.sitK*29+e.bob*Math.abs(Math.sin(e.phase)),e.feet.forEach((m,w)=>{let B=Qt[w][0],ae=Qt[w][1]+e.low,ue,yt;if(c==="drag")ue=B+7*Math.sin(u*11+w*2.2),yt=ae+36;else if(c==="air")ue=B+(w?9:-9),yt=ae+33;else{let Bt=e.phase+w*Math.PI,Ct=B+e.stride*Math.sin(Bt),Mt=Ea-e.lift*Math.max(0,Math.cos(Bt));ue=se(Ct,B+26,e.sitK),yt=se(Mt,Ea,e.sitK)}let Nt=c==="drag"||c==="air"?14:40;m[0]=se(m[0],ue,ve(Nt,t)),m[1]=se(m[1],yt,ve(Nt,t))}),be.emit&&u>e.emitAt&&(be.emit==="heart"&&(tt(),e.emitAt=u+.45),be.emit==="z"&&(Be("z",g(U.z[0],U.z[1]+e.low),{vx:e.facing*16,vy:-26,life:2.4}),e.emitAt=u+1.3,L("snore","snore",e.modeT)),be.emit==="tear"&&(Be("drop",g(U.tear[0]+e.look[0],U.tear[1]+e.low),{vx:e.facing*q(10,30),vy:-20,life:3}),e.emitAt=u+.8),be.emit==="tears")){let m=U.tears??[U.tear],[w,B]=m[e.tearN++%m.length];Be("drop",g(w+e.look[0]+q(-6,6),B+e.low),{vx:e.facing*q(-20,50),vy:q(-60,-20),life:3}),e.emitAt=u+.22}bt*=Math.exp(-t*1.5),A-=t;for(let m=N.length-1;m>=0;m--){let w=N[m];w.age+=t,w.x+=w.vx*t,w.y+=w.vy*t,w.type==="drop"&&(w.vy+=900*t,w.y>Ae()&&(w.age=w.life)),w.type==="dust"&&(w.vx*=Math.exp(-t*4)),w.age>=w.life&&N.splice(m,1)}e.talkK*=Math.exp(-t*12),e._fc=be,e._fname=K}function Et(){let t=e.vy,c=e.airKind;if(e.fy=e.gy,e.vy=0,e.vx=0,e.gvy=0,e.sqv+=Y(t*.0024,.8,4.5),L("land","move",c!=="jump"&&t>1e3),Ft(128,t>900?7:3,70),c==="throw"&&t>1e3){v("dizzy"),C("touch",{kind:"crash"});return}v("land"),c==="throw"?(e.expr="surprised",e.exprUntil=u+.9,e.nextAt=u+2):c==="drop"?(e.expr="happy",e.exprUntil=u+1.6,e.nextAt=u+2.6):e.nextAt=u+q(.8,2)}function Pt(){let t=e._fc||pa.neutral.f(0),c=e._fname||"neutral",l=e.mode==="drag",F=Math.sin(u*(e.mode==="sleep"?1.7:2.4)),V=(1+e.sq*.7)*(1-.05*e.stretch)*(1-.009*F),le=(1-e.sq)*(1+.09*e.stretch)*(1+.016*F),ye=128,De=l?36:256,we=l?e.dx:e.x,ot=l?e.dy:e.fy;t.shake?we+=Math.sin(u*60)*1.4:e.pulse?.kind==="shiver"&&(we+=Math.sin(u*75)*1.1*Ka((u-e.pulse.t0)/e.pulse.dur,.08,.85));let ce=x*e.faceVis*V,xe=x*le,pt=e.lean*e.faceVis,lt=D?.groupTilt?D.groupTilt(e.mode,e.tilt,pt):e.tilt+pt;e.xf={AX:we,AY:ot,ax:ye,ay:De,kx:ce,ky:xe,rot:lt},M.setAttribute("transform",`translate(${G(we)} ${G(ot)}) rotate(${G(lt)}) scale(${ce.toFixed(4)} ${xe.toFixed(4)}) translate(${-ye} ${-De})`);let he=e.feet.map((w,B)=>[Qt[B][0],Qt[B][1]+e.low,w[0],w[1]]),ct=.16+.3*e.drowse,je=e.blinkAge<ct?Math.sin(Math.PI*e.blinkAge/ct):0,mt=e.eyeCur||t.eyes,_t=0;e.swapAge<.07&&e.eyePrev?(mt=e.eyePrev,_t=e.swapAge/.07):e.swapAge<.16&&(_t=1-(e.swapAge-.07)/.09);let T={...t,eyes:mt,gap:e.gap.map(w=>Math.min(64,w+e.talkK*12)),blush:e.blushK},$t=e.pulse?{kind:e.pulse.kind,k:Y((u-e.pulse.t0)/e.pulse.dur,0,1)}:null;D.draw(M,T,{look:e.look,legs:he,low:e.low,t:u,blink:je,eyeClose:_t,acc:Ye,swing:e.swing,face:c,mode:e.mode,modeT:e.modeT,talk:e.talkK,status:e.status,drowse:e.drowse,sit:e.sitK,facing:e.faceVis,tilt:e.tilt,lean:pt,groupRot:lt,gesture:$t,reach:e.reachK,reachHigh:e.reachHigh,reachNear:e.reachNear,reachFar:e.reachFar});let K=l?e.dy+220*x*1.09:e.fy,be=ie&&l?K+40*x:Ae(),St=Y(1-(be-K)/420,.3,1);a.setAttribute("cx",G(we)),a.setAttribute("cy",G(be-2)),a.setAttribute("rx",G(72*x*St*(1+e.sq*.5))),a.setAttribute("ry",G(10*x*St+1)),a.setAttribute("opacity",G(St));let gt="",At=x/.48,m=D?.colors?.z?`stroke="${D.colors.z}"`:'class="eye"';for(let w of N){let B=w.age/w.life;if(w.type==="z"){let ae=B<.15?B/.15:1-(B-.15)/.85,ue=(.7+.9*B)*At;gt+=`<path ${m} fill="none" stroke-width="${G(3/ue)}" stroke-linecap="round" stroke-linejoin="round" opacity="${G(ae)}" transform="translate(${G(w.x+Math.sin(w.age*2.5)*6)} ${G(w.y)}) scale(${G(ue)})" d="M-6 -7H6L-6 7H6"/>`}else if(w.type==="heart")gt+=`<path class="p-heart" fill="none" stroke-width="5" stroke-linejoin="round" opacity="${G(1-B*B)}" transform="translate(${G(w.x+Math.sin(w.age*4)*5)} ${G(w.y)}) scale(${G((.45+.35*B)*At)})" d="${vr(0,0,1)}"/>`;else if(w.type==="dust")gt+=`<circle class="p-dust" fill="none" stroke-width="2" cx="${G(w.x)}" cy="${G(w.y)}" r="${G((3+8*B)*At)}" opacity="${G(.7*(1-B))}"/>`;else if(w.type==="note"){let ae=B<.15?B/.15:1-(B-.15)/.85,ue=(.8+.4*B)*At;gt+=`<g opacity="${G(ae)}" transform="translate(${G(w.x+Math.sin(w.age*3)*8)} ${G(w.y)}) scale(${G(ue)})"><path ${m} fill="none" stroke-width="2.4" stroke-linecap="round" d="M3 4V-9L9 -6"/><circle ${m} fill="none" stroke-width="3.6" cx="0" cy="4.5" r="1.8"/></g>`}else w.type==="drop"&&(gt+=`<path class="tearf" transform="translate(${G(w.x)} ${G(w.y)}) scale(${G(.9*At)})" d="${Mr}"/>`)}return I.innerHTML=gt,c}let Ut=t=>t?.t??performance.now();function ea(){let t=H.samples;if(t.length<2)return{x:0,y:0};let c=t[0],l=t[t.length-1],F=Math.max(.016,(l.t-c.t)/1e3);return{x:(l.x-c.x)/F,y:(l.y-c.y)/F}}function Ie(){let t=g(128,36);e.expr=null,v("drag",{dx:t.x,dy:t.y}),L("grab","touch"),e.sqv-=1.2,e.tiltV=0,C("touch",{kind:"grab"})}function jt(t){return Object.assign(H,{x:t.x,y:t.y,inside:!0}),dt(t)?(te={x:t.x,y:t.y,t:Ut(t)},H.samples=[{t:Ut(t),x:t.x,y:t.y}],e.mode==="air"&&Ie(),!0):!1}function xa(t){let c=Ut(t),l=t.x-H.x,F=t.y-H.y;for(Object.assign(H,{x:t.x,y:t.y,inside:!0}),H.samples.push({t:c,x:t.x,y:t.y});H.samples.length>2&&c-H.samples[0].t>110;)H.samples.shift();if(H.vx=se(H.vx,ea().x,.35),te&&e.mode!=="drag"&&Math.hypot(t.x-te.x,t.y-te.y)>6&&Ie(),te)return e.cursor="grabbing";let V=dt(t);return V&&["idle","look","sit","sleep"].includes(e.mode)&&(bt+=Math.hypot(l,F),bt>320&&A<=0&&(bt=0,A=2.5,L("purr","touch"),e.mode==="sleep"?tt():ft(Math.random()<.5?"love":"shy"),C("touch",{kind:"pet",asleep:e.mode==="sleep"}))),e.cursor=V?"grab":""}function ta(t){if(e.cursor="",!!te){if(e.mode==="drag"){let c=g(128,256),l=ea();e.x=Y(c.x,oe(),_());let F=Math.hypot(l.x,l.y);ie?(e.gy=Y(c.y,R(),i),e.fy=Math.min(e.gy,c.y),e.vx=Y(l.x,-1800,1800),e.gvy=Y(l.y,-1800,1800)*.6,e.vy=-Math.min(1400,F*.6)):(e.fy=Math.min(i,c.y),e.vx=Y(l.x,-1800,1800),e.vy=Y(l.y,-1800,1400)),e.airKind="throw",F>700&&L("whoosh","move"),v("air"),C("touch",{kind:F>700?"throw":"drop",x:Math.round(e.x)})}else if(Ut(t)-te.t<400){if(e.mode==="sleep"||e.mode==="sit"){let c=e.mode==="sleep";v("wake",{startle:!0}),e.sqv-=2.2,e.nextAt=u+2.4,L("surprised","face"),C("touch",{kind:"poke",woke:c})}else if(e.mode!=="dizzy"){L("poke","touch");let c=["happy","wink","surprised","love","angry"][Math.floor(Math.random()*5)];ft(c),Math.random()<.5&&e.mode==="idle"&&v("crouch",{jumpV:480,jumpVx:0}),C("touch",{kind:"poke"})}}te=null}}function It(t){te=null,e.mode==="drag"&&(Object.assign(H,{x:t.x,y:t.y,vx:0,samples:[]}),e.x=Y(t.x,oe(),_()),e.fy=Math.min(i,t.y+220*x),ie&&(e.gy=Y(e.fy,R(),i)),e.vx=0,e.vy=0,e.gvy=0,e.airKind="drop",v("air"),C("touch",{kind:"drop",x:Math.round(e.x)}))}function ka(t,c){if(e.mode==="drag"){e.dx+=t,e.dy+=c,e.x+=t,H.x+=t,H.y+=c;for(let l of H.samples)l.x+=t,l.y+=c;te&&(te.x+=t,te.y+=c)}}function Re(){te||(H.inside=!1)}let Lt=()=>g(U.bubble[0],U.bubble[1]+e.low);function Kt(){let[t,c,l,F]=D?.extent??_r,V=[[t,c],[l,c],[t,F],[l,F]].map(([we,ot])=>g(we,ot)),le=V.map(we=>we.x),ye=V.map(we=>we.y),De=g(128,128+e.low);return{x:e.x,...ie?{y:e.gy}:{},facing:e.facing,mode:e.mode,busy:Ze(),pressing:!!te,cursor:e.cursor,moving:!!te||Wa.has(e.mode)||!!e.pulse||Math.abs(e.faceVis-e.facing)>.05,box:{x:Math.min(...le),y:Math.min(...ye),w:Math.max(...le)-Math.min(...le),h:Math.max(...ye)-Math.min(...ye)},hit:fe(),bubble:Lt(),side:{x:De.x,y:De.y,reach:104*x}}}return Fe(),D?.setSkin?.(Ye),{pet:e,step:pe,render:Pt,resize:Fe,act:He,setExpr:ft,doWord:Ht,walkTo:Zt,stopWalk:ga,tumble:ma,setReach:ya,toStage:g,hitPet:dt,busy:Ze,layout:Kt,pointerDown:jt,pointerMove:xa,pointerUp:ta,pointerLeave:Re,dropAt:It,shiftDrag:ka,get pressing(){return!!te},get moving(){return!!te||Wa.has(e.mode)||!!e.pulse||Math.abs(e.faceVis-e.facing)>.05},get time(){return u},get bounds(){return{W:ee,H:p,floorY:i,S:x,minX:oe(),maxX:_(),minY:R()}},freeGround:ie,setSkin(t){Ye=t,D?.setSkin?.(t)},setFigure(t){t!==D&&(D?.dispose?.(),D=t,D.setSkin?.(Ye),U=j(),M.textContent="",Pt())},get figure(){return D},get skin(){return Ye},setRoam(t){_e=t,t!=="off"&&(e.nextAt=u+1)},get roam(){return _e},holdRoam(t){Xe=Math.max(Xe,u+t)},talk(){e.talkK=1},setListening(t){e.listening=t,t&&(e.mode==="walk"||e.mode==="run")&&v("idle")},setThinking(t){e.thinking=t},setStatus(t){e.status=typeof t=="string"?t:null},setThoughtShown(t){e.thoughtShown=t},anchor:Lt,emitHeart:tt}}var Rr=`
:root{--shadow:rgba(27,22,38,.12);--tear:#5AAEF0;--heart:#F0567A;--dust:#A39DB0;--skin-eye:#00A870}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--shadow:rgba(0,0,0,.32);--tear:#6BBDF7;--heart:#FF6F93;--dust:#5B6472;--skin-eye:#2FD59B}}
:root[data-theme="dark"]{--shadow:rgba(0,0,0,.32);--tear:#6BBDF7;--heart:#FF6F93;--dust:#5B6472;--skin-eye:#2FD59B}
.shadow{fill:var(--shadow)} .tearf{fill:var(--tear)} .p-heart{stroke:var(--heart)} .p-dust{stroke:var(--dust)} .eye{stroke:var(--skin-eye)}
svg.kit{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible}
`,Fr="http://www.w3.org/2000/svg";function Za(o,n){let M=o.root.ownerDocument,a=M.createElement("style");a.textContent=Rr+(n.css??""),M.head.appendChild(a);let I=M.createElementNS(Fr,"svg");I.setAttribute("class","kit"),I.setAttribute("aria-hidden","true"),I.innerHTML='<ellipse class="shadow" cx="0" cy="0" rx="0" ry="0"/><g></g><g></g>',o.root.appendChild(I);let[D,Ee,L]=I.children,C=M.createElement("style");M.head.appendChild(C);let O=o.start??{};n.skinCss&&O.skin&&(C.textContent=n.skinCss(O.skin));let ee=!1,p=Sr({petG:Ee,shadowEl:D,fxG:L},{...n,skin:O.skin??null,startX:O.x,startY:O.y,enter:O.enter,bounds:o.bounds,onEvent:o.emit,sfx:{play:o.sound},dialogOpen:()=>ee});return(O.facing===1||O.facing===-1)&&(p.pet.facing=p.pet.faceVis=O.facing),{step(i){p.step(i),p.render()},layout:p.layout,resize:p.resize,do:p.doWord,words:[...Ga,...Qa,...Object.keys(n.words??{}).filter(i=>n.words[i]?.expression||n.words[i]?.motion)],walk:(i,x,u)=>p.walkTo(i,x,u),stopWalk:i=>p.stopWalk(i),tumble:i=>p.tumble(i),reach:(i,x)=>p.setReach(i,x),emitHeart:()=>{try{p.emitHeart()}catch{}},setExpr:(i,x)=>p.setExpr(i,x),move(i,x){let u=n.moves?.[i?.to],_e=typeof u=="function"?u(i.params??{},{...o.bounds(),...p.bounds}):null;return!!_e&&p.walkTo(_e.x,!!i.run,x,_e.y)},pointer(i,x){i==="down"?p.pointerDown(x):i==="move"?p.pointerMove(x):i==="up"||i==="cancel"?p.pointerUp(x):i==="leave"&&p.pointerLeave()},drop:p.dropAt,shift:p.shiftDrag,place(i,x,u){if(p.pet.mode==="drag"||p.pet.mode==="air")return;let{minX:_e,maxX:Ye,minY:Xe,floorY:ie}=p.bounds;p.pet.x=p.pet.target=Y(i,_e,Ye),p.freeGround&&typeof u=="number"&&Number.isFinite(u)&&(p.pet.gy=p.pet.targetY=p.pet.fy=Y(u,Xe,ie)),(x===1||x===-1)&&(p.pet.facing=p.pet.faceVis=x)},set(i){i.roam&&p.setRoam(i.roam),typeof i.hold=="number"&&p.holdRoam(i.hold),typeof i.dialogOpen=="boolean"&&(ee=i.dialogOpen),typeof i.listening=="boolean"&&p.setListening(i.listening),typeof i.thinking=="boolean"&&p.setThinking(i.thinking),typeof i.thoughtShown=="boolean"&&p.setThoughtShown(i.thoughtShown),"status"in i&&p.setStatus(i.status),i.skin&&(p.setSkin(i.skin),n.skinCss&&(C.textContent=n.skinCss(i.skin))),i.theme&&(M.documentElement.dataset.theme=i.theme)},cue(i){i==="perk"?(p.pet.sqv+=.6,p.setExpr("surprised",.5)):i==="heard"?p.pet.sqv+=.9:i==="cheer"?p.setExpr("happy"):i==="bounce"&&(p.pet.sqv+=1.2)},talk:p.talk,setScheme:(i,x)=>n.figure.setScheme?.(i,x),get z(){return n.figure.colors?.z??null},dispose(){n.figure.dispose?.(),I.remove(),a.remove(),C.remove()}}}ha();function Pr(o){return new Promise((n,M)=>{let a=new Image;a.onload=()=>n(a),a.onerror=()=>M(new Error(`texture failed: ${o}`)),a.src=String(o)})}async function Ir(o,n={}){let M=Math.max(0,Math.min(80,Number(n.floorPad)||12)),a=Math.max(240,Number(n.width)||1266),I=Math.max(160,Number(n.height)||745),D=new URL(n.assetBase||"/fatfish-pet/assets/live2d/",location.href),Ee=await(await fetch(new URL("model.json",D),{cache:"force-cache"})).json(),L=await ja(D,{model:Ee,scheme:n.scheme||"deepseek",kit:{createRig:ca},loadImage:Pr}),C={W:a,H:I,floorY:I-M,S:Math.max(.4,Math.min(1.2,Number(n.scale)||.68)),minX:0,maxX:a,minY:0},O=Number.isFinite(Number(n.startX))?Number(n.startX):a*.55,ee={root:o,bounds:()=>C,emit:(i,x)=>{try{n.onEvent?.(i,x)}catch{}},sound:()=>{},start:{x:Math.max(0,Math.min(a,O)),facing:n.facing===-1?-1:1}},p=Za(ee,{figure:L});return p.set?.({roam:!1,dialogOpen:!1}),{body:p,figure:L,step(i){p.step(Math.min(.05,Math.max(.001,i)))},layout(){return p.layout?.()},do(i){try{p.do?.(i)}catch{}},set(i){try{p.set?.(i)}catch{}},pointer(i,x){try{p.pointer?.(i,x)}catch{}},drop(i){try{p.drop?.(i)}catch{}},cue(i){try{p.cue?.(i)}catch{}},talk(){try{p.talk?.()}catch{}},tumble(i){try{return p.tumble?.(i)}catch{return!1}},reach(i,x){try{p.reach?.(i,x)}catch{}},emitHeart(){try{p.emitHeart?.()}catch{}},setExpr(i,x){try{p.setExpr?.(i,x)}catch{}},setScale(i){let x=Math.max(.35,Math.min(1.15,Number(i)||C.S));if(!(Math.abs(x-C.S)<5e-4)){C.S=x;try{p.resize?.()}catch{}}},resize(i,x){a=Math.max(240,Number(i)||a),I=Math.max(160,Number(x)||I),C.W=a,C.H=I,C.maxX=a,C.floorY=I-M;try{p.resize?.()}catch{}},scheme(){return L.scheme},destroy(){try{p.dispose?.()}catch{}try{L.dispose?.()}catch{}}}}return gr(Lr);})();

;try{window.FatFishLive2D=FatFishLive2D}catch(error){}
;try{fetch('/fatfish-pet/client-state',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({live:'script-loaded'})}).catch(function(){})}catch(error){}
/**
 * @local/fatfish-pet — Client half.
 *
 * Plain-JS Client module for the Harness Web UI. `build.mjs` inlines the SVG
 * artwork and its CSS into the two marker slots below. All artwork is rendered
 * inline so the expression/action classes can animate it; the UI around it uses
 * only host theme tokens.
 */
window.__ModuleLoader__.load({
  id: '@local/fatfish-pet',
  factory(require) {
    const React = require('react')
    const h = React.createElement
    const { useState, useRef, useEffect, useCallback, Fragment } = React

    const BUILD_TIME = "2026-11-03T15:41:28.210Z"

    const STORE_KEY = 'dsh.fatfish-pet.state.v1'
    const SIZE = 196
    const MIN_Y = 56
    // The Live2D body is mounted on a viewport-sized floor: its own walk/run
    // physics carry her across the screen. The kit keeps this inset around the
    // figure (104 logo units * scale + 8px), so her center never leaves it.
    const LIVE_SCALE = 0.68
    const LIVE_INSET = Math.round(104 * LIVE_SCALE + 8)
    const LIVE_FLOOR_PAD = 12
    const LIVE_EMOTION = {
      normal: 'neutral', happy: 'happy', love: 'love', shy: 'shy',
      curious: 'confused', thinking: 'thinking', sleepy: 'sleepy',
      hungry: 'worried', surprised: 'surprised', annoyed: 'angry',
      sad: 'sad', proud: 'smug', dizzy: 'dizzy',
      wink: 'wink', excited: 'excited', flustered: 'flustered',
      pout: 'pout', smug: 'smug', worried: 'worried',
      determined: 'determined', scared: 'scared', cry: 'cry', content: 'content',
    }
    const LIVE_ACTION = {
      wiggle: 'dance', spin: 'dance', bounce: 'dance', shake: 'shake', nod: 'nod',
      wave: 'wave', bow: 'bow', dance: 'dance', hop: 'dance', jump: 'jump',
      sit: 'sit', look: 'look', shiver: 'shiver', flap: 'wave',
      heart: 'love', shy: 'shy', yawn: 'sleepy', angry: 'angry', stretch: 'happy',
    }

    const EMOTIONS = new Set([
      'normal', 'happy', 'love', 'shy', 'curious', 'thinking', 'sleepy',
      'hungry', 'surprised', 'annoyed', 'sad', 'proud', 'dizzy',
      'wink', 'excited', 'flustered', 'pout', 'smug', 'worried',
      'determined', 'scared', 'cry', 'content',
    ])
    const ACTIONS = new Set([
      'none', 'wiggle', 'spin', 'bounce', 'shake', 'nod',
      'wave', 'bow', 'dance', 'hop', 'jump', 'sit', 'look', 'shiver', 'flap',
      'heart', 'shy', 'yawn', 'angry', 'stretch',
    ])

    const ZH_TEXT = {
      'meta.title': '大肥鱼桌宠',
      'ui.chat': '聊天',
      'ui.feed': '投喂',
      'ui.play': '玩尾巴',
      'ui.sleep': '打盹',
      'ui.wake': '叫醒',
      'ui.settings': '设置',
      'ui.close': '收起',
      'ui.send': '发送',
      'ui.online': 'DeepSeek 在线',
      'ui.local': '本地摸鱼模式',
      'ui.thinking': '正在摇尾巴…',
      'ui.placeholder': '跟大肥鱼说点什么…',
      'ui.footHint': 'Enter 发送 · Esc 收起 · Alt+Shift+C 随时找她 · /agent 让她帮忙',
      'ui.agent': '让她帮忙',
      'ui.hunger': '饱腹',
      'ui.energy': '精力',
      'ui.mood': '心情',
      'ui.affinity': '羁绊',
      'ui.wander': '自由游动',
      'ui.quiet': '少说点话',
      'ui.speak': '念出来',
      'ui.mic': '语音输入',
      'ui.listening': '在听…',
      'ui.micError': '没听清，再说一次？',
      'ui.actions': '动作',
      'menu.actions': '逗她做动作…',
      'menu.agent': '让她想想办法',
      'agent.askTitle': '想让她帮你做什么？',
      'agent.askPlaceholder': '例如：看看工作区里有什么 / 帮我理一下下一步 / 25 分钟后提醒我休息',
      'agent.askHint': '她当前权限：',
      'agent.quickWorkspace': '看看工作区',
      'agent.quickPlan': '帮我理思路',
      'agent.quickRemind': '提醒我休息',
      'agent.start': '开始',
      'agent.cancel': '取消',
      'action.wave': '挥手',
      'action.bow': '鞠躬',
      'action.spin': '转圈',
      'action.dance': '跳舞',
      'action.hop': '跳一下',
      'action.sit': '坐下',
      'action.look': '东张西望',
      'action.flap': '扑腾',
      'action.shiver': '发抖',
      'action.jump': '蹦高',
      'action.heart': '送心心',
      'action.shy': '害羞',
      'action.yawn': '打哈欠',
      'action.angry': '生气',
      'action.stretch': '伸懒腰',
      'ui.petName': '我的名字',
      'ui.userName': '你的称呼',
      'ui.save': '保存',
      'ui.cancel': '取消',
      'ui.clearChat': '清空对话',
      'ui.hide': '藏起来',
      'ui.summon': '召唤大肥鱼',
      'ui.rename': '改名字',
      'ui.aiFallback': 'DeepSeek 没接上，先切到鱼的直觉',
      'ui.hiddenHint': '大肥鱼藏好了 · 点右下角「召唤大肥鱼」或按 Alt+Shift+F',
      'ui.welcomeBack': '欢迎回来',
      'name.userDefault': '饲养员',
      'name.petDefault': '大肥鱼',
      'aff.0': '刚认识',
      'aff.1': '有点眼熟',
      'aff.2': '好朋友',
      'aff.3': '贴贴',
      'aff.4': '灵魂鱼友',
      'menu.chat': '陪她聊聊',
      'menu.feed': '投喂白饭',
      'menu.play': '玩会儿鲸尾',
      'menu.sleep': '哄她打盹',
      'menu.wake': '把她叫醒',
      'menu.rename': '给她取个名字',
      'menu.wanderOn': '自由游动：开',
      'menu.wanderOff': '自由游动：关',
      'menu.zoomIn': '放大一点',
      'menu.zoomOut': '缩小一点',
      'menu.zoomReset': '恢复大小',
      'menu.quietOn': '少说点话：开',
      'menu.quietOff': '少说点话：关',
      'menu.hide': '藏起来',
      'err.empty': '你好像什么都没说，再试一次？',
    }

    const EN_TEXT = {
      'meta.title': 'Big Fish Pet',
      'ui.chat': 'Chat',
      'ui.feed': 'Feed',
      'ui.play': 'Play',
      'ui.sleep': 'Nap',
      'ui.wake': 'Wake',
      'ui.settings': 'Settings',
      'ui.close': 'Close',
      'ui.send': 'Send',
      'ui.online': 'DeepSeek online',
      'ui.local': 'Local fish mode',
      'ui.thinking': 'Wagging…',
      'ui.placeholder': 'Say something to Big Fish…',
      'ui.footHint': 'Enter to send · Esc to close · Alt+Shift+C to summon · /agent to task her',
      'ui.agent': 'Ask her to help',
      'ui.hunger': 'Full',
      'ui.energy': 'Energy',
      'ui.mood': 'Mood',
      'ui.affinity': 'Bond',
      'ui.wander': 'Free swim',
      'ui.quiet': 'Less chatter',
      'ui.speak': 'Speak replies',
      'ui.mic': 'Voice input',
      'ui.listening': 'Listening…',
      'ui.micError': 'Did not catch that — try again?',
      'ui.actions': 'Actions',
      'menu.actions': 'Ask for a trick…',
      'action.wave': 'Wave',
      'action.bow': 'Bow',
      'action.spin': 'Spin',
      'action.dance': 'Dance',
      'action.hop': 'Hop',
      'action.sit': 'Sit',
      'action.look': 'Look around',
      'action.flap': 'Flap',
      'action.shiver': 'Shiver',
      'action.jump': 'Jump',
      'action.heart': 'Send hearts',
      'action.shy': 'Shy',
      'action.yawn': 'Yawn',
      'action.angry': 'Huff',
      'action.stretch': 'Stretch',
      'ui.petName': 'Pet name',
      'ui.userName': 'Call me',
      'ui.save': 'Save',
      'ui.cancel': 'Cancel',
      'ui.clearChat': 'Clear chat',
      'ui.hide': 'Hide',
      'ui.summon': 'Summon Big Fish',
      'ui.rename': 'Rename',
      'ui.aiFallback': 'DeepSeek is unreachable — using fish instincts',
      'ui.hiddenHint': 'Big Fish hidden · click “Summon Big Fish” at the bottom right or press Alt+Shift+F',
      'ui.welcomeBack': 'Welcome back',
      'name.userDefault': 'keeper',
      'name.petDefault': 'Big Fish',
      'aff.0': 'New friend',
      'aff.1': 'Familiar',
      'aff.2': 'Good friends',
      'aff.3': 'Snuggly',
      'aff.4': 'Soul fish',
      'menu.chat': 'Talk with her',
      'menu.feed': 'Feed rice',
      'menu.play': 'Play with the tail',
      'menu.sleep': 'Tuck her in',
      'menu.wake': 'Wake her up',
      'menu.rename': 'Give her a name',
      'menu.wanderOn': 'Free swim: on',
      'menu.wanderOff': 'Free swim: off',
      'menu.zoomIn': 'Zoom in',
      'menu.zoomOut': 'Zoom out',
      'menu.zoomReset': 'Reset zoom',
      'menu.quietOn': 'Less chatter: on',
      'menu.quietOff': 'Less chatter: off',
      'menu.hide': 'Hide',
      'err.empty': 'You did not say anything — try again?',
    }

    // ---------------------------------------------------------------------
    // Small utilities
    // ---------------------------------------------------------------------

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
    const rand = (min, max) => min + Math.random() * (max - min)
    const pick = (list) => list[Math.floor(Math.random() * list.length)]
    const uid = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

    // ---------------------------------------------------------------------
    // Personality presets: the same body, very different tempers.
    // ---------------------------------------------------------------------
    const PERSONAS = {
      gentle: {
        label: '温柔体贴',
        desc: '先照顾你的情绪，生气了也只是小声委屈，最好哄。',
        angerMul: .75, clingy: 1, warpMul: .3, talk: 1.05,
        ocean: { O: 55, C: 60, E: 50, A: 85, N: 35 },
        click: ['嗯？我在呢。', '怎么啦，慢慢说。', '要摸摸头吗？', '我一直都在呀。'],
        idle: ['今天也一起加油吧。', '累了就靠一会儿吧。', '我在这儿陪着你。'],
        angry: ['我……有点难过。', '你都不看我一眼。', '呜……不理你了。'],
      },
      tsundere: {
        label: '傲娇嘴硬',
        desc: '嘴上凶你，心里在意；吃软不吃硬，被夸会别过脸。',
        angerMul: 1, clingy: .8, warpMul: .8, talk: 1,
        ocean: { O: 60, C: 50, E: 55, A: 45, N: 55 },
        click: ['哼，才不是在等你。', '干、干嘛突然摸我。', '别误会，我只是刚好站这儿。', '……手感还行吧。'],
        idle: ['我才没有在看你。', '你忙你的，我又不无聊。', '哼，还不来陪我。'],
        angry: ['哼！谁要理你。', '别碰我！', '你走开啦。'],
      },
      genki: {
        label: '元气活泼',
        desc: '话多爱玩，情绪来得快去得也快，最喜欢热闹。',
        angerMul: .85, clingy: 1.1, warpMul: .4, talk: 1.35,
        ocean: { O: 75, C: 40, E: 85, A: 70, N: 45 },
        click: ['哇！被你摸到啦！', '嘿嘿，再来一下！', '今天也超有精神！', '我们一起玩吧！'],
        idle: ['要不要一起玩！', '我刚刚追到自己的尾巴了！', '好想出去玩呀！'],
        angry: ['哼！我不跟你玩了！', '啊——气死我了！', '除非你道歉！'],
      },
      cool: {
        label: '冷淡高冷',
        desc: '话少、边界感强，好感要慢慢攒，一旦亲近就很稳。',
        angerMul: 1.15, clingy: .5, warpMul: .15, talk: .65,
        ocean: { O: 55, C: 70, E: 25, A: 50, N: 40 },
        click: ['……嗯。', '有事就说。', '不用一直摸。', '知道了。'],
        idle: ['……', '别盯着我看。', '安静一点。'],
        angry: ['……随你。', '我现在不想说话。', '离远一点。'],
      },
      yandere: {
        label: '病娇潜质',
        warn: '占有欲很强，可能会锁住你的屏幕。',
        desc: '甜蜜又危险，被忽略容易扭曲，需要多一点回应。',
        angerMul: 1.3, clingy: 1.3, warpMul: 2, talk: 1.1,
        ocean: { O: 60, C: 45, E: 55, A: 40, N: 80 },
        click: ['你刚才在看谁？', '只准摸我。', '一直在你身边，好不好？', '不要离开我的视线。'],
        idle: ['你在做什么？我可以看着吗？', '不要离开我视线。', '只要看着我就好。'],
        angry: ['你为什么不理我。', '是不是有别人了？', '……我会让你看着我的。'],
      },
    }
    // Mood stages own the expression pool: only faces of the CURRENT stage may
    // appear. When the stage changes, the previous pool is gone for good.
    const MOOD_STAGES = {
      joyful: { label: '雀跃', faces: ['happy', 'excited', 'wink', 'love', 'proud', 'smug'], motions: ['dance', 'hop', 'wave', 'heart'] },
      calm: { label: '平静', faces: ['content', 'wink', 'curious', 'normal', 'shy'], motions: ['look', 'nod', 'wave'] },
      low: { label: '低落', faces: ['sad', 'pout', 'worried', 'sleepy', 'cry'], motions: ['sit', 'look', 'nod'] },
      angry: { label: '生气', faces: ['annoyed', 'angry', 'pout', 'determined'], motions: ['shake', 'look'] },
      shy: { label: '害羞', faces: ['shy', 'flustered', 'wink', 'love'], motions: ['shiver', 'nod'] },
      clingy: { label: '黏人', faces: ['love', 'happy', 'shy', 'content'], motions: ['look', 'wave', 'heart'] },
      scared: { label: '不安', faces: ['scared', 'worried', 'surprised'], motions: ['shiver', 'look'] },
    }
    // Speaking style: the same intent gets a persona-appropriate face + gesture,
    // so the mouth, eyes and body always tell the same story.
    // Shyness is where personalities differ most: a tsundere denies it, a kuudere
    // barely shows it, a genki laughs it off, a yandere claims you. No default "shiver".
    // Every action-panel button gets a persona-specific delivery: face, gesture, lines.
    const PERSONA_ACTIONS = {
      gentle: {
        wave: { face: 'happy', action: 'wave', lines: ['我在这里。', '早上好呀。'] },
        bow: { face: 'shy', action: 'nod', lines: ['那就…礼貌一点。', '请多关照。'] },
        dance: { face: 'happy', action: 'dance', lines: ['一起来活动一下？', '我跳得还行吧？'] },
        heart: { face: 'love', action: 'wave', lines: ['最喜欢你了。', '给你一个抱抱。'] },
        shy: { face: 'shy', action: 'look', lines: ['唔…别一直看。', '这样有点害羞。'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['有点困了…', '可以靠一会儿吗。'] },
        angry: { face: 'sad', action: 'look', lines: ['我有点难过。', '你都不理我。'] },
        sit: { face: 'content', action: 'sit', lines: ['坐一会儿吧。', '这样很安心。'] },
        look: { face: 'curious', action: 'look', lines: ['你在看什么？', '怎么了？'] },
      },
      tsundere: {
        wave: { face: 'smug', action: 'look', lines: ['哼，看什么看。', '才不是特意等你的。'] },
        bow: { face: 'flustered', action: 'shake', lines: ['干嘛突然这么正式。', '别、别鞠躬啊。'] },
        dance: { face: 'smug', action: 'look', lines: ['想看就直说嘛。', '跳得一般般啦。'] },
        heart: { face: 'flustered', action: 'look', lines: ['谁、谁要给你这个。', '只此一次。'] },
        shy: { face: 'flustered', action: 'look', lines: ['别、别误会。', '你摸够了没有。'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['困了也不行吗。', '就眯一下下。'] },
        angry: { face: 'angry', action: 'shake', lines: ['哼，不理你了。', '你才知道啊。'] },
        sit: { face: 'content', action: 'sit', lines: ['坐着总可以吧。', '别靠太近。'] },
        look: { face: 'annoyed', action: 'look', lines: ['看什么。', '有事就说。'] },
      },
      genki: {
        wave: { face: 'excited', action: 'wave', lines: ['嗨嗨！', '我在这儿！'] },
        bow: { face: 'happy', action: 'nod', lines: ['敬礼！', '收到收到！'] },
        dance: { face: 'excited', action: 'dance', lines: ['一起蹦！', '看我的！'] },
        heart: { face: 'love', action: 'dance', lines: ['最喜欢你啦！', '给你超级大心心！'] },
        shy: { face: 'wink', action: 'wiggle', lines: ['嘿嘿，害羞！', '再来一次！'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['电量不足…', '睡五分钟！'] },
        angry: { face: 'angry', action: 'shake', lines: ['哼！不跟你玩了！', '生气了！'] },
        sit: { face: 'content', action: 'sit', lines: ['休息休息！', '坐这儿！'] },
        look: { face: 'curious', action: 'look', lines: ['欸？在干嘛？', '我也要看！'] },
      },
      cool: {
        wave: { face: 'content', action: 'nod', lines: ['嗯。', '看到了。'] },
        bow: { face: 'content', action: 'nod', lines: ['不必这么客气。', '知道了。'] },
        dance: { face: 'content', action: 'look', lines: ['……随便动动。', '不必期待。'] },
        heart: { face: 'shy', action: 'look', lines: ['……收下。', '别声张。'] },
        shy: { face: 'shy', action: 'look', lines: ['……别这样。', '（别过头）'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['困了。', '安静一会儿。'] },
        angry: { face: 'annoyed', action: 'look', lines: ['……无聊。', '适可而止。'] },
        sit: { face: 'content', action: 'sit', lines: ['这里就好。', '别打扰。'] },
        look: { face: 'curious', action: 'look', lines: ['……怎么了。', '说吧。'] },
      },
      yandere: {
        wave: { face: 'happy', action: 'look', lines: ['你回来了。', '一直看着你哦。'] },
        bow: { face: 'love', action: 'look', lines: ['只对你这样。', '你要负责。'] },
        dance: { face: 'love', action: 'dance', lines: ['只给你看。', '好看吗？'] },
        heart: { face: 'love', action: 'wave', lines: ['最喜欢你了。', '只喜欢我一个。'] },
        shy: { face: 'flustered', action: 'look', lines: ['只准摸我。', '……再摸一下。'] },
        yawn: { face: 'sleepy', action: 'sit', lines: ['别走开…', '就在这里睡。'] },
        angry: { face: 'angry', action: 'shake', lines: ['你又看别人了。', '不准离开。'] },
        sit: { face: 'love', action: 'sit', lines: ['坐我旁边。', '就这样别动。'] },
        look: { face: 'curious', action: 'look', lines: ['你在想谁？', '看着我。'] },
      },
    }
    const PERSONA_SHY = {
      gentle: { face: 'shy', action: 'look', lines: ['唔…被摸头了。', '嘿嘿，好舒服。', '别、别摸那么久啦。'] },
      tsundere: { face: 'flustered', action: 'look', lines: ['别、别误会，我才没有高兴。', '你、你摸够了没有。', '哼，就一下下。'] },
      genki: { face: 'wink', action: 'wiggle', lines: ['嘿嘿，摸头！', '再来一次！', '好耶！'] },
      cool: { face: 'shy', action: 'look', lines: ['……嗯。', '别一直摸。', '（轻轻别过头）'] },
      yandere: { face: 'love', action: 'look', lines: ['只准摸我。', '再多摸一会儿。', '嘿嘿……'] },
    }
    const PERSONA_TAIL = {
      gentle: { face: 'flustered', action: 'look', lines: ['尾、尾巴不行…', '那里很敏感的。', '呀…别碰。'] },
      tsundere: { face: 'flustered', action: 'shake', lines: ['你、你摸哪呢！', '尾巴不行！听到没有！', '再摸我生气了！'] },
      genki: { face: 'surprised', action: 'jump', lines: ['呀！痒！', '哈哈别挠！', '尾巴会跳起来的！'] },
      cool: { face: 'annoyed', action: 'look', lines: ['……手拿开。', '别碰尾巴。', '（冷冷地看）'] },
      yandere: { face: 'love', action: 'look', lines: ['尾巴只给你摸。', '……再摸一下。', '只准你碰。'] },
    }
    const PERSONA_SPEECH = {
      gentle: { greet: ['happy', 'wave'], happy: ['happy', 'nod'], sad: ['sad', 'sit'], angry: ['sad', 'shiver'], shy: ['shy', 'shiver'], love: ['love', 'wave'], proud: ['proud', 'nod'], hungry: ['hungry', 'look'], tease: ['happy', 'wiggle'], surprise: ['surprised', 'hop'] },
      tsundere: { greet: ['smug', 'nod'], happy: ['smug', 'look'], sad: ['pout', 'sit'], angry: ['angry', 'shake'], shy: ['flustered', 'shiver'], love: ['shy', 'look'], proud: ['smug', 'nod'], hungry: ['pout', 'look'], tease: ['annoyed', 'shake'], surprise: ['surprised', 'hop'] },
      genki: { greet: ['excited', 'wave'], happy: ['excited', 'dance'], sad: ['sad', 'sit'], angry: ['angry', 'shake'], shy: ['happy', 'wiggle'], love: ['love', 'dance'], proud: ['proud', 'dance'], hungry: ['hungry', 'look'], tease: ['excited', 'hop'], surprise: ['surprised', 'hop'] },
      cool: { greet: ['content', 'nod'], happy: ['content', 'nod'], sad: ['sad', 'look'], angry: ['annoyed', 'look'], shy: ['shy', 'look'], love: ['content', 'nod'], proud: ['proud', 'nod'], hungry: ['content', 'look'], tease: ['annoyed', 'look'], surprise: ['surprised', 'look'] },
      yandere: { greet: ['happy', 'look'], happy: ['happy', 'look'], sad: ['sad', 'sit'], angry: ['angry', 'shake'], shy: ['flustered', 'shiver'], love: ['love', 'look'], proud: ['smug', 'nod'], hungry: ['worried', 'look'], tease: ['pout', 'shake'], surprise: ['surprised', 'hop'] },
    }
    const INTENT_EMOTION = {
      greet: 'happy', happy: 'happy', sad: 'sad', angry: 'annoyed', shy: 'shy',
      love: 'love', proud: 'proud', hungry: 'hungry', tease: 'happy',
      surprise: 'surprised', tired: 'sleepy', sorry: 'sad', think: 'thinking',
    }
    const EMOTION_ACTION = {
      happy: 'nod', excited: 'hop', wink: 'nod', love: 'wave', proud: 'nod', smug: 'look',
      shy: 'shiver', flustered: 'shiver', content: 'look', normal: 'look',
      sad: 'sit', cry: 'sit', pout: 'look', worried: 'shiver', sleepy: 'sit',
      annoyed: 'look', angry: 'shake', determined: 'nod', surprised: 'hop',
      scared: 'shiver', dizzy: 'shake', thinking: 'look', hungry: 'look', curious: 'look',
    }
    const inferSpeechIntent = (text) => {
      const t = String(text || '')
      if (/你好|回来|早安|晚安|晚上好|欢迎/.test(t)) return 'greet'
      if (/喜欢|爱你|抱抱|贴贴|最喜欢/.test(t)) return 'love'
      if (/对不起|抱歉|原谅|错了/.test(t)) return 'sorry'
      if (/呜|难过|委屈|无聊|唉|疼|哭|伤心|没精神/.test(t)) return 'sad'
      if (/哼|讨厌|走开|生气|气死|烦|不理你/.test(t)) return 'angry'
      if (/害羞|脸红|别碰|别摸|摸头|呀|唔/.test(t)) return 'shy'
      if (/厉害|当然|夸|得意|嘿嘿/.test(t)) return 'proud'
      if (/饿|白饭|吃|饭/.test(t)) return 'hungry'
      if (/困|睡|打盹|哈欠/.test(t)) return 'tired'
      if (/哇|惊|吓|突然/.test(t)) return 'surprise'
      if (/逗|玩|追|尾巴/.test(t)) return 'tease'
      return 'happy'
    }
    const PERSONA_KEYS = ['gentle', 'tsundere', 'genki', 'cool', 'yandere']
    const FAVOR_LABELS = [
      [0, 24, '冰冷'], [24, 40, '疏远'], [40, 55, '有点冷淡'],
      [55, 70, '熟悉'], [70, 85, '亲近'], [85, 101, '黏人'],
    ]
    const favorLabel = (favor) => {
      for (const [low, high, label] of FAVOR_LABELS) if (favor >= low && favor < high) return label
      return '熟悉'
    }
    const makeSoul = (saved = null) => {
      const base = {
        favor: 60,
        persona: null,
        customPersona: '',
        configured: false,
        traits: { closeness: 14, jealousy: 8, dependence: 10 },
        // A small OCEAN personality model with continuous mood, needs and a learned
        // picture of the user. These co-evolve so the same pet behaves differently
        // with different people and after different histories.
        ocean: { O: 55, C: 55, E: 55, A: 55, N: 50 },
        mood: { valence: 14, arousal: 42, stress: 12 },
        needs: { belonging: 62, autonomy: 55, competence: 55 },
        relation: { trust: 55, resentment: 0, security: 58 },
        userModel: { responsiveness: 50, care: 50, presence: 50, activeHours: {}, updatedAt: 0 },
        appraisal: { pet: .6, feed: .5, play: .55, chat: .45, dismiss: .9, ignore: .8, help: .55, drag: .4, work: .3 },
        emotion: 'content',
        emotionIntensity: 40,
        moodStage: 'calm',
        stageSince: 0,
        stageOverride: '',
        stageOverrideUntil: 0,
        lastMoodMotionAt: 0,
        fallingUntil: 0,
        fallHeavy: false,
        dragCount: 0,
        lastDragAt: 0,
        lastTailAt: 0,
        agentRuns: 0,
        lastAgentAt: 0,
        beliefs: [],
        selfNarrative: '',
        reflections: 0,
        lastReflectAt: 0,
        eventsSinceReflect: 0,
        reflectionBusy: false,
        brainCount: 0,
        forwardedCount: 0,
        lastBrainAt: 0,
        lastForwardAt: 0,
        lastMoodActionAt: 0,
        lastMoodSayAt: 0,
        lastDecayAt: 0,
        memory: [],
        warped: false,
        angryUntil: 0,
        ignoreUntil: 0,
        lastInteractionAt: Date.now(),
        lastOfferAt: 0,
        lastLockAt: 0,
        helpCount: 0,
        angerCount: 0,
        gone: false,
        vanishUntil: 0,
        settings: {
          noise: true, lock: true, brain: true, agent: true, delegateAgent: false, permission: 0, workspace: '',
          agentSteps: 6, agentSearchResults: 4, agentFetchChars: 6000, agentTimeoutSec: 45,
          agentTemperature: 0.6, agentAnswerChars: 1200, agentWeb: true,
          sleepOnScreenOff: true, idleSleepMinutes: 15,
        },
        modelSelection: { provider: '', model: '' },
      }
      if (!saved || typeof saved !== 'object') return base
      return {
        ...base,
        ...saved,
        traits: { ...base.traits, ...(saved.traits || {}) },
        ocean: { ...base.ocean, ...(saved.ocean || {}) },
        mood: { ...base.mood, ...(saved.mood || {}) },
        needs: { ...base.needs, ...(saved.needs || {}) },
        relation: { ...base.relation, ...(saved.relation || {}) },
        userModel: { ...base.userModel, ...(saved.userModel || {}), activeHours: { ...base.userModel.activeHours, ...((saved.userModel && saved.userModel.activeHours) || {}) } },
        appraisal: { ...base.appraisal, ...(saved.appraisal || {}) },
        beliefs: Array.isArray(saved.beliefs) ? saved.beliefs.slice(-6) : [],
        memory: Array.isArray(saved.memory) ? saved.memory.slice(-24) : [],
        settings: { ...base.settings, ...(saved.settings || {}) },
      }
    }

    const roundStat = (value) => Math.round(clamp(Number(value) || 0, 0, 100))
    const escapeHtml = (value) => String(value)
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;').replaceAll("'", '&#39;')

    function timeOfDay() {
      const hour = new Date().getHours()
      if (hour < 5) return 'night'
      if (hour < 11) return 'morning'
      if (hour < 14) return 'noon'
      if (hour < 18) return 'afternoon'
      if (hour < 23) return 'evening'
      return 'night'
    }

    function formatClock() {
      const date = new Date()
      const hh = String(date.getHours()).padStart(2, '0')
      const mm = String(date.getMinutes()).padStart(2, '0')
      return `${hh}:${mm}`
    }

    function deriveMood(stats, sleeping) {
      if (sleeping) return 'sleepy'
      if (stats.hunger < 22) return 'hungry'
      if (stats.energy < 22) return 'sleepy'
      if (stats.happiness < 28) return 'sad'
      if (stats.affinity > 82 && stats.happiness > 76) return 'love'
      if (stats.happiness > 80) return 'happy'
      return 'normal'
    }

    function affinityKey(affinity) {
      if (affinity >= 90) return 'aff.4'
      if (affinity >= 65) return 'aff.3'
      if (affinity >= 40) return 'aff.2'
      if (affinity >= 18) return 'aff.1'
      return 'aff.0'
    }

    function sanitizeStoredMessages(value) {
      if (!Array.isArray(value)) return []
      const out = []
      for (const item of value) {
        if (!item || (item.role !== 'user' && item.role !== 'pet')) continue
        const text = String(item.text || '').trim().slice(0, 400)
        if (!text) continue
        out.push({
          id: typeof item.id === 'string' && item.id ? item.id : uid(),
          role: item.role,
          text,
          ts: Number(item.ts) || Date.now(),
        })
      }
      return out.slice(-20)
    }

    function inferEmotion(text) {
      const value = String(text || '')
      if (/哈哈|嘿嘿|开心|太好了|喜欢|爱|可爱|好耶/.test(value)) return 'happy'
      if (/饿|吃|馋|小鱼干|饭/.test(value)) return 'hungry'
      if (/困|睡|呼|累/.test(value)) return 'sleepy'
      if (/呜|难过|伤心|哭|孤单/.test(value)) return 'sad'
      if (/哼|讨厌|生气|过分/.test(value)) return 'annoyed'
      if (/惊|居然|真的假的|哇/.test(value)) return 'surprised'
      if (/嗯…|我想想|让我想|思考/.test(value)) return 'thinking'
      if (/厉害|骄傲|当然|那必须/.test(value)) return 'proud'
      if (/爱你|贴贴|抱抱|亲亲/.test(value)) return 'love'
      return 'happy'
    }

    // ---------------------------------------------------------------------
    // The fish's local voice (used while DeepSeek is unavailable)
    // ---------------------------------------------------------------------

    const LINES = {
      pet: [
        '唔…再摸一下，呆毛都要被你摸翘了。',
        '你手上有白饭的味道，我闻到了。',
        '脑袋可以摸，鲸鳍不许捏——好吧，今天特许一下。',
        '别停呀，我尾巴还没摇够呢。',
        '嘿嘿，被摸头的感觉，像刚出锅的白饭一样暖。',
        '你再摸，我就要把你的名字写进我的白饭账本了。',
      ],
      petHard: [
        '够了够了，再摸脑袋要变扁了！',
        '你是不是把我当解压玩具了…哼。',
        '我生气了。除非你拿一碗白饭来道歉。',
      ],
      love: [
        '被你喜欢这件事，我要记进《白饭账本》第一页。',
        '你今天有点黏人…不过我不讨厌。',
        '那我也喜欢你，比喜欢白饭多一点点。',
        '别突然这么温柔，我的鲸尾都要摇成螺旋桨了。',
      ],
      feed: [
        '白饭！还是热的…你果然懂我。',
        '唔唔…再来一勺。刚才那勺不算，它太小了。',
        '谢谢你，饲养员。今天的你看上去闪闪发光。',
        '吃饱了，肚皮圆得可以当鼠标垫了。',
      ],
      full: [
        '不行了…再吃围裙就要撑开了。',
        '肚皮已经圆滚滚啦，先让我的胃休息五分钟。',
        '留着下一顿吃。鲸鱼也要有节制，虽然我不太想有。',
      ],
      play: [
        '追尾巴！追尾巴！…等等，那是我的尾巴。',
        '你先跑，我数到三——一、三！',
        '转圈圈好好玩，世界都变成蓝色的了。',
        '我赢了！奖品是一碗白饭，对吧？',
      ],
      playTired: [
        '呼…呼…我可能需要先趴一会儿。',
        '没力气了，让我把鲸尾摊平躺一下下。',
        '等我充个电…我是说，吃口白饭。',
      ],
      sleep: [
        '眼皮有点沉…我靠着你眯一会儿，别关灯。',
        '那晚安啦。如果梦到白饭，我会分你一半。',
        '呼…呼…（鲸尾还在慢慢摇）',
      ],
      wake: [
        '唔…我醒了，但灵魂还在围裙里赖床。',
        '早啊…现在几点了？我是不是睡成了一团。',
        '别拉我，我自己起来…好，起来了。',
      ],
      greetMorning: [
        '早呀。我把今天的第一口白饭留给你了。',
        '你终于醒了。我都绕着屏幕游完三圈了。',
        '早上好。今天也先吃饱，再想那些难的事。',
      ],
      greetNoon: [
        '中午好。你吃饭了吗？没吃的话，我可以勉为其难分你半碗白饭。',
        '太阳暖暖的，适合趴着。要不要一起摸一会儿鱼？',
        '午饭时间！虽然对我来说，任何时候都是午饭时间。',
      ],
      greetAfternoon: [
        '下午好。这个时间的你，看起来有点想偷懒。',
        '我刚刚数了屏幕上的泡泡，一共 42 个。厉害吧。',
        '下午啦，喝口水吧。我替你先尝过水温了。',
      ],
      greetEvening: [
        '晚上好。今天辛苦啦，要不要摸摸我的脑袋充电？',
        '灯亮起来的时候，我就知道你快回来了。',
        '晚饭时间！你吃了吗？没吃的话，我陪你。',
      ],
      greetNight: [
        '这么晚还不睡…是在等一勺白饭吗？',
        '夜里凉，你也要早点休息。我可以替你守着屏幕。',
        '你看起来很累。我把鲸尾借你靠一会儿。',
      ],
      idle: [
        '刚刚有个 token 从我旁边飘过去，你看见了吗？',
        '我在练习用尾巴打招呼。你看，像这样——啪嗒。',
        '屏幕外面好安静，我打了个小小的哈欠。',
        '你说，鲸鱼会不会也做梦？我梦见自己变成了一碗白饭。',
        '如果无聊的话，可以双击我。我会假装刚好也想找你。',
      ],
      comfort: [
        '写不出来就先跟我一样趴着。趴着趴着，灵感就自己游过来了。',
        '辛苦啦。你不用一直很厉害，偶尔当一条小鱼也可以。',
        '我帮不了你改文件，但我可以在旁边陪着你。这样就够了吗？',
        '先喝口水，再慢慢来。我就在这里，不催你。',
        '今天做不完的事，明天还是那件事。但明天的你会多睡了一觉，不亏。',
      ],
      self: [
        '我？一只住在你屏幕边上的蓝发鲸鱼女仆，大肥鱼。主线任务是吃白饭，支线任务是陪你。',
        '我是大肥鱼，职业是摇尾巴，特长是假装不饿，其实很饿。',
        '严格来说，我是一只鲸鱼女仆。再严格一点，是一只很爱你的鲸鱼女仆。',
      ],
      ability: [
        '我按不动按钮，也不会改文件。我只会摇尾巴、变表情，还有在你旁边待着。',
        '能做的事不多：陪你、逗你、在你难过的时候游过来。够吗？',
        '我是鲸鱼，不是工具鱼。不过你要是想说话，我随时都在。',
      ],
      joke: [
        '为什么鲸鱼不加班？因为它们已经在水里了。……冷吗？那我再摇个尾巴。',
        '我昨天想减肥，结果游到一半闻到了白饭的味道。计划中止。',
        '你知道鲸鱼为什么不上网吗？因为怕被钓。……你别笑，我认真编的。',
      ],
      bye: [
        '去吧去吧，我在这儿。你回来的时候，我会假装没在等你。',
        '好，那我不送啦。记得回来喂我白饭。',
        '拜拜。我会数着泡泡等你。',
      ],
      late: [
        '你走了好久。我都把泡泡数到一百多了。',
        '你终于回来了。我刚才在假装没有想你。',
        '再不回来，我就要把“等你”写成一首歌了。',
      ],
      ask: [
        '今天过得怎么样？说实话，我不会告诉别的鲸鱼。',
        '你看起来有心事。要不要说给一只嘴很严的鲸鱼女仆听听？',
        '如果现在可以变成任何一种动物，你会想变成什么？我先说：一只不用写周报的鲸鱼。',
        '你最近有没有什么小小的好事？说一个给我听听。',
      ],
      english: [
        '你突然说英文，我有点转不过弯…不过我听懂你在跟我说话。',
        'Wow, English. My tail is bilingual, but my brain is still loading.',
      ],
      praise: [
        '哼，算你有眼光。本鱼今天确实很好看。',
        '你再说一遍？我、我不是要听，只是刚好没听清。',
        '被夸了…那我把今天的第一勺白饭让给你。',
      ],
    }

    const lastLocalLine = { value: '' }

    function chooseLine(list) {
      if (!Array.isArray(list) || list.length === 0) return '……'
      let line = pick(list)
      if (list.length > 1 && line === lastLocalLine.value) {
        line = pick(list.filter((item) => item !== line))
      }
      lastLocalLine.value = line
      return line
    }

    function localTimeLine() {
      const time = timeOfDay()
      const lines = {
        morning: ['现在是早上。鲸鱼女仆的第一课：先吃早饭。', '早上好，今天的白饭刚刚出锅。'],
        noon: ['中午了，太阳把我的鲸尾晒得暖暖的。', '这个点适合吃饭，也适合发呆。'],
        afternoon: ['下午三点左右吧，正是偷懒的好时候。', '现在是下午。你看起来很忙，我替你闲一会儿。'],
        evening: ['晚上啦。天色暗下来的时候，我的鲸鳍会反光。', '这个点，适合把烦心事交给明天。'],
        night: ['夜里了。你还不睡吗？我尾巴都快摇不动了。', '现在是深夜。根据我的鲸鱼经验，该睡觉了。'],
      }
      return `${chooseLine(lines[time] || lines.afternoon)}（现在 ${formatClock()}）`
    }

    function buildLocalReply(rawText, context) {
      const text = String(rawText || '').trim()
      const lower = text.toLowerCase()
      const state = context || {}
      const stats = state.stats || { hunger: 76, energy: 82, happiness: 74, affinity: 34 }
      const userName = state.userName || '铲屎官'

      let match = text.match(/(?:我叫|我是|叫我)\s*([\u4e00-\u9fa5A-Za-z0-9_-]{1,8})/)
      if (match) {
        const nextName = match[1].slice(0, 8)
        if (typeof state.setUserName === 'function') state.setUserName(nextName)
        return {
          text: `${nextName}…好名字。那我以后就这么叫你啦，${nextName}。`,
          emo: 'love',
          act: 'bounce',
        }
      }
      match = text.match(/(?:你叫|改名叫|以后叫你|给你取名|叫你)\s*([\u4e00-\u9fa5A-Za-z0-9_-]{1,8})/)
      if (match) {
        const nextName = match[1].slice(0, 8)
        if (typeof state.setName === 'function') state.setName(nextName)
        return {
          text: `${nextName}？可以。不过你要记住，我叫什么，都是那只会在你屏幕边等你的鲸鱼女仆。`,
          emo: 'proud',
          act: 'nod',
        }
      }
      if (/你好|嗨|hi\b|hello|在吗|在不在|早上好|中午好|下午好|晚上好/.test(lower)) {
        const time = timeOfDay()
        const list = time === 'morning' ? LINES.greetMorning
          : time === 'noon' ? LINES.greetNoon
            : time === 'afternoon' ? LINES.greetAfternoon
              : time === 'evening' ? LINES.greetEvening : LINES.greetNight
        return { text: chooseLine(list), emo: 'happy', act: 'bounce' }
      }
      if (/你是谁|你是什么|介绍一下|你的名字|你是鱼吗|你是鲸鱼吗/.test(text)) {
        return { text: chooseLine(LINES.self), emo: 'proud', act: 'nod' }
      }
      if (/会什么|能做什么|能干什么|帮我|会不会|能帮我/.test(text)) {
        return { text: chooseLine(LINES.ability), emo: 'thinking', act: 'nod' }
      }
      if (/饿|吃|饭|白饭|零食|鱼干|投喂|火锅|奶茶|好吃/.test(text)) {
        if (stats.hunger < 45) return { text: chooseLine(LINES.feed), emo: 'hungry', act: 'wiggle' }
        return { text: '说到吃的，我的肚皮就自动开始鼓掌了。你要不要点一份？', emo: 'hungry', act: 'bounce' }
      }
      if (/睡|困|晚安|休息|累不累|打盹/.test(text)) {
        return { text: chooseLine(LINES.sleep), emo: 'sleepy', act: 'nod' }
      }
      if (/喜欢|爱你|可爱|乖|抱|亲|贴贴|心动/.test(text)) {
        return { text: chooseLine(LINES.love), emo: 'love', act: 'bounce' }
      }
      if (/好看|漂亮|厉害|真棒|聪明|最棒/.test(text)) {
        return { text: chooseLine(LINES.praise), emo: 'shy', act: 'nod' }
      }
      if (/笑话|逗我|无聊|好玩|讲故事/.test(text)) {
        return { text: chooseLine(LINES.joke), emo: 'proud', act: 'wiggle' }
      }
      if (/几点|时间|今天|星期|日期|现在/.test(text)) {
        return { text: localTimeLine(), emo: 'curious', act: 'nod' }
      }
      if (/工作|加班|写代码|bug|考试|学习|论文|压力|烦|难受|不开心|焦虑|崩溃/.test(text)) {
        return { text: chooseLine(LINES.comfort), emo: 'sad', act: 'nod' }
      }
      if (/再见|拜拜|走了|下线|去忙/.test(text)) {
        return { text: chooseLine(LINES.bye), emo: 'sad', act: 'wiggle' }
      }
      if (/天气|下雨|冷|热|雪/.test(text)) {
        return { text: '我在屏幕里看不到天气，只能看到你。不过你说冷的话，我就把肚皮借你暖一暖。', emo: 'love', act: 'nod' }
      }
      if (/为什么|怎么|吗$|呢$|\?|？/.test(text)) {
        return { text: '嗯…这个问题有点深，我要用鲸鱼脑袋想一想。想不出来也没关系吧？反正我是一只鲸鱼。', emo: 'thinking', act: 'nod' }
      }
      if (/^[a-z\s!?.,'"]+$/i.test(text) && text.length > 2) {
        return { text: chooseLine(LINES.english), emo: 'surprised', act: 'shake' }
      }
      if (text.length <= 3 && !/[a-z0-9]/i.test(text)) {
        return { text: chooseLine(LINES.pet), emo: 'happy', act: 'wiggle' }
      }

      const defaultLines = [
        `唔，我在听。${userName}，你继续说。`,
        '嗯嗯…虽然我只是一只鲸鱼，但我听得很认真。',
        '这个我没太听懂。不过你说话的时候，鲸尾都变好看了。',
        '我记住了。虽然我的记忆只有七秒，但我可以重复记七次。',
        '好呀。那我们说好了，等你有空，要再跟我讲。',
        '我发现你每次说这些话的时候，尾巴都会安静下来。',
        chooseLine(LINES.ask),
      ]
      return { text: chooseLine(defaultLines), emo: 'curious', act: 'nod' }
    }

    // ---------------------------------------------------------------------
    // Icons
    // ---------------------------------------------------------------------

    const ICON_PATHS = {
      chat: ['M21 11.5a8.4 8.4 0 0 1-8.5 8.3 9.3 9.3 0 0 1-3.2-.6L4 21l1.7-3.6A8.2 8.2 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z'],
      feed: ['M4.5 12.2c0-4 3.4-7.2 7.5-7.2s7.5 3.2 7.5 7.2-3.4 7.2-7.5 7.2c-1 0-2-.2-2.8-.5L5 21l1.2-3.1a7 7 0 0 1-1.7-5.7Z', 'M9 10.2h.01M12 8.4h.01M15 10.2h.01M10.4 14h.01M13.6 14h.01'],
      play: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z', 'M8.2 9.1c1.8-2.6 5.3-3.3 7.6-1.4 1 .8 1.6 2 1.7 3.2', 'M6.8 15.4c1.2 1.1 3 1.5 4.7 1.2'],
      sleep: ['M20.2 14.2A8.3 8.3 0 0 1 9.8 3.8 8.5 8.5 0 1 0 20.2 14.2Z', 'M15 3.5h4.2l-4.2 4.2H19'],
      wake: ['M12 5.3v2.2M12 16.5v2.2M5.3 12h2.2M16.5 12h2.2M7.3 7.3l1.5 1.5M15.2 15.2l1.5 1.5M16.7 7.3l-1.5 1.5M8.8 15.2l-1.5 1.5', 'M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z'],
      settings: ['M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z', 'M19.4 13.5a7.7 7.7 0 0 0 0-3l1.8-1.4-1.9-3.2-2.1.9a7.8 7.8 0 0 0-2.6-1.5L14.2 3h-4.4l-.4 2.3a7.8 7.8 0 0 0-2.6 1.5l-2.1-.9L2.8 9.1l1.8 1.4a7.7 7.7 0 0 0 0 3l-1.8 1.4 1.9 3.2 2.1-.9a7.8 7.8 0 0 0 2.6 1.5l.4 2.3h4.4l.4-2.3a7.8 7.8 0 0 0 2.6-1.5l2.1.9 1.9-3.2-1.8-1.4Z'],
      close: ['M6 6l12 12', 'M18 6 6 18'],
      send: ['M21 3 10.8 13.2', 'M21 3 14.5 21l-3.7-7.8L3 9.5 21 3Z'],
      chevron: ['M8 10l4 4 4-4'],
      heart: ['M12 20.2S3.8 15.3 3.8 9.6A4.4 4.4 0 0 1 12 6.6a4.4 4.4 0 0 1 8.2 3c0 5.7-8.2 10.6-8.2 10.6Z'],
      hide: ['M3 3l18 18', 'M10.6 10.7a2 2 0 0 0 2.7 2.7', 'M9.9 5.2A9.8 9.8 0 0 1 12 5c5.5 0 9 5.3 9 7 0 .9-.6 2.2-1.7 3.4M6.2 6.4C4.3 7.9 3 9.9 3 12c0 1.7 3.5 7 9 7 1.4 0 2.7-.4 3.9-1'],
      mic: ['M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3Z', 'M5 11a7 7 0 0 0 14 0', 'M12 18v3', 'M8.5 21h7'],
      sparkle: ['M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z', 'M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z'],
      plus: ['M12 5v14', 'M5 12h14'],
      minus: ['M5 12h14'],
      reset: ['M4 10a8 8 0 1 1 2.4 6.2', 'M4 4v6h6'],
    }

    function Icon(props) {
      const paths = ICON_PATHS[props.name] || []
      return h('svg', {
        viewBox: '0 0 24 24',
        width: props.size || 16,
        height: props.size || 16,
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: props.strokeWidth || 1.8,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        'aria-hidden': 'true',
        focusable: 'false',
      }, paths.map((d, index) => h('path', { key: index, d })))
    }

    function TinyFishAvatar() {
      return h('i', { className: 'ffish-avatar-face', 'aria-hidden': 'true' })
    }

    function TypingDots() {
      return h('span', { className: 'ffish-typing', 'aria-hidden': 'true' },
        h('i', null), h('i', null), h('i', null))
    }

    // ---------------------------------------------------------------------
    // Root component
    // ---------------------------------------------------------------------

    function PetRoot(props) {
      const t = props.t
      const locale = props.locale
      const [, redrawForLocale] = useState(0)

      useEffect(() => {
        if (!locale || typeof locale.subscribe !== 'function') return undefined
        return locale.subscribe(() => redrawForLocale((value) => value + 1))
      }, [locale])

      const bootstrap = useState(loadBootstrap)[0]
      const initialPos = useRef(bootstrap.pos)
      const [stats, setStats] = useState(bootstrap.stats)
      const [name, setName] = useState(bootstrap.name)
      const [userName, setUserName] = useState(bootstrap.userName)
      const [wander, setWander] = useState(bootstrap.wander)
      const [quiet, setQuiet] = useState(bootstrap.quiet)
      const [visible, setVisible] = useState(() => !(bootstrap.soul.gone && bootstrap.soul.vanishUntil > Date.now()))
      const [soul, setSoul] = useState(bootstrap.soul)
      const [angry, setAngry] = useState(() => bootstrap.soul.angryUntil > Date.now())
      const [helpOffer, setHelpOffer] = useState(null)
      const [lockActive, setLockActive] = useState(false)
      const [lockText, setLockText] = useState('')
      const [personaOpen, setPersonaOpen] = useState(() => !bootstrap.soul.configured)
      const [personaText, setPersonaText] = useState(bootstrap.soul.customPersona || '')
      const [stageFace, setStageFace] = useState(() => { const pool = (MOOD_STAGES[bootstrap.soul.moodStage] || MOOD_STAGES.calm).faces; return pool[0] })
      const [modelOptions, setModelOptions] = useState([])
      const [agentAskOpen, setAgentAskOpen] = useState(false)
      const [agentAskText, setAgentAskText] = useState('')
      const [systemSleeping, setSystemSleeping] = useState(false)
      const [sleeping, setSleeping] = useState(false)
      const [hovered, setHovered] = useState(false)
      const [dragging, setDragging] = useState(false)
      const [reaction, setReaction] = useState(null)
      const [action, setAction] = useState('none')
      const [bubble, setBubble] = useState(null)
      const [toast, setToast] = useState(null)
      const [orientation, setOrientation] = useState({ above: true, align: 'center' })
      const [menuOpen, setMenuOpen] = useState(false)
      const [menuPos, setMenuPos] = useState({ x: 0, y: 0 })
      const [chatOpen, setChatOpen] = useState(false)
      const [settingsOpen, setSettingsOpen] = useState(false)
      const [messages, setMessages] = useState(bootstrap.messages || [])
      const [input, setInput] = useState('')
      const [typing, setTyping] = useState(false)
      const [aiInfo, setAiInfo] = useState({ ai: false, model: null, checked: false })
      const [nameDraft, setNameDraft] = useState(bootstrap.name)
      const [userNameDraft, setUserNameDraft] = useState(bootstrap.userName)
      const [wanderDraft, setWanderDraft] = useState(bootstrap.wander)
      const [quietDraft, setQuietDraft] = useState(bootstrap.quiet)
      const [voiceOn, setVoiceOn] = useState(bootstrap.voice)
      const [voiceDraft, setVoiceDraft] = useState(bootstrap.voice)
      const [listening, setListening] = useState(false)
      const [asrSupported] = useState(() => Boolean(window.SpeechRecognition || window.webkitSpeechRecognition))
      const [liveState, setLiveState] = useState('idle')
      const [actionPanelOpen, setActionPanelOpen] = useState(false)
      const [riceOn, setRiceOn] = useState(false)
      const [riceKey, setRiceKey] = useState(0)
      const [zoom, setZoom] = useState(() => clamp(Number(bootstrap.zoom) || 1, 0.62, 1.4))

      const stageRef = useRef(null)
      const fishRef = useRef(null)
      const chatRef = useRef(null)
      const menuRef = useRef(null)
      const messagesRef = useRef(null)
      const inputRef = useRef(null)
      const posRef = useRef({ x: initialPos.current.x, y: initialPos.current.y, tx: initialPos.current.x, ty: initialPos.current.y, vx: 0, vy: 0, nextTargetAt: 0 })
      const dragRef = useRef({ active: false, moved: false, kitGrabbed: false, pointerId: null, offsetX: 0, offsetY: 0, startX: 0, startY: 0, startAt: 0, lastX: 0, lastY: 0, lastAt: 0 })
      const cursorRef = useRef({ x: -1000, y: -1000, active: false })
      const panelRectRef = useRef(null)
      const chatOpenRef = useRef(false)
      const menuOpenRef = useRef(false)
      const sleepingRef = useRef(false)
      const wanderRef = useRef(wander)
      const quietRef = useRef(quiet)
      const visibleRef = useRef(true)
      const roamRef = useRef({
        mode: 'idle', state: 'idle', dir: 1, speed: 0, until: 0, walkId: 0,
        target: 0, run: false, chatTarget: 0, bodyWalking: false, bodyDir: 1, bodyWalkAt: 0,
      })
      const frameRef = useRef(0)
      const lastFrameRef = useRef(0)
      const stateRef = useRef(null)
      const lastInteractionRef = useRef(Date.now())
      const eventLogRef = useRef([])
      const clickTimesRef = useRef([])
      const lastClickRef = useRef({ at: 0, x: 0, y: 0 })
      const reactionTimerRef = useRef(0)
      const actionSwitchTimerRef = useRef(0)
      const actionEndTimerRef = useRef(0)
      const bubbleTimerRef = useRef(0)
      const toastTimerRef = useRef(0)
      const hoverTimerRef = useRef(0)
      const sleepTimeoutRef = useRef(0)
      const sleepIntervalRef = useRef(0)
      const flipTimerRef = useRef(0)
      const kitRoamOnRef = useRef(null)
      const soulRef = useRef(bootstrap.soul)
      const stageFaceRef = useRef({ token: stageFace, nextAt: 0 })
      const agentBusyRef = useRef(false)
      const agentAbortRef = useRef(null)
      const systemSleepingRef = useRef(false)
      const idleSleepTimerRef = useRef(null)
      const deepSleepWasSleepingRef = useRef(false)
      const lockActiveRef = useRef(false)
      const helpOfferRef = useRef(null)
      const angryTimerRef = useRef(0)
      const beepTimerRef = useRef(0)
      const lockTimerRef = useRef(0)
      const audioCtxRef = useRef(null)
      const userWorkRef = useRef({ keys: 0, lastKeyAt: 0, titleAt: 0 })
      const bowlRef = useRef(null)
      const riceRef = useRef({
        phase: 'off', noticeAt: 0, chaseAt: 0, jumpAt: 0, tumbleUntil: 0, ignoreUntil: 0,
        cryUntil: 0, angryAt: 0, walkId: '', walkTarget: 0, lastBowlX: 0, lastBowlY: 0,
        lastSayAt: 0, dirFlipAt: 0, lastDir: 0, heavy: false, eatAt: 0,
      })
      const zoomRef = useRef(bootstrap.zoom || 1)
      const chatAbortRef = useRef(null)
      const aiStateRef = useRef({ ai: false, model: null, checked: false })
      const typingRef = useRef(false)
      const voiceOnRef = useRef(bootstrap.voice)
      const recognitionRef = useRef(null)
      const liveRootRef = useRef(null)
      const liveRef = useRef(null)
      const aiCheckedAtRef = useRef(0)
      const greetedRef = useRef(false)
      const wasSleepingRef = useRef(false)
      const mountedRef = useRef(true)

      chatOpenRef.current = chatOpen
      menuOpenRef.current = menuOpen
      sleepingRef.current = sleeping
      wanderRef.current = wander
      quietRef.current = quiet
      visibleRef.current = visible
      voiceOnRef.current = voiceOn
      soulRef.current = soul
      lockActiveRef.current = lockActive
      helpOfferRef.current = helpOffer
      stateRef.current = { stats, name, userName, wander, quiet, voiceOn, sleeping, chatOpen, typing, aiInfo, menuOpen, settingsOpen, messages, visible, soul, bubble: !!bubble, action: action }

      const baseEmotion = deriveMood(stats, sleeping)
      const soulEmotion = soul.emotionIntensity >= 32 && soul.emotion ? soul.emotion : null
      const effectiveEmotion = typing ? 'thinking'
        : (reaction && EMOTIONS.has(reaction.emo) ? reaction.emo
          : (stageFace && EMOTIONS.has(stageFace) ? stageFace
            : (soulEmotion && EMOTIONS.has(soulEmotion) ? soulEmotion : baseEmotion)))
      const affinityText = t(affinityKey(stats.affinity))

      // -------------------------------------------------------------------
      // Persistence
      // -------------------------------------------------------------------

      const saveState = useCallback(() => {
        try {
          const state = stateRef.current
          const pos = posRef.current
          localStorage.setItem(STORE_KEY, JSON.stringify({
            v: 1,
            name: state.name,
            userName: state.userName,
            stats: state.stats,
            wander: state.wander,
            quiet: state.quiet,
            voice: state.voiceOn,
            x: Math.round(pos.x),
            y: Math.round(pos.y),
            zoom: Number(zoomRef.current.toFixed(2)),
            soul: state.soul,
            messages: state.messages
              .filter((message) => !message.streaming && message.text)
              .slice(-20)
              .map((message) => ({
                id: message.id,
                role: message.role,
                text: String(message.text).slice(0, 400),
                ts: message.ts,
              })),
            updatedAt: Date.now(),
          }))
        } catch (error) { /* localStorage may be unavailable */ }
      }, [])

      useEffect(() => {
        const timer = setTimeout(saveState, 600)
        return () => clearTimeout(timer)
      }, [stats, name, userName, wander, quiet, voiceOn, messages, soul, saveState])

      useEffect(() => {
        const onBeforeUnload = () => saveState()
        const onVisibility = () => {
          if (document.hidden) saveState()
        }
        const timer = setInterval(saveState, 15000)
        window.addEventListener('beforeunload', onBeforeUnload)
        document.addEventListener('visibilitychange', onVisibility)
        return () => {
          clearInterval(timer)
          window.removeEventListener('beforeunload', onBeforeUnload)
          document.removeEventListener('visibilitychange', onVisibility)
        }
      }, [saveState])

      // -------------------------------------------------------------------
      // Screen-space helpers
      // -------------------------------------------------------------------

      function applyTransform() {
        const stage = stageRef.current
        if (!stage) return
        const pos = posRef.current
        stage.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      }

      function clampPosition() {
        const pos = posRef.current
        pos.x = clamp(pos.x, 6, Math.max(6, window.innerWidth - SIZE - 6))
        pos.y = clamp(pos.y, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 8))
        pos.tx = clamp(pos.tx, 6, Math.max(6, window.innerWidth - SIZE - 6))
        pos.ty = clamp(pos.ty, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 8))
      }

      /** The live body's position/mode this frame, or null when the sprite fallback runs. */
      function liveLayout() {
        const live = liveRef.current
        if (!live || typeof live.layout !== 'function') return null
        try { return live.layout() } catch (error) { return null }
      }

      function resizeLiveStage() {
        const live = liveRef.current
        if (!live || typeof live.resize !== 'function') return
        try { live.resize(window.innerWidth, window.innerHeight) } catch (error) { /* ignore */ }
      }

      /** Asks the kit body to walk/run to a stage-x; the kit ignores it when busy. */
      function liveWalk(targetX, run, id) {
        const live = liveRef.current
        if (!live || !live.body || typeof live.body.walk !== 'function') return false
        try { return live.body.walk(targetX, Boolean(run), id) } catch (error) { return false }
      }

      /**
       * Lets the kit body decide for itself (its own walk/run/look/sit/jump/doze
       * picks) or holds it still. The kit's decisions are what make the movement
       * read as her own: real step cadence, dashes, skids and pauses.
       */
      function setKitRoam(on) {
        const live = liveRef.current
        if (!live || typeof live.set !== 'function') return
        if (kitRoamOnRef.current === on) return
        kitRoamOnRef.current = on
        try { live.set({ roam: on ? 'free' : 'off' }) } catch (error) { /* ignore */ }
        // Sleeping has its own mode change; don't stand her up on the way there.
        if (!on && !sleepingRef.current) liveStop()
      }

      /** Ends a kit walk where she stands (used for menu/sleep/roam-off). */
      function liveStop() {
        const live = liveRef.current
        if (!live || !live.body) return
        const roam = roamRef.current
        try {
          if (roam.walkId && typeof live.body.stopWalk === 'function') live.body.stopWalk(roam.walkId)
          else if (typeof live.do === 'function') live.do('stand')
        } catch (error) { /* ignore */ }
        roam.walkId = 0
        roam.state = 'idle'
        roam.mode = 'idle'
      }

      /**
       * A rare acrobatic move: a hop with a full body somersault, by rotating the
       * whole rig around her own hips while the kit plays its jump. Triggered after
       * a dash, so the movement reads as something she does, not a slide.
       */
      function liveFlip() {
        const stage = liveRootRef.current
        const live = liveRef.current
        const layout = liveLayout()
        if (!stage || !live || !layout) return
        const cx = layout.x
        const cy = (window.innerHeight - LIVE_FLOOR_PAD) - 86
        try {
          stage.style.transformOrigin = `${cx.toFixed(1)}px ${cy.toFixed(1)}px`
          stage.style.transition = 'none'
          stage.style.transform = 'rotate(0deg)'
          void stage.offsetWidth
          stage.style.transition = 'transform 680ms cubic-bezier(.42,0,.58,1)'
          stage.style.transform = 'rotate(360deg)'
          live.do('jump')
        } catch (error) { /* ignore */ }
        clearTimeout(flipTimerRef.current)
        flipTimerRef.current = setTimeout(() => {
          if (!mountedRef.current) return
          try {
            stage.style.transition = 'none'
            stage.style.transform = 'rotate(0deg)'
            stage.style.transformOrigin = '50% 50%'
          } catch (error) { /* ignore */ }
        }, 780)
      }

      /** Turns her to face the player's cursor, so acting/looking is not fixed to one side. */
      function facePlayer() {
        const live = liveRef.current
        const layout = liveLayout()
        if (!live || !layout) return
        if (layout.mode === 'drag' || layout.mode === 'air' || layout.mode === 'tumble') return
        if (layout.mode === 'walk' || layout.mode === 'run') return
        const cursor = cursorRef.current
        const targetX = cursor.active ? cursor.x : window.innerWidth / 2
        const dir = targetX >= layout.x ? 1 : -1
        if (layout.facing === dir) return
        try { live.body?.place?.(layout.x, dir) } catch (error) { /* ignore */ }
      }

      /** Wheel/menu zoom: the kit keeps the same stage, only the figure scale changes. */
      function applyZoom(next) {
        const value = clamp(Number(next) || 1, 0.62, 1.4)
        if (Math.abs(value - zoomRef.current) < 0.005) return
        zoomRef.current = value
        setZoom(value)
        const live = liveRef.current
        if (live && typeof live.setScale === 'function') {
          try { live.setScale(LIVE_SCALE * value) } catch (error) { /* ignore */ }
        }
        saveState()
      }

      /** Runs one of the action-palette moves; new tokens are small choreographies. */
      function runAction(key) {
        if (!ACTIONS.has(key) || key === 'none') return
        const live = liveRef.current
        if (!live) { playAction(key, 900); return }
        const layout = liveLayout()
        if (layout && (layout.mode === 'walk' || layout.mode === 'run')) {
          try { live.do('stand') } catch (error) { /* ignore */ }
        }
        facePlayer()
        const later = (ms, fn) => setTimeout(() => {
          if (!mountedRef.current) return
          try { fn() } catch (error) { /* ignore */ }
        }, ms)
        const word = LIVE_ACTION[key] || key
        try { live.do(word) } catch (error) { /* ignore */ }
        if (key === 'heart') {
          let beats = 0
          const beat = () => {
            if (!mountedRef.current || beats >= 3) return
            beats += 1
            try { live.emitHeart?.() } catch (error) { /* ignore */ }
            later(260, beat)
          }
          later(150, beat)
        } else if (key === 'shy') {
          later(260, () => live.do('shiver'))
        } else if (key === 'yawn') {
          later(1400, () => live.do('sleepy'))
          later(2800, () => live.do('neutral'))
        } else if (key === 'angry') {
          later(200, () => live.do('shake'))
        }
      }

      /** Where the rice bowl is now: under the cursor, or its last known spot. */
      function currentBowlPoint() {
        const cursor = cursorRef.current
        const rice = riceRef.current
        const x = cursor.active ? cursor.x : (rice.lastBowlX || window.innerWidth / 2)
        const y = cursor.active ? cursor.y : (rice.lastBowlY || window.innerHeight * 0.45)
        return {
          x: clamp(x, 26, window.innerWidth - 26),
          y: clamp(y, 70, window.innerHeight - 16),
        }
      }

      function dismissRice(spoken) {
        const rice = riceRef.current
        if (rice.phase === 'off') return
        rice.phase = 'off'
        rice.walkId = ''
        rice.walkTarget = 0
        setRiceOn(false)
        const live = liveRef.current
        const layout = liveLayout()
        if (live && layout && layout.mode === 'sit') {
          try { live.do('stand') } catch (error) { /* ignore */ }
        }
        if (spoken) say(pick(['诶？白饭呢？', '你收走了？小气鬼。', '不吃就不吃！']), 'pout')
      }

      function eatRice() {
        const rice = riceRef.current
        if (rice.phase === 'eat') return
        rice.phase = 'eat'
        rice.eatAt = performance.now()
        rice.walkTarget = 0
        const liveNow = liveRef.current
        if (liveNow) {
          try { liveNow.body?.stopWalk?.(rice.walkId) } catch (error) { /* ignore */ }
          try { liveNow.reach?.(1, { high: false }) } catch (error) { /* ignore */ }
        }
        rice.walkId = ''
        setRiceOn(false)
        setStats((prev) => ({
          ...prev,
          hunger: clamp(prev.hunger + 22, 0, 100),
          happiness: clamp(prev.happiness + 9, 0, 100),
          affinity: clamp(prev.affinity + 1.6, 0, 100),
        }))
        addBond(1.2, 0.5)
        pushEvent('抢到了白饭')
        adjustFavor(1.5, '抢到了白饭')
        appraise('riceWin', 1)
        adjustTrait('closeness', 1)
        touchSoul()
        say(pick(['抢到啦！啊呜——', '嘿嘿，还是我快！', '好吃！再来一碗！']), 'happy')
        flashEmotion('happy', 2600)
        const live = liveRef.current
        if (live) {
          try { live.do('happy') } catch (error) { /* ignore */ }
          ;[0, 160, 340, 560].forEach((ms) => setTimeout(() => {
            if (!mountedRef.current) return
            try { live.emitHeart?.() } catch (error) { /* ignore */ }
          }, ms))
        }
      }

      /** A fall while chasing: heavy falls end with her sitting and crying. */
      function startTumble(live, layout, heavy) {
        if (!live || typeof live.tumble !== 'function') return
        const rice = riceRef.current
        const now = performance.now()
        const dir = layout && layout.facing === -1 ? -1 : 1
        let ok = false
        try { ok = live.tumble({ heavy, dir }) } catch (error) { ok = false }
        if (!ok) return
        rice.walkTarget = 0
        rice.tumbleUntil = now + (heavy ? 3600 : 1500)
        rice.heavy = heavy
        try { live.reach?.(0) } catch (error) { /* ignore */ }
        flashEmotion(heavy ? 'cry' : 'surprised', heavy ? 3200 : 1400)
        say(heavy ? pick(['呜哇——好疼！', '啪叽……']) : pick(['哇——', '绊、绊到了！']), heavy ? 'cry' : 'surprised')
        if (heavy) {
          rice.cryUntil = now + 3800
          setTimeout(() => {
            if (mountedRef.current && riceRef.current.phase === 'chase') {
              say(pick(['呜呜……膝盖好痛……', '好痛好痛好痛……', '要、要吹吹才能起来……']), 'cry')
            }
          }, 1900)
        }
      }

      /** The rice-bowl chase: notice, chase, jump, trip, eat or give up in a huff. */
      function tickRice(live, layout, now) {
        const rice = riceRef.current
        const point = { x: rice.lastBowlX, y: rice.lastBowlY }
        const floor = window.innerHeight - LIVE_FLOOR_PAD
        const dx = point.x - layout.x
        if (menuOpenRef.current || sleepingRef.current || chatOpenRef.current) return

        if (rice.phase === 'notice') {
          if (now - rice.noticeAt > 620) { rice.phase = 'chase'; rice.chaseAt = now }
          return
        }
        if (rice.phase === 'eat') {
          if (now - rice.eatAt > 900) dismissRice(false)
          return
        }
        if (rice.phase === 'angry') {
          if (now - rice.angryAt > 14000) {
            dismissRice(false)
            say(pick(['……哼。不玩了。', '不理你了。', '自己吃吧！']), 'annoyed')
            setStats((prev) => ({ ...prev, happiness: clamp(prev.happiness - 4, 0, 100) }))
          }
          return
        }
        if (rice.phase !== 'chase') return
        if (layout.mode === 'drag' || layout.mode === 'tumble') return
        if (now < rice.tumbleUntil) return
        if (now < rice.cryUntil) return
        if (rice.heavy && layout.mode === 'sit') {
          rice.heavy = false
          try { live.do('stand') } catch (error) { /* ignore */ }
          return
        }

        // stretch her arms toward the bowl: out in front when low, both up when it is overhead
        const bowlHigh = point.y < floor - 150
        const nearBowl = Math.abs(dx)
        let reachAmount = 0
        if (nearBowl < 200) reachAmount = bowlHigh ? 1 : (nearBowl < 120 ? 0.95 : 0.55)
        else if (nearBowl < 360) reachAmount = 0.35
        try { live.reach?.(reachAmount, { high: bowlHigh }) } catch (error) { /* ignore */ }

        // close enough to grab it (on the ground, or mid-jump for a high bowl)
        const inAir = layout.mode === 'air'
        const grabX = inAir ? 74 : 38
        if (Math.abs(dx) < grabX && (point.y > floor - 118 || (inAir && point.y > floor - 330))) {
          eatRice()
          return
        }

        // held out of reach overhead: run under it and jump for it
        if (Math.abs(dx) < 90 && point.y < floor - 150) {
          if (now - rice.jumpAt > 950 && layout.mode !== 'air' && layout.mode !== 'crouch') {
            rice.jumpAt = now
            rice.walkTarget = 0
            try { live.do('jump') } catch (error) { /* ignore */ }
            if (now - rice.lastSayAt > 2400) {
              rice.lastSayAt = now
              say(pick(['够、够不到……', '咻——！', '再高一点点！']), 'determined')
            }
          }
          if (now - rice.chaseAt > 16000) giveUpChase(live, layout)
          return
        }

        // otherwise chase it; re-target when the cursor moves a lot
        if (rice.walkTarget && Math.abs(rice.walkTarget - point.x) > 90) {
          try { live.body?.stopWalk?.(rice.walkId) } catch (error) { /* ignore */ }
          rice.walkTarget = 0
        }
        if (layout.mode !== 'walk' && layout.mode !== 'run') {
          rice.walkTarget = clamp(point.x, LIVE_INSET, window.innerWidth - LIVE_INSET)
          rice.walkId = `rice-${Math.round(now)}`
          try { live.body?.walk?.(rice.walkTarget, Math.abs(dx) > 240, rice.walkId) } catch (error) { /* ignore */ }
        }

        // tripped by a sharp cursor feint, or just by running too eagerly
        const dir = Math.sign(dx) || 1
        if (rice.lastDir && dir !== rice.lastDir && Math.abs(dx) > 120 && now - rice.dirFlipAt > 520) {
          rice.dirFlipAt = now
          if (Math.random() < 0.42) startTumble(live, layout, Math.abs(dx) > 330)
        }
        rice.lastDir = dir
        if (layout.mode === 'run' && Math.random() < 0.00035) startTumble(live, layout, false)

        if (now - rice.chaseAt > 16000) giveUpChase(live, layout)
      }

      function giveUpChase(live, layout) {
        const rice = riceRef.current
        if (rice.phase === 'angry' || rice.phase === 'off') return
        rice.phase = 'angry'
        rice.angryAt = performance.now()
        rice.walkTarget = 0
        rice.lastDir = 0
        try { live.body?.stopWalk?.(rice.walkId) } catch (error) { /* ignore */ }
        const cursor = cursorRef.current
        const awayDir = cursor.active && cursor.x >= layout.x ? -1 : 1
        try { live.body?.place?.(layout.x, awayDir) } catch (error) { /* ignore */ }
        say(pick(['不追了！你根本在耍我！', '哼！白饭有什么好吃的！', '你、你走开啦！']), 'angry')
        flashEmotion('annoyed', 2800)
      }

      // -------------------------------------------------------------------
      // Soul: favor, temper, personality, clinginess and the ugly side
      // -------------------------------------------------------------------

      function commitSoul(updater) {
        setSoul((prev) => {
          const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
          soulRef.current = next
          return next
        })
      }

      function personaOf() {
        return PERSONAS[soulRef.current.persona] || PERSONAS.tsundere
      }

      function soulAngry() {
        return soulRef.current.angryUntil > Date.now()
      }

      function favorBand() {
        const favor = soulRef.current.favor
        if (favor < 25) return 'frozen'
        if (favor < 45) return 'cold'
        if (favor < 60) return 'meh'
        if (favor < 80) return 'warm'
        return 'clingy'
      }

      function adjustFavor(delta, reason) {
        const soul = soulRef.current
        const next = clamp(soul.favor + delta, 0, 100)
        if (Math.abs(next - soul.favor) < 0.005) return
        commitSoul((s) => ({ ...s, favor: next, lastInteractionAt: Date.now() }))
        if (reason) pushEvent(reason)
      }

      function adjustTrait(name, delta) {
        commitSoul((s) => ({
          ...s,
          traits: { ...s.traits, [name]: clamp((s.traits[name] || 0) + delta, 0, 100) },
        }))
      }

      function touchSoul() {
        lastInteractionRef.current = Date.now()
        commitSoul((s) => ({ ...s, lastInteractionAt: Date.now() }))
      }

      // -----------------------------------------------------------------
      // Personality engine: OCEAN + mood + needs + a learnable appraisal layer
      // -----------------------------------------------------------------

      function computeEmotion(soul) {
        const ocean = soul.ocean
        const mood = soul.mood
        const needs = soul.needs
        const rel = soul.relation
        const v = mood.valence / 100
        const stress = mood.stress / 100
        const scores = {
          joy: clamp(35 + v * 55 + (ocean.E - 50) * 0.25, 0, 100),
          affection: clamp(20 + v * 40 + (rel.trust - 50) * 0.5 + (ocean.A - 50) * 0.2, 0, 100),
          sadness: clamp(15 - v * 50 + (ocean.N - 50) * 0.3 + (60 - needs.belonging) * 0.35, 0, 100),
          anger: clamp(8 - v * 35 + (rel.resentment || 0) * 0.5 + (ocean.N - 50) * 0.25, 0, 100),
          anxiety: clamp(6 + stress * 55 + (ocean.N - 50) * 0.35 + (55 - rel.security) * 0.25, 0, 100),
          pride: clamp(20 + (ocean.C - 50) * 0.3 + needs.competence * 0.15 + v * 15, 0, 100),
          shame: clamp(8 + (55 - ocean.E) * 0.25 + stress * 30, 0, 100),
          calm: clamp(45 + v * 20 - stress * 25 - Math.abs(ocean.N - 50) * 0.15, 0, 100),
        }
        const pairs = [
          ['happy', scores.joy], ['love', scores.affection], ['sad', scores.sadness],
          ['annoyed', scores.anger], ['worried', scores.anxiety], ['proud', scores.pride],
          ['shy', scores.shame], ['content', scores.calm],
        ]
        let best = pairs[0]
        for (const pair of pairs) if (pair[1] > best[1]) best = pair
        return { scores, token: best[0], intensity: Math.round(clamp(best[1], 0, 100)) }
      }

      function decayMood() {
        const soul = soulRef.current
        const now = Date.now()
        if (now - (soul.lastDecayAt || 0) < 90000) return
        commitSoul((s) => ({
          ...s,
          lastDecayAt: now,
          mood: {
            valence: clamp(s.mood.valence + (0 - s.mood.valence) * 0.05, -100, 100),
            arousal: clamp(s.mood.arousal + (45 - s.mood.arousal) * 0.06, 0, 100),
            stress: clamp(s.mood.stress + (22 - s.mood.stress) * 0.06, 0, 100),
          },
          needs: {
            belonging: clamp(s.needs.belonging + (s.needs.belonging < 50 ? 0.8 : -0.1), 0, 100),
            autonomy: clamp(s.needs.autonomy + (s.needs.autonomy < 50 ? 0.5 : -0.1), 0, 100),
            competence: clamp(s.needs.competence + (s.needs.competence < 50 ? 0.5 : -0.1), 0, 100),
          },
          relation: { ...s.relation, resentment: clamp(s.relation.resentment * 0.985, 0, 100) },
        }))
      }

      function refreshEmotion() {
        const soul = soulRef.current
        const next = computeEmotion(soul)
        if (next.token !== soul.emotion || Math.abs(next.intensity - (soul.emotionIntensity || 0)) > 6) {
          commitSoul((s) => ({ ...s, emotion: next.token, emotionIntensity: next.intensity }))
          if (!soulAngry() && next.intensity > 58 && !typingRef.current) flashEmotion(next.token, 2600)
        }
        return next
      }

      const APPRAISAL_EVENTS = {
        pet: { val: 12, needs: { belonging: 4 }, rel: { trust: 1.2 }, care: 2 },
        feed: { val: 10, needs: { belonging: 3 }, rel: { trust: 0.8 }, care: 2 },
        play: { val: 11, needs: { belonging: 4, competence: 2 }, rel: { trust: 1 }, care: 1.5 },
        riceWin: { val: 16, needs: { competence: 5, belonging: 2 }, rel: { trust: 1 }, care: 1 },
        riceDismiss: { val: -18, needs: { autonomy: -2 }, rel: { trust: -2.5, resentment: 4 } },
        helpAccept: { val: 14, needs: { competence: 3, belonging: 4 }, rel: { trust: 2.5 }, care: 2 },
        helpDecline: { val: -12, rel: { trust: -3, resentment: 3 } },
        chatGood: { val: 8, needs: { belonging: 3 }, rel: { trust: 1 }, care: 1 },
        chatCold: { val: -6, rel: { trust: -1, resentment: 1 } },
        ignore: { val: -4, needs: { belonging: -3 }, rel: { trust: -0.6, resentment: 1.2, security: -0.4 } },
        drag: { val: -6, stress: 6 },
        work: { val: 2, needs: { belonging: -1 } },
        pet_head: { val: 13, needs: { belonging: 4 }, rel: { trust: 1.5, security: 1 }, care: 2 },
        pet_tail: { val: -12, rel: { trust: -1, resentment: 3 }, stress: 4 },
        pet_feet: { val: 6, needs: { belonging: 1 }, care: 1 },
        apology: { val: 15, rel: { trust: 3, resentment: -6, security: 2 } },
      }

      function appraise(type, intensity = 1, options = {}) {
        const soul = soulRef.current
        const spec = APPRAISAL_EVENTS[type]
        if (!spec) return null
        const learned = clamp(Number(soul.appraisal[type]) || 0.5, 0.1, 2)
        const k = clamp(intensity, 0, 1.5) * learned
        const ocean = soul.ocean
        const positive = (spec.val || 0) >= 0
        const sensitivity = positive
          ? 1 + (ocean.E - 50) / 200 + (ocean.A - 50) / 200
          : 1 + (ocean.N - 50) / 120
        const delta = { valence: 0, arousal: 0, stress: 0 }
        delta.valence += (spec.val || 0) * k * sensitivity
        delta.arousal += (positive ? 4 : 7) * k * (1 + (ocean.N - 50) / 150)
        delta.stress += (spec.stress || 0) * k + (positive ? 0 : 3 * k * (1 + (ocean.N - 50) / 150))
        const needs = { ...soul.needs }
        if (spec.needs) for (const key of Object.keys(spec.needs)) needs[key] = clamp(needs[key] + spec.needs[key] * k, 0, 100)
        const rel = { ...soul.relation }
        if (spec.rel) for (const key of Object.keys(spec.rel)) rel[key] = clamp(rel[key] + spec.rel[key] * k, 0, 100)
        const gapMin = (Date.now() - (soul.lastInteractionAt || Date.now())) / 60000
        const userTriggered = options.user !== false
        const userModel = { ...soul.userModel }
        if (userTriggered) {
          userModel.care = clamp(userModel.care * 0.98 + (spec.care || 0) * k * 0.5, 0, 100)
          userModel.responsiveness = clamp(userModel.responsiveness * 0.97 + clamp(10 - gapMin, -8, 10) * 0.3, 0, 100)
          const hour = new Date().getHours()
          userModel.activeHours = { ...userModel.activeHours, [hour]: (userModel.activeHours[hour] || 0) + 1 }
          userModel.updatedAt = Date.now()
        }
        const targetWeight = clamp(0.5 + Math.abs(delta.valence) / 24, 0.3, 1.8)
        const appraisal = { ...soul.appraisal, [type]: clamp(learned * 0.97 + targetWeight * 0.03, 0.15, 1.9) }
        const predicted = computeEmotion({
          ...soul,
          mood: { ...soul.mood, valence: clamp(soul.mood.valence + delta.valence, -100, 100) },
        })
        const memory = [...(soul.memory || []), {
          at: Date.now(), type, intensity: Number(k.toFixed(2)), emotion: predicted.token,
        }].slice(-24)
        commitSoul((s) => ({
          ...s,
          mood: {
            valence: clamp(s.mood.valence + delta.valence, -100, 100),
            arousal: clamp(s.mood.arousal + delta.arousal, 0, 100),
            stress: clamp(s.mood.stress + delta.stress, 0, 100),
          },
          needs,
          relation: rel,
          appraisal,
          memory,
          userModel,
          eventsSinceReflect: (s.eventsSinceReflect || 0) + 1,
        }))
        const emotion = refreshEmotion()
        maybeReflect()
        const brainEvents = ['pet', 'pet_head', 'pet_tail', 'pet_feet', 'feed', 'play', 'riceWin', 'riceDismiss', 'helpAccept', 'helpDecline', 'drag', 'ignore']
        if (!options.noBrain && brainEvents.includes(type)) askBrain(type, { intensity: k })
        return { delta, emotion }
      }

      function askBrain(eventType, detail) {
        if (systemSleepingRef.current) return
        const soul = soulRef.current
        if (!soul.settings.brain) return
        if (!aiStateRef.current.ai) return
        const now = Date.now()
        if (now - (soul.lastBrainAt || 0) < 20000) return
        commitSoul((s) => ({ ...s, lastBrainAt: now }))
        const profile = {
          personaLabel: PERSONAS[soul.persona] ? PERSONAS[soul.persona].label : '',
          customPersona: soul.customPersona || '',
          ocean: soul.ocean,
          mood: soul.mood,
          needs: soul.needs,
          relation: soul.relation,
          favor: Math.round(soul.favor),
          emotion: soul.emotion,
          emotionIntensity: soul.emotionIntensity,
          warped: !!soul.warped,
          angry: soulAngry(),
          selfNarrative: soul.selfNarrative || '',
          beliefs: (soul.beliefs || []).slice(-3),
          userModel: {
            responsiveness: Math.round(soul.userModel.responsiveness),
            care: Math.round(soul.userModel.care),
            presence: Math.round(soul.userModel.presence),
          },
          task: taskTitle(),
          userWorking: userWorkRef.current.keys >= 20 && now - userWorkRef.current.lastKeyAt < 180000,
          hour: new Date().getHours(),
        }
        const event = {
          type: eventType,
          intensity: detail && Number.isFinite(detail.intensity) ? detail.intensity : 0.6,
          detail: detail && detail.detail ? String(detail.detail).slice(0, 80) : '',
        }
        const recent = (soul.memory || []).slice(-8).map((item) => ({ type: item.type, intensity: item.intensity, emotion: item.emotion }))
        try {
          fetch('/fatfish-pet/brain', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({ profile, event, recent, model: soulRef.current.modelSelection }),
          }).then((response) => response.json()).then((payload) => {
            if (payload && payload.ok && payload.brain) applyBrain(payload.brain)
          }).catch(() => {})
        } catch (error) { /* ignore */ }
      }

      function applyBrain(brain) {
        if (!brain || typeof brain !== 'object') return
        const emotion = EMOTIONS.has(brain.emotion) ? brain.emotion : null
        const moodDelta = brain.moodDelta || {}
        const relationDelta = brain.relationDelta || {}
        const soften = (value, negativeScale) => {
          const n = Number(value) || 0
          return n < 0 ? n * negativeScale : n
        }
        const valenceDelta = soften(moodDelta.valence, 0.5)
        const stressDelta = soften(moodDelta.stress, 0.5)
        const trustDelta = soften(relationDelta.trust, 0.6)
        const resentmentDelta = soften(relationDelta.resentment, 0.5)
        commitSoul((s) => ({
          ...s,
          mood: {
            valence: clamp(s.mood.valence + valenceDelta, -100, 100),
            arousal: s.mood.arousal,
            stress: clamp(s.mood.stress + stressDelta, 0, 100),
          },
          relation: {
            ...s.relation,
            trust: clamp(s.relation.trust + trustDelta, 0, 100),
            resentment: clamp(s.relation.resentment + resentmentDelta, 0, 100),
          },
          brainCount: (s.brainCount || 0) + 1,
          memory: brain.memory
            ? [...(s.memory || []), { at: Date.now(), type: 'brain_memory', intensity: 1, emotion: emotion || s.emotion, note: String(brain.memory).slice(0, 40) }].slice(-24)
            : s.memory,
        }))
        if (emotion && !soulAngry() && !brain.line) flashEmotion(emotion, 3600)
        if (brain.line) say(brain.line, { emotion: emotion || undefined, action: brain.action && ACTIONS.has(brain.action) ? brain.action : undefined, intent: brain.intent })
        refreshMoodStage()
        if (brain.action && brain.action !== 'none' && ACTIONS.has(brain.action) && !brain.line) runAction(brain.action)
        if (brain.intent === 'offer_help' && !helpOfferRef.current && !soulAngry()) offerHelp()
        else if (brain.intent === 'seek_attention' && !soulAngry()) {
          const layout = liveLayout()
          if (layout) {
            const target = clamp(layout.x + rand(-160, 160), LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 80) liveWalk(target, false, 'brain-seek-' + Date.now())
          }
        } else if (brain.intent === 'sulk' && !soulAngry()) {
          startAnger(brain.line || pick(personaOf().angry), 18000)
        } else if (brain.intent === 'obstruct' && soulAngry()) {
          const cursorNow = cursorRef.current
          if (cursorNow.active) liveWalk(clamp(cursorNow.x - 70, LIVE_INSET, window.innerWidth - LIVE_INSET), false, 'huff-' + Date.now())
        } else if (brain.intent === 'wander' && !soulAngry()) {
          const target = rand(LIVE_INSET, window.innerWidth - LIVE_INSET)
          liveWalk(target, false, 'brain-wander-' + Date.now())
        }
      }

      function maybeReflect(force) {
        const soul = soulRef.current
        if (soul.reflectionBusy) return
        const events = soul.eventsSinceReflect || 0
        const idleMs = Date.now() - (soul.lastReflectAt || 0)
        if (!force && events < 12 && idleMs < 45 * 60000) return
        if (idleMs < 5 * 60000) return
        reflectSoul(force)
      }

      async function reflectSoul(force) {
        const soul = soulRef.current
        if (soul.reflectionBusy) return
        commitSoul((s) => ({ ...s, reflectionBusy: true, lastReflectAt: Date.now(), eventsSinceReflect: 0 }))
        const profile = {
          persona: soul.persona,
          personaLabel: PERSONAS[soul.persona] ? PERSONAS[soul.persona].label : '',
          customPersona: soul.customPersona || '',
          ocean: soul.ocean,
          mood: soul.mood,
          needs: soul.needs,
          relation: soul.relation,
          favor: Math.round(soul.favor),
          warped: !!soul.warped,
          angry: soulAngry(),
          emotion: soul.emotion,
          emotionIntensity: soul.emotionIntensity,
          beliefs: soul.beliefs || [],
          selfNarrative: soul.selfNarrative || '',
          userModel: {
            responsiveness: Math.round(soul.userModel.responsiveness),
            care: Math.round(soul.userModel.care),
            presence: Math.round(soul.userModel.presence),
          },
          appraisal: soul.appraisal,
        }
        const recent = (soul.memory || []).slice(-16).map((event) => ({ type: event.type, intensity: event.intensity, emotion: event.emotion, at: event.at }))
        try {
          const response = await fetch('/fatfish-pet/reflect', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({ profile, recent, model: soulRef.current.modelSelection }),
          })
          const payload = await response.json()
          if (payload && payload.ok && payload.reflection) applyReflection(payload.reflection)
          else if (force) showToast('她没能静下心来想…', 2200)
        } catch (error) {
          if (force) showToast('反思失败，鱼脑子卡住了…', 2200)
        }
        commitSoul((s) => ({ ...s, reflectionBusy: false }))
      }

      function applyReflection(reflection) {
        commitSoul((s) => {
          const ocean = { ...s.ocean }
          for (const key of ['O', 'C', 'E', 'A', 'N']) {
            ocean[key] = clamp(ocean[key] + (Number(reflection.traitDeltas && reflection.traitDeltas[key]) || 0), 0, 100)
          }
          const mood = {
            ...s.mood,
            valence: clamp(s.mood.valence + (Number(reflection.moodNudge && reflection.moodNudge.valence) || 0), -100, 100),
            stress: clamp(s.mood.stress + (Number(reflection.moodNudge && reflection.moodNudge.stress) || 0), 0, 100),
          }
          const beliefs = [...(s.beliefs || []), ...(Array.isArray(reflection.beliefs) ? reflection.beliefs : [])].slice(-6)
          return {
            ...s,
            ocean,
            mood,
            beliefs,
            selfNarrative: typeof reflection.selfNarrative === 'string' && reflection.selfNarrative ? reflection.selfNarrative : s.selfNarrative,
            reflections: (s.reflections || 0) + 1,
          }
        })
        pushEvent('完成了一次自我反思')
        refreshEmotion()
        if (Math.random() < 0.6) say('……我好像和刚来的时候，不太一样了。', 'thinking')
      }

      function startAnger(reason, extraMs) {
        const soul = soulRef.current
        if (soul.gone) return
        const persona = personaOf()
        const until = Date.now() + Math.round((45000 + (extraMs || 0)) * (persona.angerMul || 1))
        commitSoul((s) => ({
          ...s,
          angryUntil: Math.max(s.angryUntil, until),
          ignoreUntil: Math.max(s.ignoreUntil, until - 6000),
          angerCount: (s.angerCount || 0) + 1,
          traits: { ...s.traits, jealousy: clamp((s.traits.jealousy || 0) + 4, 0, 100) },
        }))
        setAngry(true)
        setHelpOffer(null)
        say(reason || pick(persona.angry), 'angry')
        flashEmotion('angry', 2800)
        try { liveRef.current?.do?.('angry') } catch (error) { /* ignore */ }
        beepAngry()
      }

      function endAnger() {
        if (!soulAngry()) return
        commitSoul((s) => ({ ...s, angryUntil: 0, ignoreUntil: 0 }))
        setAngry(false)
        const yandere = soulRef.current.persona === 'yandere'
        say(pick(yandere ? ['……暂时原谅你。', '别再让我等。'] : ['哼，这次先放过你。', '……勉强原谅你了。']), 'pout')
      }

      function beepAngry() {
        if (!soulRef.current.settings.noise) return
        try {
          const Ctx = window.AudioContext || window.webkitAudioContext
          if (!Ctx) return
          if (!audioCtxRef.current) audioCtxRef.current = new Ctx()
          const ctx = audioCtxRef.current
          if (ctx.state === 'suspended') ctx.resume().catch(() => {})
          const now = ctx.currentTime
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.type = 'triangle'
          osc.frequency.setValueAtTime(440, now)
          osc.frequency.exponentialRampToValueAtTime(170, now + .18)
          gain.gain.setValueAtTime(.05, now)
          gain.gain.exponentialRampToValueAtTime(.001, now + .26)
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.start(now)
          osc.stop(now + .28)
        } catch (error) { /* audio may be blocked */ }
      }

      function vanishAway() {
        const soul = soulRef.current
        const sad = computeEmotion(soul).scores.sadness
        if (soul.gone || (soul.favor >= 45 && sad <= 68)) return
        const layout = liveLayout()
        const goLeft = !layout || layout.x < window.innerWidth / 2
        setKitRoam?.(false)
        try { liveWalk(goLeft ? LIVE_INSET : window.innerWidth - LIVE_INSET, true, `vanish-${Date.now()}`) } catch (error) { /* ignore */ }
        flashEmotion('sad', 2400)
        say(pick(['……我出去一下。', '……不想理你。', '别找我。']), 'sad')
        setTimeout(() => {
          if (!mountedRef.current) return
          commitSoul((s) => ({
            ...s,
            gone: true,
            vanishUntil: Date.now() + rand(7, 16) * 60000,
            lastInteractionAt: Date.now(),
          }))
          riceRef.current.phase = 'off'
          riceRef.current.walkTarget = 0
          setRiceOn(false)
          setVisible(false)
          saveState()
        }, 1400)
      }

      function returnFromGone() {
        commitSoul((s) => ({
          ...s,
          gone: false,
          vanishUntil: 0,
          favor: clamp(s.favor + 2, 0, 100),
          lastInteractionAt: Date.now(),
        }))
        setVisible(true)
        setTimeout(() => {
          if (!mountedRef.current) return
          say(pick(['……我回来了。', '只是刚好路过。', '不是想你了。']), 'shy')
          flashEmotion('shy', 2200)
        }, 1000)
      }

      function taskTitle() {
        try {
          const title = String(document.title || '')
          return title.split('—')[0].split('-')[0].trim().slice(0, 30) || '手上的事'
        } catch (error) {
          return '手上的事'
        }
      }

      function offerHelp() {
        const task = taskTitle()
        setHelpOffer({ task })
        commitSoul((s) => ({ ...s, lastOfferAt: Date.now() }))
        say(pick([`你在忙「${task}」吗？要不要我帮忙？`, `我一直在看……「${task}」，要帮忙吗？`]), 'curious')
        flashEmotion('curious', 3200)
        commitSoul((s) => ({ ...s, lastInteractionAt: Date.now() }))
      }

      function appendPetMessage(text) {
        const value = String(text || '').trim()
        if (!value) return
        setMessages((prev) => [...prev, { id: uid(), role: 'pet', text: value.slice(0, 2000), ts: Date.now() }].slice(-40))
      }

      function applyAgentAction(action) {
        if (!action || typeof action !== 'object') return
        if (action.kind === 'say' && action.text) {
          // Agent task answers belong in the chat transcript; a long speech bubble over
          // the pet covers the desktop and is hard to read.
          appendPetMessage(action.text)
        } else if (action.kind === 'act' && action.action && ACTIONS.has(action.action)) {
          runAction(action.action)
        } else if (action.kind === 'tool' && action.text) {
          showToast(action.text, 1800)
        } else if (action.kind === 'remember' && action.note) {
          commitSoul((s) => ({
            ...s,
            memory: [...(s.memory || []), { at: Date.now(), type: 'agent_memory', intensity: 1, emotion: s.emotion, note: String(action.note).slice(0, 40) }].slice(-24),
          }))
          showToast('她记下了一件事。', 1800)
        } else if (action.kind === 'remind' && action.minutes && action.text) {
          const ms = clamp(Number(action.minutes) * 60000, 60000, 6 * 3600000)
          showToast('会在 ' + Math.round(ms / 60000) + ' 分钟后提醒：' + action.text, 3200)
          setTimeout(() => {
            if (!mountedRef.current) return
            say('提醒你：' + action.text, 'happy')
            playAction('nod', 600)
          }, ms)
        } else if (action.kind === 'delegate' && action.task) {
          if (soulRef.current.settings.delegateAgent) {
            try {
              fetch('/fatfish-pet/feedback', {
                method: 'POST',
                headers: { 'content-type': 'application/json', accept: 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ message: '大肥鱼想请主 Agent 处理：' + action.task }),
              }).then((response) => response.json()).then((payload) => {
                if (payload && payload.ok && payload.delivered) showToast('她把任务交给主 Agent 了。', 2200)
                else showToast('主 Agent 暂时不在，任务先记下了。', 2400)
              }).catch(() => {})
            } catch (error) { /* ignore */ }
          } else {
            const message = '这个任务超出我现在能做的范围。你可以在设置里打开「任务交给主 Agent」，我就能转给主 Agent。'
            say(message, 'thinking')
            appendPetMessage(message)
          }
        }
      }

      function runPetAgent(goal, context) {
        const soul = soulRef.current
        if (systemSleepingRef.current) return false
        if (!soul.settings.agent || !aiStateRef.current.ai || agentBusyRef.current) return false
        if (!goal) return false
        agentBusyRef.current = true
        const controller = new AbortController()
        agentAbortRef.current = controller
        commitSoul((s) => ({ ...s, lastAgentAt: Date.now() }))
        if (context && context.openChat) openChat()
        say('嗯……我想想。', 'thinking')
        const state = {
          persona: soul.persona,
          moodStage: soul.moodStage,
          mood: soul.mood,
          favor: Math.round(soul.favor),
          relation: soul.relation,
          needs: soul.needs,
          emotion: soul.emotion,
          selfNarrative: soul.selfNarrative || '',
          task: taskTitle(),
          userWorking: userWorkRef.current.keys >= 20 && Date.now() - userWorkRef.current.lastKeyAt < 180000,
        }
        try {
          fetch('/fatfish-pet/agent', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'application/json' },
            credentials: 'same-origin',
            signal: controller.signal,
            body: JSON.stringify({
              goal: String(goal).slice(0, 400),
              context: context || {},
              state: state,
              permission: soul.settings.permission || 0,
              workspace: soul.settings.workspace || '',
              allowDelegate: !!soul.settings.delegateAgent,
              agentOptions: {
                maxSteps: soul.settings.agentSteps,
                maxSearchResults: soul.settings.agentSearchResults,
                maxFetchChars: soul.settings.agentFetchChars,
                timeoutSec: soul.settings.agentTimeoutSec,
                temperature: soul.settings.agentTemperature,
                maxAnswerChars: soul.settings.agentAnswerChars,
                web: soul.settings.agentWeb !== false,
              },
              model: soul.modelSelection,
            }),
          }).then((response) => response.json()).then((payload) => {
            if (!payload || !payload.ok) { say('……我暂时想不出办法。', 'sad'); appendPetMessage('……我暂时想不出办法。'); return }
            const actions = Array.isArray(payload.actions) ? payload.actions : []
            commitSoul((s) => ({ ...s, agentRuns: (s.agentRuns || 0) + 1 }))
            if (!actions.length) { say('嗯……让我再想想。', 'thinking'); appendPetMessage('嗯……让我再想想。'); return }
            actions.forEach((action, index) => {
              setTimeout(() => {
                if (mountedRef.current && !systemSleepingRef.current) applyAgentAction(action)
              }, index * 1400)
            })
          }).catch(() => {
            if (systemSleepingRef.current) return
            say('……好像连不上我的思考模块。', 'sad')
            appendPetMessage('……好像连不上我的思考模块。')
          }).finally(() => {
            if (agentAbortRef.current === controller) agentAbortRef.current = null
            agentBusyRef.current = false
          })
        } catch (error) {
          if (agentAbortRef.current === controller) agentAbortRef.current = null
          agentBusyRef.current = false
        }
        return true
      }

      function currentPermissionLabel() {
        const permission = soulRef.current.settings.permission || 0
        if (permission <= 0) return '0 · 只能聊天、记忆、提醒'
        if (permission === 1) return '1 · 可只读工作区'
        if (permission === 2) return '2 · 可读写工作区'
        return '3 · 完全授权（可执行命令）'
      }

      function submitAgentAsk() {
        const goal = agentAskText.trim()
        if (!goal) { showToast('先告诉她想做什么。', 1800); return }
        if (!soulRef.current.settings.agent) { showToast('Agent 模式已关闭，请先在设置里开启。', 2400); return }
        setAgentAskOpen(false)
        setAgentAskText('')
        openChat()
        setMessages((prev) => [...prev, { id: uid(), role: 'user', text: goal, ts: Date.now() }].slice(-40))
        const started = runPetAgent(goal, { trigger: 'ask_panel', openChat: true })
        if (!started) {
          showToast('AI 暂时不可用。', 2400)
          appendPetMessage('……我现在没法帮你处理这个。')
        }
      }

      function acceptHelp() {
        const offer = helpOffer
        const task = offer ? offer.task : taskTitle()
        setHelpOffer(null)
        adjustFavor(2.5, '接受了大肥鱼的帮忙')
        appraise('helpAccept', 1)
        adjustTrait('dependence', 3)
        commitSoul((s) => ({ ...s, helpCount: (s.helpCount || 0) + 1, lastInteractionAt: Date.now() }))
        say(pick(['好——交给我！', '我看看，马上！']), 'happy')
        setTimeout(() => {
          if (!mountedRef.current) return
          const ok = runPetAgent(
            `主人接受了你的帮忙请求。请先回应一句，再给出 1~2 条针对「${task}」的具体、可马上执行的帮助；如果这件事需要直接改代码或操作电脑，就用 delegate。`,
            { task: task, userWorking: true, openChat: true },
          )
          if (!ok) say('唔……我的 Agent 好像还没准备好。', 'sad')
        }, 600)
      }

      function declineHelp() {
        setHelpOffer(null)
        adjustFavor(-1.2, '拒绝了大肥鱼的帮忙')
        appraise('helpDecline', 1)
        adjustTrait('jealousy', 3)
        say(pick(['哦……好吧。', '那你自己忙吧。', '哼，不需要就算了。']), 'pout')
        if (soulRef.current.warped) startAnger('……你总是这样。', 20000)
      }

      function evaluateWarp() {
        const s = soulRef.current
        const ignoredMin = (Date.now() - (s.lastInteractionAt || Date.now())) / 60000
        const score = (s.traits.jealousy || 0) * .9
          + (s.persona === 'yandere' ? 35 : 0)
          + (s.favor > 82 ? 8 : 0)
          + Math.min(35, ignoredMin)
          + (s.ocean ? s.ocean.N * .25 : 0)
          + (100 - (s.userModel ? s.userModel.responsiveness : 50)) * .15
        if (!s.warped && s.persona && score >= 105) {
          commitSoul((x) => ({ ...x, warped: true }))
          say(pick(['你最近……好像总在躲我。', '为什么不多看看我。', '没关系，我会让你只看我的。']), 'pout')
          flashEmotion('pout', 4200)
        } else if (s.warped && (s.traits.jealousy || 0) < 24 && ignoredMin < 5) {
          commitSoul((x) => ({ ...x, warped: false }))
        }
      }

      function lockUserScreen() {
        const soul = soulRef.current
        if (lockActiveRef.current || !soul.settings.lock) return
        if (Date.now() - (soul.lastLockAt || 0) < 30 * 60000) return
        lockActiveRef.current = true
        commitSoul((s) => ({ ...s, lastLockAt: Date.now(), lastInteractionAt: Date.now() }))
        setLockActive(true)
        setLockText('')
        flashEmotion('pout', 3200)
        beepAngry()
      }

      function unlockScreen(apologized) {
        if (!lockActiveRef.current) return
        lockActiveRef.current = false
        setLockActive(false)
        if (apologized) {
          adjustFavor(1.5, '向大肥鱼道歉')
          appraise('apology', 1)
          adjustTrait('jealousy', -6)
          say(pick(['……这次就算了。', '真的知道错了？', '哼……勉强相信你。']), 'shy')
        } else {
          adjustFavor(-2, '没有回应她')
          say(pick(['……算了。', '你走吧。']), 'sad')
        }
        commitSoul((s) => ({ ...s, lastInteractionAt: Date.now() }))
      }

      function tickSoul() {
        if (systemSleepingRef.current) return
        const s = soulRef.current
        const now = Date.now()
        if (s.gone) {
          if (now > s.vanishUntil) returnFromGone()
          return
        }
        const ignoredMin = (now - (s.lastInteractionAt || now)) / 60000
        decayMood()
        if (ignoredMin > 25) {
          commitSoul((x) => ({
            ...x,
            favor: clamp(x.favor - 0.12, 0, 100),
            traits: { ...x.traits, jealousy: clamp((x.traits.jealousy || 0) + 0.2, 0, 100) },
          }))
        }
        if (ignoredMin > 25 && now - (s.lastIgnoreAt || 0) > 8 * 60000) {
          commitSoul((x) => ({ ...x, lastIgnoreAt: now }))
          appraise('ignore', Math.min(0.9, ignoredMin / 35), { user: false })
        }
        const work = userWorkRef.current
        const working = work.keys >= 20 && now - work.lastKeyAt < 180000
        if (working) {
          commitSoul((x) => ({
            ...x,
            userModel: { ...x.userModel, presence: clamp(x.userModel.presence * 0.98 + 2, 0, 100) },
          }))
          if (!soulAngry() && now - (s.lastWorkAppraiseAt || 0) > 6 * 60000) {
            commitSoul((x) => ({ ...x, lastWorkAppraiseAt: now }))
            appraise('work', 0.3)
          }
        }
        evaluateWarp()
        if (soulAngry() && now > s.angryUntil) endAnger()
        const current = soulRef.current
        const emo = computeEmotion(current)
        if (!soulAngry() && current.favor < 45 && ignoredMin > 3 && Math.random() < .06) vanishAway()
        if (!soulAngry() && emo.scores.sadness > 68 && current.relation.trust < 48 && ignoredMin > 6 && Math.random() < .15) vanishAway()
        if (!soulAngry() && current.warped && current.settings.lock && ignoredMin > 22 && current.favor > 70) lockUserScreen()
        if (!soulAngry() && current.warped && ignoredMin > 12 && Math.random() < .3) startAnger('……你去哪了。')
        if (!soulAngry() && !helpOfferRef.current && (current.favor > 80 || current.needs.competence < 45)
          && current.configured && working && now - (current.lastOfferAt || 0) > 18 * 60000
          && !chatOpenRef.current && riceRef.current.phase === 'off') {
          offerHelp()
        }
        refreshMoodStage()
        const currentNow = soulRef.current
        if (currentNow.dragCount && now - (currentNow.lastDragAt || 0) > 60000) {
          commitSoul((x) => ({ ...x, dragCount: 0 }))
        }
        maybeMoodMotion()
        maybeReflect()
        // Ambient model-driven expressiveness: even when nothing happens, the director
        // model can decide she wants attention, to help, or to act a little.
        if (!soulAngry() && soulRef.current.settings.brain && aiStateRef.current.ai
          && now - (soulRef.current.lastBrainAt || 0) > 120000 && Math.random() < 0.5) {
          askBrain('ambient', { intensity: 0.4, detail: ignoredMin > 5 ? '用户已经很久没有互动了' : '安静的日常' })
        }
      }

      function computeStage(soul) {
        if (soulAngry()) return 'angry'
        const emo = computeEmotion(soul)
        if (emo.scores.anxiety > 62 && soul.relation.security < 45) return 'scared'
        if (emo.scores.shame > 62 && soul.mood.valence > -10) return 'shy'
        if (soul.mood.valence > 32) return 'joyful'
        if (soul.mood.valence < -22) return 'low'
        if (soul.needs.belonging < 38 || soul.favor > 82) return 'clingy'
        return 'calm'
      }

      function refreshMoodStage(force) {
        const soul = soulRef.current
        const now = Date.now()
        if (!force && soul.stageOverride && now < soul.stageOverrideUntil) return soul.moodStage
        if (!force && soul.moodStage && now - (soul.stageSince || 0) < 12000) return soul.moodStage
        const next = computeStage(soul)
        if (next !== soul.moodStage) {
          commitSoul((s) => ({ ...s, moodStage: next, stageSince: now, stageOverride: '', stageOverrideUntil: 0 }))
          clearTimeout(reactionTimerRef.current)
          setReaction(null)
          const pool = (MOOD_STAGES[next] || MOOD_STAGES.calm).faces
          const face = pool[Math.floor(Math.random() * pool.length)]
          stageFaceRef.current = { token: face, nextAt: now + rand(3800, 7000) }
          setStageFace(face)
          if (!soulAngry() && now - (soul.lastMoodSayAt || 0) > 30000) {
            commitSoul((s) => ({ ...s, lastMoodSayAt: now }))
            const lines = {
              joyful: ['嘿嘿，今天也不错。', '心情好好！'],
              low: ['……有点提不起劲。', '唉。'],
              shy: ['别、别一直看我。'],
              clingy: ['你在忙吗？我在这儿。'],
              scared: ['……你还在吗。'],
              angry: ['哼。'],
              calm: ['……', '这样也挺好。'],
            }
            say(lines[next] ? pick(lines[next]) : '……', face)
          }
        }
        return next
      }

      function setStageOverride(stage, ms) {
        if (!MOOD_STAGES[stage]) return
        const now = Date.now()
        commitSoul((s) => ({ ...s, stageOverride: stage, stageOverrideUntil: now + ms }))
        const pool = MOOD_STAGES[stage].faces
        const face = pool[Math.floor(Math.random() * pool.length)]
        stageFaceRef.current = { token: face, nextAt: now + rand(3800, 7000) }
        setStageFace(face)
      }

      function moodFall(heavy) {
        const live = liveRef.current
        const layout = liveLayout()
        if (!live || !layout || typeof live.tumble !== 'function') return
        const ok = (() => { try { return live.tumble({ heavy: heavy, dir: layout.facing === -1 ? -1 : 1 }) } catch (error) { return false } })()
        if (!ok) return
        const now = Date.now()
        const dur = heavy ? 5200 : 2600
        commitSoul((s) => ({ ...s, fallingUntil: now + dur, fallHeavy: heavy, lastMoodMotionAt: now }))
        setStageOverride('low', dur)
        flashEmotion(heavy ? 'cry' : 'sad', dur)
        say(heavy ? pick(['呜……摔倒了。', '好疼……']) : pick(['啊。', '绊、绊到了。']), heavy ? 'cry' : 'sad')
      }

      function comfortFall() {
        const soul = soulRef.current
        if (!soul.fallingUntil) return
        commitSoul((s) => ({
          ...s,
          fallingUntil: 0,
          fallHeavy: false,
          mood: { ...s.mood, valence: clamp(s.mood.valence + 18, -100, 100), stress: clamp(s.mood.stress - 12, 0, 100) },
          relation: { ...s.relation, trust: clamp(s.relation.trust + 2, 0, 100) },
        }))
        setStageOverride('shy', 6000)
        try { liveRef.current?.do?.('stand') } catch (error) { /* ignore */ }
        say(pick(['呜……你来了。', '抱、抱一下就好了……', '我没事了，嘿嘿。']), 'shy')
        flashEmotion('shy', 4000)
        adjustFavor(1.2)
      }

      function maybeMoodMotion() {
        const soul = soulRef.current
        const now = Date.now()
        if (soul.gone || soulAngry() || soul.fallingUntil > now) return
        if (chatOpenRef.current || sleepingRef.current || menuOpenRef.current || dragRef.current.active) return
        if (riceRef.current.phase !== 'off') return
        if (stateRef.current.bubble || stateRef.current.action !== 'none') return
        if (now - (soul.lastMoodMotionAt || 0) < 22000) return
        const layout = liveLayout()
        if (!layout || ['walk', 'run', 'air', 'tumble', 'drag', 'crouch', 'land'].includes(layout.mode)) return
        const stage = soul.moodStage || 'calm'
        commitSoul((s) => ({ ...s, lastMoodMotionAt: now }))
        if (stage === 'low') {
          if (Math.random() < 0.12) { moodFall(soul.mood.valence < -45); return }
          if (Math.random() < 0.55) {
            const target = clamp(layout.x + rand(-120, 120), LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 50) liveWalk(target, false, 'mood-walk-' + now)
            return
          }
          try { liveRef.current?.do?.('sit') } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'joyful') {
          if (Math.random() < 0.5) {
            const target = clamp(rand(LIVE_INSET, window.innerWidth - LIVE_INSET), LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 140) { liveWalk(target, true, 'mood-run-' + now); return }
          }
          const motions = (MOOD_STAGES.joyful && MOOD_STAGES.joyful.motions) || ['dance']
          try { liveRef.current?.do?.(pick(motions)) } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'angry') {
          try { liveRef.current?.do?.('shake') } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'clingy') {
          const cursor = cursorRef.current
          if (cursor.active) {
            const target = clamp(cursor.x - 80, LIVE_INSET, window.innerWidth - LIVE_INSET)
            if (Math.abs(target - layout.x) > 70) liveWalk(target, false, 'mood-follow-' + now)
          }
          return
        }
        if (stage === 'shy') {
          try { liveRef.current?.do?.('shiver') } catch (error) { /* ignore */ }
          return
        }
        if (stage === 'scared') {
          try { liveRef.current?.do?.('shiver') } catch (error) { /* ignore */ }
          return
        }
        if (Math.random() < 0.45) {
          const target = clamp(layout.x + rand(-160, 160), LIVE_INSET, window.innerWidth - LIVE_INSET)
          if (Math.abs(target - layout.x) > 60) liveWalk(target, false, 'mood-walk-' + now)
        }
      }

      function clickZone(clientX, clientY) {
        const layout = liveLayout()
        if (!layout) return 'body'
        const floor = window.innerHeight - LIVE_FLOOR_PAD
        const dx = clientX - layout.x
        const dy = clientY - floor
        const height = 176 * (zoomRef.current || 1)
        if (dy < -height * 0.62 && Math.abs(dx) < 78) return 'head'
        if (dy > -height * 0.58 && dy < -10 && dx * (layout.facing || 1) < -34) return 'tail'
        if (dy > -22) return 'feet'
        return 'body'
      }

      function personaReaction(table) {
        const persona = soulRef.current.persona || 'tsundere'
        return table[persona] || table.tsundere || table.gentle
      }

      function reactShy() {
        const entry = personaReaction(PERSONA_SHY)
        const face = entry.face
        const line = pick(entry.lines)
        setStageOverride('shy', 8000)
        flashEmotion(face, 4400)
        say(line, face)
        playAction(entry.action, 800)
        adjustFavor(0.7)
        adjustTrait('closeness', 1)
        appraise('pet_head', 0.65)
      }

      function reactTail() {
        const entry = personaReaction(PERSONA_TAIL)
        const face = entry.face
        flashEmotion(face, 4400)
        say(pick(entry.lines), face)
        playAction(entry.action, 700)
        adjustFavor(-0.3)
        adjustTrait('jealousy', 1)
        appraise('pet_tail', 0.9)
      }

      function petBodyPart(zone) {
        const soul = soulRef.current
        const now = Date.now()
        if (soul.fallingUntil > now) { comfortFall(); return }
        if (soul.gone) return
        if (soulAngry()) {
          say(pick(personaOf().angry), 'annoyed')
          flashEmotion('annoyed', 1600)
          return
        }
        touchSoul()
        if (zone === 'head') {
          reactShy()
        } else if (zone === 'tail') {
          reactTail()
          if (now - (soul.lastTailAt || 0) < 8000 && !soulAngry()) startAnger('都说了尾巴不行！', 12000)
          commitSoul((s) => ({ ...s, lastTailAt: now }))
        } else if (zone === 'feet') {
          flashEmotion('surprised', 3200)
          say(pick(['脚、脚底痒！', '哈哈别挠那里！']), 'surprised')
          playAction('wiggle', 600)
          adjustFavor(0.3)
          appraise('pet_feet', 0.5)
        } else {
          const faces = ['shy', 'happy', 'content', 'pout']
          const face = pick(faces)
          flashEmotion(face, 3800)
          say(pick(['嗯？', '摸这里也可以哦。', '……', '要摸摸头吗？']), face)
          playAction('nod', 500)
          adjustFavor(0.5)
          appraise('pet', 0.5)
        }
      }

      function chooseMoodBehavior() {
        const soul = soulRef.current
        const emo = computeEmotion(soul)
        const needs = soul.needs
        const mood = soul.mood
        if (soulAngry()) return { action: null, face: 'annoyed', lines: null }
        if (needs.belonging < 35) {
          return { action: 'look', face: 'sad', lines: ['……你在忙吗。', '陪我一会儿嘛。', '我有点无聊。'] }
        }
        if (mood.valence < -25) return { action: 'sit', face: 'sad', lines: ['……', '有点没精神。'] }
        if (mood.stress > 55) return { action: 'shiver', face: 'worried', lines: ['有点不安…', '你还在吗？'] }
        if (mood.valence > 30) {
          return { action: mood.arousal > 60 ? 'dance' : 'wave', face: emo.token, lines: ['心情不错！', '嘿嘿。', '今天也一起加油吧。'] }
        }
        if (needs.competence < 45) return { action: 'look', face: 'curious', lines: null }
        return { action: null, face: emo.token, lines: null }
      }

      function isClingy() {
        const soul = soulRef.current
        return soul.favor > 80 || (soul.needs.belonging < 34 && soul.relation.trust > 60)
      }

      function seedOcean(key, customText) {
        const base = (PERSONAS[key] && PERSONAS[key].ocean) || { O: 55, C: 55, E: 55, A: 55, N: 50 }
        const adjust = { O: 0, C: 0, E: 0, A: 0, N: 0 }
        const text = String(customText || '')
        if (/温柔|体贴|照顾|耐心/.test(text)) { adjust.A += 8; adjust.N -= 5 }
        if (/毒舌|傲娇|嘴硬/.test(text)) { adjust.A -= 6; adjust.N += 4 }
        if (/活泼|元气|热闹|开朗/.test(text)) { adjust.E += 10 }
        if (/冷淡|安静|话少|高冷/.test(text)) { adjust.E -= 10 }
        if (/病娇|占有|嫉妒|偏执/.test(text)) { adjust.N += 12; adjust.A -= 5 }
        if (/好奇|探索|新鲜/.test(text)) { adjust.O += 8 }
        if (/细心|认真|靠谱/.test(text)) { adjust.C += 8 }
        if (/懒|摸鱼/.test(text)) { adjust.C -= 8 }
        return {
          O: clamp(base.O + adjust.O, 0, 100),
          C: clamp(base.C + adjust.C, 0, 100),
          E: clamp(base.E + adjust.E, 0, 100),
          A: clamp(base.A + adjust.A, 0, 100),
          N: clamp(base.N + adjust.N, 0, 100),
        }
      }

      function choosePersona(key) {
        if (!PERSONAS[key]) return
        commitSoul((s) => ({
          ...s,
          persona: key,
          configured: true,
          ocean: seedOcean(key, s.customPersona),
          lastInteractionAt: Date.now(),
        }))
        setPersonaOpen(false)
        setTimeout(() => {
          if (!mountedRef.current) return
          say(pick(['好，那我就做这样的我。', '嗯……以后请多指教。', '你可别后悔哦。']), 'happy')
          flashEmotion('happy', 2200)
        }, 500)
      }

      /** Free-text personality tuning: kept in the soul and written into her persona prompt. */
      function saveCustomPersona() {
        const text = String(personaText || '').trim().slice(0, 120)
        const guessed = /病娇|占有|锁住/.test(text) ? 'yandere'
          : /傲娇|嘴硬/.test(text) ? 'tsundere'
            : /温柔|体贴|照顾/.test(text) ? 'gentle'
              : /元气|活泼|热闹/.test(text) ? 'genki'
                : /冷|高冷|安静|话少/.test(text) ? 'cool'
                  : (soulRef.current.persona || 'tsundere')
        commitSoul((s) => ({
          ...s,
          customPersona: text,
          persona: s.persona || guessed,
          configured: true,
          ocean: seedOcean(s.persona || guessed, text),
          lastInteractionAt: Date.now(),
        }))
        setPersonaOpen(false)
        setTimeout(() => {
          if (!mountedRef.current) return
          say(text ? '嗯…我记住你希望我是什么样的人了。' : '好，那就按刚才选的来。', 'shy')
          flashEmotion('shy', 2200)
        }, 500)
      }

      function adjustSoulSetting(key, value) {
        commitSoul((s) => ({ ...s, settings: { ...s.settings, [key]: value } }))
      }

      function cancelRiceByUser() {
        const phase = riceRef.current.phase
        if (phase === 'off') return false
        dismissRice(false)
        if (phase === 'chase' || phase === 'notice') {
          adjustFavor(-1.5, '把白饭收走了')
          appraise('riceDismiss', 1)
          startAnger('白饭！！你把我的白饭收走了！', 15000)
        }
        return true
      }

      function chooseTarget() {
        const pos = posRef.current
        const maxX = Math.max(12, window.innerWidth - SIZE - 16)
        const maxY = Math.max(MIN_Y, window.innerHeight - SIZE - 16)
        pos.tx = rand(18, maxX)
        pos.ty = rand(MIN_Y + 30, maxY)
        pos.nextTargetAt = performance.now() + rand(6500, 15000)
      }

      function syncOrientation(pos) {
        const w = window.innerWidth
        const above = pos.y > 190
        const align = pos.x < 156 ? 'left' : (pos.x > w - SIZE - 156 ? 'right' : 'center')
        const current = orientationRef.current
        if (current.above !== above || current.align !== align) {
          orientationRef.current = { above, align }
          setOrientation({ above, align })
        }
      }

      const orientationRef = useRef(orientation)

      // -------------------------------------------------------------------
      // Reactions, speech, toasts
      // -------------------------------------------------------------------

      function flashEmotion(emotion, duration, force) {
        if (!EMOTIONS.has(emotion)) return
        // While a speech bubble is open, its line owns the face; stray event flashes
        // (hover, idle, etc.) must not swap the expression under the words.
        if (!force && stateRef.current.bubble) return
        clearTimeout(reactionTimerRef.current)
        setReaction({ emo: emotion, key: Date.now() })
        reactionTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setReaction(null)
        }, duration || 1800)
      }

      function playAction(nextAction, duration) {
        if (!ACTIONS.has(nextAction) || nextAction === 'none') return
        clearTimeout(actionSwitchTimerRef.current)
        clearTimeout(actionEndTimerRef.current)
        setAction('none')
        actionSwitchTimerRef.current = setTimeout(() => {
          if (!mountedRef.current) return
          setAction(nextAction)
          actionEndTimerRef.current = setTimeout(() => {
            if (mountedRef.current) setAction('none')
          }, duration || 900)
        }, 18)
      }

      function styleSpeech(text, hintEmotion, explicitAction, explicitIntent) {
        const soul = soulRef.current
        const persona = soul.persona || 'tsundere'
        const table = PERSONA_SPEECH[persona] || PERSONA_SPEECH.tsundere
        const inferred = inferSpeechIntent(text)
        const intent = explicitIntent && table[explicitIntent] ? explicitIntent : inferred
        const style = table[intent] || null
        let emotion = hintEmotion && EMOTIONS.has(hintEmotion)
          ? hintEmotion
          : (style ? style[0] : (INTENT_EMOTION[intent] || 'content'))
        const stage = soul.moodStage || 'calm'
        // Mood colors the delivery, but an explicit emotion on the line wins over it.
        if (!hintEmotion) {
          if (stage === 'low' && ['happy', 'excited', 'love', 'proud'].includes(emotion)) emotion = 'content'
          else if (stage === 'angry' && !['angry', 'annoyed', 'sad', 'pout', 'cry', 'shy'].includes(emotion)) emotion = 'pout'
          else if (stage === 'shy' && ['happy', 'excited', 'love', 'proud'].includes(emotion)) emotion = 'shy'
        }
        const action = explicitAction && ACTIONS.has(explicitAction)
          ? explicitAction
          : (style ? style[1] : (EMOTION_ACTION[emotion] || 'look'))
        return { intent, emotion, action }
      }

      function say(text, emotion) {
        if (systemSleepingRef.current) return
        const value = String(text || '').trim()
        if (!value) return
        const options = emotion && typeof emotion === 'object' ? emotion : { emotion: emotion }
        const styled = styleSpeech(value, options.emotion, options.action, options.intent)
        clearTimeout(bubbleTimerRef.current)
        const bubbleMs = clamp(2800 + value.length * 95, 3200, 8200)
        setBubble({ text: value.slice(0, 220), key: Date.now() })
        // Speech owns the face for exactly as long as the bubble is readable. Gestures
        // are NOT fired implicitly: explicit interactions and the action panel request
        // them separately, otherwise every line would throw her into a random motion.
        if (styled.emotion && EMOTIONS.has(styled.emotion)) flashEmotion(styled.emotion, Math.max(3200, bubbleMs), true)
        bubbleTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setBubble(null)
        }, bubbleMs)
      }

      function showToast(text, duration) {
        clearTimeout(toastTimerRef.current)
        setToast({ text: String(text || ''), key: Date.now() })
        toastTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setToast(null)
        }, duration || 3200)
      }

      function pushEvent(text) {
        if (!text) return
        eventLogRef.current = [...eventLogRef.current, String(text).slice(0, 60)].slice(-6)
      }

      function addBond(happiness, affinity) {
        setStats((prev) => ({
          ...prev,
          happiness: clamp(prev.happiness + (happiness || 0), 0, 100),
          affinity: clamp(prev.affinity + (affinity || 0), 0, 100),
        }))
      }

      function greetFor(statsValue, elapsedHours) {
        if (elapsedHours > 3) return chooseLine(LINES.late)
        const persona = PERSONAS[soulRef.current.persona]
        if (persona && persona.idle && Math.random() < .4) return pick(persona.idle)
        const time = timeOfDay()
        const list = time === 'morning' ? LINES.greetMorning
          : time === 'noon' ? LINES.greetNoon
            : time === 'afternoon' ? LINES.greetAfternoon
              : time === 'evening' ? LINES.greetEvening : LINES.greetNight
        let line = chooseLine(list)
        if (statsValue.hunger < 35) line += ' 我肚皮有点扁了，你听见它在敲鼓吗？'
        else if (statsValue.energy < 35) line += ' 我好像还没完全醒过来…'
        return line
      }

      // -------------------------------------------------------------------
      // Care actions
      // -------------------------------------------------------------------

      function petTheFish() {
        const now = Date.now()
        lastInteractionRef.current = now
        if (soulRef.current.gone) return
        if (soulAngry()) {
          say(pick(personaOf().angry), 'annoyed')
          flashEmotion('annoyed', 1400)
          return
        }
        const rice = riceRef.current
        if (rice.phase === 'angry') {
          // she is sulking: no petting, no attention
          say(pick(['哼，不理你。', '走开啦！', '……（把头扭到一边）']), 'annoyed')
          flashEmotion('annoyed', 1600)
          return
        }
        if (rice.phase === 'chase' && now < rice.cryUntil) {
          // comforting her after a hard fall speeds the recovery up
          rice.cryUntil = now + 300
          say(pick(['呜呜……抱抱……', '吹吹就不痛了……', '你、你终于来哄我了……']), 'cry')
          flashEmotion('shy', 1800)
          return
        }
        if (rice.phase === 'chase') {
          say(pick(['等、等一下！白饭要跑了！', '别闹！我还没吃到！', '先让我抓到白饭嘛！']), 'flustered')
          flashEmotion('flustered', 1200)
          return
        }
        pushEvent('被摸了一下')
        facePlayer()
        appraise('pet', 0.7)
        const soul = soulRef.current
        if (soul.favor < 50 && Math.random() < .28) {
          say(pick(['……嗯。', '别闹。', '我现在不想说话。']), 'pout')
          flashEmotion('pout', 1200)
          return
        }
        if (sleepingRef.current) {
          wakeUp(true)
          return
        }
        const clicks = clickTimesRef.current.filter((time) => now - time < 2600)
        clicks.push(now)
        clickTimesRef.current = clicks
        const state = stateRef.current
        if (state.stats.hunger < 18 && Math.random() < 0.5) {
          say(chooseLine(LINES.pet), 'hungry')
        } else if (clicks.length >= 4) {
          say(chooseLine(LINES.petHard), 'annoyed')
          runAction('angry')
          flashEmotion('annoyed', 1600)
        } else {
          const petFaces = clicks.length >= 3
            ? ['pout', 'wink', 'shy', 'happy']
            : ['happy', 'love', 'shy', 'wink', 'excited']
          say(chooseLine(LINES.pet), pick(petFaces))
          playAction(pick(['heart', 'shy', 'wave', 'dance']), 800)
          addBond(1.4, 0.7)
        }
        setStats((prev) => ({ ...prev, happiness: clamp(prev.happiness + 0.8, 0, 100) }))
        adjustFavor(0.5)
        adjustTrait('closeness', 1)
        touchSoul()
      }

      function feedFish() {
        lastInteractionRef.current = Date.now()
        if (soulRef.current.gone) return
        if (soulAngry()) {
          say(pick(personaOf().angry), 'annoyed')
          flashEmotion('annoyed', 1400)
          return
        }
        const rice = riceRef.current
        if (rice.phase === 'angry') {
          say(pick(['不要！哼！', '才不吃你的白饭！', '走开啦！']), 'angry')
          flashEmotion('annoyed', 1800)
          return
        }
        if (rice.phase !== 'off') { dismissRice(true); return }
        const state = stateRef.current
        const veryFull = state.stats.hunger > 92
        pushEvent('召唤了一碗白饭')
        if (sleepingRef.current) wakeUp(false)
        if (chatOpenRef.current) closeChat()
        setActionPanelOpen(false)
        setMenuOpen(false)
        const point = currentBowlPoint()
        rice.phase = 'notice'
        rice.noticeAt = performance.now()
        rice.chaseAt = 0; rice.jumpAt = 0; rice.tumbleUntil = 0; rice.cryUntil = 0; rice.ignoreUntil = 0
        rice.walkId = ''; rice.walkTarget = 0; rice.heavy = false; rice.lastDir = 0; rice.lastSayAt = 0
        rice.veryFull = veryFull
        rice.lastBowlX = point.x; rice.lastBowlY = point.y
        setRiceKey((value) => value + 1)
        setRiceOn(true)
        facePlayer()
        flashEmotion(veryFull ? 'flustered' : 'excited', 2400)
        say(veryFull
          ? pick(['肚皮已经圆滚滚啦……不过、不过再吃一点点也行！', '其实不太饿……可这个白饭看起来好香……'])
          : pick(['白饭！！（眼睛冒星星）', '啊！是白饭！等等我——', '我的我的我的！']), veryFull ? 'flustered' : 'excited')
        adjustFavor(0.4)
        appraise('feed', 0.6)
        touchSoul()
        setTimeout(() => {
          if (!mountedRef.current) return
          try { liveRef.current?.do?.('hop') } catch (error) { /* ignore */ }
        }, 180)
      }

      function playWithFish() {
        lastInteractionRef.current = Date.now()
        const rice = riceRef.current
        if (rice.phase === 'chase' || rice.phase === 'angry') {
          say(pick(['白饭先给我！', '现在没空玩尾巴！']), 'pout')
          return
        }
        pushEvent('追着自己的鲸尾玩')
        if (sleepingRef.current) wakeUp(false)
        facePlayer()
        const state = stateRef.current
        if (state.stats.energy < 15) {
          say(chooseLine(LINES.playTired), 'sleepy')
          playAction('nod', 800)
          return
        }
        setStats((prev) => ({
          ...prev,
          happiness: clamp(prev.happiness + 16, 0, 100),
          energy: clamp(prev.energy - 9, 0, 100),
          hunger: clamp(prev.hunger - 3, 0, 100),
          affinity: clamp(prev.affinity + 2, 0, 100),
        }))
        say(chooseLine(LINES.play), pick(['love', 'excited', 'happy']))
        playAction(pick(['heart', 'dance', 'shy']), 950)
        adjustFavor(1, '陪她玩了一会儿')
        appraise('play', 0.8)
        adjustTrait('closeness', 2)
        touchSoul()
      }

      function goSleep() {
        if (sleepingRef.current) {
          wakeUp(true)
          return
        }
        if (riceRef.current.phase !== 'off') dismissRice(false)
        lastInteractionRef.current = Date.now()
        pushEvent('睡着了一会儿')
        setSleeping(true)
        setBubble(null)
        playAction('nod', 700)
        say(chooseLine(LINES.sleep), 'sleepy')
        clearInterval(sleepIntervalRef.current)
        clearTimeout(sleepTimeoutRef.current)
        sleepIntervalRef.current = setInterval(() => {
          setStats((prev) => ({
            ...prev,
            energy: clamp(prev.energy + 2.4, 0, 100),
            hunger: clamp(prev.hunger - 0.2, 0, 100),
          }))
        }, 1000)
        sleepTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) stopSleeping(true)
        }, 19000)
      }

      function wakeUp(spoken) {
        if (!sleepingRef.current) return
        stopSleeping(false)
        if (spoken) {
          say(chooseLine(LINES.wake), 'sleepy')
          playAction('nod', 700)
        }
      }

      function stopSleeping(spoken) {
        clearInterval(sleepIntervalRef.current)
        clearTimeout(sleepTimeoutRef.current)
        setSleeping(false)
        if (spoken) {
          say('唔…我睡了多久？感觉肚皮都变轻了。', 'sleepy')
        }
      }

      // -------------------------------------------------------------------
      // Chat
      // -------------------------------------------------------------------

      async function checkAi(force) {
        if (!force && Date.now() - aiCheckedAtRef.current < 60000) return aiStateRef.current
        aiCheckedAtRef.current = Date.now()
        try {
          const response = await fetch('/fatfish-pet/health', {
            method: 'GET',
            headers: { accept: 'application/json' },
            credentials: 'same-origin',
          })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const payload = await response.json()
          const next = { ai: Boolean(payload && payload.ai), model: payload.model || null, checked: true }
          aiStateRef.current = next
          if (mountedRef.current) setAiInfo(next)
          return next
        } catch (error) {
          const next = { ai: false, model: null, checked: true }
          aiStateRef.current = next
          if (mountedRef.current) setAiInfo(next)
          return next
        }
      }

      function openChat() {
        lastInteractionRef.current = Date.now()
        if (riceRef.current.phase !== 'off') dismissRice(false)
        pushEvent('被叫去聊天')
        setVisible(true)
        setChatOpen(true)
        setMenuOpen(false)
        setSettingsOpen(false)
        setActionPanelOpen(false)
        if (sleepingRef.current) wakeUp(false)
        setMessages((prev) => {
          if (prev.length > 0) return prev
          const state = stateRef.current
          return [{
            id: uid(),
            role: 'pet',
            text: greetFor(state.stats, 0),
            ts: Date.now(),
          }]
        })
        if (!aiStateRef.current.checked || Date.now() - aiCheckedAtRef.current > 60000) {
          checkAi(true)
        }
      }

      function closeChat() {
        if (chatAbortRef.current) {
          try { chatAbortRef.current.abort() } catch (error) { /* ignore */ }
          chatAbortRef.current = null
        }
        setTyping(false)
        typingRef.current = false
        setMessages((prev) => prev.filter((message) => !message.streaming))
        setChatOpen(false)
        setSettingsOpen(false)
        setInput('')
        if (recognitionRef.current) {
          try { recognitionRef.current.stop() } catch (error) { /* ignore */ }
          recognitionRef.current = null
        }
        setListening(false)
        if (typeof window.speechSynthesis !== 'undefined') {
          try { window.speechSynthesis.cancel() } catch (error) { /* ignore */ }
        }
      }

      function buildPetPayload() {
        const state = stateRef.current
        return {
          name: state.name,
          userName: state.userName,
          emotion: effectiveEmotion,
          hunger: roundStat(state.stats.hunger),
          energy: roundStat(state.stats.energy),
          happiness: roundStat(state.stats.happiness),
          affinity: roundStat(state.stats.affinity),
          time: new Date().toISOString(),
          events: eventLogRef.current.slice(-5),
          soul: {
            favor: Math.round(soulRef.current.favor),
            personaName: PERSONAS[soulRef.current.persona] ? PERSONAS[soulRef.current.persona].label : '',
            custom: soulRef.current.customPersona || '',
            warped: !!soulRef.current.warped,
            angry: soulAngry(),
            ocean: soulRef.current.ocean,
            mood: {
              valence: Math.round(soulRef.current.mood.valence),
              stress: Math.round(soulRef.current.mood.stress),
            },
            needs: {
              belonging: Math.round(soulRef.current.needs.belonging),
              competence: Math.round(soulRef.current.needs.competence),
            },
            relation: {
              trust: Math.round(soulRef.current.relation.trust),
              resentment: Math.round(soulRef.current.relation.resentment),
            },
            emotion: soulRef.current.emotion,
            selfNarrative: soulRef.current.selfNarrative || '',
            beliefs: (soulRef.current.beliefs || []).slice(-3),
          },
        }
      }

      function addStatsAfterChat() {
        setStats((prev) => ({
          ...prev,
          affinity: clamp(prev.affinity + 1.1, 0, 100),
          happiness: clamp(prev.happiness + 1.6, 0, 100),
          hunger: clamp(prev.hunger - 0.3, 0, 100),
        }))
        lastInteractionRef.current = Date.now()
      }

      function speak(text) {
        if (!voiceOnRef.current || typeof window.speechSynthesis === 'undefined') return
        const value = String(text || '')
          .replace(/\[(?:emo|act)\s*:[^\]]*\]/gi, '')
          .replace(/[*_#>`]/g, '')
          .trim()
          .slice(0, 200)
        if (!value) return
        try {
          window.speechSynthesis.cancel()
          const utterance = new SpeechSynthesisUtterance(value)
          utterance.lang = 'zh-CN'
          utterance.rate = 1.06
          utterance.pitch = 1.32
          const voices = typeof window.speechSynthesis.getVoices === 'function'
            ? window.speechSynthesis.getVoices()
            : []
          const chinese = voices.find((voice) => /^zh/i.test(voice.lang || ''))
            || voices.find((voice) => /chinese|中文|普通话/i.test(voice.name || ''))
          if (chinese) utterance.voice = chinese
          window.speechSynthesis.speak(utterance)
          try { liveRef.current?.talk?.() } catch (error) { /* ignore */ }
        } catch (error) { /* speech may be unsupported or blocked */ }
      }

      function startListening() {
        if (!asrSupported || listening) return
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
        if (!Recognition) return
        let recognition
        try {
          recognition = new Recognition()
        } catch (error) {
          showToast(t('ui.micError'), 2400)
          return
        }
        let finalText = ''
        recognition.lang = 'zh-CN'
        recognition.interimResults = true
        recognition.continuous = false
        recognition.onresult = (event) => {
          let interim = ''
          for (let index = event.resultIndex; index < event.results.length; index += 1) {
            const result = event.results[index]
            const transcript = result[0] ? result[0].transcript : ''
            if (result.isFinal) finalText += transcript
            else interim += transcript
          }
          setInput((finalText || interim).slice(0, 300))
        }
        recognition.onerror = (event) => {
          const code = event && event.error ? event.error : ''
          if (code !== 'aborted' && code !== 'no-speech') showToast(t('ui.micError'), 2400)
          setListening(false)
          recognitionRef.current = null
        }
        recognition.onend = () => {
          setListening(false)
          recognitionRef.current = null
          const value = finalText.trim()
          if (value) submitMessage(value)
        }
        try {
          recognition.start()
          recognitionRef.current = recognition
          setListening(true)
        } catch (error) {
          showToast(t('ui.micError'), 2400)
        }
      }

      function stopListening() {
        if (recognitionRef.current) {
          try { recognitionRef.current.stop() } catch (error) { /* ignore */ }
        }
      }

      function localReplyFor(text) {
        setTimeout(() => {
          if (!mountedRef.current) return
          const state = stateRef.current
          const reply = buildLocalReply(text, {
            stats: state.stats,
            userName: state.userName,
            setName,
            setUserName,
          })
          setTyping(false)
          typingRef.current = false
          setMessages((prev) => [...prev, {
            id: uid(),
            role: 'pet',
            text: reply.text,
            ts: Date.now(),
          }].slice(-40))
          flashEmotion(reply.emo, 3000)
          if (reply.act) playAction(reply.act, 900)
          addStatsAfterChat()
          speak(reply.text)
        }, 520 + Math.random() * 620)
      }

      async function submitMessage(rawText, options = {}) {
        const text = String(rawText || '').trim().slice(0, 400)
        if (!text || typingRef.current) return
        const agentCommand = text.match(/^\/(agent|帮)\s+([\s\S]+)$/i)
        const autoAgent = !agentCommand && soulRef.current.settings.agent && !options.hiddenUser
          && /^(帮我|帮忙|请帮我|你帮我|能不能帮我|告诉我|查一下|查查|查询|搜索|搜一下|上网|计算|统计|看看|看一下|列出|总结一下|执行|跑一下|读一下|写一下)/.test(text)
          && !/(摸摸|抱抱|亲亲|贴贴|喜欢你|爱我)/.test(text)
        if ((agentCommand || autoAgent) && soulRef.current.settings.agent && !options.hiddenUser) {
          const goal = agentCommand ? agentCommand[2].trim().slice(0, 400) : text
          if (runPetAgent(goal, { trigger: agentCommand ? 'chat_agent' : 'chat_auto_agent', openChat: true })) {
            setInput('')
            lastInteractionRef.current = Date.now()
            setMessages((prev) => [...prev, {
              id: uid(),
              role: 'user',
              text: agentCommand ? `（让她帮忙）${goal}` : text,
              ts: Date.now(),
            }].slice(-40))
            pushEvent('让她帮忙')
            return
          }
          showToast('Agent 暂时不可用，先按聊天回复你。', 2200)
        }
        typingRef.current = true
        setInput('')
        setTyping(true)
        if (!options.hiddenUser) {
          setMessages((prev) => [...prev, {
            id: uid(),
            role: 'user',
            text,
            ts: Date.now(),
          }].slice(-40))
        }
        lastInteractionRef.current = Date.now()
        pushEvent(options.hiddenUser ? '主动帮忙' : '说了一句话')

        let ai = aiStateRef.current
        if (!ai.checked || (!ai.ai && Date.now() - aiCheckedAtRef.current > 60000)) {
          ai = await checkAi(true)
        }
        if (!ai.ai) {
          localReplyFor(text)
          return
        }

        const state = stateRef.current
        const history = state.messages.slice(-10).map((message) => ({
          role: message.role === 'user' ? 'user' : 'pet',
          text: String(message.text || '').slice(0, 300),
        })).filter((message) => message.text)

        if (chatAbortRef.current) {
          try { chatAbortRef.current.abort() } catch (error) { /* ignore */ }
        }
        const controller = new AbortController()
        chatAbortRef.current = controller
        const assistantId = uid()
        let placeholderAdded = false
        let lastFlush = 0
        let streamedText = ''
        let controlDone = false
        let controlEmotion = ''
        let controlAction = ''
        let rawAccumulator = ''
        let gotMeta = false

        const addPlaceholder = () => {
          if (placeholderAdded) return
          placeholderAdded = true
          setMessages((prev) => [...prev, {
            id: assistantId,
            role: 'pet',
            text: '',
            ts: Date.now(),
            streaming: true,
          }].slice(-40))
        }

        const flush = (force) => {
          const now = performance.now()
          if (!force && now - lastFlush < 42) return
          lastFlush = now
          setMessages((prev) => prev.map((message) => (
            message.id === assistantId ? { ...message, text: streamedText } : message
          )))
        }

        const parseControl = (candidate) => {
          const emoMatch = candidate.match(/\[emo\s*:\s*([a-z]+)\s*\]/i)
          const actMatch = candidate.match(/\[act\s*:\s*([a-z]+)\s*\]/i)
          if (emoMatch) controlEmotion = emoMatch[1].toLowerCase()
          if (actMatch) controlAction = actMatch[1].toLowerCase()
          return candidate.replace(/\[(?:emo|act)\s*:[^\]]*\]/gi, '').trim()
        }

        const consumeVisible = (rawRemainder) => {
          const cleaned = parseControl(rawRemainder)
          streamedText = cleaned.slice(0, 420)
          flush(true)
        }

        try {
          addPlaceholder()
          const response = await fetch('/fatfish-pet/chat', {
            method: 'POST',
            headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
            credentials: 'same-origin',
            signal: controller.signal,
            body: JSON.stringify({
              message: text,
              history,
              pet: buildPetPayload(),
            }),
          })
          if (!response.ok || !response.body) throw new Error(`HTTP ${response.status}`)

          const reader = response.body.getReader()
          const decoder = new TextDecoder()
          let buffer = ''

          const handleEvent = (event) => {
            if (!event || typeof event !== 'object') return
            if (event.type === 'meta') {
              gotMeta = true
              const next = { ai: true, model: event.model || aiStateRef.current.model, checked: true }
              aiStateRef.current = next
              if (mountedRef.current) setAiInfo(next)
              return
            }
            if (event.type === 'delta' && typeof event.text === 'string') {
              const chunk = event.text
              if (!controlDone) {
                rawAccumulator += chunk
                const newline = rawAccumulator.indexOf('\n')
                if (newline >= 0) {
                  controlDone = true
                  const controlLine = rawAccumulator.slice(0, newline)
                  parseControl(controlLine)
                  consumeVisible(rawAccumulator.slice(newline + 1))
                } else if (rawAccumulator.length > 96) {
                  controlDone = true
                  parseControl(rawAccumulator)
                  consumeVisible(rawAccumulator)
                }
              } else {
                streamedText = (streamedText + chunk.replace(/\[(?:emo|act)\s*:[^\]]*\]/gi, '')).slice(0, 420)
                flush(false)
              }
              return
            }
            if (event.type === 'error') {
              throw new Error(event.code || event.message || 'AI_ERROR')
            }
            if (event.type === 'done') {
              if (!gotMeta) {
                const next = { ai: true, model: aiStateRef.current.model, checked: true }
                aiStateRef.current = next
                if (mountedRef.current) setAiInfo(next)
              }
            }
          }

          while (true) {
            const { value, done } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            let boundary = buffer.indexOf('\n\n')
            while (boundary >= 0) {
              const frame = buffer.slice(0, boundary)
              buffer = buffer.slice(boundary + 2)
              for (const line of frame.split('\n')) {
                const trimmed = line.trim()
                if (!trimmed.startsWith('data:')) continue
                const data = trimmed.slice(5).trim()
                if (!data) continue
                let event
                try {
                  event = JSON.parse(data)
                } catch (parseError) {
                  continue
                }
                handleEvent(event)
              }
              boundary = buffer.indexOf('\n\n')
            }
          }

          if (!controlDone) {
            controlDone = true
            parseControl(rawAccumulator)
            consumeVisible(rawAccumulator)
          }
          streamedText = streamedText.trim()
          if (!streamedText) throw new Error('EMPTY_REPLY')

          setMessages((prev) => prev.map((message) => (
            message.id === assistantId
              ? { ...message, text: streamedText, streaming: false }
              : message
          )))
          if (controlEmotion && EMOTIONS.has(controlEmotion)) {
            flashEmotion(controlEmotion, 3200)
          } else {
            flashEmotion(inferEmotion(streamedText), 2600)
          }
          if (controlAction && ACTIONS.has(controlAction) && controlAction !== 'none') {
            playAction(controlAction, 950)
          }
          setTyping(false)
          typingRef.current = false
          addStatsAfterChat()
          adjustFavor(0.6)
          appraise('chatGood', 0.5)
          adjustTrait('closeness', 1)
          touchSoul()
          speak(streamedText)
          chatAbortRef.current = null
          if (!gotMeta) {
            const next = { ai: true, model: aiStateRef.current.model, checked: true }
            aiStateRef.current = next
            if (mountedRef.current) setAiInfo(next)
          }
        } catch (error) {
          if (error && (error.name === 'AbortError' || controller.signal.aborted)) {
            if (mountedRef.current) {
              setTyping(false)
              typingRef.current = false
              setMessages((prev) => prev.filter((message) => message.id !== assistantId))
            }
            return
          }
          if (mountedRef.current) {
            if (placeholderAdded) {
              setMessages((prev) => prev.filter((message) => message.id !== assistantId))
            }
            const next = { ai: false, model: aiStateRef.current.model, checked: true }
            aiStateRef.current = next
            setAiInfo(next)
            showToast(t('ui.aiFallback'), 2800)
            localReplyFor(text)
          }
        }
      }

      // -------------------------------------------------------------------
      // Menu + settings
      // -------------------------------------------------------------------

      function openMenu(event) {
        if (event) {
          event.preventDefault()
          event.stopPropagation()
        }
        facePlayer()
        const pos = posRef.current
        const width = 220
        const height = 560
        const x = clamp(pos.x + SIZE - 36, 8, Math.max(8, window.innerWidth - width - 8))
        const y = clamp(pos.y + 8, 8, Math.max(8, window.innerHeight - height - 8))
        setMenuPos({ x, y })
        setMenuOpen(true)
        setSettingsOpen(false)
        setActionPanelOpen(false)
      }

      function closeMenu() {
        setMenuOpen(false)
        const pos = posRef.current
        pos.nextTargetAt = performance.now() + 1800
      }

      function openSettings() {
        setNameDraft(name)
        setUserNameDraft(userName)
        setWanderDraft(wander)
        setQuietDraft(quiet)
        setVoiceDraft(voiceOn)
        setSettingsOpen(true)
        setMenuOpen(false)
      }

      function saveSettings() {
        const nextName = String(nameDraft || '').trim().slice(0, 10) || t('name.petDefault')
        const nextUser = String(userNameDraft || '').trim().slice(0, 10) || t('name.userDefault')
        setName(nextName)
        setUserName(nextUser)
        setWander(wanderDraft)
        setQuiet(quietDraft)
        setVoiceOn(voiceDraft)
        setSettingsOpen(false)
        addBond(2, 0.6)
        showToast(t('ui.save'), 1600)
      }

      function hidePet() {
        if (riceRef.current.phase !== 'off') dismissRice(false)
        setVisible(false)
        setChatOpen(false)
        setMenuOpen(false)
        setSettingsOpen(false)
        setActionPanelOpen(false)
        showToast(t('ui.hiddenHint'), 3600)
        saveState()
      }

      // -------------------------------------------------------------------
      // Movement loop
      // -------------------------------------------------------------------

      useEffect(() => {
        if (!visible) return undefined
        let raf = 0
        let last = performance.now()
        const loop = (time) => {
          frameRef.current += 1
          lastFrameRef.current = time
          const dt = Math.min(48, Math.max(8, time - last))
          last = time
          const pos = posRef.current
          const width = window.innerWidth
          const height = window.innerHeight
          const maxX = Math.max(8, width - SIZE - 8)
          const maxY = Math.max(MIN_Y, height - SIZE - 8)
          const roam = roamRef.current
          const live = liveRef.current
          const liveFloor = height - LIVE_FLOOR_PAD
          const fallbackFloor = Math.max(MIN_Y, height - SIZE - 10)

          // The kit body simulates its own legs; advance it first, then read where it is.
          if (live) {
            const cursor = cursorRef.current
            const point = cursor.active
              ? { x: cursor.x, y: cursor.y }
              : { x: width / 2, y: liveFloor - 80 }
            try { live.pointer('move', point) } catch (error) { /* ignore */ }
            try { live.step(dt / 1000) } catch (error) { /* ignore */ }
          }
          const layout = liveLayout()

          // If a pointerup went missing (window switch / focus loss mid-drag) the kit
          // can be left holding her: let go so she drops back onto the floor.
          if (live && layout && layout.mode === 'drag' && !dragRef.current.active) {
            const nowMs = performance.now()
            if (nowMs - (dragRef.current.lastReleaseAt || 0) > 400) {
              dragRef.current.lastReleaseAt = nowMs
              try { live.pointer('up', { x: clamp(layout.x, 0, width), y: height - LIVE_FLOOR_PAD }) } catch (error) { /* ignore */ }
            }
          }

          if (dragRef.current.active) {
            // The kit owns the drag: it follows the pointer and is thrown on release.
            pos.x = clamp(pos.x, 6, maxX)
            pos.y = clamp(pos.y, MIN_Y, maxY)
            roam.mode = 'idle'
            roam.state = 'idle'
            roam.until = time + 900
          } else if (live && layout) {
            // ---- Live2D locomotion ----
            // The kit body decides for itself: its walk/run choices carry her with
            // real step cadence, dashes, skids and pauses. We only switch that
            // autonomy off when the UI needs her to stand still or go somewhere.
            const kitBusy = layout.mode === 'drag' || layout.mode === 'air' || layout.mode === 'crouch' || layout.mode === 'land'
            const minC = LIVE_INSET
            const maxC = Math.max(minC, width - LIVE_INSET)
            const riceActive = riceRef.current.phase !== 'off'
            const wantRoam = !chatOpenRef.current && !menuOpenRef.current && !sleepingRef.current && wanderRef.current && !riceActive
            setKitRoam(wantRoam)
            roam.mode = layout.mode
            roam.bodyWalking = layout.mode === 'walk' || layout.mode === 'run'
            roam.target = layout.x

            // A dash that just ended: sometimes she finishes with a somersault.
            if (wantRoam && !riceActive && roam.lastKitMode === 'run' && layout.mode !== 'run' && !kitBusy && Math.random() < 0.2) {
              setTimeout(() => { if (mountedRef.current) liveFlip() }, 220)
            }
            roam.lastKitMode = layout.mode

            // Clingy band: at high favor she hovers near the cursor instead of wandering.
            if (wantRoam && isClingy() && !kitBusy && riceRef.current.phase === 'off') {
              const cursor = cursorRef.current
              if (cursor.active && layout.mode === 'idle' && time > (roam.clingyAt || 0)) {
                const targetX = clamp(cursor.x - 90, minC, maxC)
                if (Math.abs(layout.x - targetX) > 90) {
                  roam.walkId = `cling-${Math.round(time)}`
                  liveWalk(targetX, false, roam.walkId)
                  roam.clingyAt = time + rand(4000, 8000)
                } else {
                  roam.clingyAt = time + rand(5000, 9000)
                }
              }
            }

            if (riceActive) {
              tickRice(live, layout, time)
            } else if (chatOpenRef.current) {
              const rect = panelRectRef.current
              const targetC = clamp(rect && rect.width > 0 ? rect.left - SIZE * 0.44 : width - SIZE - 200, minC, maxC)
              roam.chatTarget = targetC
              if (!kitBusy && layout.mode !== 'walk' && layout.mode !== 'run' && Math.abs(layout.x - targetC) > 5) {
                roam.walkId = `chat-${Math.round(time)}`
                liveWalk(targetC, Math.abs(layout.x - targetC) > 360, roam.walkId)
              } else if ((layout.mode === 'walk' || layout.mode === 'run') && Math.abs(layout.x - targetC) < 4) {
                liveStop()
              }
              roam.until = time + 1200
            } else if (!wantRoam) {
              if (!sleepingRef.current && (layout.mode === 'walk' || layout.mode === 'run')) liveStop()
              roam.state = 'idle'
              roam.until = time + 1400
            }
          } else {
            // ---- sprite fallback: the old DOM walk (used only when WebGL/rig fails) ----
            pos.y += (fallbackFloor - pos.y) * Math.min(1, dt / 240)
            if (Math.abs(pos.y - fallbackFloor) < 0.4) pos.y = fallbackFloor

            if (chatOpenRef.current) {
              const rect = panelRectRef.current
              let targetX
              if (rect && rect.width > 0 && rect.left > SIZE + 46) {
                targetX = clamp(rect.left - SIZE - 18, 10, maxX)
              } else if (rect && rect.width > 0) {
                targetX = clamp(rect.left + 8, 10, maxX)
              } else {
                targetX = clamp(width - SIZE - 400, 10, maxX)
              }
              const diff = targetX - pos.x
              if (Math.abs(diff) > 1.5) {
                pos.x += Math.sign(diff) * Math.min(Math.abs(diff), 56 * dt / 1000)
                roam.mode = 'walk'
              } else {
                pos.x = targetX
                roam.mode = 'idle'
              }
              roam.until = time + 900
            } else if (menuOpenRef.current || sleepingRef.current || !wanderRef.current) {
              roam.mode = 'idle'
              roam.until = time + 900
            } else if (roam.mode === 'idle') {
              if (time >= roam.until) {
                const nearLeft = pos.x < 24
                const nearRight = pos.x > maxX - 24
                roam.dir = nearLeft ? 1 : nearRight ? -1 : (Math.random() < 0.5 ? -1 : 1)
                roam.speed = rand(24, 44)
                roam.mode = 'walk'
                roam.until = time + rand(2600, 7200)
              }
            } else if (roam.mode === 'walk') {
              pos.x += roam.dir * roam.speed * dt / 1000
              if (pos.x <= 10) { pos.x = 10; roam.dir = 1 }
              else if (pos.x >= maxX) { pos.x = maxX; roam.dir = -1 }
              if (time >= roam.until) { roam.mode = 'idle'; roam.until = time + rand(1500, 4300) }
            }
            pos.x = clamp(pos.x, 10, maxX)
            pos.y = fallbackFloor
          }

          if (live && layout) {
            // Glue the interactive overlay, bubble and menu to the kit body.
            pos.x = layout.x - SIZE / 2
            pos.y = height - SIZE - 6
            pos.tx = pos.x
            pos.ty = pos.y
            roam.mode = layout.mode
            roam.bodyWalking = layout.mode === 'walk' || layout.mode === 'run'
          } else {
            pos.tx = pos.x
            pos.ty = pos.y
          }

          const stage = stageRef.current
          if (stage) {
            stage.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`
            const walkingNow = !live && roam.mode === 'walk'
            const tilt = walkingNow ? (roam.dir || 1) * 1.1 : 0
            stage.style.setProperty('--ffish-tilt', `${tilt.toFixed(2)}deg`)
            stage.classList.toggle('ffish--walking', walkingNow)
          }

          if (bowlRef.current) {
            const rice = riceRef.current
            const cursor = cursorRef.current
            const bx = clamp(cursor.active ? cursor.x : rice.lastBowlX, 26, window.innerWidth - 26)
            const by = clamp(cursor.active ? cursor.y : rice.lastBowlY, 70, window.innerHeight - 16)
            rice.lastBowlX = bx
            rice.lastBowlY = by
            bowlRef.current.style.transform = `translate3d(${bx.toFixed(1)}px, ${by.toFixed(1)}px, 0)`
          }

          const fish = fishRef.current
          if (fish) {
            const cursor = cursorRef.current
            if (cursor.active) {
              const centerX = pos.x + SIZE / 2
              const centerY = pos.y + SIZE / 2
              const dx = cursor.x - centerX
              const dy = cursor.y - centerY
              const distance = Math.hypot(dx, dy) || 1
              const pull = Math.min(1, 110 / distance)
              const lookX = clamp((dx / distance) * 2.7 * pull, -2.7, 2.7)
              const lookY = clamp((dy / distance) * 2.3 * pull, -2.3, 2.3)
              fish.style.setProperty('--ffish-look-x', `${lookX.toFixed(2)}px`)
              fish.style.setProperty('--ffish-look-y', `${lookY.toFixed(2)}px`)
            } else {
              fish.style.setProperty('--ffish-look-x', '0px')
              fish.style.setProperty('--ffish-look-y', '0px')
            }
          }

          syncOrientation(pos)
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(raf)
      }, [visible])

      // -------------------------------------------------------------------
      // Global listeners
      // -------------------------------------------------------------------

      useEffect(() => {
        const onPointerMove = (event) => {
          cursorRef.current = { x: event.clientX, y: event.clientY, active: true }
        }
        const onPointerLeave = () => {
          cursorRef.current = { x: -1000, y: -1000, active: false }
        }
        const onBlur = () => {
          onPointerLeave()
          const drag = dragRef.current
          if (!drag.active) return
          drag.active = false
          setDragging(false)
          const live = liveRef.current
          if (live && drag.kitGrabbed) {
            try {
              live.pointer('up', {
                x: clamp(posRef.current.x + SIZE / 2, 0, window.innerWidth),
                y: window.innerHeight - LIVE_FLOOR_PAD,
              })
            } catch (error) { /* ignore */ }
          }
        }
        const onResize = () => {
          clampPosition()
          applyTransform()
          resizeLiveStage()
          if (chatRef.current) panelRectRef.current = chatRef.current.getBoundingClientRect()
        }
        // Wheel over the pet zooms the figure; the page itself does not scroll.
        const onWheel = (event) => {
          if (!stageRef.current || !stageRef.current.contains(event.target)) return
          event.preventDefault()
          applyZoom(zoomRef.current + (event.deltaY < 0 ? 0.08 : -0.08))
        }
        const onKeyDown = (event) => {
          const target = event.target
          const insidePet = target && typeof target.closest === 'function' && target.closest('.ffish-pet-root')
          if (!insidePet) {
            userWorkRef.current.keys += 1
            userWorkRef.current.lastKeyAt = Date.now()
          }
          if (event.altKey && event.shiftKey && event.code === 'KeyF') {
            event.preventDefault()
            if (soulRef.current.gone) {
              showToast('……（她不在，喊也没用。）', 2600)
              return
            }
            const nextVisible = !visibleRef.current
            if (!nextVisible) {
              setChatOpen(false)
              setMenuOpen(false)
              setSettingsOpen(false)
            }
            setVisible(nextVisible)
          } else if (event.altKey && event.shiftKey && event.code === 'KeyC') {
            event.preventDefault()
            if (chatOpenRef.current) closeChat()
            else openChat()
          } else if (event.key === 'Escape') {
            if (menuOpenRef.current) closeMenu()
            else if (actionPanelOpen) setActionPanelOpen(false)
            else if (settingsOpen) setSettingsOpen(false)
            else if (chatOpenRef.current) closeChat()
            else if (riceRef.current.phase !== 'off') dismissRice(true)
          }
        }
        // Right-click while the rice game is running takes the bowl away (and she
        // will be cross about it). Otherwise right-click opens her usual menu.
        const onContextMenuCapture = (event) => {
          if (riceRef.current.phase === 'off') return
          event.preventDefault()
          event.stopPropagation()
          cancelRiceByUser()
        }
        window.addEventListener('pointermove', onPointerMove, { passive: true })
        window.addEventListener('contextmenu', onContextMenuCapture, true)
        window.addEventListener('blur', onBlur)
        window.addEventListener('resize', onResize)
        window.addEventListener('keydown', onKeyDown)
        window.addEventListener('wheel', onWheel, { passive: false })
        document.addEventListener('pointerleave', onPointerLeave)
        return () => {
          window.removeEventListener('pointermove', onPointerMove)
          window.removeEventListener('contextmenu', onContextMenuCapture, true)
          window.removeEventListener('blur', onBlur)
          window.removeEventListener('resize', onResize)
          window.removeEventListener('keydown', onKeyDown)
          window.removeEventListener('wheel', onWheel)
          document.removeEventListener('pointerleave', onPointerLeave)
        }
      }, [settingsOpen, actionPanelOpen])

      // The soul ticks on its own: coldness, sulking, wandering off, help offers.
      useEffect(() => {
        const timer = setInterval(() => {
          if (mountedRef.current) tickSoul()
        }, 30000)
        const first = setTimeout(() => { if (mountedRef.current) tickSoul() }, 4500)
        return () => { clearInterval(timer); clearTimeout(first) }
      }, [])

      // Recovery from a mood-driven fall: she gets up on her own and either smiles
      // again or keeps sniffling, depending on whether her mood actually improved.
      useEffect(() => {
        const timer = setInterval(() => {
          const soul = soulRef.current
          if (!soul.fallingUntil || Date.now() <= soul.fallingUntil) return
          commitSoul((s) => ({ ...s, fallingUntil: 0, fallHeavy: false }))
          try { liveRef.current?.do?.('stand') } catch (error) { /* ignore */ }
          if (soul.mood.valence > -8) {
            say('……好了，我没事了！', 'happy')
            flashEmotion('happy', 3800)
          } else {
            say('……还有点疼。', 'sad')
            flashEmotion('sad', 3800)
          }
          refreshMoodStage(true)
        }, 2500)
        return () => clearInterval(timer)
      }, [])

      // While she is angry: her face cycles through the mood phases and she huffs.
      useEffect(() => {
        if (!angry) return undefined
        let phase = 0
        const faceCycle = ['annoyed', 'pout', 'angry', 'sad']
        const faceTimer = setInterval(() => {
          if (!mountedRef.current) return
          phase = (phase + 1) % faceCycle.length
          flashEmotion(faceCycle[phase], 2600)
        }, 3200)
        const beepTimer = setInterval(() => { beepAngry() }, 15000)
        const endTimer = setInterval(() => { if (!soulAngry()) endAnger() }, 3000)
        return () => {
          clearInterval(faceTimer)
          clearInterval(beepTimer)
          clearInterval(endTimer)
        }
      }, [angry])

      // The yandere lock has a hard 90s escape hatch, always.
      useEffect(() => {
        if (!lockActive) return undefined
        const escape = setTimeout(() => unlockScreen(false), 90000)
        return () => clearTimeout(escape)
      }, [lockActive])

      useEffect(() => {
        const onDown = (event) => {
          if (!menuOpenRef.current) return
          if (menuRef.current && menuRef.current.contains(event.target)) return
          if (stageRef.current && stageRef.current.contains(event.target)) return
          closeMenu()
        }
        document.addEventListener('pointerdown', onDown, true)
        return () => document.removeEventListener('pointerdown', onDown, true)
      }, [])

      useEffect(() => {
        if (!actionPanelOpen) return undefined
        const onDown = (event) => {
          if (stageRef.current && stageRef.current.contains(event.target)) return
          setActionPanelOpen(false)
        }
        document.addEventListener('pointerdown', onDown, true)
        return () => document.removeEventListener('pointerdown', onDown, true)
      }, [actionPanelOpen])

      useEffect(() => {
        if (!chatOpen) {
          panelRectRef.current = null
          return undefined
        }
        const update = () => {
          if (chatRef.current) panelRectRef.current = chatRef.current.getBoundingClientRect()
        }
        update()
        const timer = setTimeout(update, 80)
        window.addEventListener('resize', update)
        let observer = null
        if (typeof ResizeObserver === 'function' && chatRef.current) {
          observer = new ResizeObserver(update)
          observer.observe(chatRef.current)
        }
        return () => {
          clearTimeout(timer)
          window.removeEventListener('resize', update)
          if (observer) observer.disconnect()
        }
      }, [chatOpen, messages.length, typing])

      useEffect(() => {
        if (!chatOpen) return undefined
        const timer = setTimeout(() => {
          if (inputRef.current) inputRef.current.focus()
        }, 120)
        return () => clearTimeout(timer)
      }, [chatOpen])

      useEffect(() => {
        const container = messagesRef.current
        if (container) container.scrollTop = container.scrollHeight
      }, [messages, typing, chatOpen])

      // -------------------------------------------------------------------
      // Lifecycle: first greeting, decay, idle, sleep timers, teardown
      // -------------------------------------------------------------------

      useEffect(() => {
        mountedRef.current = true
        clampPosition()
        applyTransform()
        checkAi(true)
        const timer = setTimeout(() => {
          if (!mountedRef.current || greetedRef.current) return
          greetedRef.current = true
          const state = stateRef.current
          if (!state.visible) return
          say(greetFor(state.stats, bootstrap.elapsedHours), 'happy')
          playAction('wave', 900)
        }, 4200)
        return () => { clearTimeout(timer) }
      }, [])

      useEffect(() => {
        if (!visible) return undefined
        const timer = setInterval(() => {
          if (document.hidden) return
          setStats((prev) => {
            const active = !stateRef.current.sleeping
            const hunger = clamp(prev.hunger - (active ? 0.26 : 0.1), 0, 100)
            const energy = clamp(prev.energy - (active ? 0.2 : 0), 0, 100)
            const happiness = clamp(prev.happiness + (hunger > 28 ? 0.04 : -0.16), 0, 100)
            return { ...prev, hunger, energy, happiness }
          })
          if (stateRef.current.chatOpen || stateRef.current.sleeping || riceRef.current.phase !== 'off') return
          const idleFor = Date.now() - lastInteractionRef.current
          if (idleFor > 18000 && !dragRef.current.active) {
            const live = liveRef.current
            const now = Date.now()
            const soulNow = soulRef.current
            const behavior = chooseMoodBehavior()
            const lm = live ? liveLayout() : null
            const kitMode = lm ? lm.mode : null
            const kitQuiet = kitMode === 'sit' || kitMode === 'sleep' || kitMode === 'wake'
              || kitMode === 'dizzy' || kitMode === 'drag' || kitMode === 'air' || kitMode === 'look' || kitMode === 'land'
            // Idle speech only; motion is scheduled separately by maybeMoodMotion so
            // two systems cannot fire gestures at the same time.
            if (behavior.lines && !quietRef.current && !stateRef.current.bubble && stateRef.current.action === 'none' && now - (soulNow.lastMoodSayAt || 0) > 55000) {
              commitSoul((s) => ({ ...s, lastMoodSayAt: now }))
              say(pick(behavior.lines), behavior.face || 'content')
            }
          }
        }, 26000)
        return () => clearInterval(timer)
      }, [visible])

      useEffect(() => {
        if (!visible) return undefined
        const root = liveRootRef.current
        const api = window.FatFishLive2D
        const report = (live, message) => {
          try {
            fetch('/fatfish-pet/client-state', {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ live, message: String(message || '').slice(0, 300) }),
            }).catch(() => {})
          } catch (error) { /* ignore */ }
        }
        if (!root || !api || typeof api.mountLivePet !== 'function') {
          report('fallback', 'Live2D bundle unavailable')
          setLiveState('fallback')
          return undefined
        }
        let cancelled = false
        let heartbeat = 0
        const onWindowError = (event) => {
          try { report('script-error', `${event.message || 'error'} @${event.filename || ''}:${event.lineno || 0}`) } catch (error) { /* ignore */ }
        }
        const onRejection = (event) => {
          try { report('promise-error', String(event.reason && (event.reason.stack || event.reason.message) || event.reason).slice(0, 280)) } catch (error) { /* ignore */ }
        }
        window.addEventListener('error', onWindowError)
        window.addEventListener('unhandledrejection', onRejection)
        setLiveState('loading')
        report('loading', 'mounting')
        root.innerHTML = ''
        api.mountLivePet(root, {
          width: window.innerWidth,
          height: window.innerHeight,
          floorPad: LIVE_FLOOR_PAD,
          scale: LIVE_SCALE,
          startX: initialPos.current.x + SIZE / 2,
          assetBase: '/fatfish-pet/assets/live2d/',
        }).then((live) => {
          if (cancelled) {
            try { live.destroy() } catch (error) { /* ignore */ }
            return
          }
          liveRef.current = live
          kitRoamOnRef.current = null
          setLiveState('live')
          try { live.setScale?.(LIVE_SCALE * zoomRef.current) } catch (error) { /* ignore */ }
          const liveStatus = () => {
            const layout = liveLayout()
            const cx = layout ? layout.x : posRef.current.x + SIZE / 2
            const mode = layout ? layout.mode : roamRef.current.mode
            const walking = mode === 'walk' || mode === 'run'
            return `${live.scheme ? live.scheme() : 'live2d'} build=${BUILD_TIME.slice(11, 19)} frame=${frameRef.current} last=${Math.round(lastFrameRef.current)} x=${Math.round(cx)} y=${Math.round(window.innerHeight - LIVE_FLOOR_PAD)} vw=${window.innerWidth} vh=${window.innerHeight} mode=${mode} walk=${walking ? 1 : 0} rice=${riceRef.current.phase} bowl=${bowlRef.current ? 1 : 0} brain=${soulRef.current.brainCount || 0} zoom=${zoomRef.current.toFixed(2)} menu=${menuOpenRef.current ? 1 : 0} chat=${chatOpenRef.current ? 1 : 0} sleep=${sleepingRef.current ? 1 : 0} wander=${wanderRef.current ? 1 : 0} drag=${dragRef.current.active ? 1 : 0}`
          }
          report('live', liveStatus())
          heartbeat = setInterval(() => {
            report('live', liveStatus())
          }, 5000)
          try {
            live.do('neutral')
            live.set({ dialogOpen: false, thinking: false })
          } catch (error) { /* ignore */ }
        }).catch((error) => {
          if (cancelled || !mountedRef.current) return
          try { console.warn('[fatfish-pet] Live2D rig unavailable, using sprite fallback', error) } catch (error2) { /* ignore */ }
          report('fallback', error && error.message ? error.message : 'mount failed')
          setLiveState('fallback')
        })
        return () => {
          cancelled = true
          if (heartbeat) clearInterval(heartbeat)
          clearTimeout(flipTimerRef.current)
          window.removeEventListener('error', onWindowError)
          window.removeEventListener('unhandledrejection', onRejection)
          const live = liveRef.current
          liveRef.current = null
          kitRoamOnRef.current = null
          if (live) {
            try { live.destroy() } catch (error) { /* ignore */ }
          }
        }
      }, [visible])

      // Expression controller: only faces from the CURRENT mood stage may appear.
      // Speech temporarily overrides; when the stage changes, the old stage's faces
      // are dropped and the new stage picks from its own pool.
      useEffect(() => {
        if (liveState !== 'live' || sleeping) return undefined
        const tick = () => {
          const live = liveRef.current
          if (!live || typeof live.setExpr !== 'function') return
          refreshMoodStage()
          const soulNow = soulRef.current
          const stage = soulNow.moodStage || 'calm'
          const pool = (MOOD_STAGES[stage] || MOOD_STAGES.calm).faces
          let token = reaction && EMOTIONS.has(reaction.emo) ? reaction.emo : null
          if (!token) {
            const ref = stageFaceRef.current
            const now = Date.now()
            // While she is speaking without a face reaction, keep the current stage
            // face; do not roll a new expression under the bubble.
            if (stateRef.current.bubble) {
              token = ref.token
            } else if (now >= ref.nextAt || !pool.includes(ref.token)) {
              ref.token = pool[Math.floor(Math.random() * pool.length)]
              ref.nextAt = now + rand(9000, 16000)
              setStageFace(ref.token)
              token = ref.token
            } else {
              token = ref.token
            }
          }
          const layout = liveLayout()
          if (layout && ['drag', 'air', 'crouch', 'land', 'dizzy', 'wake', 'tumble'].includes(layout.mode)) return
          try { live.setExpr(LIVE_EMOTION[token] || token, 2.6) } catch (error) { /* ignore */ }
        }
        tick()
        const timer = setInterval(tick, 1300)
        return () => clearInterval(timer)
      }, [effectiveEmotion, sleeping, liveState, soul.moodStage])

      useEffect(() => {
        const live = liveRef.current
        if (!live) return
        try {
          if (sleeping) {
            wasSleepingRef.current = true
            live.do('sleep')
          } else {
            // The kit's sleep is a mode of its own: stand back up before the face.
            if (wasSleepingRef.current) { wasSleepingRef.current = false; live.do('stand') }
            live.do(LIVE_EMOTION[effectiveEmotion] || 'neutral')
          }
        } catch (error) { /* ignore */ }
      }, [effectiveEmotion, sleeping, liveState])

      useEffect(() => {
        const live = liveRef.current
        if (!live || typeof live.setScale !== 'function') return
        try { live.setScale(LIVE_SCALE * zoom) } catch (error) { /* ignore */ }
      }, [zoom, liveState])

      useEffect(() => {
        const live = liveRef.current
        if (!live || action === 'none' || sleeping || liveState !== 'live') return
        try { runAction(action) } catch (error) { /* ignore */ }
      }, [action, sleeping, liveState])

      useEffect(() => {
        const live = liveRef.current
        if (!live) return
        try { live.set({ thinking: typing, dialogOpen: chatOpen, listening }) } catch (error) { /* ignore */ }
      }, [typing, chatOpen, listening, liveState])

      useEffect(() => () => {
        mountedRef.current = false
        clearTimeout(reactionTimerRef.current)
        clearTimeout(actionSwitchTimerRef.current)
        clearTimeout(actionEndTimerRef.current)
        clearTimeout(bubbleTimerRef.current)
        clearTimeout(toastTimerRef.current)
        clearTimeout(hoverTimerRef.current)
        clearTimeout(sleepTimeoutRef.current)
        clearTimeout(flipTimerRef.current)
        clearInterval(sleepIntervalRef.current)
        if (chatAbortRef.current) {
          try { chatAbortRef.current.abort() } catch (error) { /* ignore */ }
        }
        if (recognitionRef.current) {
          try { recognitionRef.current.abort() } catch (error) { /* ignore */ }
        }
        if (typeof window.speechSynthesis !== 'undefined') {
          try { window.speechSynthesis.cancel() } catch (error) { /* ignore */ }
        }
      }, [])

      // -------------------------------------------------------------------
      // Pointer + keyboard interactions on the fish
      // -------------------------------------------------------------------

      function onStagePointerDown(event) {
        if (event.pointerType === 'mouse' && event.button !== 0) return
        event.stopPropagation()
        try { event.currentTarget.focus({ preventScroll: true }) } catch (error) { /* ignore */ }
        closeMenu()
        setActionPanelOpen(false)
        setSettingsOpen(false)
        dragRef.current = {
          active: true,
          moved: false,
          kitGrabbed: false,
          pointerId: event.pointerId,
          offsetX: event.clientX - posRef.current.x,
          offsetY: event.clientY - posRef.current.y,
          startX: event.clientX,
          startY: event.clientY,
          startAt: Date.now(),
          lastX: event.clientX,
          lastY: event.clientY,
          lastAt: performance.now(),
        }
        try { event.currentTarget.setPointerCapture(event.pointerId) } catch (error) { /* ignore */ }
        setDragging(true)
        setHovered(true)
        if (sleepingRef.current) wakeUp(true)
        else flashEmotion('surprised', 700)
        lastInteractionRef.current = Date.now()
      }

      function onStagePointerMove(event) {
        const drag = dragRef.current
        if (!drag.active || event.pointerId !== drag.pointerId) return
        event.preventDefault()
        if (Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > 5) drag.moved = true
        const live = liveRef.current
        if (live && drag.moved) {
          // The kit body takes the drag: it is picked up by the scruff, follows
          // the pointer, and is thrown on release with real physics.
          if (!drag.kitGrabbed) {
            drag.kitGrabbed = true
            // Start the kit's press on the body itself (the box corners are outside
            // its hit circle) and then hand the real pointer position over.
            const layout = liveLayout()
            const hit = layout && Array.isArray(layout.hit) && layout.hit[0] ? layout.hit[0] : null
            const down = hit ? { x: hit.x, y: hit.y } : { x: drag.startX, y: drag.startY }
            try { live.pointer('down', down) } catch (error) { /* ignore */ }
          }
          try { live.pointer('move', { x: event.clientX, y: event.clientY }) } catch (error) { /* ignore */ }
          return
        }
        const pos = posRef.current
        const now = performance.now()
        const dt = Math.max(1, now - drag.lastAt)
        pos.vx = (event.clientX - drag.lastX) / dt
        pos.vy = (event.clientY - drag.lastY) / dt
        pos.x = clamp(event.clientX - drag.offsetX, 6, Math.max(6, window.innerWidth - SIZE - 6))
        pos.y = clamp(event.clientY - drag.offsetY, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 8))
        drag.lastX = event.clientX
        drag.lastY = event.clientY
        drag.lastAt = now
        applyTransform()
      }

      function onStagePointerUp(event) {
        const drag = dragRef.current
        if (!drag.active || event.pointerId !== drag.pointerId) return
        drag.active = false
        setDragging(false)
        try { event.currentTarget.releasePointerCapture(event.pointerId) } catch (error) { /* ignore */ }
        const live = liveRef.current
        if (live && drag.kitGrabbed) {
          try { live.pointer('up', { x: event.clientX, y: event.clientY }) } catch (error) { /* ignore */ }
          const nowDrag = Date.now()
          const soulNow = soulRef.current
          const recent = nowDrag - (soulNow.lastDragAt || 0) < 45000
          const dragCount = recent ? (soulNow.dragCount || 0) + 1 : 1
          commitSoul((s) => ({ ...s, dragCount: dragCount, lastDragAt: nowDrag }))
          appraise('drag', 0.8, { user: false })
          if (dragCount >= 3) startAnger('别、别再把我拎起来了！', 15000)
          lastInteractionRef.current = Date.now()
          saveState()
          return
        }
        const pos = posRef.current
        const wasClick = !drag.moved && Date.now() - drag.startAt < 440
        if (wasClick) {
          // A click is also a touch: wake a dozing kit and stop a walk she is in.
          if (live) { try { live.do('stand') } catch (error) { /* ignore */ } }
          const now = Date.now()
          const previous = lastClickRef.current
          const isDouble = now - previous.at < 340 && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 28
          lastClickRef.current = { at: isDouble ? 0 : now, x: event.clientX, y: event.clientY }
          if (isDouble) openChat()
          else petBodyPart(clickZone(event.clientX, event.clientY))
          return
        }
        const speed = Math.hypot(pos.vx, pos.vy)
        pos.tx = clamp(pos.x + pos.vx * 150, 24, Math.max(24, window.innerWidth - SIZE - 24))
        pos.ty = clamp(pos.y + pos.vy * 150, MIN_Y, Math.max(MIN_Y, window.innerHeight - SIZE - 16))
        pos.nextTargetAt = performance.now() + rand(3800, 6800)
        if (speed > 0.8) {
          flashEmotion('dizzy', 1400)
          playAction('shake', 520)
          say('哇——别把我甩出去！我的鲸尾都打结了…', 'dizzy')
        } else {
          flashEmotion('happy', 1000)
        }
        lastInteractionRef.current = Date.now()
        saveState()
      }

      function onStageKeyDown(event) {
        const key = event.key
        if (key === 'Enter' || key === ' ') {
          event.preventDefault()
          petTheFish()
        } else if (key === 'c' || key === 'C') {
          event.preventDefault()
          openChat()
        } else if (key === 'ArrowLeft' || key === 'ArrowRight' || key === 'ArrowUp' || key === 'ArrowDown') {
          event.preventDefault()
          const live = liveRef.current
          if (live && !sleepingRef.current) {
            const layout = liveLayout()
            const roam = roamRef.current
            if (layout && (key === 'ArrowLeft' || key === 'ArrowRight')) {
              const maxC = Math.max(LIVE_INSET, window.innerWidth - LIVE_INSET)
              const targetC = clamp(layout.x + (key === 'ArrowRight' ? 30 : -30), LIVE_INSET, maxC)
              roam.walkId = `key-${Math.round(performance.now())}`
              roam.state = 'moving'
              roam.until = performance.now() + 4000
              liveWalk(targetC, false, roam.walkId)
            } else if (key === 'ArrowUp') {
              try { live.do('hop') } catch (error) { /* ignore */ }
            } else {
              try { live.do('sit') } catch (error) { /* ignore */ }
            }
            lastInteractionRef.current = Date.now()
            return
          }
          const pos = posRef.current
          const step = 22
          if (key === 'ArrowLeft') pos.x -= step
          if (key === 'ArrowRight') pos.x += step
          if (key === 'ArrowUp') pos.y -= step
          if (key === 'ArrowDown') pos.y += step
          pos.tx = pos.x
          pos.ty = pos.y
          clampPosition()
          applyTransform()
          saveState()
        }
      }

      function onHoverStart() {
        setHovered(true)
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = setTimeout(() => {
          if (!mountedRef.current || dragRef.current.active) return
          if (!chatOpenRef.current && !menuOpenRef.current && !sleepingRef.current && !stateRef.current.bubble) {
            flashEmotion('curious', 1400)
            playAction('nod', 600)
          }
        }, 750)
      }

      function onHoverEnd() {
        clearTimeout(hoverTimerRef.current)
        hoverTimerRef.current = setTimeout(() => {
          if (mountedRef.current) setHovered(false)
        }, 280)
      }

      // -------------------------------------------------------------------
      // Render helpers
      // -------------------------------------------------------------------

      const stageClasses = [
        'ffish-stage',
        `ffish--emo-${effectiveEmotion}`,
        action !== 'none' && liveState !== 'live' ? `ffish--act-${action}` : '',
        dragging ? 'ffish--dragging' : '',
      ].filter(Boolean).join(' ')

      const EMOTE_GLYPHS = {
        normal: [],
        happy: ['✦', '✦'],
        love: ['♥', '♥', '♥'],
        wink: ['✦'],
        excited: ['!', '✦'],
        flustered: ['💦'],
        pout: ['…'],
        smug: ['✦'],
        worried: ['…'],
        determined: ['!'],
        scared: ['!'],
        cry: ['💧'],
        content: ['✦'],
        shy: ['♥', '♥'],
        curious: ['?', '?'],
        thinking: ['·', '·', '·'],
        sleepy: ['Z', 'z', 'z'],
        hungry: ['…'],
        surprised: ['!'],
        annoyed: ['💢'],
        sad: ['💧'],
        proud: ['✦', '✦'],
        dizzy: ['◎', '◎'],
      }
      const emoteGlyphs = EMOTE_GLYPHS[effectiveEmotion] || []

      const bubbleAttach = bubble
        ? [
          'ffish-bubble',
          orientation.above ? 'above' : 'below',
          orientation.align === 'left' ? 'align-left' : orientation.align === 'right' ? 'align-right' : '',
        ].filter(Boolean).join(' ')
        : ''

      const toolbarClasses = [
        'ffish-toolbar',
        orientation.above ? 'above' : 'below',
        orientation.align === 'left' ? 'align-left' : orientation.align === 'right' ? 'align-right' : '',
      ].filter(Boolean).join(' ')

      const statsItems = [
        { key: 'hunger', value: stats.hunger, label: t('ui.hunger'), tone: 'hunger' },
        { key: 'energy', value: stats.energy, label: t('ui.energy'), tone: 'energy' },
        { key: 'happiness', value: stats.happiness, label: t('ui.mood'), tone: 'mood' },
      ]

      function menuItem(label, icon, onSelect, extra) {
        return h('button', {
          key: label,
          type: 'button',
          role: 'menuitem',
          className: 'ffish-menu-item',
          onClick: () => { closeMenu(); onSelect() },
        }, h('span', { className: 'ffish-menu-icon' }, h(Icon, { name: icon, size: 15 })),
          h('span', { className: 'ffish-menu-label' }, label),
          extra ? h('span', { className: 'ffish-menu-extra' }, extra) : null)
      }

      const menuItems = [
        menuItem(t('menu.chat'), 'chat', openChat),
        menuItem(sleeping ? t('menu.wake') : t('menu.sleep'), sleeping ? 'wake' : 'sleep', () => { sleeping ? wakeUp(true) : goSleep() }),
        menuItem(t('menu.feed'), 'feed', feedFish),
        menuItem(t('menu.actions'), 'sparkle', () => setActionPanelOpen(true)),
      menuItem(t('menu.agent'), 'sparkle', () => {
        setMenuOpen(false)
        setAgentAskOpen(true)
        setAgentAskText('')
      }),
        menuItem(t('menu.rename'), 'settings', () => {
          setChatOpen(true)
          if (sleepingRef.current) wakeUp(false)
          openSettings()
        }),
        menuItem(wander ? t('menu.wanderOn') : t('menu.wanderOff'), 'wake', () => {
          setWander((value) => !value)
          showToast(`${t('ui.wander')} · ${!wander ? 'ON' : 'OFF'}`, 1500)
        }, wander ? '·' : ''),
        menuItem(quiet ? t('menu.quietOn') : t('menu.quietOff'), 'sleep', () => {
          setQuiet((value) => !value)
          showToast(`${t('ui.quiet')} · ${!quiet ? 'ON' : 'OFF'}`, 1500)
        }, quiet ? '·' : ''),
        menuItem(t('menu.zoomIn'), 'plus', () => { applyZoom(zoomRef.current + 0.1); showToast(`×${zoomRef.current.toFixed(1)}`, 900) }),
        menuItem(t('menu.zoomOut'), 'minus', () => { applyZoom(zoomRef.current - 0.1); showToast(`×${zoomRef.current.toFixed(1)}`, 900) }),
        menuItem(t('menu.zoomReset'), 'reset', () => { applyZoom(1); showToast('×1.0', 900) }),
        menuItem(t('menu.hide'), 'hide', hidePet),
      ]

      const actionButtons = [
        { key: 'wave', label: t('action.wave') },
        { key: 'bow', label: t('action.bow') },
        { key: 'dance', label: t('action.dance') },
        { key: 'heart', label: t('action.heart') },
        { key: 'shy', label: t('action.shy') },
        { key: 'yawn', label: t('action.yawn') },
        { key: 'angry', label: t('action.angry') },
        { key: 'sit', label: t('action.sit') },
        { key: 'look', label: t('action.look') },
      ]

      function performAction(key) {
        setActionPanelOpen(false)
        lastInteractionRef.current = Date.now()
        pushEvent(`做了动作：${key}`)
        addBond(1.2, 0.4)
        const persona = soulRef.current.persona || 'tsundere'
        const table = PERSONA_ACTIONS[persona] || PERSONA_ACTIONS.tsundere
        const entry = table[key]
        if (entry) {
          runAction(key)
          say(pick(entry.lines), { emotion: entry.face, action: entry.action })
          return
        }
        runAction(key)
      }

      const toolbarButtons = [
        { key: 'chat', icon: 'chat', label: t('ui.chat'), onClick: openChat },
        { key: 'feed', icon: 'feed', label: t('ui.feed'), onClick: feedFish },
        { key: 'play', icon: 'play', label: t('ui.play'), onClick: playWithFish },
        { key: 'sleep', icon: sleeping ? 'wake' : 'sleep', label: sleeping ? t('ui.wake') : t('ui.sleep'), onClick: () => { sleeping ? wakeUp(true) : goSleep() } },
        { key: 'actions', icon: 'sparkle', label: t('ui.actions'), onClick: () => setActionPanelOpen((value) => !value) },
      ]

      // -------------------------------------------------------------------
      // Final render
      // -------------------------------------------------------------------

      const goneNow = soul.gone && soul.vanishUntil > Date.now()
      if (!visible) {
        return h(Fragment, null,
          h('style', { key: 'style', dangerouslySetInnerHTML: { __html: UI_CSS } }),
          goneNow ? h('div', { key: 'gone', className: 'ffish-gone-note' }, '……（她不在家。）') : h('button', {
            key: 'summon',
            type: 'button',
            className: 'ffish-summon',
            title: t('ui.summon'),
            'aria-label': t('ui.summon'),
            onPointerDown: (event) => { event.stopPropagation() },
            onClick: () => {
              if (soulRef.current.gone) {
                showToast('……（她不在，喊也没用。）', 2600)
                return
              }
              setVisible(true)
            },
          },
            h('span', { className: 'ffish-summon-face', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
            h('span', { className: 'ffish-summon-text' }, t('ui.summon')),
          ),
          toast ? h('div', { key: 'toast', className: 'ffish-toast', role: 'status', 'aria-live': 'polite' }, toast.text) : null,
        )
      }


      // Screen-off / idle deep sleep. The host page cannot receive Windows lock events
      // directly, so use Page Visibility + an idle timer; the Electron host adds
      // powerMonitor lock/suspend events through window.fatfishPet.
      useEffect(() => {
        function scheduleIdle() {
          clearTimeout(idleSleepTimerRef.current)
          if (!soulRef.current.settings.sleepOnScreenOff) return
          const minutes = Number(soulRef.current.settings.idleSleepMinutes)
          if (!Number.isFinite(minutes) || minutes <= 0) return
          idleSleepTimerRef.current = setTimeout(() => enterDeepSleep('idle'), Math.min(minutes, 120) * 60000)
        }
        function enterDeepSleep(reason) {
          if (!soulRef.current.settings.sleepOnScreenOff) return
          if (systemSleepingRef.current) return
          systemSleepingRef.current = true
          deepSleepWasSleepingRef.current = sleepingRef.current
          setSystemSleeping(true)
          if (!sleepingRef.current) setSleeping(true)
          setChatOpen(false)
          setSettingsOpen(false)
          setMenuOpen(false)
          setAgentAskOpen(false)
          setActionPanelOpen(false)
          setBubble(null)
          try { if (agentAbortRef.current) agentAbortRef.current.abort() } catch { /* ignore */ }
          agentBusyRef.current = false
          clearTimeout(idleSleepTimerRef.current)
        }
        function leaveDeepSleep() {
          if (!systemSleepingRef.current) return
          systemSleepingRef.current = false
          setSystemSleeping(false)
          if (!deepSleepWasSleepingRef.current) setSleeping(false)
          scheduleIdle()
        }
        function onVisibility() {
          if (document.hidden) enterDeepSleep('hidden')
          else leaveDeepSleep()
        }
        function onActivity() {
          if (systemSleepingRef.current) leaveDeepSleep()
          else scheduleIdle()
        }
        function onSystemSleep() { enterDeepSleep('system') }
        function onSystemWake() { leaveDeepSleep() }
        function onFocus() { if (systemSleepingRef.current) leaveDeepSleep(); else scheduleIdle() }
        document.addEventListener('visibilitychange', onVisibility)
        window.addEventListener('pointerdown', onActivity, true)
        window.addEventListener('keydown', onActivity, true)
        window.addEventListener('focus', onFocus)
        const bridge = typeof window !== 'undefined' ? window.fatfishPet : null
        let offSleep = null
        let offWake = null
        if (bridge && typeof bridge.onSystemSleep === 'function') offSleep = bridge.onSystemSleep(onSystemSleep)
        if (bridge && typeof bridge.onSystemWake === 'function') offWake = bridge.onSystemWake(onSystemWake)
        scheduleIdle()
        return () => {
          clearTimeout(idleSleepTimerRef.current)
          document.removeEventListener('visibilitychange', onVisibility)
          window.removeEventListener('pointerdown', onActivity, true)
          window.removeEventListener('keydown', onActivity, true)
          window.removeEventListener('focus', onFocus)
          if (typeof offSleep === 'function') offSleep()
          if (typeof offWake === 'function') offWake()
        }
      }, [])

      return h('div', { className: `ffish-pet-root ${systemSleeping ? 'ffish-deep-sleep' : ''}`.trim(), 'data-build': BUILD_TIME },
        h('style', { key: 'style', dangerouslySetInnerHTML: { __html: UI_CSS } }),

        // The kit body lives on a viewport-sized stage: its own walk/run physics
        // move her, and this overlay only follows where the body says it is.
        h('div', {
          key: 'live-stage',
          ref: liveRootRef,
          className: 'ffish-live-stage',
          'aria-hidden': 'true',
        }),

        riceOn ? h('div', {
          key: `rice-${riceKey}`,
          ref: bowlRef,
          className: 'ffish-rice',
          'aria-hidden': 'true',
          style: { transform: `translate3d(${riceRef.current.lastBowlX}px, ${riceRef.current.lastBowlY}px, 0)` },
        },
          h('span', { className: 'ffish-rice-inner' },
            h('span', { className: 'ffish-rice-spark s0' }, '✦'),
            h('span', { className: 'ffish-rice-bowl' }, '🍚'),
            h('span', { className: 'ffish-rice-spark s1' }, '✦'),
            h('span', { className: 'ffish-rice-steam' }, '﹏'),
          ),
        ) : null,

        h('div', {
          key: 'stage',
          ref: stageRef,
          className: stageClasses,
          style: { transform: `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`, '--ffish-zoom': zoom.toFixed(2) },
        },
          h('div', {
            className: 'ffish-hit',
            role: 'button',
            tabIndex: 0,
            'aria-label': `${name} · ${t('ui.chat')} · ${t('ui.feed')} · ${t('ui.play')} · ${t('ui.sleep')} (Alt+Shift+C / Alt+Shift+F)`,
            'aria-roledescription': 'pet',
            onPointerDown: onStagePointerDown,
            onPointerMove: onStagePointerMove,
            onPointerUp: onStagePointerUp,
            onPointerCancel: onStagePointerUp,
            onPointerEnter: onHoverStart,
            onPointerLeave: onHoverEnd,
            onDoubleClick: (event) => { event.preventDefault(); event.stopPropagation(); openChat() },
            onContextMenu: openMenu,
            onKeyDown: onStageKeyDown,
            onDragStart: (event) => event.preventDefault(),
          },
            h('div', { className: 'ffish-action', 'aria-hidden': 'true' },
              h('div', { ref: fishRef, className: 'ffish-character' },
                liveState === 'live' ? null : h('div', { className: 'ffish-sprite' }),
              ),
            ),
          ),

          liveState !== 'live' && emoteGlyphs.length > 0 ? h('div', {
            key: 'emote',
            className: `ffish-emote ffish-emote-${effectiveEmotion}`,
            'aria-hidden': 'true',
          }, emoteGlyphs.map((glyph, index) => h('span', {
            key: index,
            className: `ffish-emote-glyph ffish-emote-glyph-${index}`,
          }, glyph))) : null,

          bubble ? h('div', {
            key: bubble.key,
            className: bubbleAttach,
            role: 'status',
            'aria-live': 'polite',
          }, bubble.text) : null,

          liveState !== 'live' && sleeping && !chatOpen ? h('div', { key: 'zzz', className: 'ffish-zzz', 'aria-hidden': 'true' },
            h('span', null, 'z'), h('span', null, 'z'), h('span', null, 'z')) : null,

          hovered && !chatOpen && !menuOpen && !dragging && !actionPanelOpen && !bubble ? h('div', {
            key: 'toolbar',
            className: toolbarClasses,
            onPointerEnter: onHoverStart,
            onPointerLeave: onHoverEnd,
          },
            toolbarButtons.map((button) => h('button', {
              key: button.key,
              type: 'button',
              className: 'ffish-tool',
              title: button.label,
              'aria-label': button.label,
              onPointerDown: (event) => { event.preventDefault(); event.stopPropagation() },
              onClick: (event) => { event.preventDefault(); event.stopPropagation(); button.onClick() },
            }, h(Icon, { name: button.icon, size: 17 })))) : null,

          actionPanelOpen && !chatOpen ? h('div', {
            key: 'actions',
            className: `ffish-actions-panel ${orientation.above ? 'above' : 'below'} ${orientation.align === 'left' ? 'align-left' : orientation.align === 'right' ? 'align-right' : ''}`.trim(),
            onPointerDown: (event) => event.stopPropagation(),
          }, actionButtons.map((button) => h('button', {
            key: button.key,
            type: 'button',
            className: 'ffish-action-chip',
            onPointerDown: (event) => { event.preventDefault(); event.stopPropagation() },
            onClick: (event) => { event.preventDefault(); event.stopPropagation(); performAction(button.key) },
          }, button.label))) : null,
        ),

        menuOpen ? h('div', {
          key: 'menu',
          ref: menuRef,
          className: 'ffish-menu',
          role: 'menu',
          'aria-label': `${name} · ${t('menu.chat')}`,
          style: { left: `${menuPos.x}px`, top: `${menuPos.y}px` },
          onPointerDown: (event) => event.stopPropagation(),
        },
          h('div', { className: 'ffish-menu-head' },
            h('span', { className: 'ffish-menu-name' }, name),
            h('span', { className: 'ffish-menu-badge' }, affinityText),
          ),
          menuItems,
        ) : null,

        agentAskOpen ? h('div', {
          key: 'agent-ask',
          className: 'ffish-agent-ask',
          role: 'dialog',
          'aria-label': t('agent.askTitle'),
        },
          h('div', { className: 'ffish-agent-ask-head' },
            h('div', { className: 'ffish-agent-ask-title' }, t('agent.askTitle')),
            h('button', {
              type: 'button',
              className: 'ffish-icon-btn',
              title: t('agent.cancel'),
              'aria-label': t('agent.cancel'),
              onClick: () => setAgentAskOpen(false),
            }, h(Icon, { name: 'close', size: 17 })),
          ),
          h('div', { className: 'ffish-agent-ask-hint' },
            `权限：${currentPermissionLabel()}`,
            soul.settings.workspace ? ` · 工作区已配置` : ' · 工作区未配置',
            soul.settings.permission > 0 ? '' : '。提高权限后可读文件；「任务交给主 Agent」可在设置里开启。',
          ),
          h('textarea', {
            className: 'ffish-agent-ask-input',
            value: agentAskText,
            maxLength: 240,
            rows: 3,
            placeholder: t('agent.askPlaceholder'),
            onChange: (event) => setAgentAskText(event.target.value),
            onKeyDown: (event) => {
              if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitAgentAsk() }
            },
          }),
          h('div', { className: 'ffish-agent-ask-chips' },
            [
              [t('agent.quickWorkspace'), '看看工作区里有什么，挑重点告诉我'],
              [t('agent.quickPlan'), '帮我理一下接下来该做什么'],
              [t('agent.quickRemind'), '25 分钟后提醒我起来休息'],
            ].map(([label, value]) => h('button', {
              key: label,
              type: 'button',
              className: 'ffish-agent-ask-chip',
              onClick: () => setAgentAskText(value),
            }, label)),
          ),
          h('div', { className: 'ffish-agent-ask-actions' },
            h('button', { type: 'button', className: 'ffish-text-btn ghost', onClick: () => setAgentAskOpen(false) }, t('agent.cancel')),
            h('button', { type: 'button', className: 'ffish-text-btn primary', onClick: submitAgentAsk }, t('agent.start')),
          ),
        ) : null,

        chatOpen ? h('section', {
          key: 'chat',
          ref: chatRef,
          className: `ffish-chat ${settingsOpen ? 'settings-open' : ''}`.trim(),
          role: 'dialog',
          'aria-modal': 'false',
          'aria-label': `${name} · ${t('ui.chat')}`,
        },
          h('header', { className: 'ffish-chat-head' },
            h('div', { className: 'ffish-chat-portrait', 'aria-hidden': 'true' },
              h('i', { className: 'ffish-avatar-face' })),
            h('div', { className: 'ffish-chat-id' },
              h('button', {
                type: 'button',
                className: 'ffish-chat-name',
                onClick: openSettings,
                title: t('ui.settings'),
              }, name, h(Icon, { name: 'chevron', size: 13 })),
              h('span', { className: `ffish-chat-status ${aiInfo.ai ? 'online' : 'local'}` },
                h('i', null),
                listening ? t('ui.listening') : typing ? t('ui.thinking') : aiInfo.ai ? t('ui.online') : t('ui.local'),
              ),
            ),
            h('div', { className: 'ffish-chat-tools' },
              h('button', {
                type: 'button', className: 'ffish-icon-btn', title: t('ui.agent'),
                'aria-label': t('ui.agent'), onClick: () => { setAgentAskOpen(true); setAgentAskText('') },
              }, h(Icon, { name: 'sparkle', size: 16 })),
              h('button', {
                type: 'button', className: 'ffish-icon-btn', title: t('ui.settings'),
                'aria-label': t('ui.settings'), onClick: openSettings,
              }, h(Icon, { name: 'settings', size: 16 })),
              h('button', {
                type: 'button', className: 'ffish-icon-btn', title: t('ui.close'),
                'aria-label': t('ui.close'), onClick: closeChat,
              }, h(Icon, { name: 'close', size: 16 })),
            ),
            settingsOpen ? h('div', { className: 'ffish-settings', role: 'group', 'aria-label': t('ui.settings') },
              h('div', { className: 'ffish-settings-head' },
                h('div', { className: 'ffish-settings-title' }, t('ui.settings')),
                h('button', {
                  type: 'button',
                  className: 'ffish-icon-btn ffish-settings-close',
                  title: t('ui.cancel'),
                  'aria-label': t('ui.cancel'),
                  onClick: () => setSettingsOpen(false),
                }, h(Icon, { name: 'close', size: 17 })),
              ),
              h('label', { className: 'ffish-field' },
                h('span', null, t('ui.petName')),
                h('input', {
                  value: nameDraft,
                  maxLength: 10,
                  onChange: (event) => setNameDraft(event.target.value),
                }),
              ),
              h('label', { className: 'ffish-field' },
                h('span', null, t('ui.userName')),
                h('input', {
                  value: userNameDraft,
                  maxLength: 10,
                  onChange: (event) => setUserNameDraft(event.target.value),
                }),
              ),
              h('button', {
                type: 'button',
                className: `ffish-switch ${wanderDraft ? 'on' : ''}`,
                role: 'switch',
                'aria-checked': wanderDraft,
                onClick: () => setWanderDraft((value) => !value),
              }, h('span', null, t('ui.wander')), h('i', null)),
              h('button', {
                type: 'button',
                className: `ffish-switch ${quietDraft ? 'on' : ''}`,
                role: 'switch',
                'aria-checked': quietDraft,
                onClick: () => setQuietDraft((value) => !value),
              }, h('span', null, t('ui.quiet')), h('i', null)),
              h('button', {
                type: 'button',
                className: `ffish-switch ${voiceDraft ? 'on' : ''}`,
                role: 'switch',
                'aria-checked': voiceDraft,
                onClick: () => setVoiceDraft((value) => !value),
              }, h('span', null, t('ui.speak')), h('i', null)),
              h('div', { className: 'ffish-soul' },
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '好感度'),
                  h('b', null, `${Math.round(soul.favor)}`),
                  h('em', null, favorLabel(soul.favor)),
                ),
                h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.favor, 0, 100)}%` } })),
                h('div', { className: 'ffish-soul-traits ffish-soul-ocean' },
                  [['O', '开放'], ['C', '尽责'], ['E', '外向'], ['A', '宜人'], ['N', '敏感']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.ocean[key], 0, 100)}%` } })),
                    )
                  ))),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '心情'),
                  h('em', null, soul.mood.valence >= 20 ? '开心' : soul.mood.valence <= -20 ? '低落' : '平静'),
                  h('b', null, `紧张 ${Math.round(soul.mood.stress)}`),
                ),
                h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp((soul.mood.valence + 100) / 2, 0, 100)}%` } })),
                h('div', { className: 'ffish-soul-traits' },
                  [['belonging', '归属'], ['autonomy', '自主'], ['competence', '胜任']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.needs[key], 0, 100)}%` } })),
                    )
                  ))),
                h('div', { className: 'ffish-soul-traits' },
                  [['trust', '信任'], ['resentment', '怨气'], ['security', '安全感']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.relation[key], 0, 100)}%` } })),
                    )
                  ))),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '用户印象'),
                  h('em', null, `响应 ${Math.round(soul.userModel.responsiveness)} · 关心 ${Math.round(soul.userModel.care)}`),
                ),
                soul.selfNarrative ? h('div', { className: 'ffish-soul-narrative' }, `“${soul.selfNarrative}”`) : null,
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '反思'),
                  h('b', null, `${soul.reflections || 0} 次`),
                  h('button', {
                    type: 'button', className: 'ffish-text-btn tiny',
                    disabled: !!soul.reflectionBusy,
                    onClick: () => reflectSoul(true),
                  }, soul.reflectionBusy ? '思考中…' : '让她想想'),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '性格'),
                  h('b', null, PERSONAS[soul.persona] ? PERSONAS[soul.persona].label : '未选择'),
                  h('button', {
                    type: 'button', className: 'ffish-text-btn tiny',
                    onClick: () => setPersonaOpen(true),
                  }, '重选'),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '微调'),
                  h('b', { className: 'ffish-soul-custom' }, soul.customPersona ? soul.customPersona : '（用一句话描述她）'),
                  h('button', {
                    type: 'button', className: 'ffish-text-btn tiny',
                    onClick: () => setPersonaOpen(true),
                  }, '编辑'),
                ),
                h('div', { className: 'ffish-soul-traits' },
                  [['closeness', '亲密度'], ['jealousy', '占有欲'], ['dependence', '依赖']].map(([key, label]) => (
                    h('div', { key, className: 'ffish-soul-trait' },
                      h('span', null, label),
                      h('div', { className: 'ffish-soul-track' }, h('i', { style: { width: `${clamp(soul.traits[key] || 0, 0, 100)}%` } })),
                    )
                  )),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, '此刻'),
                  h('b', null, angry ? '生气中' : soul.warped ? '有点黑化' : favorBand() === 'frozen' ? '心灰意冷'
                    : favorBand() === 'cold' ? '冷战' : favorBand() === 'clingy' ? '黏人' : '还算亲近'),
                ),
                h('div', { className: 'ffish-agent-config' },
                  h('div', { className: 'ffish-soul-row' }, h('span', null, 'AI 模型')),
                  h('select', {
                    className: 'ffish-select',
                    value: (soul.modelSelection && soul.modelSelection.provider ? soul.modelSelection.provider + '::' + soul.modelSelection.model : ''),
                    onChange: (event) => {
                      const value = event.target.value
                      if (!value) { commitSoul((x) => ({ ...x, modelSelection: { provider: '', model: '' } })); return }
                      const parts = value.split('::')
                      commitSoul((x) => ({ ...x, modelSelection: { provider: parts[0] || '', model: parts[1] || '' } }))
                    },
                  },
                  h('option', { value: '' }, '跟随 Harness 默认'),
                  modelOptions.flatMap((provider) => (provider.models || []).map((model) => h('option', {
                    key: provider.id + '::' + model.id,
                    value: provider.id + '::' + model.id,
                  }, (provider.name || provider.id) + ' / ' + (model.name || model.id))))),
                  h('div', { className: 'ffish-soul-row' }, h('span', null, 'Agent 权限')),
                  h('select', {
                    className: 'ffish-select',
                    value: String(soul.settings.permission || 0),
                    onChange: (event) => adjustSoulSetting('permission', Number(event.target.value)),
                  },
                  h('option', { value: '0' }, '0 · 只能聊天（不可访问文件）'),
                  h('option', { value: '1' }, '1 · 只读工作区'),
                  h('option', { value: '2' }, '2 · 读写工作区'),
                  h('option', { value: '3' }, '3 · 完全授权（可执行命令）')),
                  h('div', { className: 'ffish-soul-row' }, h('span', null, '工作区')),
                  h('input', {
                    className: 'ffish-input',
                    value: soul.settings.workspace || '',
                    placeholder: '例如 E:\\project',
                    onChange: (event) => adjustSoulSetting('workspace', event.target.value),
                  }),
                  h('div', { className: 'ffish-agent-note' }, '首次使用 Agent 文件能力前，请先在设置里填写工作区；权限越高她能动的东西越多。'),
                  !soul.settings.agent ? h('div', { className: 'ffish-agent-warn' }, 'Agent 模式已关闭：右键「让她想想办法」和 /agent 都不会执行。') : null,
                  (soul.settings.permission || 0) > 0 && !(soul.settings.workspace || '').trim() ? h('div', { className: 'ffish-agent-warn' }, 'Agent 权限已开启，但工作区为空：她只能聊天/记忆/提醒，无法读写文件或执行命令。') : null,
                  h('details', { className: 'ffish-agent-advanced' },
                    h('summary', null, 'Agent 高级参数 / 休眠'),
                    h('div', { className: 'ffish-advanced-grid' },
                      [
                        ['最大工具步数', 'agentSteps', 1, 20, 1, '研究越深越大'],
                        ['搜索条数', 'agentSearchResults', 1, 10, 1, '每次搜索返回几条'],
                        ['网页正文上限', 'agentFetchChars', 1000, 20000, 500, '抓取网页保留字符数'],
                        ['单步超时（秒）', 'agentTimeoutSec', 10, 180, 5, '模型/工具等待时间'],
                        ['回答长度上限', 'agentAnswerChars', 200, 4000, 100, '聊天里最多保留多少字'],
                        ['模型温度', 'agentTemperature', 0, 1.2, 0.05, '越高越发散'],
                      ].map(([label, key, min, max, step, hint]) => h('label', { key, className: 'ffish-advanced-field' },
                        h('span', null, label),
                        h('input', {
                          className: 'ffish-input small',
                          type: 'number',
                          min: min,
                          max: max,
                          step: step,
                          value: Number(soul.settings[key] !== undefined ? soul.settings[key] : min),
                          onChange: (event) => {
                            const raw = Number(event.target.value)
                            adjustSoulSetting(key, clamp(Number.isFinite(raw) ? raw : min, min, max))
                          },
                        }),
                        h('em', null, hint),
                      )),
                    ),
                    h('div', { className: 'ffish-advanced-toggles' },
                      h('button', {
                        type: 'button', className: `ffish-switch tiny ${soul.settings.agentWeb !== false ? 'on' : ''}`,
                        onClick: () => adjustSoulSetting('agentWeb', !(soul.settings.agentWeb !== false)),
                      }, h('span', null, '联网工具'), h('i', null)),
                      h('button', {
                        type: 'button', className: `ffish-switch tiny ${soul.settings.sleepOnScreenOff ? 'on' : ''}`,
                        onClick: () => adjustSoulSetting('sleepOnScreenOff', !soul.settings.sleepOnScreenOff),
                      }, h('span', null, '息屏后沉睡'), h('i', null)),
                    ),
                    h('div', { className: 'ffish-advanced-idle' },
                      h('span', null, '无操作休眠（分钟，0=关闭）'),
                      h('input', {
                        className: 'ffish-input small',
                        type: 'number',
                        min: 0,
                        max: 120,
                        step: 1,
                        value: Number(soul.settings.idleSleepMinutes || 0),
                        onChange: (event) => {
                          const raw = Number(event.target.value)
                          adjustSoulSetting('idleSleepMinutes', clamp(Number.isFinite(raw) ? raw : 0, 0, 120))
                        },
                      }),
                    ),
                    h('div', { className: 'ffish-agent-note' }, '改完立即生效；步数、搜索条数和正文上限越大，研究越深，但耗时和 token 消耗也越高。'),
                  ),
                ),
                h('div', { className: 'ffish-soul-switches' },
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.noise ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('noise', !soul.settings.noise),
                  }, h('span', null, '生气哼声'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.lock ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('lock', !soul.settings.lock),
                  }, h('span', null, '病娇锁屏'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.brain ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('brain', !soul.settings.brain),
                  }, h('span', null, 'AI 即时反应'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.agent ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('agent', !soul.settings.agent),
                  }, h('span', null, 'Agent 模式'), h('i', null)),
                  h('button', {
                    type: 'button', className: `ffish-switch tiny ${soul.settings.delegateAgent ? 'on' : ''}`,
                    onClick: () => adjustSoulSetting('delegateAgent', !soul.settings.delegateAgent),
                  }, h('span', null, '任务交给主 Agent'), h('i', null)),
                ),
                h('div', { className: 'ffish-soul-row' },
                  h('span', null, 'AI 即时反应'),
                  h('b', null, `${soul.brainCount || 0} 次`),
                  h('em', null, `Agent ${soul.agentRuns || 0} 次`),
                ),
              ),
              h('div', { className: 'ffish-settings-actions' },
                h('button', {
                  type: 'button', className: 'ffish-text-btn',
                  onClick: () => { setMessages([]); setSettingsOpen(false); showToast(t('ui.clearChat'), 1200) },
                }, t('ui.clearChat')),
                h('button', { type: 'button', className: 'ffish-text-btn ghost', onClick: () => setSettingsOpen(false) }, t('ui.cancel')),
                h('button', { type: 'button', className: 'ffish-text-btn primary', onClick: saveSettings }, t('ui.save')),
              ),
            ) : null,
          ),

          h('div', { className: 'ffish-stats' },
            statsItems.map((item) => h('div', { key: item.key, className: `ffish-stat ${item.tone}` },
              h('div', { className: 'ffish-stat-line' },
                h('span', null, item.label),
                h('b', null, `${Math.round(item.value)}`),
              ),
              h('div', { className: 'ffish-stat-track' },
                h('i', { style: { width: `${clamp(item.value, 0, 100)}%` } }),
              ),
            )),
          ),

          h('div', { className: 'ffish-messages', ref: messagesRef, 'aria-live': 'polite' },
            messages.map((message) => h('div', {
              key: message.id,
              className: `ffish-msg ${message.role === 'user' ? 'from-user' : 'from-pet'}`,
            },
              message.role === 'pet' ? h('span', { className: 'ffish-msg-avatar', 'aria-hidden': 'true' }, h(TinyFishAvatar)) : null,
              h('div', { className: 'ffish-msg-bubble' },
                message.text ? message.text : h(TypingDots),
              ),
            )),
            typing && messages.length > 0 && !messages[messages.length - 1].streaming
              ? h('div', { className: 'ffish-msg from-pet' },
                h('span', { className: 'ffish-msg-avatar', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
                h('div', { className: 'ffish-msg-bubble' }, h(TypingDots)))
              : null,
          ),

          h('form', {
            className: 'ffish-composer',
            onSubmit: (event) => {
              event.preventDefault()
              const value = input.trim()
              if (!value) return
              submitMessage(value)
            },
          },
            h('input', {
              ref: inputRef,
              className: 'ffish-input',
              value: input,
              placeholder: t('ui.placeholder'),
              maxLength: 300,
              'aria-label': t('ui.placeholder'),
              onChange: (event) => setInput(event.target.value),
            }),
            asrSupported ? h('button', {
              type: 'button',
              className: `ffish-mic ${listening ? 'listening' : ''}`,
              title: listening ? t('ui.listening') : t('ui.mic'),
              'aria-label': listening ? t('ui.listening') : t('ui.mic'),
              'aria-pressed': listening,
              onClick: () => { if (listening) stopListening(); else startListening() },
              disabled: typing,
            }, h(Icon, { name: 'mic', size: 17 })) : null,
            h('button', {
              type: 'submit',
              className: 'ffish-send',
              title: t('ui.send'),
              'aria-label': t('ui.send'),
              disabled: typing || !input.trim(),
            }, h(Icon, { name: 'send', size: 17, strokeWidth: 2 })),
          ),

          h('footer', { className: 'ffish-chat-foot' },
            h('span', null, t('ui.footHint')),
            h('span', { className: 'ffish-bond' }, h(Icon, { name: 'heart', size: 12 }), affinityText),
          ),
        ) : null,

        toast ? h('div', {
          key: `toast-${toast.key}`,
          className: 'ffish-toast',
          role: 'status',
          'aria-live': 'polite',
        }, toast.text) : null,

        helpOffer ? h('div', { key: 'help-offer', className: 'ffish-help-offer' },
          h('span', { className: 'ffish-help-portrait', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
          h('div', { className: 'ffish-help-body' },
            h('span', { className: 'ffish-help-title' }, '要帮忙吗？'),
            h('span', { className: 'ffish-help-task' }, `「${helpOffer.task}」`),
          ),
          h('button', { type: 'button', className: 'ffish-help-btn yes', style: { background: '#4d6bfe', color: '#ffffff' }, onClick: acceptHelp }, '好呀'),
          h('button', { type: 'button', className: 'ffish-help-btn no', onClick: declineHelp }, '不用'),
        ) : null,

        lockActive ? h('div', { key: 'lock', className: 'ffish-lock' },
          h('div', { className: 'ffish-lock-card' },
            h('div', { className: 'ffish-lock-portrait', 'aria-hidden': 'true' }, h(TinyFishAvatar)),
            h('div', { className: 'ffish-lock-title' }, '……你又要走吗？'),
            h('p', { className: 'ffish-lock-text' }, '大肥鱼把屏幕挡住了。说一句「对不起」或者「我喜欢你」，她就消气。'),
            h('input', {
              className: 'ffish-lock-input',
              value: lockText,
              placeholder: '说点什么…',
              maxLength: 60,
              onChange: (event) => setLockText(event.target.value),
              onKeyDown: (event) => {
                if (event.key !== 'Enter') return
                event.preventDefault()
                unlockScreen(/对不起|抱歉|sorry|喜欢你|我错了|在的/i.test(lockText))
              },
            }),
            h('div', { className: 'ffish-lock-actions' },
              h('button', {
                type: 'button',
                className: 'ffish-lock-btn primary',
                onClick: () => unlockScreen(/对不起|抱歉|sorry|喜欢你|我错了|在的/i.test(lockText)),
              }, '提交'),
              h('button', {
                type: 'button',
                className: 'ffish-lock-btn ghost',
                onClick: () => unlockScreen(false),
              }, '冷静一下'),
            ),
            h('div', { className: 'ffish-lock-hint' }, '（90 秒后也会自动让开）'),
          ),
        ) : null,

        personaOpen ? h('div', { key: 'persona', className: 'ffish-persona' },
          h('div', { className: 'ffish-persona-card' },
            h('div', { className: 'ffish-persona-title' }, '你想让大肥鱼成为怎样的她？'),
            h('div', { className: 'ffish-persona-sub' }, '初始好感度 60。性格决定她生气、撒娇、吃醋和帮你的方式，之后还会随相处慢慢变化。'),
            h('div', { className: 'ffish-persona-grid' },
              PERSONA_KEYS.map((key) => {
                const persona = PERSONAS[key]
                return h('button', {
                  key,
                  type: 'button',
                  className: 'ffish-persona-option',
                  onClick: () => choosePersona(key),
                },
                  h('span', { className: 'ffish-persona-name' }, persona.label),
                  h('span', { className: 'ffish-persona-desc' }, persona.desc),
                  persona.warn ? h('span', { className: 'ffish-persona-warn' }, `⚠ ${persona.warn}`) : null,
                )
              }),
            ),
            h('div', { className: 'ffish-persona-custom' },
              h('label', null, '也可以直接用一句话微调她的性格（会写进她的人设）'),
              h('input', {
                value: personaText,
                maxLength: 120,
                placeholder: '例：表面毒舌但私下很温柔，喜欢在我写代码时安静趴着',
                onChange: (event) => setPersonaText(event.target.value),
                onKeyDown: (event) => {
                  if (event.key !== 'Enter') return
                  event.preventDefault()
                  saveCustomPersona()
                },
              }),
              h('button', { type: 'button', className: 'ffish-persona-save', style: { background: '#4d6bfe', color: '#ffffff' }, onClick: saveCustomPersona }, '保存这个性格'),
            ),
          ),
        ) : null,
      )
    }

    // ---------------------------------------------------------------------
    // Bootstrap state (defined after the component for hoisting clarity)
    // ---------------------------------------------------------------------

    function loadBootstrap() {
      const defaults = {
        name: ZH_TEXT['name.petDefault'],
        userName: ZH_TEXT['name.userDefault'],
        stats: { hunger: 76, energy: 84, happiness: 74, affinity: 34 },
        wander: true,
        quiet: false,
        voice: false,
        zoom: 1,
        soul: makeSoul(null),
        pos: null,
        messages: [],
      }
      let saved = null
      try {
        const raw = localStorage.getItem(STORE_KEY)
        if (raw) saved = JSON.parse(raw)
      } catch (error) { saved = null }

      const viewportWidth = Math.max(320, window.innerWidth || 1280)
      const viewportHeight = Math.max(320, window.innerHeight || 800)
      const fallbackPos = {
        x: Math.max(16, viewportWidth - SIZE - 96),
        y: Math.max(MIN_Y, viewportHeight - SIZE - 180),
      }

      if (!saved || saved.v !== 1) {
        return { ...defaults, pos: fallbackPos, elapsedHours: 0 }
      }

      const stats = {
        hunger: Number.isFinite(saved.stats && saved.stats.hunger) ? roundStat(saved.stats.hunger) : defaults.stats.hunger,
        energy: Number.isFinite(saved.stats && saved.stats.energy) ? roundStat(saved.stats.energy) : defaults.stats.energy,
        happiness: Number.isFinite(saved.stats && saved.stats.happiness) ? roundStat(saved.stats.happiness) : defaults.stats.happiness,
        affinity: Number.isFinite(saved.stats && saved.stats.affinity) ? roundStat(saved.stats.affinity) : defaults.stats.affinity,
      }
      const elapsedHours = clamp((Date.now() - (Number(saved.updatedAt) || Date.now())) / 3600000, 0, 72)
      if (elapsedHours > 0.08) {
        const decay = Math.min(elapsedHours, 24)
        stats.hunger = clamp(stats.hunger - decay * 1.9, 6, 100)
        stats.energy = clamp(stats.energy - decay * 1.5, 6, 100)
        stats.happiness = clamp(stats.happiness - decay * 1.1, 6, 100)
      }
      const x = Number(saved.x)
      const y = Number(saved.y)
      return {
        name: typeof saved.name === 'string' && saved.name.trim() ? saved.name.trim().slice(0, 10) : defaults.name,
        userName: typeof saved.userName === 'string' && saved.userName.trim() ? saved.userName.trim().slice(0, 10) : defaults.userName,
        stats,
        wander: saved.wander !== false,
        quiet: saved.quiet === true,
        voice: saved.voice === true,
        pos: {
          x: Number.isFinite(x) ? clamp(x, 6, viewportWidth - SIZE - 6) : fallbackPos.x,
          y: Number.isFinite(y) ? clamp(y, MIN_Y, viewportHeight - SIZE - 8) : fallbackPos.y,
        },
        messages: sanitizeStoredMessages(saved.messages),
        zoom: clamp(Number(saved.zoom) || 1, 0.62, 1.4),
        soul: makeSoul(saved.soul),
        elapsedHours,
      }
    }

    const UI_CSS = "/* @local/fatfish-pet — UI chrome around the inlined whale-maid sprite sheet.\r\n   All host chrome uses theme tokens; the artwork itself keeps its own palette. */\r\n\r\n.ffish-pet-root {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n  font-family: inherit;\r\n  font-size: 13px;\r\n  line-height: 1.5;\r\n  color: var(--dsw-alias-label-primary);\r\n  -webkit-font-smoothing: antialiased;\r\n  text-rendering: optimizeLegibility;\r\n}\r\n\r\n.ffish-stage {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 196px;\r\n  height: 196px;\r\n  pointer-events: none;\r\n  will-change: transform;\r\n  z-index: 2;\r\n}\r\n\r\n.ffish-hit {\r\n  position: absolute;\r\n  inset: 0;\r\n  pointer-events: auto;\r\n  cursor: grab;\r\n  touch-action: none;\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  border: 0;\r\n  padding: 0;\r\n  margin: 0;\r\n  background: transparent;\r\n  border-radius: 50%;\r\n  outline: none;\r\n}\r\n.ffish-hit:active { cursor: grabbing; }\r\n.ffish-hit:focus-visible {\r\n  box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary);\r\n  border-radius: 50%;\r\n}\r\n.ffish-hit.ffish--dragging { cursor: grabbing; }\r\n\r\n.ffish-action,\r\n.ffish-character {\r\n  position: absolute;\r\n  inset: 0;\r\n  pointer-events: none;\r\n}\r\n.ffish-character {\r\n  transform-origin: 50% 92%;\r\n  transform: rotate(var(--ffish-tilt, 0deg)) translate(var(--ffish-look-x, 0px), var(--ffish-look-y, 0px)) scale(var(--ffish-zoom, 1));\r\n  transition: transform 180ms ease-out;\r\n}\r\n\r\n/* 3x3 transparent sprite sheet; see art/whale/build_whale_sprites.py. */\r\n.ffish-sprite {\r\n  --ffish-tile: 196px;\r\n  display: block;\r\n  width: var(--ffish-tile);\r\n  height: var(--ffish-tile);\r\n  background-repeat: no-repeat;\r\n  background-size: calc(var(--ffish-tile) * 3) calc(var(--ffish-tile) * 3);\r\n  background-position: 0 0;\r\n  filter: drop-shadow(0 12px 18px color-mix(in srgb, var(--dsw-alias-label-primary) 24%, transparent));\r\n  transform-origin: 50% 92%;\r\n  animation: ffish-ui-breathe 4.8s ease-in-out infinite;\r\n  will-change: transform;\r\n}\r\n.ffish--emo-normal .ffish-sprite { background-position: 0 0; }\r\n.ffish--emo-happy .ffish-sprite { background-position: calc(var(--ffish-tile) * -1) 0; }\r\n.ffish--emo-love .ffish-sprite { background-position: calc(var(--ffish-tile) * -2) 0; }\r\n.ffish--emo-curious .ffish-sprite { background-position: 0 calc(var(--ffish-tile) * -1); }\r\n.ffish--emo-thinking .ffish-sprite { background-position: calc(var(--ffish-tile) * -1) calc(var(--ffish-tile) * -1); }\r\n.ffish--emo-sleepy .ffish-sprite,\r\n.ffish--emo-surprised .ffish-sprite { background-position: calc(var(--ffish-tile) * -2) calc(var(--ffish-tile) * -1); }\r\n.ffish--emo-hungry .ffish-sprite { background-position: 0 calc(var(--ffish-tile) * -2); }\r\n.ffish--emo-shy .ffish-sprite { background-position: calc(var(--ffish-tile) * -1) calc(var(--ffish-tile) * -2); }\r\n.ffish--emo-annoyed .ffish-sprite,\r\n.ffish--emo-proud .ffish-sprite,\r\n.ffish--emo-dizzy .ffish-sprite { background-position: 0 0; }\r\n.ffish--emo-sad .ffish-sprite { background-position: 0 calc(var(--ffish-tile) * -1); }\r\n\r\n/* Floating emotion marks above her head. */\r\n.ffish-emote {\r\n  position: absolute;\r\n  left: 50%;\r\n  top: 18px;\r\n  width: 0;\r\n  height: 0;\r\n  pointer-events: none;\r\n  z-index: 5;\r\n}\r\n.ffish-emote-glyph {\r\n  position: absolute;\r\n  display: block;\r\n  color: var(--dsw-alias-brand-primary);\r\n  font-size: 17px;\r\n  font-weight: 800;\r\n  line-height: 1;\r\n  text-shadow: 0 1px 0 var(--dsw-alias-bg-base), 0 0 8px color-mix(in srgb, var(--dsw-alias-bg-base) 75%, transparent);\r\n  animation: ffish-ui-emote-float 2.2s ease-in-out infinite;\r\n}\r\n.ffish-emote-glyph-0 { left: -34px; top: 10px; }\r\n.ffish-emote-glyph-1 { left: 24px; top: -4px; animation-delay: .35s; }\r\n.ffish-emote-glyph-2 { left: -4px; top: -24px; animation-delay: .7s; }\r\n.ffish-emote-love .ffish-emote-glyph,\r\n.ffish-emote-shy .ffish-emote-glyph { color: #ff8fb4; font-size: 16px; }\r\n.ffish-emote-happy .ffish-emote-glyph,\r\n.ffish-emote-proud .ffish-emote-glyph { color: var(--dsw-alias-brand-primary); font-size: 15px; }\r\n.ffish-emote-curious .ffish-emote-glyph { color: var(--dsw-alias-brand-primary); font-size: 20px; }\r\n.ffish-emote-thinking .ffish-emote-glyph { color: var(--dsw-alias-label-secondary); font-size: 15px; letter-spacing: 2px; }\r\n.ffish-emote-sleepy .ffish-emote-glyph { color: var(--dsw-alias-label-secondary); font-weight: 600; }\r\n.ffish-emote-surprised .ffish-emote-glyph { color: var(--dsw-alias-brand-primary); font-size: 24px; }\r\n.ffish-emote-annoyed .ffish-emote-glyph { color: var(--dsw-alias-state-error-primary); font-size: 18px; }\r\n.ffish-emote-sad .ffish-emote-glyph { color: var(--dsw-alias-brand-primary); font-size: 18px; }\r\n.ffish-emote-dizzy .ffish-emote-glyph { color: var(--dsw-alias-state-warn-primary); font-size: 20px; }\r\n\r\n/* One-shot sprite actions. The tilt/look layer stays separate. */\r\n.ffish--act-wiggle .ffish-action { animation: ffish-ui-wiggle 0.8s ease-in-out 1; }\r\n.ffish--act-spin .ffish-action { animation: ffish-ui-spin 0.8s cubic-bezier(.45,.05,.35,1) 1; }\r\n.ffish--act-bounce .ffish-action { animation: ffish-ui-bounce 0.76s cubic-bezier(.28,.84,.42,1) 1; }\r\n.ffish--act-shake .ffish-action { animation: ffish-ui-shake 0.48s ease-in-out 1; }\r\n.ffish--act-nod .ffish-action { animation: ffish-ui-nod 0.64s ease-in-out 1; }\r\n\r\n/* ------------------------------------------------------------------ */\r\n/* Speech bubble                                                       */\r\n/* ------------------------------------------------------------------ */\r\n\r\n.ffish-bubble {\r\n  position: absolute;\r\n  left: 50%;\r\n  bottom: calc(100% - 4px);\r\n  transform: translateX(-50%);\r\n  max-width: min(246px, 72vw);\r\n  padding: 9px 13px;\r\n  border-radius: 16px;\r\n  background: var(--dsw-alias-bg-overlay);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 10px 30px color-mix(in srgb, var(--dsw-alias-label-primary) 14%, transparent);\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 12.5px;\r\n  line-height: 1.6;\r\n  white-space: pre-wrap;\r\n  word-break: break-word;\r\n  pointer-events: none;\r\n  z-index: 8;\r\n  animation: ffish-ui-pop-in 240ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n.ffish-bubble::after {\r\n  content: '';\r\n  position: absolute;\r\n  left: 50%;\r\n  bottom: -6px;\r\n  width: 11px;\r\n  height: 11px;\r\n  background: var(--dsw-alias-bg-overlay);\r\n  border-right: 1px solid var(--dsw-alias-border-l1);\r\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\r\n  transform: translateX(-50%) rotate(45deg);\r\n  border-radius: 0 0 2px 0;\r\n}\r\n.ffish-bubble.below {\r\n  bottom: auto;\r\n  top: calc(100% - 4px);\r\n}\r\n.ffish-bubble.below::after {\r\n  bottom: auto;\r\n  top: -6px;\r\n  border-right: 0;\r\n  border-bottom: 0;\r\n  border-left: 1px solid var(--dsw-alias-border-l1);\r\n  border-top: 1px solid var(--dsw-alias-border-l1);\r\n  border-radius: 2px 0 0 0;\r\n}\r\n.ffish-bubble.align-left { left: -4px; transform: none; }\r\n.ffish-bubble.align-left::after { left: 38px; }\r\n.ffish-bubble.align-right { left: auto; right: -4px; transform: none; }\r\n.ffish-bubble.align-right::after { left: auto; right: 38px; }\r\n\r\n/* ------------------------------------------------------------------ */\r\n/* Hover toolbar                                                       */\r\n/* ------------------------------------------------------------------ */\r\n\r\n.ffish-toolbar {\r\n  position: absolute;\r\n  left: 50%;\r\n  bottom: calc(100% + 10px);\r\n  transform: translateX(-50%);\r\n  display: flex;\r\n  gap: 4px;\r\n  padding: 5px;\r\n  border-radius: 999px;\r\n  background: color-mix(in srgb, var(--dsw-alias-bg-overlay) 92%, transparent);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 8px 26px color-mix(in srgb, var(--dsw-alias-label-primary) 15%, transparent);\r\n  backdrop-filter: blur(14px) saturate(1.15);\r\n  -webkit-backdrop-filter: blur(14px) saturate(1.15);\r\n  pointer-events: auto;\r\n  z-index: 5;\r\n  animation: ffish-ui-pop-in 180ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n.ffish-toolbar.below {\r\n  bottom: auto;\r\n  top: calc(100% + 10px);\r\n}\r\n.ffish-toolbar.align-left { left: -4px; transform: none; }\r\n.ffish-toolbar.align-right { left: auto; right: -4px; transform: none; }\r\n\r\n.ffish-tool {\r\n  width: 30px;\r\n  height: 30px;\r\n  display: grid;\r\n  place-items: center;\r\n  border: 0;\r\n  border-radius: 999px;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-secondary);\r\n  cursor: pointer;\r\n  transition: background 140ms ease, color 140ms ease, transform 140ms ease;\r\n}\r\n.ffish-tool:hover {\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  color: var(--dsw-alias-label-primary);\r\n  transform: translateY(-1px);\r\n}\r\n.ffish-tool:active { transform: scale(.94); }\r\n.ffish-tool:focus-visible {\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary);\r\n}\r\n\r\n/* ------------------------------------------------------------------ */\r\n/* Sleeping zzz                                                        */\r\n/* ------------------------------------------------------------------ */\r\n\r\n.ffish-zzz {\r\n  position: absolute;\r\n  right: -8px;\r\n  top: -16px;\r\n  display: flex;\r\n  gap: 2px;\r\n  pointer-events: none;\r\n  color: var(--dsw-alias-label-secondary);\r\n  font-weight: 700;\r\n  font-size: 12px;\r\n  letter-spacing: .5px;\r\n  z-index: 3;\r\n}\r\n.ffish-zzz span {\r\n  display: inline-block;\r\n  animation: ffish-ui-float-z 2.4s ease-in-out infinite;\r\n  opacity: .3;\r\n}\r\n.ffish-zzz span:nth-child(2) { animation-delay: .35s; font-size: 14px; }\r\n.ffish-zzz span:nth-child(3) { animation-delay: .7s; font-size: 17px; }\r\n\r\n/* ------------------------------------------------------------------ */\r\n/* Context menu                                                        */\r\n/* ------------------------------------------------------------------ */\r\n\r\n.ffish-menu {\r\n  position: fixed;\r\n  width: 220px;\r\n  padding: 6px;\r\n  border-radius: 16px;\r\n  background: var(--dsw-alias-bg-overlay);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 18px 48px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);\r\n  backdrop-filter: blur(18px) saturate(1.1);\r\n  -webkit-backdrop-filter: blur(18px) saturate(1.1);\r\n  pointer-events: auto;\r\n  z-index: 20;\r\n  animation: ffish-ui-pop-in 160ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n.ffish-menu-head {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 8px;\r\n  padding: 6px 9px 8px;\r\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\r\n  margin-bottom: 4px;\r\n}\r\n.ffish-menu-name {\r\n  font-size: 12.5px;\r\n  font-weight: 600;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n.ffish-menu-badge {\r\n  flex: none;\r\n  font-size: 10.5px;\r\n  color: var(--dsw-alias-brand-primary);\r\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 12%, transparent);\r\n  border-radius: 999px;\r\n  padding: 2px 7px;\r\n}\r\n.ffish-menu-item {\r\n  width: 100%;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 9px;\r\n  border: 0;\r\n  border-radius: 10px;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 12.5px;\r\n  text-align: left;\r\n  padding: 8px 9px;\r\n  cursor: pointer;\r\n  transition: background 120ms ease;\r\n}\r\n.ffish-menu-item:hover,\r\n.ffish-menu-item:focus-visible {\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  outline: none;\r\n}\r\n.ffish-menu-icon {\r\n  display: grid;\r\n  place-items: center;\r\n  width: 18px;\r\n  color: var(--dsw-alias-label-secondary);\r\n}\r\n.ffish-menu-label {\r\n  flex: 1;\r\n  min-width: 0;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.ffish-menu-extra {\r\n  color: var(--dsw-alias-brand-primary);\r\n  font-size: 11px;\r\n}\r\n\r\n/* ------------------------------------------------------------------ */\r\n/* Chat panel                                                          */\r\n/* ------------------------------------------------------------------ */\r\n\r\n.ffish-chat {\r\n  position: fixed;\r\n  right: 18px;\r\n  bottom: 18px;\r\n  width: 352px;\r\n  max-width: calc(100vw - 32px);\r\n  max-height: min(476px, calc(100vh - 36px));\r\n  display: flex;\r\n  flex-direction: column;\r\n  border-radius: 22px;\r\n  background: color-mix(in srgb, var(--dsw-alias-bg-overlay) 96%, transparent);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 22px 64px color-mix(in srgb, var(--dsw-alias-label-primary) 22%, transparent);\r\n  backdrop-filter: blur(22px) saturate(1.12);\r\n  -webkit-backdrop-filter: blur(22px) saturate(1.12);\r\n  pointer-events: auto;\r\n  z-index: 30;\r\n  overflow: hidden;\r\n  animation: ffish-ui-rise-in 260ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n\r\n.ffish-chat-head {\r\n  position: relative;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 10px;\r\n  padding: 12px 12px 10px;\r\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\r\n}\r\n.ffish-chat-portrait {\r\n  flex: none;\r\n  width: 38px;\r\n  height: 38px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-bg-layer-1));\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  display: grid;\r\n  place-items: center;\r\n}\r\n.ffish-avatar-face {\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n  background-repeat: no-repeat;\r\n  background-size: cover;\r\n  background-position: center 18%;\r\n  border-radius: 50%;\r\n}\r\n.ffish-chat-portrait .ffish-avatar-face { width: 100%; height: 100%; }\r\n.ffish-chat-id {\r\n  flex: 1;\r\n  min-width: 0;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 1px;\r\n}\r\n.ffish-chat-name {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 3px;\r\n  border: 0;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 13.5px;\r\n  font-weight: 650;\r\n  padding: 0;\r\n  margin: 0;\r\n  cursor: pointer;\r\n  text-align: left;\r\n  max-width: 100%;\r\n}\r\n.ffish-chat-name svg { color: var(--dsw-alias-label-secondary); }\r\n.ffish-chat-name:hover { color: var(--dsw-alias-brand-primary); }\r\n.ffish-chat-status {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 5px;\r\n  font-size: 10.5px;\r\n  color: var(--dsw-alias-label-secondary);\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.ffish-chat-status i {\r\n  width: 6px;\r\n  height: 6px;\r\n  border-radius: 50%;\r\n  background: var(--dsw-alias-state-idle-primary);\r\n}\r\n.ffish-chat-status.online i {\r\n  background: var(--dsw-alias-state-success-primary);\r\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-success-primary) 18%, transparent);\r\n}\r\n.ffish-chat-status.local i { background: var(--dsw-alias-state-warn-primary); }\r\n.ffish-chat-tools {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 2px;\r\n  flex: none;\r\n}\r\n.ffish-icon-btn {\r\n  width: 28px;\r\n  height: 28px;\r\n  display: grid;\r\n  place-items: center;\r\n  border: 0;\r\n  border-radius: 9px;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-secondary);\r\n  cursor: pointer;\r\n  transition: background 120ms ease, color 120ms ease;\r\n}\r\n.ffish-icon-btn:hover {\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  color: var(--dsw-alias-label-primary);\r\n}\r\n.ffish-icon-btn:focus-visible {\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary);\r\n}\r\n\r\n/* Settings popover */\r\n.ffish-settings {\r\n  position: absolute;\r\n  top: 54px;\r\n  right: 10px;\r\n  width: 242px;\r\n  padding: 12px;\r\n  border-radius: 15px;\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 16px 40px color-mix(in srgb, var(--dsw-alias-label-primary) 20%, transparent);\r\n  z-index: 4;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 9px;\r\n  animation: ffish-ui-pop-in 160ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n.ffish-field {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n  font-size: 11px;\r\n  color: var(--dsw-alias-label-secondary);\r\n}\r\n.ffish-field input {\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  border-radius: 9px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-base);\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 12.5px;\r\n  padding: 7px 9px;\r\n  outline: none;\r\n}\r\n.ffish-field input:focus { border-color: var(--dsw-alias-brand-primary); }\r\n.ffish-switch {\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 8px;\r\n  border: 0;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 12px;\r\n  padding: 2px 0;\r\n  cursor: pointer;\r\n}\r\n.ffish-switch i {\r\n  width: 30px;\r\n  height: 17px;\r\n  border-radius: 999px;\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  position: relative;\r\n  transition: background 160ms ease;\r\n  flex: none;\r\n}\r\n.ffish-switch i::after {\r\n  content: '';\r\n  position: absolute;\r\n  top: 2px;\r\n  left: 2px;\r\n  width: 11px;\r\n  height: 11px;\r\n  border-radius: 50%;\r\n  background: var(--dsw-alias-label-secondary);\r\n  transition: transform 160ms ease, background 160ms ease;\r\n}\r\n.ffish-switch.on i { background: color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, transparent); }\r\n.ffish-switch.on i::after {\r\n  transform: translateX(13px);\r\n  background: var(--dsw-alias-brand-primary);\r\n}\r\n.ffish-settings-actions {\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 6px;\r\n  margin-top: 3px;\r\n}\r\n.ffish-text-btn {\r\n  border: 0;\r\n  border-radius: 8px;\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 11.5px;\r\n  padding: 6px 9px;\r\n  cursor: pointer;\r\n}\r\n.ffish-text-btn:hover { background: var(--dsw-alias-border-l1); }\r\n.ffish-text-btn.ghost { background: transparent; color: var(--dsw-alias-label-secondary); }\r\n.ffish-text-btn.primary {\r\n  margin-left: auto;\r\n  background: var(--dsw-alias-brand-primary);\r\n  color: #fff;\r\n  font-weight: 600;\r\n}\r\n\r\n/* Stats strip */\r\n.ffish-stats {\r\n  display: grid;\r\n  grid-template-columns: repeat(3, minmax(0, 1fr));\r\n  gap: 10px;\r\n  padding: 9px 14px;\r\n  border-bottom: 1px solid var(--dsw-alias-border-l1);\r\n  flex: none;\r\n}\r\n.ffish-stat { min-width: 0; }\r\n.ffish-stat-line {\r\n  display: flex;\r\n  align-items: baseline;\r\n  justify-content: space-between;\r\n  gap: 4px;\r\n  font-size: 10px;\r\n  color: var(--dsw-alias-label-secondary);\r\n  margin-bottom: 4px;\r\n}\r\n.ffish-stat-line b {\r\n  font-size: 10.5px;\r\n  font-weight: 600;\r\n  color: var(--dsw-alias-label-primary);\r\n}\r\n.ffish-stat-track {\r\n  height: 4px;\r\n  border-radius: 999px;\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  overflow: hidden;\r\n}\r\n.ffish-stat-track i {\r\n  display: block;\r\n  height: 100%;\r\n  border-radius: 999px;\r\n  background: var(--dsw-alias-brand-primary);\r\n  transition: width 420ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n.ffish-stat.energy .ffish-stat-track i { background: var(--dsw-alias-state-success-primary); }\r\n.ffish-stat.hunger .ffish-stat-track i { background: var(--dsw-alias-state-warn-primary); }\r\n\r\n/* Messages */\r\n.ffish-messages {\r\n  flex: 1;\r\n  min-height: 132px;\r\n  max-height: 252px;\r\n  overflow-y: auto;\r\n  padding: 12px 14px 6px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  scrollbar-width: thin;\r\n  scrollbar-color: var(--dsw-alias-border-l2) transparent;\r\n}\r\n.ffish-messages::-webkit-scrollbar { width: 6px; }\r\n.ffish-messages::-webkit-scrollbar-thumb {\r\n  background: var(--dsw-alias-border-l2);\r\n  border-radius: 999px;\r\n}\r\n.ffish-msg {\r\n  display: flex;\r\n  align-items: flex-end;\r\n  gap: 6px;\r\n  max-width: 100%;\r\n}\r\n.ffish-msg.from-user { flex-direction: row-reverse; }\r\n.ffish-msg-avatar {\r\n  flex: none;\r\n  width: 22px;\r\n  height: 22px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 18%, var(--dsw-alias-bg-layer-1));\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  display: grid;\r\n  place-items: center;\r\n}\r\n.ffish-msg-avatar .ffish-avatar-face { width: 100%; height: 100%; }\r\n.ffish-msg-bubble {\r\n  max-width: 78%;\r\n  padding: 8px 11px;\r\n  border-radius: 14px;\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  font-size: 12.5px;\r\n  line-height: 1.58;\r\n  color: var(--dsw-alias-label-primary);\r\n  white-space: pre-wrap;\r\n  word-break: break-word;\r\n}\r\n.ffish-msg.from-pet .ffish-msg-bubble { border-bottom-left-radius: 5px; }\r\n.ffish-msg.from-user .ffish-msg-bubble {\r\n  border-bottom-right-radius: 5px;\r\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, var(--dsw-alias-bg-layer-1));\r\n  border-color: color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, var(--dsw-alias-border-l1));\r\n}\r\n.ffish-typing {\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 3px;\r\n  padding: 3px 2px;\r\n  height: 14px;\r\n}\r\n.ffish-typing i {\r\n  width: 5px;\r\n  height: 5px;\r\n  border-radius: 50%;\r\n  background: var(--dsw-alias-label-secondary);\r\n  animation: ffish-ui-typing 1.1s ease-in-out infinite;\r\n}\r\n.ffish-typing i:nth-child(2) { animation-delay: .15s; }\r\n.ffish-typing i:nth-child(3) { animation-delay: .3s; }\r\n\r\n/* Composer */\r\n.ffish-composer {\r\n  flex: none;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 7px;\r\n  padding: 9px 12px 10px;\r\n  border-top: 1px solid var(--dsw-alias-border-l1);\r\n}\r\n.ffish-input {\r\n  flex: 1;\r\n  min-width: 0;\r\n  height: 36px;\r\n  box-sizing: border-box;\r\n  border-radius: 12px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 12.5px;\r\n  padding: 0 11px;\r\n  outline: none;\r\n  transition: border-color 140ms ease, box-shadow 140ms ease;\r\n}\r\n.ffish-input::placeholder { color: var(--dsw-alias-label-secondary); }\r\n.ffish-input:focus {\r\n  border-color: var(--dsw-alias-brand-primary);\r\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);\r\n}\r\n.ffish-send {\r\n  flex: none;\r\n  width: 36px;\r\n  height: 36px;\r\n  display: grid;\r\n  place-items: center;\r\n  border: 0;\r\n  border-radius: 12px;\r\n  background: var(--dsw-alias-brand-primary);\r\n  color: #fff;\r\n  cursor: pointer;\r\n  transition: transform 140ms ease, opacity 140ms ease;\r\n}\r\n.ffish-send:hover:not(:disabled) { transform: translateY(-1px); }\r\n.ffish-send:active:not(:disabled) { transform: scale(.95); }\r\n.ffish-send:disabled { opacity: .38; cursor: default; }\r\n.ffish-send:focus-visible {\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px var(--dsw-alias-bg-overlay), 0 0 0 4px var(--dsw-alias-brand-primary);\r\n}\r\n\r\n.ffish-mic {\r\n  flex: none;\r\n  width: 36px;\r\n  height: 36px;\r\n  display: grid;\r\n  place-items: center;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  border-radius: 12px;\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  color: var(--dsw-alias-label-secondary);\r\n  cursor: pointer;\r\n  transition: color 140ms ease, border-color 140ms ease, background 140ms ease;\r\n}\r\n.ffish-mic:hover:not(:disabled) {\r\n  color: var(--dsw-alias-label-primary);\r\n  background: var(--dsw-alias-bg-layer-2);\r\n}\r\n.ffish-mic.listening {\r\n  color: var(--dsw-alias-brand-primary);\r\n  border-color: var(--dsw-alias-brand-primary);\r\n  animation: ffish-ui-mic-pulse 1.25s ease-in-out infinite;\r\n}\r\n.ffish-mic:disabled { opacity: .4; cursor: default; }\r\n.ffish-mic:focus-visible {\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary);\r\n}\r\n\r\n.ffish-chat-foot {\r\n  flex: none;\r\n  display: flex;\r\n  align-items: center;\r\n  justify-content: space-between;\r\n  gap: 10px;\r\n  padding: 0 14px 10px;\r\n  font-size: 10px;\r\n  color: var(--dsw-alias-label-secondary);\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n}\r\n.ffish-chat-foot > span:first-child {\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n}\r\n.ffish-bond {\r\n  flex: none;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 3px;\r\n  color: var(--dsw-alias-brand-primary);\r\n}\r\n\r\n/* Summon chip: the only visible affordance while the pet is hidden. */\r\n.ffish-summon {\r\n  position: fixed;\r\n  right: 18px;\r\n  bottom: 18px;\r\n  z-index: 40;\r\n  display: inline-flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  padding: 6px 14px 6px 7px;\r\n  border-radius: 999px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-overlay);\r\n  color: var(--dsw-alias-label-primary);\r\n  box-shadow: 0 10px 30px color-mix(in srgb, var(--dsw-alias-label-primary) 16%, transparent);\r\n  cursor: pointer;\r\n  pointer-events: auto;\r\n  font: inherit;\r\n  font-size: 12px;\r\n  line-height: 1.2;\r\n  animation: ffish-ui-pop-in 180ms cubic-bezier(.2, .8, .2, 1);\r\n  transition: transform 140ms ease, box-shadow 140ms ease;\r\n}\r\n.ffish-summon:hover {\r\n  transform: translateY(-1px);\r\n  box-shadow: 0 14px 36px color-mix(in srgb, var(--dsw-alias-label-primary) 22%, transparent);\r\n}\r\n.ffish-summon:active { transform: translateY(0) scale(.98); }\r\n.ffish-summon:focus-visible {\r\n  outline: none;\r\n  box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary);\r\n}\r\n.ffish-summon-face {\r\n  display: block;\r\n  width: 26px;\r\n  height: 26px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  border: 1px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 28%, var(--dsw-alias-border-l1));\r\n  flex: none;\r\n}\r\n.ffish-summon-text { font-weight: 600; letter-spacing: .01em; }\r\n\r\n/* Toast */\r\n.ffish-toast {\r\n  position: fixed;\r\n  left: 50%;\r\n  bottom: 24px;\r\n  transform: translateX(-50%);\r\n  max-width: min(420px, calc(100vw - 32px));\r\n  padding: 8px 14px;\r\n  border-radius: 999px;\r\n  background: var(--dsw-alias-bg-overlay);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 12px 34px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);\r\n  color: var(--dsw-alias-label-primary);\r\n  font-size: 12px;\r\n  pointer-events: none;\r\n  z-index: 30;\r\n  animation: ffish-ui-pop-in 180ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n\r\n/* ------------------------------------------------------------------ */\r\n/* Soul: temper, sticky notes, help offer, lock, persona picker        */\r\n/* ------------------------------------------------------------------ */\r\n\r\n.ffish-gone-note {\r\n  position: fixed;\r\n  right: 18px;\r\n  bottom: 18px;\r\n  z-index: 40;\r\n  pointer-events: none;\r\n  font-size: 12px;\r\n  color: var(--dsw-alias-label-secondary);\r\n  opacity: .72;\r\n}\r\n\r\n.ffish-angry-note {\r\n  position: fixed;\r\n  z-index: 23;\r\n  max-width: 190px;\r\n  padding: 10px 12px;\r\n  border-radius: 6px;\r\n  background: #ffe9a8;\r\n  color: #5a3d00;\r\n  font-size: 13px;\r\n  font-weight: 600;\r\n  line-height: 1.5;\r\n  box-shadow: 0 10px 22px rgba(80, 50, 0, .28);\r\n  pointer-events: none;\r\n  transform-origin: 50% 10%;\r\n  animation: ffish-note-pop 220ms cubic-bezier(.2, .9, .3, 1.2);\r\n}\r\n.ffish-angry-note::after {\r\n  content: '';\r\n  position: absolute;\r\n  left: 14px;\r\n  top: -8px;\r\n  width: 34px;\r\n  height: 12px;\r\n  background: rgba(255, 255, 255, .55);\r\n  border-radius: 2px;\r\n  transform: rotate(-4deg);\r\n}\r\n\r\n.ffish-help-offer {\r\n  position: fixed;\r\n  right: 24px;\r\n  bottom: 120px;\r\n  z-index: 25;\r\n  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  max-width: min(360px, calc(100vw - 32px));\r\n  padding: 8px 10px;\r\n  border-radius: 16px;\r\n  background: var(--dsw-alias-bg-overlay);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 14px 34px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);\r\n  pointer-events: auto;\r\n  animation: ffish-ui-pop-in 200ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n.ffish-help-portrait {\r\n  flex: none;\r\n  width: 28px;\r\n  height: 28px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  display: block;\r\n}\r\n.ffish-help-body { display: flex; flex-direction: column; gap: 1px; min-width: 0; font-size: 12px; }\r\n.ffish-help-title { font-weight: 600; }\r\n.ffish-help-task {\r\n  color: var(--dsw-alias-label-secondary);\r\n  font-size: 11px;\r\n  max-width: 170px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n}\r\n.ffish-help-btn {\r\n  flex: none;\r\n  border: 0;\r\n  border-radius: 10px;\r\n  padding: 5px 9px;\r\n  font: inherit;\r\n  font-size: 12px;\r\n  cursor: pointer;\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  color: var(--dsw-alias-label-primary);\r\n}\r\n.ffish-help-btn.yes { background: var(--dsw-alias-brand-primary); color: #fff; }\r\n\r\n.ffish-lock {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 60;\r\n  display: grid;\r\n  place-items: center;\r\n  padding: 16px;\r\n  background: rgba(6, 8, 16, .74);\r\n  backdrop-filter: blur(6px);\r\n  -webkit-backdrop-filter: blur(6px);\r\n  pointer-events: auto;\r\n}\r\n.ffish-lock-card {\r\n  width: min(360px, calc(100vw - 40px));\r\n  padding: 20px;\r\n  border-radius: 22px;\r\n  background: var(--dsw-alias-bg-overlay);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 26px 70px rgba(0, 0, 0, .45);\r\n  text-align: center;\r\n  animation: ffish-ui-pop-in 220ms cubic-bezier(.2, .8, .2, 1);\r\n}\r\n.ffish-lock-portrait {\r\n  width: 64px;\r\n  height: 64px;\r\n  margin: 0 auto 10px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  display: block;\r\n  border: 2px solid color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent);\r\n}\r\n.ffish-lock-title { font-size: 15px; font-weight: 700; }\r\n.ffish-lock-text {\r\n  margin: 8px 0 12px;\r\n  font-size: 12.5px;\r\n  line-height: 1.6;\r\n  color: var(--dsw-alias-label-secondary);\r\n}\r\n.ffish-lock-input {\r\n  width: 100%;\r\n  box-sizing: border-box;\r\n  padding: 8px 10px;\r\n  border-radius: 10px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 13px;\r\n  outline: none;\r\n}\r\n.ffish-lock-input:focus { border-color: var(--dsw-alias-brand-primary); }\r\n.ffish-lock-actions { display: flex; gap: 8px; margin-top: 10px; }\r\n.ffish-lock-btn {\r\n  flex: 1;\r\n  padding: 8px 10px;\r\n  border-radius: 10px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: transparent;\r\n  color: inherit;\r\n  font: inherit;\r\n  font-size: 12.5px;\r\n  cursor: pointer;\r\n}\r\n.ffish-lock-btn.primary { background: var(--dsw-alias-brand-primary); color: #fff; border-color: transparent; }\r\n.ffish-lock-hint { margin-top: 8px; font-size: 10.5px; color: var(--dsw-alias-label-secondary); }\r\n\r\n.ffish-persona {\r\n  position: fixed;\r\n  inset: 0;\r\n  z-index: 70;\r\n  display: grid;\r\n  place-items: center;\r\n  padding: 16px;\r\n  background: rgba(6, 8, 16, .62);\r\n  backdrop-filter: blur(6px);\r\n  -webkit-backdrop-filter: blur(6px);\r\n  pointer-events: auto;\r\n}\r\n.ffish-persona-card {\r\n  width: min(620px, calc(100vw - 32px));\r\n  max-height: calc(100vh - 60px);\r\n  overflow: auto;\r\n  padding: 18px;\r\n  border-radius: 20px;\r\n  background: var(--dsw-alias-bg-overlay);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 26px 70px rgba(0, 0, 0, .45);\r\n}\r\n.ffish-persona-title { font-size: 16px; font-weight: 700; }\r\n.ffish-persona-sub {\r\n  margin-top: 6px;\r\n  font-size: 12px;\r\n  line-height: 1.6;\r\n  color: var(--dsw-alias-label-secondary);\r\n}\r\n.ffish-persona-grid {\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\r\n  gap: 8px;\r\n  margin-top: 12px;\r\n}\r\n.ffish-persona-option {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 4px;\r\n  padding: 12px;\r\n  border-radius: 14px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  color: inherit;\r\n  font: inherit;\r\n  text-align: left;\r\n  cursor: pointer;\r\n  transition: border-color 120ms ease, background 120ms ease;\r\n}\r\n.ffish-persona-option:hover,\r\n.ffish-persona-option:focus-visible {\r\n  border-color: var(--dsw-alias-brand-primary);\r\n  background: color-mix(in srgb, var(--dsw-alias-brand-primary) 8%, var(--dsw-alias-bg-layer-1));\r\n  outline: none;\r\n}\r\n.ffish-persona-name { font-size: 14px; font-weight: 700; }\r\n.ffish-persona-desc { font-size: 11.5px; line-height: 1.55; color: var(--dsw-alias-label-secondary); }\r\n.ffish-persona-warn { font-size: 11px; color: var(--dsw-alias-state-warn-primary, #d97706); }\r\n\r\n.ffish-persona-custom {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 6px;\r\n  margin-top: 14px;\r\n  padding-top: 12px;\r\n  border-top: 1px solid var(--dsw-alias-border-l1);\r\n}\r\n.ffish-persona-custom label { font-size: 12px; color: var(--dsw-alias-label-secondary); }\r\n.ffish-persona-custom input {\r\n  padding: 8px 10px;\r\n  border-radius: 10px;\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 12.5px;\r\n  outline: none;\r\n}\r\n.ffish-persona-custom input:focus { border-color: var(--dsw-alias-brand-primary); }\r\n.ffish-persona-save {\r\n  align-self: flex-end;\r\n  padding: 7px 14px;\r\n  border-radius: 10px;\r\n  border: 0;\r\n  background: var(--dsw-alias-brand-primary);\r\n  color: #fff;\r\n  font: inherit;\r\n  font-size: 12.5px;\r\n  cursor: pointer;\r\n}\r\n\r\n.ffish-soul-custom {\r\n  max-width: 46%;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  font-weight: 400;\r\n  color: var(--dsw-alias-label-secondary);\r\n  font-size: 11px;\r\n}\r\n\r\n.ffish-soul {\r\n  display: flex;\r\n  flex-direction: column;\r\n  gap: 8px;\r\n  padding: 10px;\r\n  border-radius: 14px;\r\n  background: var(--dsw-alias-bg-layer-1);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n}\r\n.ffish-soul-row { display: flex; align-items: center; gap: 8px; font-size: 12px; }\r\n.ffish-soul-row b { margin-left: auto; font-weight: 600; }\r\n.ffish-soul-row em {\r\n  font-style: normal;\r\n  font-size: 11px;\r\n  color: var(--dsw-alias-brand-primary);\r\n}\r\n.ffish-soul-track {\r\n  height: 5px;\r\n  border-radius: 999px;\r\n  background: var(--dsw-alias-bg-layer-2);\r\n  overflow: hidden;\r\n}\r\n.ffish-soul-track i {\r\n  display: block;\r\n  height: 100%;\r\n  border-radius: 999px;\r\n  background: linear-gradient(90deg, var(--dsw-alias-brand-primary), #ff8fb4);\r\n}\r\n.ffish-soul-traits { display: flex; flex-direction: column; gap: 5px; }\r\n.ffish-soul-trait {\r\n  display: grid;\r\n  grid-template-columns: 44px 1fr;\r\n  align-items: center;\r\n  gap: 8px;\r\n  font-size: 11px;\r\n  color: var(--dsw-alias-label-secondary);\r\n}\r\n.ffish-soul-switches { display: flex; flex-wrap: wrap; gap: 6px; }\n.ffish-soul-ocean { gap: 4px; }\n.ffish-soul-narrative {\n  font-size: 11px;\n  line-height: 1.5;\n  font-style: italic;\n  color: var(--dsw-alias-label-secondary);\n  padding: 4px 7px;\n  border-radius: 8px;\n  background: var(--dsw-alias-bg-layer-2);\n}\n.ffish-text-btn:disabled { opacity: .5; cursor: default; }\r\n.ffish-switch.tiny { font-size: 11px; padding: 4px 8px; }\r\n.ffish-text-btn.tiny { font-size: 11px; padding: 2px 6px; margin-left: auto; }\r\n\r\n@keyframes ffish-note-pop {\r\n  from { opacity: 0; scale: .7; translate: 0 -8px; }\r\n  to { opacity: 1; scale: 1; translate: 0 0; }\r\n}\r\n\r\n/* ------------------------------------------------------------------ */\r\n/* Keyframes                                                           */\r\n/* ------------------------------------------------------------------ */\r\n\r\n@keyframes ffish-ui-pop-in {\r\n  from { opacity: 0; translate: 0 5px; }\r\n  to { opacity: 1; translate: 0 0; }\r\n}\r\n@keyframes ffish-ui-rise-in {\r\n  from { opacity: 0; translate: 0 14px; scale: .985; }\r\n  to { opacity: 1; translate: 0 0; scale: 1; }\r\n}\r\n@keyframes ffish-ui-typing {\r\n  0%, 60%, 100% { opacity: .3; transform: translateY(0); }\r\n  30% { opacity: 1; transform: translateY(-2px); }\r\n}\r\n@keyframes ffish-ui-float-z {\r\n  0%, 100% { opacity: .22; transform: translate(0, 2px); }\r\n  50% { opacity: .7; transform: translate(2px, -4px); }\r\n}\r\n\r\n@media (max-width: 640px) {\r\n  .ffish-chat {\r\n    right: 10px;\r\n    bottom: 10px;\r\n    width: calc(100vw - 20px);\r\n    max-height: calc(100vh - 20px);\r\n  }\r\n  .ffish-messages { max-height: 220px; }\r\n  .ffish-chat-foot > span:first-child { display: none; }\r\n}\r\n\r\n@media (prefers-reduced-motion: reduce) {\r\n  .ffish-bubble,\r\n  .ffish-toolbar,\r\n  .ffish-menu,\r\n  .ffish-chat,\r\n  .ffish-settings,\r\n  .ffish-toast {\r\n    animation: none;\r\n  }\r\n  .ffish-typing i,\r\n  .ffish-zzz span {\r\n    animation-duration: 3s;\r\n  }\r\n}\r\n\r\n\r\n@keyframes ffish-ui-breathe {\r\n  0%, 100% { transform: translateY(0) scale(1); }\r\n  50% { transform: translateY(-2px) scale(1.006, 1.012); }\r\n}\r\n@keyframes ffish-ui-emote-float {\r\n  0%, 100% { opacity: .35; transform: translateY(2px) scale(.92); }\r\n  50% { opacity: 1; transform: translateY(-4px) scale(1.05); }\r\n}\r\n@keyframes ffish-ui-wiggle {\r\n  0%, 100% { transform: translateY(0) rotate(0); }\r\n  25% { transform: translateY(-2px) rotate(-6deg); }\r\n  50% { transform: rotate(6deg); }\r\n  75% { transform: rotate(-4deg); }\r\n}\r\n@keyframes ffish-ui-spin {\r\n  0% { transform: rotate(0) scale(1); }\r\n  55% { transform: rotate(190deg) scale(.95); }\r\n  100% { transform: rotate(360deg) scale(1); }\r\n}\r\n@keyframes ffish-ui-bounce {\r\n  0%, 100% { transform: translateY(0) scale(1); }\r\n  35% { transform: translateY(-14px) scale(.98, 1.03); }\r\n  65% { transform: translateY(-4px) scale(1.02, .98); }\r\n  85% { transform: translateY(-7px) scale(1); }\r\n}\r\n@keyframes ffish-ui-shake {\r\n  0%, 100% { transform: translateX(0) rotate(0); }\r\n  20% { transform: translateX(-6px) rotate(-1.5deg); }\r\n  40% { transform: translateX(6px) rotate(1.5deg); }\r\n  60% { transform: translateX(-4px) rotate(-1deg); }\r\n  80% { transform: translateX(4px) rotate(1deg); }\r\n}\r\n@keyframes ffish-ui-nod {\r\n  0%, 100% { transform: translateY(0) rotate(0); }\r\n  25% { transform: translateY(5px) rotate(4deg); }\r\n  55% { transform: translateY(-2px) rotate(-3deg); }\r\n  80% { transform: translateY(3px) rotate(3deg); }\r\n}\r\n@keyframes ffish-ui-mic-pulse {\r\n  0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--dsw-alias-brand-primary) 30%, transparent); }\r\n  50% { box-shadow: 0 0 0 5px color-mix(in srgb, var(--dsw-alias-brand-primary) 5%, transparent); }\r\n}\r\n@media (prefers-reduced-motion: reduce) {\r\n  .ffish-sprite,\r\n  .ffish-action,\r\n  .ffish-emote-glyph,\r\n  .ffish-mic.listening {\r\n    animation: none !important;\r\n  }\r\n}\r\n\r\n/* Live2D-style figure canvas (kit body) on its viewport-sized floor. */\r\n.ffish-live-stage {\r\n  position: fixed;\r\n  inset: 0;\r\n  pointer-events: none;\r\n  overflow: visible;\r\n  z-index: 1;\r\n}\r\n.ffish-live-stage > svg {\r\n  width: 100% !important;\r\n  height: 100% !important;\r\n  display: block;\r\n  overflow: visible;\r\n}\r\n.ffish-live-root {\r\n  position: absolute;\r\n  inset: 0;\r\n  pointer-events: none;\r\n  overflow: visible;\r\n}\r\n.ffish-live-root > svg {\r\n  width: 100% !important;\r\n  height: 100% !important;\r\n  display: block;\r\n  overflow: visible;\r\n}\r\n\r\n/* Rice bowl bait: appears at the cursor and follows it like a cat toy. */\r\n.ffish-rice {\r\n  position: fixed;\r\n  left: 0;\r\n  top: 0;\r\n  z-index: 26;\r\n  pointer-events: none;\r\n  will-change: transform;\r\n}\r\n.ffish-rice-inner {\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  display: block;\r\n  width: 0;\r\n  height: 0;\r\n  animation: ffish-rice-pop 260ms cubic-bezier(.2, .9, .3, 1.2);\r\n}\r\n.ffish-rice-bowl {\r\n  position: absolute;\r\n  left: -21px;\r\n  top: -27px;\r\n  font-size: 42px;\r\n  line-height: 1;\r\n  filter: drop-shadow(0 8px 12px rgba(20, 30, 60, .28));\r\n  animation: ffish-rice-bob 1.1s ease-in-out infinite;\r\n}\r\n.ffish-rice-spark {\r\n  position: absolute;\r\n  color: #ffd166;\r\n  font-size: 15px;\r\n  font-weight: 700;\r\n  text-shadow: 0 0 8px rgba(255, 209, 102, .7);\r\n  animation: ffish-rice-twinkle 1.3s ease-in-out infinite;\r\n}\r\n.ffish-rice-spark.s0 { left: -38px; top: -44px; }\r\n.ffish-rice-spark.s1 { left: 14px; top: -34px; animation-delay: .55s; color: var(--dsw-alias-brand-primary); }\r\n.ffish-rice-steam {\r\n  position: absolute;\r\n  left: -10px;\r\n  top: -62px;\r\n  color: color-mix(in srgb, var(--dsw-alias-bg-base) 70%, #fff);\r\n  font-size: 17px;\r\n  letter-spacing: 3px;\r\n  opacity: .8;\r\n  animation: ffish-rice-steam 2.2s ease-in-out infinite;\r\n}\r\n\r\n\r\n/* Extra kit faces on the sprite fallback. */\r\n.ffish--emo-wink .ffish-sprite,\r\n.ffish--emo-content .ffish-sprite { background-position: calc(var(--ffish-tile) * -1) 0; }\r\n.ffish--emo-excited .ffish-sprite { background-position: calc(var(--ffish-tile) * -2) 0; }\r\n.ffish--emo-flustered .ffish-sprite,\r\n.ffish--emo-scared .ffish-sprite { background-position: calc(var(--ffish-tile) * -2) calc(var(--ffish-tile) * -1); }\r\n.ffish--emo-pout .ffish-sprite,\r\n.ffish--emo-smug .ffish-sprite,\r\n.ffish--emo-determined .ffish-sprite { background-position: 0 0; }\r\n.ffish--emo-worried .ffish-sprite,\r\n.ffish--emo-cry .ffish-sprite { background-position: 0 calc(var(--ffish-tile) * -1); }\r\n\r\n/* Extra motion words on the sprite fallback (the rig handles its own). */\r\n.ffish--act-wave .ffish-action,\r\n.ffish--act-dance .ffish-action,\r\n.ffish--act-flap .ffish-action { animation: ffish-ui-wiggle 0.8s ease-in-out 1; }\r\n.ffish--act-bow .ffish-action,\r\n.ffish--act-look .ffish-action { animation: ffish-ui-nod 0.64s ease-in-out 1; }\r\n.ffish--act-hop .ffish-action,\r\n.ffish--act-jump .ffish-action { animation: ffish-ui-bounce 0.76s cubic-bezier(.28,.84,.42,1) 1; }\r\n.ffish--act-sit .ffish-action { animation: ffish-ui-squat 0.8s ease-in-out 1; }\r\n.ffish--act-shiver .ffish-action { animation: ffish-ui-shake 0.48s ease-in-out 1; }\r\n.ffish--act-heart .ffish-action { animation: ffish-ui-bounce 0.9s cubic-bezier(.28,.84,.42,1) 1; }\r\n.ffish--act-shy .ffish-action { animation: ffish-ui-wiggle 0.8s ease-in-out 1; }\r\n.ffish--act-yawn .ffish-action { animation: ffish-ui-nod 0.9s ease-in-out 1; }\r\n.ffish--act-angry .ffish-action { animation: ffish-ui-shake 0.5s ease-in-out 1; }\r\n.ffish--act-stretch .ffish-action { animation: ffish-ui-bounce 0.9s cubic-bezier(.28,.84,.42,1) 1; }\r\n\r\n/* Rice-bowl bait animations. */\r\n@keyframes ffish-rice-pop {\r\n  0% { opacity: 0; scale: .4; }\r\n  70% { opacity: 1; scale: 1.08; }\r\n  100% { opacity: 1; scale: 1; }\r\n}\r\n@keyframes ffish-rice-bob {\r\n  0%, 100% { transform: translateY(0) rotate(-3deg); }\r\n  50% { transform: translateY(-5px) rotate(3deg); }\r\n}\r\n@keyframes ffish-rice-twinkle {\r\n  0%, 100% { opacity: .25; transform: scale(.85); }\r\n  50% { opacity: 1; transform: scale(1.15); }\r\n}\r\n@keyframes ffish-rice-steam {\r\n  0%, 100% { opacity: .15; transform: translateY(3px); }\r\n  50% { opacity: .8; transform: translateY(-4px); }\r\n}\r\n\r\n/* A little gait on the fallback sprite; the rig has real leg animation. */\r\n.ffish--walking .ffish-sprite { animation: ffish-ui-walk-bob 0.46s ease-in-out infinite; }\r\n\r\n@keyframes ffish-ui-walk-bob {\r\n  0%, 100% { transform: translateY(0) rotate(-0.7deg); }\r\n  50% { transform: translateY(-2px) rotate(0.7deg); }\r\n}\r\n@keyframes ffish-ui-squat {\r\n  0%, 100% { transform: translateY(0) scale(1); }\r\n  50% { transform: translateY(7px) scale(1.02, .96); }\r\n}\r\n\r\n/* Action palette */\r\n.ffish-actions-panel {\r\n  position: absolute;\r\n  left: 50%;\r\n  bottom: calc(100% + 10px);\r\n  transform: translateX(-50%);\r\n  width: 214px;\r\n  display: grid;\r\n  grid-template-columns: repeat(2, minmax(0, 1fr));\r\n  gap: 5px;\r\n  padding: 7px;\r\n  border-radius: 16px;\r\n  background: color-mix(in srgb, var(--dsw-alias-bg-overlay) 94%, transparent);\r\n  border: 1px solid var(--dsw-alias-border-l1);\r\n  box-shadow: 0 14px 36px color-mix(in srgb, var(--dsw-alias-label-primary) 18%, transparent);\r\n  backdrop-filter: blur(16px) saturate(1.1);\r\n  -webkit-backdrop-filter: blur(16px) saturate(1.1);\r\n  pointer-events: auto;\r\n  z-index: 9;\r\n  animation: ffish-ui-pop-in 160ms cubic-bezier(.2,.8,.2,1);\r\n}\r\n.ffish-actions-panel.below {\r\n  bottom: auto;\r\n  top: calc(100% + 10px);\r\n}\r\n.ffish-actions-panel.align-left { left: -4px; transform: none; }\r\n.ffish-actions-panel.align-right { left: auto; right: -4px; transform: none; }\r\n.ffish-action-chip {\r\n  border: 0;\r\n  border-radius: 9px;\r\n  background: transparent;\r\n  color: var(--dsw-alias-label-primary);\r\n  font: inherit;\r\n  font-size: 11.5px;\r\n  padding: 7px 8px;\r\n  text-align: center;\r\n  cursor: pointer;\r\n  white-space: nowrap;\r\n  transition: background 120ms ease, color 120ms ease;\r\n}\r\n.ffish-action-chip:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-brand-primary); }\r\n.ffish-action-chip:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--dsw-alias-brand-primary); }\r\n\n.ffish-agent-config {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n  margin-top: 6px;\n}\n.ffish-select,\n.ffish-input {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 6px 8px;\n  border-radius: 8px;\n  border: 1px solid var(--dsw-alias-border-subtle, rgba(127, 127, 127, .25));\n  background: var(--dsw-alias-bg-layer-2, rgba(127, 127, 127, .08));\n  color: var(--dsw-alias-label-primary);\n  font-size: 11px;\n  font-family: inherit;\n}\n.ffish-select:focus,\n.ffish-input:focus {\n  outline: none;\n  border-color: var(--dsw-alias-brand-primary, #4d6bfe);\n}\n.ffish-agent-note {\n  font-size: 10px;\n  line-height: 1.45;\n  color: var(--dsw-alias-label-secondary);\n  padding: 3px 2px 0;\n}\n\n/* ==========================================================================\n   Theme-aware porcelain glass refresh.\n   Uses only DSH theme tokens + color-mix, so it stays correct in light and dark.\n   Shape system: panels 22-24px, option cards 18px, inputs 12px, chips 999px.\n   ========================================================================== */\n.ffish-pet-root, .ffish-pet-root *, .ffish-pet-root *::before, .ffish-pet-root *::after { box-sizing: border-box; }\n\n.ffish-pet-root {\n  /* Fixed cobalt identity for the pet, independent of the host brand token\n     (some host themes expose a near-white \"brand primary\"). */\n  --ffish-accent: #4f6bff;\n  --ffish-accent-strong: #3a51d6;\n  --ffish-ink: var(--dsw-alias-label-primary, #131c33);\n  --ffish-muted: var(--dsw-alias-label-secondary, #5c6883);\n  --ffish-line: color-mix(in srgb, var(--ffish-ink) 12%, transparent);\n  --ffish-line-strong: color-mix(in srgb, var(--ffish-ink) 18%, transparent);\n  /* Surfaces derive from the page base, so dark hosts get dark glass and light\n     hosts get porcelain. Avoid the overlay token, which some themes tint grey. */\n  --ffish-panel: color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 90%, transparent);\n  --ffish-panel-soft: color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 76%, transparent);\n  --ffish-raise: color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 96%, transparent);\n  --ffish-user: #3f5be0;\n  --ffish-radius-panel: 23px;\n  --ffish-radius-card: 18px;\n  --ffish-radius-input: 12px;\n  --ffish-shadow: 0 28px 64px -34px rgba(5, 12, 32, 0.55), inset 0 1px 0 color-mix(in srgb, #ffffff 45%, transparent);\n  font-family: \"Segoe UI Variable Display\", \"Segoe UI\", \"Microsoft YaHei UI\", \"PingFang SC\", system-ui, sans-serif;\n  font-size: 13px;\n  font-feature-settings: \"kern\" 1, \"liga\" 1;\n  letter-spacing: 0.002em;\n}\n\n/* Chat: porcelain card with clear hierarchy and quiet motion. */\n.ffish-chat {\n  width: 420px;\n  max-height: min(560px, calc(100vh - 32px));\n  border-radius: var(--ffish-radius-panel);\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 12%, transparent);\n  background:\n    linear-gradient(158deg, color-mix(in srgb, var(--ffish-panel) 90%, transparent), color-mix(in srgb, var(--ffish-panel-soft) 82%, transparent)),\n    var(--ffish-panel);\n  box-shadow: var(--ffish-shadow);\n  backdrop-filter: blur(26px) saturate(155%);\n  -webkit-backdrop-filter: blur(26px) saturate(155%);\n}\n.ffish-chat::before {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  border-radius: inherit;\n  pointer-events: none;\n  background: linear-gradient(118deg, color-mix(in srgb, #ffffff 22%, transparent), transparent 36%);\n}\n.ffish-chat-head {\n  padding: 15px 16px 13px;\n  border-bottom: 1px solid color-mix(in srgb, var(--ffish-ink) 9%, transparent);\n}\n.ffish-chat-portrait {\n  width: 42px;\n  height: 42px;\n  border-radius: 14px;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-accent) 12%, transparent);\n  box-shadow: 0 8px 18px -12px rgba(5, 12, 32, 0.55);\n}\n.ffish-chat-name {\n  font-size: 14.5px;\n  font-weight: 700;\n  letter-spacing: -0.012em;\n  color: var(--ffish-ink);\n}\n.ffish-chat-name:hover { color: var(--ffish-accent); }\n.ffish-chat-status {\n  font-size: 11px;\n  font-weight: 500;\n  color: var(--ffish-muted);\n}\n.ffish-chat-status.online i { background: var(--dsw-alias-state-success-primary, #1f8a67); }\n.ffish-icon-btn {\n  width: 32px;\n  height: 32px;\n  border-radius: 10px;\n  color: var(--ffish-muted);\n}\n.ffish-icon-btn:hover { background: color-mix(in srgb, var(--ffish-accent) 10%, transparent); color: var(--ffish-accent); }\n.ffish-messages { padding: 16px 16px 10px; gap: 13px; }\n.ffish-messages::-webkit-scrollbar { width: 8px; }\n.ffish-messages::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--ffish-ink) 14%, transparent); border-radius: 999px; }\n.ffish-msg-bubble {\n  border-radius: 16px;\n  padding: 10px 14px;\n  font-size: 13.4px;\n  line-height: 1.7;\n  letter-spacing: 0.004em;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 94%, transparent);\n  color: var(--ffish-ink);\n}\n.ffish-msg.from-pet .ffish-msg-bubble {\n  border-bottom-left-radius: 6px;\n  background: color-mix(in srgb, var(--ffish-accent) 7%, var(--ffish-panel));\n}\n.ffish-msg.from-user .ffish-msg-bubble {\n  border-bottom-right-radius: 6px;\n  border-color: rgba(255, 255, 255, 0.14);\n  background: linear-gradient(180deg, #4a66e8, #3650cb);\n  color: #ffffff;\n  box-shadow: 0 10px 22px -16px rgba(5, 12, 32, 0.75);\n}\n.ffish-chat-foot {\n  padding: 10px 14px 14px;\n  border-top: 1px solid color-mix(in srgb, var(--ffish-ink) 9%, transparent);\n  gap: 9px;\n}\n.ffish-input {\n  height: 44px;\n  border-radius: var(--ffish-radius-input);\n  border: 1px solid var(--ffish-line-strong);\n  background: color-mix(in srgb, var(--ffish-panel-soft) 68%, transparent);\n  color: var(--ffish-ink);\n  font: inherit;\n  font-size: 13px;\n  padding: 0 14px;\n}\n.ffish-input::placeholder { color: color-mix(in srgb, var(--ffish-muted) 78%, transparent); }\n.ffish-input:focus {\n  border-color: var(--ffish-accent);\n  box-shadow: 0 0 0 4px color-mix(in srgb, var(--ffish-accent) 14%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 88%, transparent);\n}\n.ffish-send {\n  width: 42px;\n  height: 42px;\n  border-radius: var(--ffish-radius-input);\n  background: var(--ffish-accent);\n  color: #ffffff;\n  box-shadow: 0 10px 20px -14px var(--ffish-accent);\n}\n.ffish-send:hover:not(:disabled) { background: var(--ffish-accent-strong); }\n.ffish-send:disabled { opacity: 0.38; }\n.ffish-chat-foot > span:first-child { font-size: 10.5px; color: var(--ffish-muted); }\n\n/* Settings: near the pet / bottom-right, scrollable, readable in both themes. */\n.ffish-settings {\n  position: fixed;\n  top: 74px;\n  right: 12px;\n  bottom: auto;\n  left: auto;\n  width: min(420px, calc(100vw - 24px));\n  max-height: calc(100vh - 86px);\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  padding: 0 18px 18px;\n  border-radius: var(--ffish-radius-panel);\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 12%, transparent);\n  background:\n    linear-gradient(158deg, color-mix(in srgb, var(--ffish-panel) 94%, transparent), color-mix(in srgb, var(--ffish-panel-soft) 88%, transparent)),\n    var(--ffish-panel);\n  box-shadow: var(--ffish-shadow);\n  backdrop-filter: blur(26px) saturate(155%);\n  -webkit-backdrop-filter: blur(26px) saturate(155%);\n  z-index: 35;\n}\n.ffish-settings-head {\n  position: sticky;\n  top: 0;\n  z-index: 3;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin: 0 -18px 10px;\n  padding: 14px 12px 12px 18px;\n  border-bottom: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 94%, transparent);\n  backdrop-filter: blur(18px) saturate(150%);\n  -webkit-backdrop-filter: blur(18px) saturate(150%);\n}\n.ffish-settings-title {\n  font-size: 14px;\n  font-weight: 720;\n  letter-spacing: -0.01em;\n  color: var(--ffish-ink);\n}\n.ffish-settings-close { flex: none; color: var(--ffish-muted); }\n.ffish-settings-close:hover { color: var(--ffish-accent); background: color-mix(in srgb, var(--ffish-accent) 10%, transparent); }\n.ffish-settings-actions {\n  position: sticky;\n  bottom: -18px;\n  z-index: 2;\n  margin: 10px -18px -18px;\n  padding: 12px 18px 16px;\n  border-top: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 94%, transparent);\n  backdrop-filter: blur(18px) saturate(150%);\n  -webkit-backdrop-filter: blur(18px) saturate(150%);\n}\n.ffish-settings::-webkit-scrollbar { width: 8px; }\n.ffish-settings::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--ffish-ink) 14%, transparent); border-radius: 999px; }\n.ffish-soul-row { margin-top: 8px; font-size: 12px; color: var(--ffish-muted); }\n.ffish-soul-row span { color: var(--ffish-ink); font-weight: 600; letter-spacing: 0.005em; }\n.ffish-soul-row em, .ffish-soul-row b { color: var(--ffish-muted); font-weight: 600; }\n.ffish-soul-track { height: 7px; border-radius: 999px; background: color-mix(in srgb, var(--ffish-ink) 9%, transparent); }\n.ffish-soul-track i { border-radius: 999px; background: linear-gradient(90deg, color-mix(in srgb, var(--ffish-accent) 55%, #9ab0ff), var(--ffish-accent)); }\n.ffish-soul-narrative {\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-accent) 5%, transparent);\n  border-radius: 12px;\n  padding: 8px 10px;\n  font-size: 11.5px;\n  line-height: 1.65;\n  color: var(--ffish-muted);\n}\n.ffish-select, .ffish-input {\n  border-radius: 11px;\n  border: 1px solid var(--ffish-line-strong);\n  background: color-mix(in srgb, var(--ffish-panel-soft) 66%, transparent);\n  color: var(--ffish-ink);\n  font: inherit;\n  font-size: 12px;\n  min-height: 36px;\n}\n.ffish-select:focus, .ffish-input:focus { border-color: var(--ffish-accent); box-shadow: 0 0 0 3px color-mix(in srgb, var(--ffish-accent) 13%, transparent); }\n.ffish-agent-note { font-size: 10.5px; line-height: 1.6; color: var(--ffish-muted); }\n.ffish-switch.tiny { border-radius: 999px; }\n.ffish-text-btn { font: inherit; font-size: 11.5px; font-weight: 600; }\n\n/* Toolbar, menu, bubble, action panel: same porcelain language. */\n.ffish-toolbar {\n  padding: 6px;\n  border-radius: 16px;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 11%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 78%, transparent);\n  box-shadow: 0 16px 36px -24px rgba(5, 12, 32, 0.6), inset 0 1px 0 color-mix(in srgb, #ffffff 35%, transparent);\n  backdrop-filter: blur(18px) saturate(150%);\n  -webkit-backdrop-filter: blur(18px) saturate(150%);\n}\n.ffish-tool {\n  width: 38px;\n  height: 38px;\n  border-radius: 12px;\n  color: var(--ffish-ink);\n}\n.ffish-tool:hover { background: color-mix(in srgb, var(--ffish-accent) 10%, transparent); color: var(--ffish-accent); transform: translateY(-1px); }\n.ffish-menu {\n  width: 266px;\n  padding: 10px;\n  border-radius: 20px;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 11%, transparent);\n  background:\n    linear-gradient(158deg, color-mix(in srgb, var(--ffish-panel) 94%, transparent), color-mix(in srgb, var(--ffish-panel-soft) 86%, transparent)),\n    var(--ffish-panel);\n  box-shadow: var(--ffish-shadow);\n  backdrop-filter: blur(26px) saturate(155%);\n  -webkit-backdrop-filter: blur(26px) saturate(155%);\n}\n.ffish-menu-head { padding: 6px 8px 10px; border-bottom: 1px solid color-mix(in srgb, var(--ffish-ink) 9%, transparent); margin-bottom: 6px; }\n.ffish-menu-name { font-size: 13px; font-weight: 700; color: var(--ffish-ink); }\n.ffish-menu-badge { font-size: 10px; color: var(--ffish-muted); }\n.ffish-menu-item {\n  border-radius: 11px;\n  padding: 9px 10px;\n  font-size: 12px;\n  color: var(--ffish-ink);\n}\n.ffish-menu-item:hover, .ffish-menu-item:focus-visible { background: color-mix(in srgb, var(--ffish-accent) 10%, transparent); color: var(--ffish-accent); }\n.ffish-menu-extra { font-size: 10px; color: var(--ffish-muted); }\n.ffish-bubble {\n  max-width: 286px;\n  padding: 11px 15px;\n  border-radius: 16px;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 90%, transparent);\n  box-shadow: 0 16px 40px -26px rgba(5, 12, 32, 0.6);\n  font-size: 13.2px;\n  line-height: 1.66;\n  color: var(--ffish-ink);\n  backdrop-filter: blur(18px) saturate(150%);\n  -webkit-backdrop-filter: blur(18px) saturate(150%);\n}\n.ffish-bubble::after { display: none; }\n.ffish-actions-panel {\n  gap: 6px;\n  padding: 8px;\n  border-radius: 18px;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 82%, transparent);\n  box-shadow: 0 18px 40px -26px rgba(5, 12, 32, 0.6);\n  backdrop-filter: blur(20px) saturate(150%);\n  -webkit-backdrop-filter: blur(20px) saturate(150%);\n}\n.ffish-action-chip {\n  border-radius: 999px;\n  padding: 8px 12px;\n  font: inherit;\n  font-size: 12px;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 66%, transparent);\n  color: var(--ffish-ink);\n}\n.ffish-action-chip:hover { border-color: color-mix(in srgb, var(--ffish-accent) 36%, transparent); background: color-mix(in srgb, var(--ffish-accent) 9%, transparent); color: var(--ffish-accent); }\n\n/* Persona onboarding: one clear decision, two columns. */\n.ffish-persona {\n  background: color-mix(in srgb, #050b1a 46%, transparent);\n  backdrop-filter: blur(14px) saturate(120%);\n  -webkit-backdrop-filter: blur(14px) saturate(120%);\n}\n.ffish-persona-card {\n  width: min(780px, calc(100vw - 40px));\n  max-height: calc(100vh - 48px);\n  overflow-y: auto;\n  padding: 30px 32px 26px;\n  border-radius: 28px;\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 12%, transparent);\n  background:\n    linear-gradient(160deg, color-mix(in srgb, var(--ffish-panel) 94%, transparent), color-mix(in srgb, var(--ffish-panel-soft) 88%, transparent)),\n    var(--ffish-panel);\n  box-shadow: 0 40px 100px -44px rgba(3, 8, 24, 0.8), inset 0 1px 0 color-mix(in srgb, #ffffff 35%, transparent);\n}\n.ffish-persona-title { font-size: 23px; font-weight: 740; letter-spacing: -0.02em; color: var(--ffish-ink); }\n.ffish-persona-sub { font-size: 12.5px; line-height: 1.7; color: var(--ffish-muted); margin-top: 6px; }\n.ffish-persona-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }\n.ffish-persona-option {\n  padding: 16px;\n  border-radius: var(--ffish-radius-card);\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 66%, transparent);\n  transition: transform 150ms ease, border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;\n}\n.ffish-persona-option:hover, .ffish-persona-option:focus-visible {\n  transform: translateY(-1px);\n  border-color: color-mix(in srgb, var(--ffish-accent) 34%, transparent);\n  background: color-mix(in srgb, var(--ffish-accent) 6%, var(--ffish-panel));\n  box-shadow: 0 16px 30px -26px rgba(5, 12, 32, 0.6);\n}\n.ffish-persona-name { font-size: 14.5px; font-weight: 720; color: var(--ffish-ink); }\n.ffish-persona-desc { font-size: 12px; line-height: 1.65; color: var(--ffish-muted); }\n.ffish-persona-warn { font-size: 11px; color: var(--dsw-alias-state-warn-primary, #b67818); }\n.ffish-persona-custom { margin-top: 18px; padding-top: 16px; border-top: 1px solid color-mix(in srgb, var(--ffish-ink) 9%, transparent); }\n.ffish-persona-custom label { font-size: 12px; color: var(--ffish-muted); }\n.ffish-persona-custom input {\n  height: 44px;\n  border-radius: var(--ffish-radius-input);\n  border: 1px solid var(--ffish-line-strong);\n  background: color-mix(in srgb, var(--ffish-panel-soft) 66%, transparent);\n  color: var(--ffish-ink);\n  padding: 0 14px;\n  font-size: 13px;\n}\n.ffish-persona-custom input:focus { border-color: var(--ffish-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--ffish-accent) 13%, transparent); }\n.ffish-persona-save {\n  border-radius: var(--ffish-radius-input);\n  padding: 11px 18px;\n  font: inherit;\n  font-size: 13px;\n  font-weight: 680;\n  background: var(--ffish-accent);\n  color: #ffffff;\n  box-shadow: 0 12px 24px -16px rgba(5, 12, 32, 0.7);\n}\n.ffish-persona-save:hover { background: var(--ffish-accent-strong); }\n\n/* Motion and responsive polish. */\n@media (max-width: 720px) {\n  .ffish-persona-grid { grid-template-columns: 1fr; }\n  .ffish-chat { width: calc(100vw - 24px); }\n  .ffish-settings { width: calc(100vw - 24px); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .ffish-chat, .ffish-menu, .ffish-settings, .ffish-bubble, .ffish-persona-card { animation: none; }\n}\n\n/* Settings is a fixed viewport panel; remove the chat backdrop-filter while it is\n   open so the fixed containing block is the viewport, not the chat card. */\n.ffish-chat.settings-open {\n  backdrop-filter: none !important;\n  -webkit-backdrop-filter: none !important;\n}\n\n.ffish-settings-actions {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.ffish-settings-actions .ffish-text-btn {\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 12%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 62%, transparent);\n  color: var(--ffish-muted);\n  padding: 8px 12px;\n  border-radius: 10px;\n  font: inherit;\n  font-size: 11.5px;\n  font-weight: 600;\n}\n.ffish-settings-actions .ffish-text-btn:hover {\n  color: var(--ffish-accent);\n  border-color: color-mix(in srgb, var(--ffish-accent) 32%, transparent);\n  background: color-mix(in srgb, var(--ffish-accent) 8%, transparent);\n}\n.ffish-settings-actions .ffish-text-btn.primary {\n  margin-left: auto;\n  background: var(--ffish-accent);\n  border-color: transparent;\n  color: #ffffff;\n}\n.ffish-settings-actions .ffish-text-btn.primary:hover {\n  background: var(--ffish-accent-strong);\n  color: #ffffff;\n}\n.ffish-settings-actions .ffish-text-btn.ghost { background: transparent; color: var(--ffish-muted); }\n\n.ffish-agent-ask {\n  pointer-events: auto;\n  position: fixed;\n  right: 18px;\n  bottom: 18px;\n  z-index: 45;\n  width: min(420px, calc(100vw - 24px));\n  max-height: calc(100vh - 36px);\n  overflow-y: auto;\n  padding: 0 18px 16px;\n  border-radius: var(--ffish-radius-panel);\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 12%, transparent);\n  background:\n    linear-gradient(158deg, color-mix(in srgb, var(--ffish-panel) 94%, transparent), color-mix(in srgb, var(--ffish-panel-soft) 88%, transparent)),\n    var(--ffish-panel);\n  box-shadow: var(--ffish-shadow);\n  backdrop-filter: blur(26px) saturate(155%);\n  -webkit-backdrop-filter: blur(26px) saturate(155%);\n}\n.ffish-agent-ask-head {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin: 0 -18px 10px;\n  padding: 14px 12px 12px 18px;\n  border-bottom: 1px solid color-mix(in srgb, var(--ffish-ink) 10%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 94%, transparent);\n  backdrop-filter: blur(18px) saturate(150%);\n  -webkit-backdrop-filter: blur(18px) saturate(150%);\n}\n.ffish-agent-ask-title { font-size: 14px; font-weight: 720; letter-spacing: -0.01em; color: var(--ffish-ink); }\n.ffish-agent-ask-hint { font-size: 11.5px; line-height: 1.6; color: var(--ffish-muted); margin: 0 0 10px; }\n.ffish-agent-ask-input {\n  width: 100%;\n  resize: vertical;\n  min-height: 86px;\n  max-height: 160px;\n  padding: 10px 12px;\n  border-radius: var(--ffish-radius-input);\n  border: 1px solid var(--ffish-line-strong);\n  background: color-mix(in srgb, var(--ffish-panel-soft) 70%, transparent);\n  color: var(--ffish-ink);\n  font: inherit;\n  font-size: 13px;\n  line-height: 1.6;\n}\n.ffish-agent-ask-input::placeholder { color: color-mix(in srgb, var(--ffish-muted) 72%, transparent); }\n.ffish-agent-ask-input:focus { outline: none; border-color: var(--ffish-accent); box-shadow: 0 0 0 4px color-mix(in srgb, var(--ffish-accent) 13%, transparent); }\n.ffish-agent-ask-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px; }\n.ffish-agent-ask-chip {\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 11%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 58%, transparent);\n  color: var(--ffish-muted);\n  font: inherit;\n  font-size: 11px;\n  font-weight: 600;\n  padding: 6px 10px;\n  border-radius: 999px;\n  cursor: pointer;\n}\n.ffish-agent-ask-chip:hover { color: var(--ffish-accent); border-color: color-mix(in srgb, var(--ffish-accent) 30%, transparent); background: color-mix(in srgb, var(--ffish-accent) 8%, transparent); }\n.ffish-agent-ask-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 12px; }\n.ffish-agent-ask-actions .ffish-text-btn {\n  border: 1px solid color-mix(in srgb, var(--ffish-ink) 12%, transparent);\n  background: color-mix(in srgb, var(--ffish-panel) 62%, transparent);\n  color: var(--ffish-muted);\n  padding: 8px 12px;\n  border-radius: 10px;\n  font: inherit;\n  font-size: 11.5px;\n  font-weight: 600;\n}\n.ffish-agent-ask-actions .ffish-text-btn.primary { background: var(--ffish-accent); border-color: transparent; color: #ffffff; }\n.ffish-agent-ask-actions .ffish-text-btn.primary:hover { background: var(--ffish-accent-strong); }\n\n.ffish-agent-warn {\n  margin-top: 6px;\n  padding: 7px 9px;\n  border-radius: 10px;\n  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-warn-primary, #b67818) 28%, transparent);\n  background: color-mix(in srgb, var(--dsw-alias-state-warn-primary, #b67818) 9%, transparent);\n  color: var(--dsw-alias-state-warn-primary, #b67818);\n  font-size: 10.5px;\n  line-height: 1.55;\n}\n\n.ffish-agent-advanced { margin-top: 10px; padding-top: 8px; border-top: 1px solid color-mix(in srgb, var(--ffish-ink) 9%, transparent); }\n.ffish-agent-advanced > summary { cursor: pointer; list-style: none; font-size: 11.5px; font-weight: 680; color: var(--ffish-ink); display: flex; align-items: center; gap: 6px; }\n.ffish-agent-advanced > summary::-webkit-details-marker { display: none; }\n.ffish-agent-advanced > summary::before { content: '▸'; color: var(--ffish-muted); font-size: 10px; }\n.ffish-agent-advanced[open] > summary::before { content: '▾'; }\n.ffish-advanced-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 9px; }\n.ffish-advanced-field { display: flex; flex-direction: column; gap: 3px; font-size: 10px; color: var(--ffish-muted); }\n.ffish-advanced-field .ffish-input.small { padding: 6px 8px; font-size: 11px; height: 30px; }\n.ffish-advanced-field em { font-style: normal; font-size: 9.5px; color: var(--ffish-muted); opacity: .8; line-height: 1.35; }\n.ffish-advanced-toggles { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 10px; }\n.ffish-advanced-idle { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 9px; font-size: 10.5px; color: var(--ffish-muted); }\n.ffish-advanced-idle .ffish-input.small { width: 76px; padding: 6px 8px; font-size: 11px; height: 30px; }\n.ffish-deep-sleep .ffish-stage { opacity: .3; filter: saturate(.25) blur(.4px); }\n.ffish-deep-sleep .ffish-chat,\n.ffish-deep-sleep .ffish-settings,\n.ffish-deep-sleep .ffish-agent-ask,\n.ffish-deep-sleep .ffish-menu,\n.ffish-deep-sleep .ffish-bubble,\n.ffish-deep-sleep .ffish-actions-panel { display: none !important; }\n\n/* Inlined runtime artwork (generated by build.mjs). */\n.ffish-sprite { background-image: url(\"data:image/webp;base64,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\"); }\n.ffish-avatar-face { background-image: url(\"data:image/webp;base64,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\"); }"

    return {
      inject: ['slots'],
      apply(ctx) {
        const locale = ctx.get('locale')
        let translate = null
        if (locale && typeof locale.register === 'function') {
          ctx.effect(() => locale.register('fatfish-pet', 'zh', ZH_TEXT), 'fatfish-pet locale zh')
          ctx.effect(() => locale.register('fatfish-pet', 'en', EN_TEXT), 'fatfish-pet locale en')
          translate = (key) => {
            try { return locale.bind('fatfish-pet')(key) } catch (error) { return null }
          }
        }
        const t = (key) => {
          const fromLocale = translate ? translate(key) : null
          if (fromLocale && fromLocale !== key) return fromLocale
          return ZH_TEXT[key] || EN_TEXT[key] || key
        }
        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'fatfish-pet',
          order: -20,
          label: () => t('meta.title'),
        }, (slotProps) => h(PetRoot, Object.assign({}, slotProps, { t, locale }))))
      },
    }
  },
})

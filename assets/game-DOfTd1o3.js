var Rn=Object.defineProperty;var Mn=(i,e,t)=>e in i?Rn(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var u=(i,e,t)=>Mn(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();const Pn="modulepreload",xn=function(i){return"/cricket/"+i},Hi={},On=function(e,t,s){let n=Promise.resolve();if(t&&t.length>0){let a=function(c){return Promise.all(c.map(p=>Promise.resolve(p).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),l=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));n=a(t.map(c=>{if(c=xn(c),c in Hi)return;Hi[c]=!0;const p=c.endsWith(".css"),d=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=p?"stylesheet":Pn,p||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),p)return new Promise((b,m)=>{f.addEventListener("load",b),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return n.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return e().catch(r)})},E=Object.freeze({gravity:9.81,radius:.037,ground:.05,mass:.156,airDensity:1.225,dragCoefficient:.47,pitchPaceRetention:.88,restitution:.28,groundPaceRetention:.82,rollingDeceleration:1.2}),Vi=.5*E.airDensity*E.dragCoefficient*Math.PI*E.radius**2/E.mass;function ft(i,e){const t=i.velocity,s=i.ball,n=Vi*Math.hypot(t.x,t.y,t.z),r={x:t.x*(1-n*e/2),y:t.y-(E.gravity+n*t.y)*e/2,z:t.z*(1-n*e/2)},a=Vi*Math.hypot(r.x,r.y,r.z);return{ball:{x:s.x+r.x*e,y:s.y+r.y*e,z:s.z+r.z*e},velocity:{x:t.x-a*r.x*e,y:t.y-(E.gravity+a*r.y)*e,z:t.z-a*r.z*e}}}function qi(i,e){const t=i.ball,s=i.velocity,n=Math.hypot(s.x,s.z),r=Math.min(e,n/E.rollingDeceleration),a=Math.max(0,n-E.rollingDeceleration*r),o=n?(n+a)*.5*r/n:0;t.x+=s.x*o,t.z+=s.z*o,t.y=E.ground,s.x*=n?a/n:0,s.z*=n?a/n:0,s.y=0}function ks(i,e){if(i.ball.y<=E.ground+1e-8&&i.velocity.y<=0)return qi(i,e),null;const t=ft(i,e);if(t.ball.y>E.ground)return Object.assign(i.ball,t.ball),Object.assign(i.velocity,t.velocity),null;let s=0,n=e;for(let l=0;l<16;l++){const c=(s+n)/2;ft(i,c).ball.y>E.ground?s=c:n=c}const r=ft(i,n);r.ball.y=E.ground,Object.assign(i.ball,r.ball),Object.assign(i.velocity,r.velocity);const a={...i.ball};i.velocity.y=Math.abs(i.velocity.y)>2?-i.velocity.y*E.restitution:0,i.velocity.x*=E.groundPaceRetention,i.velocity.z*=E.groundPaceRetention;const o=e-n;if(i.velocity.y>0){const l=ft(i,o);Object.assign(i.ball,l.ball),Object.assign(i.velocity,l.velocity)}else qi(i,o);return a}function Nn(i,e){const t={ball:{...i},velocity:{...e}},s=[];let n=!1;for(let r=1;r<=2880&&(ks(t,1/120)&&(n=!0),r%4===0&&s.push({...t.ball,time:r/120,grounded:n,descending:t.velocity.y<=0}),!(n&&t.ball.y<=E.ground+1e-8&&(Math.hypot(t.velocity.x,t.velocity.z)<.1||Math.hypot(t.ball.x/66.95,t.ball.z/72.95)>=1)));r++);return s}const Q=Object.freeze({x:66.95,z:72.95,ropeTop:.075}),ze=(i,e=0)=>(i.x/(Q.x-e))**2+(i.z/(Q.z-e))**2>=1;function Ln(i,e,t,s){const n=Q.x-E.radius,r=Q.z-E.radius,a=e.x-i.x,o=e.z-i.z,l=(a/n)**2+(o/r)**2,c=2*(i.x*a/n**2+i.z*o/r**2),p=(i.x/n)**2+(i.z/r)**2-1,d=c*c-4*l*p;if(l>1e-12&&d>=0)for(const f of[(-c-Math.sqrt(d))/(2*l),(-c+Math.sqrt(d))/(2*l)]){if(f<0||f>1)continue;const b=i.y+(e.y-i.y)*f;if(b>Q.ropeTop+E.radius)continue;const m=t&&!ze(t,E.radius);return{runs:s||m?4:6,position:{x:i.x+a*f,y:b,z:i.z+o*f}}}return t&&ze(t,E.radius)?{runs:s?4:6,position:{...t}}:e.y<=E.ground+1e-8&&ze(e,E.radius)?{runs:s?4:6,position:{...e}}:null}const kt=[{x:0,z:12.8},{x:-16,z:17},{x:19,z:21},{x:-26,z:-2},{x:29,z:0},{x:-17,z:-25},{x:18,z:-29},{x:-42,z:-39},{x:41,z:-43},{x:-3,z:-58}],F=Object.freeze({crease:8.84,wicket:10.06,speed:5.8,turn:.28,maxRuns:3}),M=Object.freeze({speed:5.8,acceleration:12,reaction:.35,gather:.38,throwSpeed:24,receive:.18,safety:1.1,reach:.62}),Gi=(i=kt)=>i.map((e,t)=>({...e,moving:!1,vx:0,vz:0,facing:Math.atan2(-e.x,8.55-e.z),stride:t*.63})),Wi=i=>{const e=Math.max(0,i-M.reach),t=M.speed/M.acceleration;return e<M.speed*t/2?Math.sqrt(2*e/M.acceleration):t+(e-M.speed*t/2)/M.speed};class Dn{constructor(){u(this,"fielders",Gi());u(this,"completed",0);u(this,"progress",0);u(this,"returning",!1);u(this,"collector",-1);u(this,"returnAge",0);u(this,"action","ready");u(this,"wicketBroken",!1);u(this,"returningRunner",!1);u(this,"runnerMoving",!1);u(this,"turnLeft",0);u(this,"runOrder","auto");u(this,"committedRun",!1);u(this,"throwFrom",{x:0,y:1.2,z:0});u(this,"collectedAt",{x:0,y:.05,z:0});u(this,"throwDuration",1);u(this,"targetZ",F.wicket);u(this,"targets",[]);u(this,"expectedReturn",0);u(this,"formation",kt);u(this,"setupFrom",[]);u(this,"setupDuration",0);u(this,"setupAge",0)}get setting(){return this.setupAge<this.setupDuration}reset(e=kt,t=!1){this.setupFrom=this.fielders.map(n=>({x:n.x,z:n.z})),this.formation=e.map(n=>({...n}));const s=t?Math.max(...e.map((n,r)=>Math.hypot(n.x-this.fielders[r].x,n.z-this.fielders[r].z))):0;this.setupDuration=0,this.setupAge=0,this.fielders=Gi(t?this.setupFrom:e),this.completed=0,this.progress=0,this.returning=!1,this.collector=-1,this.returnAge=0,this.returningRunner=!1,this.runnerMoving=!1,this.turnLeft=0,this.targetZ=F.wicket,this.action="ready",this.wicketBroken=!1,this.targets=[],this.expectedReturn=0,this.runOrder="auto",this.committedRun=!1}arrange(e){if(!this.setting)return;this.setupAge=Math.min(this.setupDuration,this.setupAge+e);const t=this.setupAge,s=this.setupDuration,n=Math.min(.35,s/2),r=t<n?t*t/(2*n*(s-n)):t>s-n?1-(s-t)**2/(2*n*(s-n)):(t-n/2)/(s-n);this.fielders.forEach((a,o)=>{const l=this.setupFrom[o],c=this.formation[o],p=l.x+(c.x-l.x)*r,d=l.z+(c.z-l.z)*r,f=p-a.x,b=d-a.z;a.vx=this.setting?f/e:0,a.vz=this.setting?b/e:0,a.moving=this.setting&&Math.hypot(f,b)>.001,a.stride+=Math.hypot(f,b)*4.5,a.x=p,a.z=d,a.moving&&(a.facing=Math.atan2(f,b))})}plan(e){var n;const t=this.fielders.flatMap((r,a)=>{let o=e.find(c=>c.time>=M.reaction&&c.y<=1.9&&(c.grounded||c.descending)&&!ze(c,.6)&&(a===0?Math.hypot(r.x-c.x,r.z-c.z)<M.reach:Wi(Math.hypot(r.x-c.x,r.z-c.z))<=c.time-M.reaction));const l=e.at(-1);return!o&&a!==0&&(l!=null&&l.grounded)&&!ze(l,.6)&&(o={...l,time:Math.max(l.time,M.reaction+Wi(Math.hypot(r.x-l.x,r.z-l.z)))}),o?[{index:a,point:o}]:[]}).sort((r,a)=>r.point.time-a.point.time);this.targets=t.slice(0,2);const s=(n=t[0])==null?void 0:n.point;this.expectedReturn=s?s.time+M.gather+Math.hypot(s.x,s.z-this.targetZ)/M.throwSpeed+M.receive:1/0}get runnerZ(){return(this.completed%2?-F.crease:F.crease)*(1-2*this.progress)}get runsInProgress(){return this.runnerMoving}get retreating(){return this.returningRunner}get turnProgress(){return 1-this.turnLeft/F.turn}get receiverZ(){return this.targetZ}get runningOrder(){return this.runOrder}get canCallRun(){return!["ready","caught","held","receive"].includes(this.action)&&!this.retreating&&this.completed+(this.runnerMoving?1:0)<F.maxRuns&&this.runOrder!=="push"}callRun(){return this.canCallRun?(this.runOrder="push",!0):!1}holdRuns(){return["ready","caught","held","receive"].includes(this.action)?!1:(this.runOrder="hold",!0)}get status(){return this.action==="block"?"Stopped in the ring":this.action==="pickup"?"Fielder gathering the ball":this.action==="throw"?"Throw coming to the keeper":this.action==="receive"?"Keeper collecting the return":this.action==="caught"?"Catch held":this.action==="held"?"Ball safely collected":this.runnerMoving?"Running · "+this.completed+" completed":"Fielders closing in"}step(e,t,s,n,r,a=s){const o=2*F.crease/F.speed;if(this.returning){if(this.fielders.forEach((d,f)=>{f!==0&&(d.moving=!1,d.vx=0,d.vz=0)}),this.returnAge+=e,this.action==="caught"){const d=Math.min(1,this.returnAge/.18);return s.x=this.collectedAt.x+(this.throwFrom.x-this.collectedAt.x)*d,s.z=this.collectedAt.z+(this.throwFrom.z-this.collectedAt.z)*d,s.y=this.collectedAt.y+(this.throwFrom.y-this.collectedAt.y)*d,this.returnAge>=.42?{runs:0,dismissal:"caught"}:null}const p=M.gather+this.throwDuration+M.receive-this.returnAge;if(this.move(0,0,this.targetZ,e),this.runnerMoving&&!this.committedRun&&!this.returningRunner&&p<(1-this.progress)*o+.2&&this.progress<.5&&(this.returningRunner=!0),this.advanceRunners(e,!1),this.returnAge<M.gather){this.action="pickup";const d=this.returnAge/M.gather;s.x=this.collectedAt.x+(this.throwFrom.x-this.collectedAt.x)*d,s.z=this.collectedAt.z+(this.throwFrom.z-this.collectedAt.z)*d,s.y=this.collectedAt.y+(this.throwFrom.y-this.collectedAt.y)*d}else{const d=Math.max(0,Math.min(1,(this.returnAge-M.gather)/this.throwDuration));this.action=d<1?"throw":"receive",s.x=this.throwFrom.x*(1-d),s.z=this.throwFrom.z+(this.targetZ-this.throwFrom.z)*d,s.y=this.throwFrom.y*(1-d)+.65*d+.5*9.81*this.throwDuration**2*d*(1-d)}return p<=0&&Math.hypot(this.fielders[0].x-s.x,this.fielders[0].z-s.z)<.85?(this.wicketBroken=this.runnerMoving&&Math.abs(this.runnerZ)<F.crease-1e-6,this.action="held",{runs:this.completed,dismissal:this.wicketBroken?"run out":null}):null}const l=this.fielders.map((p,d)=>({index:d,distance:Math.hypot(p.x-s.x,p.z-s.z)})).sort((p,d)=>p.distance-d.distance),c=this.targets.length?this.targets.map(p=>p.index):l.filter(p=>p.index!==0).slice(0,2).map(p=>p.index);this.action="chase";for(let p=0;p<this.fielders.length;p++){const d=this.fielders[p];if(p!==0&&t>M.reaction&&c.includes(p)){const ae=this.targets.find(V=>V.index===p),pe=ae&&t<ae.point.time+.2?ae.point:s,ge=c[1]===p?2.2:0,oe=Math.max(1,Math.hypot(n.x,n.z));this.move(p,pe.x+n.x/oe*ge,pe.z+n.z/oe*ge,e)}else this.move(p,d.x,d.z,e);const b=s.x-a.x,m=s.z-a.z,y=b*b+m*m,_=y?Math.max(0,Math.min(1,((d.x-a.x)*b+(d.z-a.z)*m)/y)):1,I={x:a.x+b*_,y:a.y+(s.y-a.y)*_,z:a.z+m*_},L=Math.hypot(d.x-I.x,d.z-I.z),te=Math.hypot(n.x,n.z);if(t>M.reaction&&I.y<1.95&&L<M.reach&&(r||n.y<0)&&!ze({x:d.x,z:d.z},.35)){if(r&&te>11){if(L>.32||I.y>.5)continue;Object.assign(s,I),n.x*=.24,n.z*=.24,n.y=.8,this.action="block";break}Object.assign(s,I),this.collector=p,this.returning=!0,this.returnAge=0,this.action=r?"pickup":"caught",this.collectedAt={...s},this.throwFrom={x:d.x,y:1.2,z:d.z},this.throwDuration=Math.max(.3,Math.hypot(d.x,d.z-this.targetZ)/M.throwSpeed);break}}return this.advanceRunners(e,!this.returning&&t>.6&&this.expectedReturn-t>o+M.safety),null}move(e,t,s,n){const r=this.fielders[e],a=t-r.x,o=s-r.z,l=Math.hypot(a,o),c=Math.min(M.speed,Math.sqrt(2*M.acceleration*Math.max(0,l-.08)),l/Math.max(n,.001)),p=l>.01?a/l*c:0,d=l>.01?o/l*c:0,f=p-r.vx,b=d-r.vz,m=Math.hypot(f,b),y=Math.min(1,M.acceleration*n/Math.max(.001,m));r.vx+=f*y,r.vz+=b*y,r.x+=r.vx*n,r.z+=r.vz*n;const _=Math.hypot(r.x/(Q.x-.6),r.z/(Q.z-.6));_>1&&(r.x/=_,r.z/=_,r.vx=0,r.vz=0);const I=Math.hypot(r.vx,r.vz);if(r.moving=I>.12,r.stride+=I*n*4.5,r.moving){const L=Math.atan2(r.vx,r.vz),te=Math.atan2(Math.sin(L-r.facing),Math.cos(L-r.facing));r.facing+=Math.max(-8*n,Math.min(8*n,te))}}advanceRunners(e,t){this.turnLeft=Math.max(0,this.turnLeft-e);const s=this.runOrder==="push";!this.runnerMoving&&(s||t&&this.runOrder!=="hold")&&this.turnLeft===0&&this.completed<F.maxRuns&&(this.runnerMoving=!0,this.committedRun=s,s&&(this.runOrder="hold")),this.runnerMoving&&(this.progress+=(this.returningRunner?-1:1)*F.speed*e/(2*F.crease),this.progress<=0&&this.returningRunner?(this.progress=0,this.returningRunner=!1,this.runnerMoving=!1):this.progress>=1&&(this.completed++,this.progress=0,this.runnerMoving=!1,this.turnLeft=F.turn))}}const Gt=i=>Math.max(0,Math.min(1,i)),Un=1.21;function _i(i,e,t,s,n){const r=Math.abs(i);return t<1.6&&s<.4?"defence":r<.18?s>.4?"loft":"drive":i>0?r<.43?"cover":"cut":r>.78?"flick":r>.4?e<.7||s<.4&&(n??0)>1.4?"sweep":"pull":"onDrive"}function ji(i,e=0){const t={defence:"Soft defence",drive:"Straight drive",cover:"Cover drive",cut:"Cut",onDrive:"On drive",pull:"Pull",flick:"Leg flick",sweep:"Sweep",loft:"Lofted drive"}[i];return e>.4&&i!=="loft"?"Lofted "+t.toLowerCase():t}function Fn(i,e,t,s,n=_i(t,.8,i,e)){const r=Gt(s),a=Gt((i-1)/3*Un),o=Gt(e),l=t*Math.PI,c=.68+.32*(.5+.5*Math.cos(l)),p=(12+31*a)*(.45+.55*r)*c*(1-o*.22*(1-r)),d={defence:3,drive:6,cover:7,cut:8,onDrive:7,pull:14,flick:12,sweep:5,loft:8}[n],f=(d+(48-d)*o+8*o*(1-r))*Math.PI/180;return{x:Math.sin(l)*p*Math.cos(f),y:p*Math.sin(f),z:-Math.cos(l)*p*Math.cos(f)}}const Et=Object.freeze({x:-.2,y:1.87,z:-9}),Wt=8.55,Bn=.66,zn=[{speed:16,targetX:0,height:.78,bounceZ:1.3},{speed:18,targetX:.16,height:.6,bounceZ:5.9},{speed:18,targetX:-.16,height:.96,bounceZ:-3.5},{speed:16.3,targetX:.1,height:.78,bounceZ:1.3},{speed:18.4,targetX:-.1,height:.6,bounceZ:5.9},{speed:18.2,targetX:.12,height:.96,bounceZ:-3.5}];function $n(i,e){const{speed:t,targetX:s,height:n}=i,r=t*E.pitchPaceRetention,a=b=>{const m=(E.ground-e.y+.5*E.gravity*b**2)/b,y=-(m-E.gravity*b)*Bn,_=e.z+t*b,I=(Wt-_)/r;return{initialY:m,rebound:y,bounceZ:_,contactTime:b+I,error:E.ground+y*I-.5*E.gravity*I**2-n}},o=[],l=(Wt-e.z)/t-.05;for(let b=.15;b<l;b+=.005){let m=b,y=Math.min(l,b+.005);if(!(a(m).error*a(y).error>0)){for(let _=0;_<36;_++){const I=(m+y)/2;a(m).error*a(I).error<=0?y=I:m=I}o.push((m+y)/2)}}if(o.sort((b,m)=>Math.abs(a(b).bounceZ-i.bounceZ)-Math.abs(a(m).bounceZ-i.bounceZ)),!o.length)throw new Error("Delivery does not reach its authored contact height.");const c=o[0],p=a(c),d=Wt-p.bounceZ,f=d<4?"Fuller ball":d>8.5?"Shorter ball":"Good length";return{speed:t,targetX:s,height:n,label:f,bounceTime:c,reboundSpeed:r,...p}}function Ii(i=Et,e={}){const t={...i},s=e.mirror??1,n=E.pitchPaceRetention,r=zn.map((p,d)=>{const f=$n({...p,speed:p.speed*(e.speedScale??1),targetX:p.targetX*s},t),b=(e.swing??0)*[.7,1,0,-.65,.5,0][d],m=(e.turn??0)*[1,.7,1.1,0,1,.6][d],y=f.contactTime-f.bounceTime,_=f.bounceTime+n*y,I=(f.targetX-t.x-b*(.5*f.bounceTime**2+f.bounceTime*n*y)-m*y)/_;return{...f,airAcceleration:b,turnVelocity:m,initialX:I}}),a=p=>r[(Math.trunc(p)%6+6)%6];function o(p,d){const f=a(p),b=Math.max(0,d),m=b-f.bounceTime,y=m<0?t.z+f.speed*b:f.bounceZ+f.reboundSpeed*m,_=t.x+f.initialX*f.bounceTime+.5*f.airAcceleration*f.bounceTime**2;return{x:m<0?t.x+f.initialX*b+.5*f.airAcceleration*b*b:_+((f.initialX+f.airAcceleration*f.bounceTime)*n+f.turnVelocity)*m,y:m<0?t.y+f.initialY*b-.5*E.gravity*b*b:Math.max(E.ground,E.ground+f.rebound*m-.5*E.gravity*m*m),z:y}}function l(p,d){const f=a(p),b=Math.max(0,d),m=b-f.bounceTime;return m<0?{x:f.initialX+f.airAcceleration*b,y:f.initialY-E.gravity*b,z:f.speed}:{x:(f.initialX+f.airAcceleration*f.bounceTime)*n+f.turnVelocity,y:m===0||f.rebound*m-.5*E.gravity*m*m>0?f.rebound-E.gravity*m:0,z:f.reboundSpeed}}function c(p,d){const f=a(p);return d<f.bounceZ?(d-t.z)/f.speed:f.bounceTime+(d-f.bounceZ)/f.reboundSpeed}return{release:t,spec:a,position:o,velocity:l,timeAtZ:c}}const Ti=Ii();Ti.spec;Ti.position;Ti.timeAtZ;const Es={bowling:[{name:"right_arm_fast",label:"Right Arm Fast",hand:"Right",releaseTime:6.716666666666667,duration:7.583333333333333,releasePoint:[.04020483419299126,2.0470640659332275,-.29342392086982727],startTime:4.316666666666666},{name:"left_arm_fast",label:"Left Arm Fast",hand:"Left",releaseTime:6.716666666666667,duration:7.583333333333333,releasePoint:[-.04027329385280609,2.0465338230133057,-.2939590811729431],startTime:4.316666666666666},{name:"right_arm_medium_fast",label:"Right Arm Medium Fast",hand:"Right",releaseTime:4.05,duration:4.916666666666667,releasePoint:[.040198732167482376,2.047055244445801,-.29342010617256165],startTime:1.65},{name:"left_arm_medium_fast",label:"Left Arm Medium Fast",hand:"Left",releaseTime:4.05,duration:4.916666666666667,releasePoint:[-.040296249091625214,2.0465385913848877,-.2939470410346985],startTime:1.65},{name:"right_arm_off_spin",label:"Right Arm Off Spin",hand:"Right",releaseTime:1.65,duration:2.3333333333333335,releasePoint:[-.2096431702375412,2.007849931716919,.05230291560292244],startTime:0},{name:"left_arm_wrist_spin",label:"Left Arm Wrist Spin",hand:"Left",releaseTime:1.65,duration:2.3333333333333335,releasePoint:[.2094193398952484,2.0071568489074707,.05279702693223953],startTime:0},{name:"right_arm_leg_spin",label:"Right Arm Leg Spin",hand:"Right",releaseTime:2.35,duration:3.6666666666666665,releasePoint:[-.12476718425750732,1.9804044961929321,-.12156311422586441],startTime:0},{name:"left_arm_orthodox_spin",label:"Left Arm Orthodox Spin",hand:"Left",releaseTime:2.35,duration:3.6666666666666665,releasePoint:[.12459378689527512,1.979043960571289,-.12206046283245087],startTime:0}],batting:[{name:"front_defence",label:"Front-foot defence",contactTime:1,duration:3.6,contactPoint:[-.42188021540641785,.5142835974693298,.2874898910522461],source:"batting-review.glb",sourceClip:"front_defence"},{name:"back_defence",label:"Back-foot defence",contactTime:1,duration:3.6,contactPoint:[-.4252539277076721,.7406567335128784,-.07957318425178528],source:"batting-review.glb",sourceClip:"back_defence"},{name:"straight_drive",label:"Straight drive",contactTime:1,duration:3.6,contactPoint:[-.40641340613365173,.5237715244293213,.320095956325531],source:"batting-review.glb",sourceClip:"straight_drive"},{name:"off_drive",label:"Off drive",contactTime:1,duration:3.6,contactPoint:[-.5440449118614197,.49736112356185913,.2580282688140869],source:"batting-review.glb",sourceClip:"off_drive"},{name:"cover_drive",label:"Cover drive",contactTime:1,duration:3.6,contactPoint:[-.5625290870666504,.4872281849384308,.2502009868621826],source:"batting-review.glb",sourceClip:"cover_drive"},{name:"square_drive",label:"Square drive",contactTime:1,duration:3.6,contactPoint:[-.8247824907302856,.5397253632545471,.1543014645576477],source:"batting-review.glb",sourceClip:"square_drive"},{name:"on_drive",label:"On drive",contactTime:1,duration:3.6,contactPoint:[-.33533021807670593,.5269954800605774,.4211975932121277],source:"batting-review.glb",sourceClip:"on_drive"},{name:"lofted_drive",label:"Lofted drive",contactTime:1.1791666666666667,duration:4,contactPoint:[-.4883735179901123,.5321227312088013,.13648173213005066],source:"batting-review.glb",sourceClip:"lofted_drive"},{name:"back_punch",label:"Back-foot punch",contactTime:1,duration:3.6,contactPoint:[-.43436771631240845,.6427735090255737,.036218490451574326],source:"batting-review.glb",sourceClip:"back_punch"},{name:"square_cut",label:"Square cut",contactTime:1,duration:3.6,contactPoint:[-.9513834714889526,1.1468178033828735,-.23234547674655914],source:"batting-review.glb",sourceClip:"square_cut"},{name:"late_cut",label:"Late cut",contactTime:1.1,duration:3.6,contactPoint:[-.8746432065963745,1.1277614831924438,-.49524205923080444],source:"batting-review.glb",sourceClip:"late_cut"},{name:"leg_glance",label:"Leg glance",contactTime:1,duration:3.6,contactPoint:[-.3370351195335388,.6582964658737183,.27525073289871216],source:"batting-review.glb",sourceClip:"leg_glance"},{name:"flick",label:"Flick",contactTime:1,duration:3.6,contactPoint:[-.3401196002960205,.6603840589523315,.27340251207351685],source:"batting-review.glb",sourceClip:"flick"},{name:"pull",label:"Pull",contactTime:1,duration:3.6,contactPoint:[-.6093926429748535,1.1828736066818237,.6686028242111206],source:"batting-review.glb",sourceClip:"pull"},{name:"hook",label:"Hook",contactTime:1,duration:3.6,contactPoint:[-.5923113822937012,1.4420013427734375,.6072565317153931],source:"batting-review.glb",sourceClip:"hook"},{name:"sweep",label:"Sweep",contactTime:1,duration:3.6,contactPoint:[-.8370107412338257,.502070426940918,.5266743898391724],source:"batting-review.glb",sourceClip:"sweep"},{name:"slog_sweep",label:"Slog sweep",contactTime:1,duration:3.6,contactPoint:[-.7396931648254395,.5696636438369751,.6864007711410522],source:"batting-review.glb",sourceClip:"slog_sweep"},{name:"paddle_sweep",label:"Paddle sweep",contactTime:1,duration:3.6,contactPoint:[-.6656746864318848,.54570472240448,.6547996997833252],source:"batting-review.glb",sourceClip:"paddle_sweep"},{name:"reverse_sweep",label:"Reverse sweep",contactTime:1,duration:3.6,contactPoint:[-.8364166021347046,.6563839316368103,.4189280867576599],source:"batting-review.glb",sourceClip:"reverse_sweep"},{name:"scoop",label:"Ramp / scoop",contactTime:1,duration:3.6,contactPoint:[-.5639985799789429,.7481219172477722,.6927984356880188],source:"batting-review.glb",sourceClip:"scoop"},{name:"leave",label:"Leave",contactTime:1,duration:3.6,contactPoint:[-.317049503326416,1.5814197063446045,-.3046721816062927],source:"batting-review.glb",sourceClip:"leave"},{name:"duck",label:"Duck",contactTime:1,duration:3.6,contactPoint:[-.5313939452171326,.41820088028907776,-.30896255373954773],source:"batting-review.glb",sourceClip:"duck"},{name:"capture_drive",label:"Capture Drive",contactTime:2.6,duration:4.166666666666667,contactPoint:[-1.0726693868637085,.8729751110076904,.5264387726783752],source:"drive-review.glb",sourceClip:"drive"},{name:"capture_pull",label:"Capture Pull",contactTime:2.2,duration:6.566666666666666,contactPoint:[-1.1191076040267944,1.078986406326294,.5042302012443542],source:"pull-review.glb",sourceClip:"pull"},{name:"capture_cut",label:"Capture Cut",contactTime:.06666666666666667,duration:1.7,contactPoint:[-1.034303069114685,.9172611236572266,.7676048278808594],source:"flick-review.glb",sourceClip:"flick"},{name:"capture_flick",label:"Capture Flick",contactTime:.03333333333333333,duration:1.2333333333333334,contactPoint:[-1.270716905593872,.910917341709137,.7622018456459045],source:"cut-review.glb",sourceClip:"cut"},{name:"capture_compact_drive",label:"Capture Compact Drive",contactTime:.8,duration:.9666666666666667,contactPoint:[-.6791592836380005,.9526711702346802,.7439427375793457],source:"take195650-review.glb",sourceClip:"take195650"},{name:"capture_push",label:"Capture Push",contactTime:.43333333333333335,duration:1.2666666666666666,contactPoint:[-.7489568591117859,1.0370861291885376,.5656190514564514],source:"take200510-review.glb",sourceClip:"take200510"},{name:"guard",label:"Ready stance",contactTime:0,duration:1,contactPoint:null,source:"batting-review.glb",sourceClip:"lofted_drive frame 0"}],assets:{batter:"models/cricket/live-2026-09-23/yellow-batter.glb",bowler:"models/cricket/live-2026-09-23/pink-bowler.glb"}},al="right_arm_medium_fast";function At(i){const e=Es.bowling.find(t=>t.name===i);if(!e)throw new Error("Unknown bowling style: "+i);return e}function Hn(i){return{x:-.8*(At(i).hand==="Left"?-1:1),y:At(i).releasePoint[1],z:Et.z}}function Vn(i){const e=At(i).hand==="Left"?-1:1;return i.endsWith("medium_fast")?{speedScale:1,swing:.8*e,mirror:e}:i.endsWith("fast")?{speedScale:1.22,swing:.35*e,mirror:e}:{speedScale:.87,turn:i==="right_arm_off_spin"||i==="left_arm_wrist_spin"?-.6:.6,mirror:e}}function qn(i){const e=Es.batting.find(t=>t.name===i);if(!e||!e.contactPoint)throw new Error("Unknown batting stroke: "+i);return e}function ol(i,e,t,s,n){const r=_i(i,e,t,s,n);return{defence:["front_defence","back_defence","capture_push"],drive:["capture_drive","capture_compact_drive","straight_drive","back_punch"],cover:["cover_drive","off_drive","square_drive"],cut:["square_cut","late_cut"],onDrive:["on_drive","flick","capture_flick"],pull:["pull","hook"],flick:["leg_glance","capture_flick","flick","paddle_sweep"],sweep:["sweep","slog_sweep","paddle_sweep"],loft:["lofted_drive"]}[r].map(qn).sort((o,l)=>Math.abs(o.contactPoint[1]-e)-Math.abs(l.contactPoint[1]-e))}function cl(i,e){const t=At(i);return Math.min(t.duration,Math.max(t.startTime,t.releaseTime+e))}function ll(i,e,t){const s=Math.min(.32,i);return e<t?Math.max(0,i-s+s*Math.max(0,e)/t):i+e-t}const Gn=["Pace","Spin"];function jt(i=0,e=2){let t=i>>>0||12345;const s=()=>(t^=t<<13,t^=t>>>17,t^=t<<5,t>>>0),n=[["right_arm_medium_fast","left_arm_medium_fast","right_arm_fast","left_arm_fast"],["right_arm_off_spin","right_arm_leg_spin","left_arm_orthodox_spin","left_arm_wrist_spin"]];return Array.from({length:e},(r,a)=>{const o=Gn[a%2],l=n[a%2],c=l[i?s()%l.length:0],p=o==="Spin"?"Spin":c.endsWith("medium_fast")?"Medium":"Fast",d=[0,1,2,3,4,5];if(i)for(let _=5;_>1;_--){const I=1+s()%_;[d[_],d[I]]=[d[I],d[_]]}const f=Ii(Hn(c),Vn(c)),b=_=>d[(Math.trunc(_)%6+6)%6],m={release:f.release,spec:_=>f.spec(b(_)),position:(_,I)=>f.position(b(_),I),velocity:(_,I)=>f.velocity(b(_),I),timeAtZ:(_,I)=>f.timeAtZ(b(_),I)},y=a%2===1?"Wait for the turn after the bounce.":p==="Fast"?"Quicker pace. Prepare your swing early.":"Watch the swing. Find a gap.";return{label:p,style:c,hint:y,deliveries:m,order:d}})}const Wn=(i,e)=>Math.abs(Math.atan2(Math.sin(i-e),Math.cos(i-e))),As=i=>Math.atan2(i.x,8.55-i.z);function pt(i,e){const t=i*Math.PI,s={x:Math.sin(t)*e,z:8.55-Math.cos(t)*e},n=Math.max(1,Math.hypot(s.x/(Q.x-3),s.z/(Q.z-3)));return{x:s.x/n,z:s.z/n}}function Ki(i){const e=i.slice(1).map(As).sort((n,r)=>n-r);let t=0,s=0;for(let n=0;n<e.length;n++){const r=n===e.length-1?e[0]+Math.PI*2:e[n+1];r-e[n]>t&&(t=r-e[n],s=(r+e[n])/2)}return Math.atan2(Math.sin(s),Math.cos(s))/Math.PI}function Yi(i,e=!1){const t=kt.map(d=>({x:d.x*(e?-1:1),z:d.z})),s=i.slice(-3).filter(d=>d.hit&&Number.isFinite(d.direction)),n=s.at(-1);if(!n)return{kind:"balanced",label:"Balanced field",hint:"Find a gap. The captain will react to your shots.",positions:t,protectedDirection:null,gapDirection:Ki(t)};const r=s.filter(d=>Wn(d.direction*Math.PI,n.direction*Math.PI)<.34).length>=2,a=n.runs>=4||n.family==="loft",o=r?"trap":a?"boundary":"ring",l=r?[pt(n.direction,a?53:29),pt(n.direction+.1,a?32:47)]:[pt(n.direction,a?48:27)],c=new Set;for(const d of l){const f=t.map((b,m)=>({i:m,d:Math.hypot(b.x-d.x,b.z-d.z)})).filter(b=>b.i!==0&&!c.has(b.i)).sort((b,m)=>b.d-m.d)[0].i;t[f]=d,c.add(f)}for(let d=1;d<t.length;d++)for(let f=1;f<d;f++)Math.hypot(t[d].x-t[f].x,t[d].z-t[f].z)<7&&(t[d]=pt(As(t[d])/Math.PI+.1,Math.hypot(t[d].x,8.55-t[d].z)));let p=0;for(let d=1;d<t.length;d++){const f=t[d];f.x*(e?-1:1)<0&&f.z>8.55&&++p>2&&(f.z=5)}return{kind:o,positions:t,protectedDirection:n.direction,gapDirection:Ki(t),label:r?"Two covering your favourite shot":a?"Boundary rider moved":"Ring fielder moved",hint:r?"Change direction or go over the ring.":a?"A single is on inside the deep fielder.":"Look for the space the fielder left."}}function jn(i,e,t){const s=t.at(-1);if(e===0||!(s!=null&&s.hit))return;const r=Math.abs(s.direction)>.35?.6:.96;let a=e,o=1/0;for(let l=e;l<6;l++){const c=Math.abs(i.deliveries.spec(l).height-r);c<o&&(a=l,o=c)}[i.order[e],i.order[a]]=[i.order[a],i.order[e]]}const k=Object.freeze({overs:2,ballsPerOver:6,balls:12,gravity:9.81,radius:.037,ground:.05,boundaryX:Q.x,boundaryZ:Q.z,contactZ:8.55,window:.264,countdown:5,betweenBalls:5,interval:4,runup:2.4,resultHold:1.9,step:1/120,strokeLead:.36}),q=i=>({...i}),Le=(i,e=0,t=1)=>Math.max(e,Math.min(t,i));class Kn{constructor(e=!0){u(this,"field",new Dn);u(this,"fielding");u(this,"battingLeft",!1);u(this,"target",24);u(this,"overs",2);u(this,"mode","legacy");u(this,"plan",jt());u(this,"tactics",Yi([]));u(this,"challengeSeed",0);u(this,"preparedBall",-1);u(this,"activeOver",0);u(this,"reviewFeed",null);u(this,"deliveries",this.plan[0].deliveries);u(this,"phase","idle");u(this,"time",0);u(this,"phaseTime",0);u(this,"ball",q(Et));u(this,"velocity",{x:0,y:0,z:0});u(this,"shots",[]);u(this,"lastShot",null);u(this,"pauseReason","");u(this,"swingAt",null);u(this,"contactAt",null);u(this,"stroke",null);u(this,"events",[]);u(this,"remainder",0);u(this,"releaseTime",0);u(this,"bounceSent",!1);u(this,"intent",null);u(this,"timingError",0);u(this,"swung",!1);u(this,"powerSampleTime",-1/0);u(this,"groundedAfterHit",!1);u(this,"distance",0);u(this,"origin",q(Et));u(this,"quality",0);u(this,"heldFlightTime",null);u(this,"heldResultTime",null);u(this,"pausedView",null);u(this,"heldCollectionTime",null);u(this,"heldIntervalTime",null);u(this,"missedBowled",!1);u(this,"collectionAge",0);u(this,"lastSwingVerdict","not attempted");this.fielding=e}get balls(){return this.overs*k.ballsPerOver}get won(){return this.mode!=="score"&&this.score>=this.target}configureFormat(e,t){return!["idle","finished"].includes(this.phase)||!["chase","score"].includes(e)||![1,2,5].includes(t)||e==="score"&&t!==2?!1:(this.mode=e,this.overs=t,!0)}get bowlingStyle(){return this.plan[this.activeOver].style}get currentOver(){return this.plan[this.activeOver]}configureChallenge(e,t=this.target){return!["idle","finished"].includes(this.phase)||!Number.isSafeInteger(e)||!Number.isInteger(t)||t<1||t>this.balls*6?!1:(this.target=t,this.challengeSeed=e,this.plan=jt(e,this.overs),this.reviewFeed=null,this.activeOver=0,this.deliveries=this.plan[0].deliveries,this.ball=q(this.deliveries.release),!0)}configureRelease(e,t={}){return!["idle","finished"].includes(this.phase)||![e.x,e.y,e.z].every(Number.isFinite)?!1:(this.reviewFeed=Ii(e,t),this.deliveries=this.reviewFeed,this.ball=q(e),!0)}get keeperCollecting(){return this.viewPhase==="collecting"}get deliveryWicketBroken(){return this.missedBowled}get viewPhase(){var e;return this.phase==="paused"?((e=this.pausedView)==null?void 0:e.phase)??"idle":this.phase}get viewTime(){var e;return this.phase==="paused"?((e=this.pausedView)==null?void 0:e.time)??0:this.phaseTime}get showRunners(){return this.hit&&["flight","result"].includes(this.viewPhase)&&(this.field.runsInProgress||this.field.completed>0)}get score(){return this.shots.reduce((e,t)=>e+t.runs,0)}get shotDistance(){return this.distance}get ballNumber(){return Math.min(this.balls,this.shots.length+1)}get overNumber(){return Math.min(this.overs,Math.floor(this.shots.length/k.ballsPerOver)+1)}get overScore(){return this.plan.map((e,t)=>this.shots.slice(t*k.ballsPerOver,(t+1)*k.ballsPerOver).reduce((s,n)=>s+n.runs,0))}get countdownDuration(){return Math.max(this.shots.length%k.ballsPerOver===0?k.countdown:k.betweenBalls,this.field.setupDuration+.3)}get sweepCueOpen(){return this.phase==="delivery"&&!this.swung&&this.time>=this.contactTime-k.strokeLead-k.window&&this.time<=this.contactTime-.18}get contactTime(){return this.releaseTime+this.deliveries.spec(this.shots.length).contactTime}get sinceRelease(){return this.time-this.releaseTime}get hit(){return this.contactAt!==null}get contactQuality(){return this.quality}get strokeWillHit(){return this.intent!==null}get strokeFamily(){const e=this.stroke,t=["result","interval","finished"].includes(this.viewPhase)?Math.max(0,this.shots.length-1):this.shots.length;return _i(((e==null?void 0:e.direction)??0)*(this.battingLeft?-1:1),this.deliveries.spec(t).height,(e==null?void 0:e.speed)??0,(e==null?void 0:e.lift)??0,e==null?void 0:e.handHeight)}start(){this.shots=[],this.lastShot=null,this.time=0,this.remainder=0,this.plan=jt(this.challengeSeed,this.overs),this.preparedBall=-1,this.events=[],this.prepare()}transition(e){this.phase=e,this.phaseTime=0,e==="windup"&&(this.releaseTime=this.time+k.runup),e==="delivery"&&(this.releaseTime=this.time)}prepare(){this.activeOver=Math.min(this.overs-1,Math.floor(this.shots.length/k.ballsPerOver)),this.preparedBall!==this.shots.length&&(this.tactics=Yi(this.shots,this.battingLeft),this.fielding&&!this.reviewFeed&&jn(this.plan[this.activeOver],this.shots.length%k.ballsPerOver,this.shots),this.preparedBall=this.shots.length),this.deliveries=this.reviewFeed??this.plan[this.activeOver].deliveries,this.field.reset(this.tactics.positions,this.fielding&&this.shots.length>0),this.pausedView=null,this.lastSwingVerdict="not attempted",this.heldCollectionTime=null,this.missedBowled=!1,this.collectionAge=0,this.heldIntervalTime=null,this.heldResultTime=null,this.heldFlightTime=null,this.intent=null,this.swung=!1,this.bounceSent=!1,this.groundedAfterHit=!1,this.quality=0,this.distance=0,this.swingAt=null,this.contactAt=null,this.stroke=null,this.ball=q(this.deliveries.release),this.pauseReason="",this.transition("countdown"),this.releaseTime=this.time+this.countdownDuration+k.runup}pause(e){["countdown","windup","delivery","collecting","flight","result","interval"].includes(this.phase)&&(this.pausedView={phase:this.phase,time:this.phaseTime},this.phase==="interval"&&(this.heldIntervalTime=this.phaseTime,e="Over "+(this.activeOver+1)+" saved. "+(this.balls-this.shots.length)+" balls remain."),this.phase==="result"&&(this.heldResultTime=this.phaseTime,e="Your result is saved. Continue when you are ready."),this.phase==="collecting"&&(this.heldCollectionTime=this.phaseTime,e="The ball is safely paused. Continue watching its result when you are ready."),this.phase==="flight"&&(this.heldFlightTime=this.phaseTime,e="Your shot is saved. Play resumes when the camera sees you again."),this.pauseReason=e,this.transition("paused"),this.remainder=0,this.events.push({type:"pause",reason:e}))}resume(){this.phase==="paused"&&(this.heldIntervalTime!==null?(this.phase="interval",this.phaseTime=this.heldIntervalTime,this.heldIntervalTime=null):this.heldCollectionTime!==null?(this.phase="collecting",this.phaseTime=this.heldCollectionTime,this.heldCollectionTime=null):this.heldResultTime!==null?(this.phase="result",this.phaseTime=this.heldResultTime,this.heldResultTime=null):this.heldFlightTime!==null?(this.phase="flight",this.phaseTime=this.heldFlightTime,this.heldFlightTime=null,this.pauseReason=""):this.prepare())}swing(e,t=this.time,s=t){const n=r=>(this.lastSwingVerdict=r,!1);return["windup","delivery"].includes(this.phase)?this.swung?n("already attempted"):[e.speed,e.lift,e.direction,t,s].every(Number.isFinite)?t>this.time+.025||this.time-t>.22?n("stale capture"):s>t+.001||t-s>.25?n("invalid swing onset"):(this.timingError=s+k.strokeLead-this.contactTime,this.timingError<-k.window?n("too early"):(this.swung=!0,this.swingAt=this.time,this.stroke={speed:Le(e.speed,0,8),lift:Le(e.lift),direction:Le(e.direction,-1,1),handHeight:Number.isFinite(e.handHeight)?e.handHeight:void 0},this.time>this.contactTime-.06?(this.timingError=k.window+.01,n("arrived after downswing deadline")):Math.abs(this.timingError)>k.window?n(this.timingError<0?"too early":"too late"):(this.intent=this.stroke,this.powerSampleTime=t,this.lastSwingVerdict="accepted",!0))):n("invalid input"):n("outside delivery")}refineSwingPower(e,t){if(this.phase!=="delivery"||!this.intent||this.swingAt===null||!Number.isFinite(e)||!Number.isFinite(t)||this.time-this.swingAt>.16||this.time>this.contactTime-.08||t<=this.powerSampleTime||t>this.time+.025||this.time-t>.22)return!1;this.powerSampleTime=t;const s=this.intent.speed<1.6&&this.intent.lift<.4?1.59:8,n=Math.max(this.intent.speed,Math.min(s,e));return n===this.intent.speed?!1:(this.intent.speed=n,!0)}refineSwing(e,t){if(![e.speed,e.lift,e.direction,t].every(Number.isFinite)||this.phase!=="delivery"||!this.intent||this.swingAt===null||this.time-this.swingAt>.16||this.time>this.contactTime-.08||t<=this.powerSampleTime||t>this.time+.025||this.time-t>.22)return!1;const s=this.time-this.swingAt<=.12&&this.time<=this.contactTime-.1,n=this.refineSwingPower(e.speed,t);if(!s)return n;const r=Le(e.direction,-1,1),a=Le(e.lift);return Math.abs(r-this.intent.direction)<.008&&Math.abs(a-this.intent.lift)<.015?n:(this.stroke={...this.intent,direction:r,lift:a,handHeight:Number.isFinite(e.handHeight)?e.handHeight:this.intent.handHeight},this.intent=this.stroke,!0)}advance(e){if(!(!Number.isFinite(e)||e<=0)){e=Math.min(e,.1);if(!(this.phase==="idle"||this.phase==="paused"||this.phase==="finished")){for(this.remainder+=e;this.remainder+1e-10>=k.step;)if(this.remainder-=k.step,this.time+=k.step,this.phaseTime+=k.step,this.step(k.step),this.phase==="finished"){this.remainder=0;break}}}}drainEvents(){const e=this.events;return this.events=[],e}step(e){if(this.phase==="countdown"&&this.field.arrange(e),this.phase==="countdown"&&this.phaseTime>=this.countdownDuration-1e-8?this.transition("windup"):this.phase==="windup"&&this.phaseTime>=k.runup-1e-8)this.releaseTime=this.time,this.transition("delivery"),this.events.push({type:"release"});else if(this.phase==="delivery"){const t=this.deliveries.spec(this.shots.length);this.ball=this.deliveries.position(this.shots.length,this.phaseTime),!this.bounceSent&&this.phaseTime>=t.bounceTime&&(this.bounceSent=!0,this.events.push({type:"bounce",position:this.deliveries.position(this.shots.length,t.bounceTime),pitch:!0})),this.intent&&this.phaseTime>=t.contactTime?this.strike():!this.intent&&this.phaseTime>=t.contactTime&&(this.transition("collecting"),this.collectionAge=t.contactTime)}else if(this.phase==="collecting"){const t=this.shots.length,s=this.collectionAge;this.collectionAge+=e;const n=this.deliveries.timeAtZ(t,10.06),r=this.deliveries.timeAtZ(t,12.45);if(s<=n&&this.collectionAge>=n){const o=this.deliveries.position(t,n);this.missedBowled=Math.abs(o.x)<=.1143+k.radius&&o.y<=.711+k.radius,this.missedBowled&&(this.ball=o,this.events.push({type:"wicket",position:q(o)}))}this.missedBowled||(this.ball=this.deliveries.position(t,Math.min(this.collectionAge,r)));const a=this.missedBowled?n:r;this.collectionAge>=a+.32&&this.finish(0,!1,this.missedBowled?"bowled":null)}else if(this.phase==="flight")this.fly(e);else if(this.phase==="interval"&&this.phaseTime>=k.interval)this.prepare();else if(this.phase==="result"&&this.phaseTime>=k.resultHold)if(this.shots.length>=this.balls||this.mode==="chase"&&this.won)this.transition("finished"),this.events.push({type:"complete",score:this.score});else if(this.shots.length%k.ballsPerOver===0){const t=this.shots.length/k.ballsPerOver;this.transition("interval"),this.events.push({type:"over",over:t,runs:this.overScore[t-1]})}else this.prepare()}strike(){if(!this.intent)return;const e=1-Math.abs(this.timingError)/k.window;this.quality=Le(e),this.ball=this.deliveries.position(this.shots.length,this.deliveries.spec(this.shots.length).contactTime),this.origin=q(this.ball),this.contactAt=this.time,this.velocity=Fn(this.intent.speed,this.intent.lift,this.intent.direction,this.quality,this.strokeFamily),this.fielding&&this.field.plan(Nn(this.ball,this.velocity)),this.transition("flight"),this.events.push({type:"contact",position:q(this.ball),direction:q(this.velocity),quality:this.quality})}fly(e){const t=this.field.action;if(this.fielding&&this.field.returning){const a=this.field.step(e,this.phaseTime,this.ball,this.velocity,this.groundedAfterHit);this.field.action!==t&&(this.field.action==="throw"||this.field.action==="receive")&&this.events.push({type:"field",action:this.field.action,position:q(this.ball)}),a&&this.finish(a.runs,!0,a.dismissal);return}const s=q(this.ball),n=ks(this,e);this.distance=Math.max(this.distance,Math.hypot(this.ball.x-this.origin.x,this.ball.z-this.origin.z));const r=Ln(s,this.ball,n,this.groundedAfterHit);if(r){Object.assign(this.ball,r.position),this.finish(r.runs,!0);return}if(n&&(this.groundedAfterHit=!0,this.events.push({type:"bounce",position:n,pitch:Math.abs(n.x)<1.5&&Math.abs(n.z)<12})),this.fielding){const a=this.field.step(e,this.phaseTime,this.ball,this.velocity,this.groundedAfterHit,s);if(this.field.action!==t&&["block","pickup","caught"].includes(this.field.action)&&this.events.push({type:"field",action:this.field.action,position:q(this.ball)}),a){this.finish(a.runs,!0,a.dismissal);return}}!this.fielding&&(this.phaseTime>10||this.groundedAfterHit&&Math.hypot(this.velocity.x,this.velocity.z)<2)&&this.finish(0,!0)}finish(e,t,s=null){var o,l,c;s==="run out"&&this.events.push({type:"wicket",position:{x:0,y:.711,z:this.field.receiverZ}});const n=t?this.quality>.72?"Sweet spot":this.timingError<0?"A little early":"A little late":this.swung?this.timingError<0?"Too early":"Too late":"No swing detected",r={runs:e,distance:t?this.distance:0,hit:t,timing:n,quality:this.quality,direction:((o=this.stroke)==null?void 0:o.direction)??0,family:this.strokeFamily,loft:((l=this.stroke)==null?void 0:l.lift)??0,speed:((c=this.stroke)==null?void 0:c.speed)??0,dismissal:s},a=this.score;this.lastShot=r,this.shots.push(r),this.transition("result"),this.events.push({type:"result",shot:r}),a<this.target&&this.score>=this.target&&this.events.push({type:"target",score:this.score,ballsLeft:this.balls-this.shots.length})}}const et=(i,e,t)=>Math.max(e,Math.min(t,i));function Cs(i,e,t=null){if(![i,e].every(Number.isFinite)||Math.hypot(i,e)<1e-6)return{direction:0,lift:t===null?0:et(t,0,.8)};const s=-e/Math.hypot(i,e),n=Math.abs(i),r=Math.abs(e),a=et((n/(n+r)-.5)/.25,0,1);return{direction:Math.atan2(i,-e*(1-.68*a))/Math.PI,lift:t===null?.8*et((s-.07)/.25,0,1):et(t,0,.8)}}function Xi(i,e,t=null){const s=Cs(i,e,t);if(e>0&&[i,e].every(Number.isFinite)&&Math.hypot(i,e)>=1e-6){const n=Math.max(0,e-2*Math.abs(i));s.direction=Math.atan2(i,n)/Math.PI}return s}function Yn(i,e,t,s,n=null){if(![i,e,t,s].every(Number.isFinite)||t<=0||s<=0)return null;const r=Math.hypot(i,e),a=Math.min(t,s);return r<Math.max(12,a*.035)?null:{...Cs(i,e,n),speed:1.6+3.4*et(r/(a*.32),0,1),handHeight:.8}}const Xn=(i,e,t)=>Math.max(e,Math.min(t,i));class Jn{constructor(){u(this,"lift",null);u(this,"wrists",[{previous:null,motion:null},{previous:null,motion:null}]);u(this,"shoulderMask",0);u(this,"scale",0);u(this,"lastTimestamp",-1/0);u(this,"lastSwing",-1/0);u(this,"lastDirection",0);u(this,"activeSignal",null)}reset(){this.lastTimestamp=-1/0,this.lastSwing=-1/0,this.lastDirection=0,this.scale=0,this.clearMotion()}clearMotion(){this.activeSignal=null,this.wrists=[{previous:null,motion:null},{previous:null,motion:null}],this.shoulderMask=0}sample(e,t,s=4/3,n=!0){var b;const r={valid:!1,message:"Show your upper body and at least one hand.",handX:0,handY:0,direction:this.lastDirection,signal:null,refinement:null};if(Number.isFinite(t)&&t<=this.lastTimestamp)return r.message="Waiting for a fresh camera frame.",r;if(Number.isFinite(t)&&(this.lastTimestamp=t),!Number.isFinite(t)||!Number.isFinite(s)||s<=0||!e)return this.clearMotion(),r;const a=m=>e[m]&&[e[m].x,e[m].y].every(Number.isFinite)&&(e[m].visibility??0)>=.55&&(e[m].presence??1)>=.5&&e[m].x>=0&&e[m].x<=1&&e[m].y>=0&&e[m].y<=1,o=(a(11)?1:0)|(a(12)?2:0);if(!o||!a(15)&&!a(16))return this.clearMotion(),r;o!==this.shoulderMask&&this.clearMotion(),this.shoulderMask=o;const l=[11,12].filter(a),c=l.reduce((m,y)=>m+e[y].x,0)/l.length,p=l.reduce((m,y)=>m+e[y].y,0)/l.length;if(o===3){const m=e[11],y=e[12],_=Number.isFinite(m.z)&&Number.isFinite(y.z)?(m.z-y.z)*s:0,I=Xn(Math.hypot((m.x-y.x)*s,m.y-y.y,_),.12,.8);this.scale=this.scale?this.scale*.9+I*.1:I}else this.scale||(this.scale=.24);r.valid=!0,r.message="Tracking your swing. Move freely.";let d=-1;const f=[];for(let m=0;m<2;m++){const y=this.wrists[m],_=15+m;if(!a(_)){y.previous=null,y.motion=null;continue}const I={x:-(e[_].x-c)*s,y:e[_].y-p,time:t},L=y.previous;y.previous=I;const te=L?(t-L.time)/1e3:0,ae=L?(I.x-L.x)/this.scale:0,pe=L?(I.y-L.y)/this.scale:0,ge=Math.hypot(ae,pe),oe=te>0?ge/te:0;if(oe>d&&(d=oe,r.handX=I.x/this.scale,r.handY=I.y/this.scale),!L||te<=0||te>.22||ge>2.5||oe>35||!n){y.motion=null;continue}const V=y.motion,En=(V==null?void 0:V.emitted)&&((b=this.activeSignal)==null?void 0:b.hand)===(m===0?"left":"right")&&t-this.activeSignal.timestamp<=160&&pe<0&&ae*V.dx>=0&&Math.abs(V.dx)>.1;if(V&&!En&&ge>.015&&ae*V.dx+pe*V.dy<.25*ge*Math.hypot(V.dx,V.dy)&&(y.motion=null),oe<.65){y.motion=null;continue}if(!y.motion){if(oe<1.05)continue;y.motion={dx:0,dy:0,duration:0,onset:L.time,peak:0,travel:0,emitted:!1,recent:[]}}const R=y.motion;R.dx+=ae,R.dy+=pe,R.duration+=te,R.peak=Math.max(R.peak,oe),R.travel+=ge,R.recent.push({dx:ae,dy:pe,dt:te});let Vt=R.recent.reduce((Ae,Qe)=>Ae+Qe.dt,0);for(;R.recent.length>2&&Vt-R.recent[0].dt>=.08;)Vt-=R.recent.shift().dt;const ut=Xi(R.dx,R.dy,this.lift),An=R.recent.reduce((Ae,Qe)=>Ae+Qe.dx,0),$i=R.recent.reduce((Ae,Qe)=>Ae+Qe.dy,0);this.lift===null&&R.recent.length>=2&&Vt>=.045&&$i<-.045&&R.recent.filter(Ae=>Ae.dy<0).length>=2&&(ut.lift=Math.max(ut.lift,Xi(An,$i).lift));const qt=.75*R.peak+.25*R.travel/R.duration,Ne=this.activeSignal,Cn=m===0?"left":"right";R.emitted&&Ne&&Ne.hand===Cn&&R.onset===Ne.onsetTimestamp&&t-Ne.timestamp<=160&&(r.refinement={...Ne,...ut,timestamp:t,speed:qt,handHeight:I.y/this.scale},Ne.speed=qt,this.lastDirection=r.refinement.direction),!R.emitted&&R.duration>=.045&&Math.hypot(R.dx,R.dy)>=.15&&f.push({timestamp:t,onsetTimestamp:Math.max(t-220,R.onset),speed:qt,...ut,hand:m===0?"left":"right",handHeight:I.y/this.scale})}if(f.length){const m=f.sort((y,_)=>_.speed-y.speed)[0];for(const y of this.wrists)y.motion&&(y.motion.emitted=!0);t-this.lastSwing>=120&&(r.signal=m,this.activeSignal={...m},this.lastSwing=t,this.lastDirection=m.direction)}return r.direction=this.lastDirection,r}}function Ct(i){const b=window.location.pathname.replace(/[^\/]*$/,"");return b+i.replace(/^\/+/,"")}function Zn(i){if(i instanceof DOMException){if(i.name==="NotAllowedError")return"Camera permission was blocked. Allow camera access in your browser and try again.";if(i.name==="NotFoundError")return"No camera was found. Connect a webcam and try again.";if(i.name==="NotReadableError")return"The camera is busy. Close other camera apps and try again."}return i instanceof Error?i.message:"Camera could not start. Try again."}class Qn{constructor(e,t){u(this,"worker",null);u(this,"stream",null);u(this,"generation",0);u(this,"busy",!1);u(this,"ready",!1);u(this,"cpuFallbackUsed",!1);u(this,"framesReceived",0);u(this,"frame",0);u(this,"lastVideoTime",-1);u(this,"sentAt",0);u(this,"timer",0);u(this,"deadline",0);u(this,"rejectStart",null);u(this,"video");u(this,"callbacks");this.video=e,this.callbacks=t}get running(){return this.ready}get starting(){return this.worker!==null&&!this.ready}async start(){var t,s;this.stop();const e=++this.generation;if(this.cpuFallbackUsed=!1,this.framesReceived=0,!((t=navigator.mediaDevices)!=null&&t.getUserMedia))throw new Error("Open on localhost or HTTPS to enable the camera.");try{const n=await navigator.mediaDevices.getUserMedia({audio:!1,video:{facingMode:"user",width:{ideal:640},height:{ideal:480},frameRate:{ideal:30,max:30}}});if(e!==this.generation){n.getTracks().forEach(a=>a.stop());return}if(this.stream=n,this.video.srcObject=n,(s=n.getVideoTracks()[0])==null||s.addEventListener("ended",()=>this.fail("Camera disconnected. Reconnect it and enable the camera again."),{once:!0}),await this.video.play(),e!==this.generation)return;const r=new Worker(Ct("cricket-pose-worker.js"));this.worker=r,this.deadline=performance.now()+18e4,await new Promise((a,o)=>{this.rejectStart=o,this.armStartupTimeout("download"),r.onerror=()=>this.fail("Camera tracking could not start in this browser. Try a current Chrome or Safari browser."),r.onmessage=l=>{const{data:c}=l;if(!(e!==this.generation||l.target&&l.target!==this.worker)){if(c.type==="progress"&&(this.callbacks.status(c.message),this.ready||this.armStartupTimeout(c.stage)),c.type==="ready"){if(this.ready)return;clearTimeout(this.timer),this.rejectStart=null,this.ready=!0,this.callbacks.status("Camera ready. Show your upper body and either hand."),a(),this.pump(e)}else if(c.type==="error")this.fail(c.message||"Camera tracking stopped. Enable the camera again.");else if(c.type==="pose"){this.busy=!1,this.framesReceived++;const d=performance.now()-c.timestamp<=220?c.landmarks:null;this.callbacks.pose(d,c.timestamp)}}},r.postMessage({type:"init"})})}catch(n){throw e===this.generation&&this.stop(),n}}armStartupTimeout(e){clearTimeout(this.timer);const t=this.deadline-performance.now();if(t<=0){this.fail("Camera tracking took too long. Enable the camera again.");return}const s=Math.min(t,e==="GPU"?8e3:e==="CPU"?3e4:45e3);this.timer=window.setTimeout(()=>{e==="GPU"&&!this.cpuFallbackUsed&&performance.now()<this.deadline?this.restartOnCPU():this.fail("Camera tracking stopped responding. Enable the camera again to retry.")},s)}pump(e){if(e!==this.generation||!this.ready||(this.frame=requestAnimationFrame(()=>this.pump(e)),document.hidden))return;const t=performance.now();if(this.busy&&t-this.sentAt>(this.framesReceived?2e3:4e3)){this.cpuFallbackUsed?this.fail("Camera tracking stalled. Enable the camera again."):this.restartOnCPU();return}if(this.busy||this.video.readyState<2||this.video.currentTime===this.lastVideoTime)return;const s=this.worker;s&&(this.busy=!0,this.sentAt=t,this.lastVideoTime=this.video.currentTime,createImageBitmap(this.video).then(n=>{if(e!==this.generation||this.worker!==s||!this.ready){n.close();return}s.postMessage({type:"frame",bitmap:n,timestamp:t},[n])}).catch(()=>{e===this.generation&&this.fail("Could not read a camera frame. Enable the camera again.")}))}restartOnCPU(){const e=this.worker;if(!e)return;const t=e.onmessage,s=e.onerror;e.onmessage=null,e.onerror=null,e.terminate(),cancelAnimationFrame(this.frame),clearTimeout(this.timer),this.cpuFallbackUsed=!0,this.framesReceived=0,this.busy=!1,this.ready=!1;const n=new Worker(Ct("cricket-pose-worker.js"));this.worker=n,n.onmessage=t,n.onerror=s,this.callbacks.status("Recovering camera tracking…"),this.rejectStart||(this.deadline=performance.now()+9e4),this.armStartupTimeout("download"),n.postMessage({type:"init",cpuOnly:!0})}fail(e){const t=this.rejectStart;this.rejectStart=null,this.stop(),this.callbacks.error(e),t==null||t(new Error(e))}stop(){var t,s;this.generation++,clearTimeout(this.timer),cancelAnimationFrame(this.frame);const e=this.rejectStart;this.rejectStart=null,e==null||e(new Error("Camera startup cancelled.")),(t=this.worker)==null||t.terminate(),this.worker=null,(s=this.stream)==null||s.getTracks().forEach(n=>n.stop()),this.stream=null,this.video.srcObject=null,this.ready=!1,this.busy=!1,this.lastVideoTime=-1}}function er(i,e=!1){const t=i*180,s=Math.abs(t),n=t>0?"right":"left",r=t>0!==e;return s<22.5?"Straight":s>157.5?"Behind the wicket":s<67.5?r?"Cover · "+n:"Midwicket · "+n:s<112.5?r?"Point · "+n:"Square leg · "+n:r?"Third man · "+n:"Fine leg · "+n}class tr{constructor(e){u(this,"context");u(this,"path",[]);u(this,"attempt",null);u(this,"canvas");this.canvas=e,this.context=e.getContext("2d")}draw(e,t){const s=this.context,n=this.canvas.width,r=this.canvas.height,a=n/2,o=r/2,l=n*.4,c=f=>a+f/73*l,p=f=>o+f/73*l;s.clearRect(0,0,n,r),s.lineWidth=1.5,s.fillStyle="#233925",s.strokeStyle="#809469",s.beginPath(),s.ellipse(a,o,l*67/73,l,0,0,Math.PI*2),s.fill(),s.stroke(),s.strokeStyle="#72895766",s.setLineDash([3,4]),s.beginPath(),s.arc(a,o,l*.42,0,Math.PI*2),s.stroke(),s.setLineDash([]),s.fillStyle="#b7a577",s.fillRect(a-3,p(-10),6,p(10)-p(-10)),e.viewPhase==="countdown"&&e.field.setting&&(s.strokeStyle="#ddad45",s.lineWidth=1,s.setLineDash([2,3]),e.field.formation.forEach((f,b)=>{const m=e.field.fielders[b];Math.hypot(m.x-f.x,m.z-f.z)<.4||(s.beginPath(),s.moveTo(c(m.x),p(m.z)),s.lineTo(c(f.x),p(f.z)),s.stroke(),s.beginPath(),s.arc(c(f.x),p(f.z),4.5,0,Math.PI*2),s.stroke())}),s.setLineDash([])),s.fillStyle="#ddad45";for(const f of e.field.fielders)s.beginPath(),s.arc(c(f.x),p(f.z),3,0,Math.PI*2),s.fill();const d=e.stroke;if((this.attempt!==d||e.phase==="countdown")&&(this.path=[],this.attempt=d),e.phase==="flight"&&!e.field.returning){const f=this.path.at(-1);(!f||Math.hypot(f.x-e.ball.x,f.z-e.ball.z)>1)&&(this.path.push({x:e.ball.x,z:e.ball.z}),this.path.length>180&&this.path.shift())}if(this.path.length&&(s.strokeStyle="#f4f5df",s.beginPath(),this.path.forEach((f,b)=>b?s.lineTo(c(f.x),p(f.z)):s.moveTo(c(f.x),p(f.z))),s.stroke()),e.viewPhase==="flight"){s.fillStyle="#fff",s.beginPath(),s.arc(c(e.ball.x),p(e.ball.z),3.5,0,Math.PI*2),s.fill(),s.fillStyle="#c4ff36";for(const f of[-1,1])s.beginPath(),s.arc(a+f*5,p(f*e.field.runnerZ),2.5,0,Math.PI*2),s.fill()}else if(!["result","finished"].includes(e.viewPhase)){const f=t*Math.PI,b=Math.sin(f)*l*.7,m=-Math.cos(f)*l*.7;s.save(),s.translate(a,p(8.55)),s.strokeStyle="#c4ff36",s.fillStyle="#c4ff36",s.lineWidth=2,s.beginPath(),s.moveTo(0,0),s.lineTo(b,m),s.stroke(),s.translate(b,m),s.rotate(f),s.beginPath(),s.moveTo(0,-5),s.lineTo(-4,4),s.lineTo(4,4),s.closePath(),s.fill(),s.restore()}}}const ir=1800,Ji=(i,e)=>{!Number.isFinite(e)||e<0||(i.length===ir&&i.shift(),i.push(e))};function Zi(i){const e=[...i].sort((s,n)=>s-n),t=s=>e.length?e[Math.ceil(e.length*s)-1]:null;return{samples:e.length,median:t(.5),p95:t(.95),max:e.at(-1)??null}}class sr{constructor(){u(this,"enabled",!1);u(this,"started",0);u(this,"entries",[]);u(this,"frames",[]);u(this,"latencies",[]);u(this,"counts",{})}setEnabled(e,t){this.enabled=e,e&&(this.started=t,this.entries=[],this.frames=[],this.latencies=[],this.counts={},this.record("recording started",t))}record(e,t,s={}){if(!this.enabled||!Number.isFinite(t))return;this.counts[e]=(this.counts[e]??0)+1,this.entries.length===600&&this.entries.shift();const n=Object.fromEntries(Object.entries(s).filter(([,r])=>r===null||typeof r=="boolean"||typeof r=="string"||typeof r=="number"&&Number.isFinite(r)));this.entries.push({elapsedMs:Math.round(t-this.started),event:e,values:n})}frame(e){this.enabled&&Ji(this.frames,e)}pose(e,t){this.enabled&&Ji(this.latencies,t-e)}report(){return{version:1,scope:"Local playtest measurements; recent bounded samples, not a benchmark or video recording",counts:{...this.counts},frameMs:Zi(this.frames),captureToResultMs:Zi(this.latencies),events:this.entries.map(e=>({...e,values:{...e.values}}))}}}const yt=i=>(i=Math.max(0,Math.min(1,i)),i*i*(3-2*i)),Rs=2.3;function hl(i,e,t=!0){const s=i.completed%2===e?Math.PI:0,n=i.completed>0&&!i.runsInProgress,r=yt(i.turnProgress),a=s+(i.retreating?Math.PI:n?Math.PI*(1-r):0),o=i.retreating?1-i.progress:i.progress,l=i.runsInProgress?yt((o-.87)/.13):n?1-yt(i.turnProgress/.6):0;return{x:e?-.9:.9,z:i.runnerZ*(e?-1:1),facing:a,stride:(i.completed+i.progress)*2*F.crease/Rs*Math.PI*2+e*.22,moving:t&&i.runsInProgress,slide:l,turning:n}}function dl(i){const e=(i/(Math.PI*2)%1+1)%1;return e<.5?{z:.575-2.3*e,y:.095}:{z:-.575+1.15*yt((e-.5)*2),y:.095+.28*Math.sin((e-.5)*2*Math.PI)}}function nr(i){return i.type==="contact"?i.quality<.45?"edge":i.direction&&Math.hypot(i.direction.x,i.direction.y,i.direction.z)<18?"tap":"bat":i.type==="bounce"?i.pitch?"pitch":"grass":i.type==="wicket"?"stumps":i.type==="field"?i.action==="pickup"||i.action==="receive"?"gather":i.action==="caught"?"catch":i.action==="block"?"block":"throw":i.type==="over"||i.type==="complete"?i.type:i.type==="result"?i.shot.runs===6?"six":i.shot.runs===4?"four":null:null}function Qi(i,e=48e3){const t={bat:.16,tap:.12,edge:.12,pitch:.1,grass:.09,stumps:.33,gather:.12,block:.14,throw:.2,catch:.24,step:.11,slide:.22,four:1.05,six:1.35,over:.48,complete:1.6},s=Math.ceil(t[i]*e),n=new Float32Array(s);let r=991,a=0;const o=(l,c,p,d,f)=>{const b=l-p;return b<0?0:f*Math.sin(2*Math.PI*c*b)*Math.min(1,b/.004)*Math.exp(-b/d)};for(let l=0;l<s;l++){const c=l/e;r=Math.imul(r,1664525)+1013904223>>>0;const p=r/2147483648-1;a+=.16*(p-a);const d=p-a;let f=0;if(i==="bat")f=.22*d*Math.exp(-c/.007)+o(c,235,0,.022,.17)+o(c,710,0,.011,.11)+o(c,1480,0,.008,.04);else if(i==="tap")f=.09*d*Math.exp(-c/.006)+o(c,210,0,.018,.09)+o(c,590,0,.009,.04);else if(i==="edge")f=.19*d*Math.exp(-c/.004)+o(c,1150,0,.012,.08)+o(c,2250,0,.006,.05);else if(i==="pitch"||i==="grass")f=o(c,i==="pitch"?170:95,0,.018,.12)+.1*a*Math.exp(-c/.015);else if(i==="stumps")for(const m of[0,.065,.14])f+=o(c,440,m,.028,.13)+o(c,840,m,.018,.07)+(c>=m?.13*d*Math.exp(-(c-m)/.009):0);else if(i==="step")f=.13*a*Math.exp(-c/.018)+o(c,83,0,.025,.12);else if(i==="slide")f=.14*d*Math.sin(Math.PI*c/t[i])**2*Math.exp(-c/.13);else if(i==="throw")f=.13*d*Math.sin(Math.PI*c/t[i])**3;else if(i==="gather"||i==="catch"||i==="block")f=(i==="block"?.26:.16)*a*Math.exp(-c/.024)+o(c,125,0,.03,.08);else{const m=i==="complete",y=i==="four"||i==="six";if((m?[392,494,587,784]:i==="six"?[392,523,784]:i==="four"?[392,523]:[392,494]).forEach((I,L)=>{f+=o(c,I,L*.12,m?.25:.12,.05)}),y||m){const I=Math.min(1,c/.15)*Math.max(0,1-c/t[i])**1.5;f+=.075*d*I*(.45+.55*Math.sin(c*91)**6)+.06*a*I}}const b=Math.min(1,l/Math.max(1,e*.001),(s-1-l)/Math.max(1,e*.012));n[l]=Math.max(-.75,Math.min(.75,f))*b}return n}function rr(i){const e="position"in i?i.position:null,t=e?Math.hypot(e.x,e.y-1,e.z-8.55):0;return{pan:e?Math.max(-.85,Math.min(.85,e.x/45)):0,gain:Math.max(.28,1/(1+t*.035))}}const ar=["applause","cheer","crowd-bed","cheer-four","roar-six","fireworks","celebrate-horns","ooh","groan","sigh","catch","willow-1","willow-2","willow-3","crack-1","crack-2"];class or{constructor(e){u(this,"context");u(this,"master");u(this,"buffers",new Map);u(this,"crowds",new Map);u(this,"voices",new Map);u(this,"enabled",!0);u(this,"disposed",!1);u(this,"loaded",!1);u(this,"variation",0);u(this,"ducked",!1);u(this,"heat",0);u(this,"runningStep",-1);u(this,"completedRuns",0);u(this,"bed",null);u(this,"bedWanted",!1);u(this,"bedGain");this.context=e,this.master=e.createGain(),this.master.gain.value=.65,this.master.connect(e.destination),this.bedGain=e.createGain(),this.bedGain.gain.value=0,this.bedGain.connect(this.master)}get audioContext(){return this.context}setEnabled(e){this.enabled=e,this.setDucked(this.ducked),e||this.stop()}setDucked(e){this.ducked=e,this.master.gain.value=this.enabled?e?.24:.65:0}stop(){this.bedWanted=!1,this.stopVoices(),this.bedTo(0,.03),this.bed&&(this.bed.stop(),this.bed.disconnect(),this.bed=null)}stopVoices(){for(const[e,t]of this.voices)e.stop(),t();this.voices.clear()}beginMatch(e=!0){e&&(this.heat=0),this.bedWanted=!0;const t=this.crowds.get("crowd-bed");t&&this.startBed(t)}prepareDelivery(){this.stopVoices(),this.bedTo(this.bedLevel()*.55,.2)}async resume(){!this.enabled||this.disposed||(await this.context.resume(),!this.loaded&&(this.loaded=!0,Promise.allSettled(ar.map(async e=>{const t=await fetch(Ct("sounds/"+e+".mp3"));if(!t.ok)return;const s=await this.context.decodeAudioData(await t.arrayBuffer());this.disposed||(this.crowds.set(e,s),e==="crowd-bed"&&this.bedWanted&&this.startBed(s))}))))}play(e){if(!this.enabled||this.disposed||this.context.state!=="running")return;if(e.type==="pause"){this.stop();return}const t=nr(e);if(t){let s=this.buffers.get(t);if(!s){const l=Qi(t,this.context.sampleRate);s=this.context.createBuffer(1,l.length,this.context.sampleRate),s.getChannelData(0).set(l),this.buffers.set(t,s)}const n=rr(e),r=["four","six","over","complete"].includes(t),a=r?1:1+(this.variation++%5-2)*.017,o=n.gain*(r?.5:e.type==="contact"?.7+.3*e.quality:1);this.voice(s,o,n.pan,a),e.type==="contact"&&e.quality>=.45&&(this.sample("willow-"+(1+this.variation%3),(.45+.45*e.quality)*n.gain,n.pan,a),e.quality>.72&&this.sample("crack-"+(1+this.variation%2),.4*e.quality*n.gain,n.pan,a))}this.react(e)}running(e){if(e.phase==="paused")return;if(!e.showRunners||e.viewPhase!=="flight"){this.runningStep=-1,this.completedRuns=0;return}const t=Math.floor((e.field.completed+e.field.progress)*2*F.crease/Rs*2),s=e.field.completed>this.completedRuns,n=e.field.runsInProgress&&t!==this.runningStep&&this.runningStep>=0;if(this.runningStep=t,this.completedRuns=e.field.completed,!s&&!n||!this.enabled||this.disposed||this.context.state!=="running")return;const r=s?"slide":"step";let a=this.buffers.get(r);if(!a){const o=Qi(r,this.context.sampleRate);a=this.context.createBuffer(1,o.length,this.context.sampleRate),a.getChannelData(0).set(o),this.buffers.set(r,a)}this.voice(a,s?.15:.12,t%2?.1:-.1,1)}react(e){const t=this.context.currentTime;if(e.type==="release"){this.bedTo(this.bedLevel()*.55,.2);return}if(e.type==="field"&&e.action==="caught"){this.sample("catch",.6,0,1);return}if(e.type==="complete"){this.sample("cheer",.48,0,1),this.bedWanted=!1,this.bedTo(0,1.2);return}if(e.type!=="result")return;const s=e.shot;let n=.3;s.dismissal==="bowled"?(this.sample("sigh",.5,0,1),n=1.8,this.heat=Math.max(0,this.heat-.15),this.bedTo(.008,.06)):s.dismissal?(this.sample("groan",.55,0,1),n=1.2,this.heat=Math.max(0,this.heat-.15),this.bedTo(.02,.1)):s.runs===6?(this.sample("roar-six",.75,0,1),this.sample("fireworks",.45,0,1),this.sample("celebrate-horns",.32,0,1),this.heat=Math.min(1,this.heat+.35),n=2.5):s.runs===4?(this.sample("cheer-four",.6,0,1),this.heat=Math.min(1,this.heat+.2),n=1.5):s.runs>0?this.sample("applause",.18,0,1):(s.timing!=="No swing detected"&&(!s.hit||s.quality<.45)&&this.sample("ooh",.45,0,1),this.heat=Math.max(0,this.heat-.05)),this.bedTo(this.bedLevel(),.5,t+n)}bedLevel(){return .1+.14*this.heat}bedTo(e,t,s=this.context.currentTime){const n=this.bedGain.gain;s<=this.context.currentTime&&n.cancelScheduledValues(s),n.setTargetAtTime(e,s,t/3)}startBed(e){if(!this.enabled||!this.bedWanted||this.disposed||this.context.state!=="running")return;if(this.bed){this.bedTo(this.bedLevel(),.3);return}const t=this.context.createBufferSource();t.buffer=e,t.loop=!0,t.connect(this.bedGain),t.start(),this.bed=t,this.bedTo(this.bedLevel(),1.5)}sample(e,t,s,n){const r=this.crowds.get(e);r&&this.voice(r,t,s,n)}voice(e,t,s,n){var c,p;if(this.voices.size>=6){const[d,f]=this.voices.entries().next().value;d.stop(),f()}const r=this.context.createBufferSource(),a=this.context.createGain(),o=(p=(c=this.context).createStereoPanner)==null?void 0:p.call(c);r.buffer=e,a.gain.value=t,r.playbackRate&&(r.playbackRate.value=n),r.connect(a),o?(o.pan.value=s,a.connect(o),o.connect(this.master)):a.connect(this.master);const l=()=>{r.disconnect(),a.disconnect(),o==null||o.disconnect(),this.voices.delete(r)};this.voices.set(r,l),r.onended=l,r.start()}dispose(){var e;this.disposed=!0,this.stop();try{(e=this.bed)==null||e.stop()}catch{}this.buffers.clear(),this.crowds.clear(),this.master.disconnect(),this.context.close()}}class cr{constructor(e){u(this,"lastCompleted",0);u(this,"document");this.document=e}update(e){const t=c=>this.document.getElementById(c),s=e.phase==="flight"&&e.hit&&e.phaseTime>.6&&e.field.action!=="caught",n=t("running-panel");if(n.hidden=!s,!s){this.lastCompleted=0;return}const r=e.field,a=r.retreating?"BACK, BACK":r.runningOrder==="push"?"NEXT RUN CALLED":r.runsInProgress?"RUNNING":r.runningOrder==="hold"?"HOLDING THE CREASE":"WATCH THE FIELDER";t("running-call").textContent=a,t("running-count").textContent=String(r.completed),t("running-state").textContent=r.action==="throw"?"Throw coming in":r.action==="pickup"?"Fielder gathering":r.action==="receive"?"Keeper collecting":r.runsInProgress?"Both batters must make their ground":"Automatic running is on",r.runningOrder==="hold"&&!r.runsInProgress&&(t("running-state").textContent="Tap Run to risk another");for(let c=0;c<2;c++)t("runner-"+c).setAttribute("transform",`translate(${36+(1-r.runnerZ*(c?-1:1)/F.crease)*.5*168},${c?37:18})`);n.dataset.returning=String(r.returning),n.dataset.completed=String(r.completed);const o=t("call-run"),l=t("hold-run");o.disabled=!r.canCallRun,l.disabled=r.runningOrder==="hold"||["held","receive"].includes(r.action),o.textContent=r.runningOrder==="push"?"Run queued":r.completed+(r.runsInProgress?1:0)>=3?"3 run limit":r.runsInProgress?"Run another":"Run",l.textContent=r.runningOrder==="hold"?"Holding next":"Hold next",r.completed>this.lastCompleted&&(t("running-announcement").textContent=`${r.completed} run${r.completed===1?"":"s"} completed`),this.lastCompleted=r.completed}}const lr={four:"#77e4d3",six:"#c4ff36",wicket:"#ff9d90",runs:"#f4f5e9",dot:"#acb8ae"};function Kt(i){const e=i.dismissal?"wicket":i.runs===6?"six":i.runs===4?"four":i.runs?"runs":"dot",t=i.dismissal?i.dismissal.toUpperCase():i.runs===6?"SIX":i.runs===4?"FOUR":i.runs===1?"SINGLE":i.runs?i.runs+" RUNS":i.hit?"DOT BALL":"MISSED",s=i.dismissal==="run out"?i.runs+" completed "+(i.runs===1?"run counts":"runs count"):i.dismissal==="caught"?"Held before the bounce":i.dismissal==="bowled"?"Ball struck the stumps":i.runs===6?"Cleared the rope · "+Math.round(i.distance)+" m":i.runs===4?"Found the boundary · "+Math.round(i.distance)+" m":i.runs?"Into the gap · "+i.timing:i.hit?"Fielded · No run":i.timing;return{kind:e,color:lr[e],label:t,detail:s,value:i.dismissal?"W":String(i.runs)}}function ul(i,e){if(!Number.isFinite(i)||!Number.isFinite(e)||e<=0||i<0||i>=e)return 0;const t=Math.min(1,i/.12),s=Math.min(1,(e-i)/.35);return t*t*(3-2*t)*s*s*(3-2*s)}function hr(i){const e=i.at(-1);if(!e||e.dismissal||e.runs!==4&&e.runs!==6)return"";let t=0,s=0;for(let r=i.length-1;r>=0;r--){const a=i[r];if(a.dismissal||a.runs!==4&&a.runs!==6)break;t++}for(let r=i.length-1;r>=0;r--){const a=i[r];if(a.dismissal||a.runs!==6)break;s++}if(s>=3)return`${s} SIXES IN A ROW`;if(s===2)return"BACK-TO-BACK SIXES";if(t>=3)return`${t} BOUNDARIES IN A ROW`;if(t===2)return"BACK-TO-BACK BOUNDARIES";const n=i.slice(0,-1);if(e.runs===6){if(!n.some(a=>!a.dismissal&&a.runs===6))return"FIRST SIX THIS INNINGS";const r=Math.max(0,...n.filter(a=>a.hit&&!a.dismissal).map(a=>a.distance));if(e.distance>r+1)return"YOUR LONGEST HIT · "+Math.round(e.distance)+" M"}return n.some(r=>!r.dismissal&&(r.runs===4||r.runs===6))?"":"FIRST BOUNDARY THIS INNINGS"}class dr{constructor(e){u(this,"root");u(this,"mark");u(this,"title");u(this,"detail");u(this,"progress");u(this,"score");u(this,"last");u(this,"balls");u(this,"frame");u(this,"shot",null);u(this,"historyKey","");u(this,"reduced",!1);u(this,"animations",[]);const t=s=>e.getElementById(s);this.root=t("callout"),this.mark=t("result-value"),this.title=t("callout-title"),this.detail=t("callout-copy"),this.progress=t("result-progress"),this.score=t("score"),this.last=t("last-ball"),this.balls=t("balls"),this.frame=e.getElementById("boundary-frame")}get chips(){return Array.from(this.balls.querySelectorAll(".ball-chip"))}update(e,t){const s=e.viewPhase,n=e.shots.length+":"+s+":"+e.overs,r=s==="flight"&&e.viewTime<.7&&e.contactQuality>.72;if(this.root.dataset.contact=String(r),s==="flight"){const o=r?"SWEET SPOT":"";this.title.textContent!==o&&(this.title.textContent=o)}if(n!==this.historyKey){this.historyKey=n,this.chips.forEach((l,c)=>{const p=e.shots[c],d=p?Kt(p):null;l.className="ball-chip"+(d?" done":c===e.shots.length&&!["result","interval","finished"].includes(s)?" current":""),l.dataset.outcome=(d==null?void 0:d.kind)??"pending",l.style.setProperty("--outcome",(d==null?void 0:d.color)??"var(--lime)"),l.textContent=d?d.value:"",l.setAttribute("aria-label",`Over ${Math.floor(c/6)+1}, ball ${c%6+1}: ${d?d.label+", "+p.runs+" runs":"not bowled"}`)});const o=e.shots.at(-1);if(this.last.hidden=!o,o){const l=Kt(o);this.last.textContent="LAST BALL · "+l.label,this.last.style.color=l.color}}const a=s==="result"?e.lastShot:null;if(a!==this.shot||this.reduced!==t)if(this.cancel(),this.shot=a,this.reduced=t,this.root.dataset.result=String(!!a),this.mark.hidden=!a,this.progress.hidden=!a,a){const o=Kt(a);if(this.root.dataset.outcome=o.kind,this.root.style.setProperty("--outcome",o.color),this.frame&&this.frame.style.setProperty("--outcome",o.color),this.mark.textContent=o.value,this.title.textContent=o.label,this.detail.textContent=o.detail,!t){const l=o.kind==="six"||o.kind==="four";this.animate(this.mark,[{opacity:0,transform:`translateY(${l?18:8}px) scale(.94)`},{opacity:1,transform:"translateY(0) scale(1)"}],l?280:180),this.animate(this.title,[{opacity:0,transform:"translateX(10px)"},{opacity:1,transform:"translateX(0)"}],240),a.runs>0&&this.animate(this.score,[{transform:"scale(1.09)"},{transform:"scale(1)"}],260);const c=this.chips[e.shots.length-1];c&&this.animate(c,[{transform:"translateY(-5px)",opacity:.4},{transform:"translateY(0)",opacity:1}],220)}}else delete this.root.dataset.outcome,this.root.style.removeProperty("--outcome");if(a){for(const o of this.animations)o.currentTime=e.viewTime*1e3;this.progress.style.transform="scaleX("+Math.max(0,1-e.viewTime/k.resultHold)+")",this.progress.hidden=t}if(this.frame){const o=a&&!a.dismissal&&(a.runs===4||a.runs===6);this.frame.style.opacity=String(!t&&o?Math.max(0,Math.sin(Math.min(1,e.viewTime/1.4)*Math.PI))*.65:0)}}animate(e,t,s){const n=e.animate(t,{duration:s,easing:"cubic-bezier(.23,1,.32,1)",fill:"both"});n.pause(),n.currentTime=0,this.animations.push(n)}cancel(){for(const e of this.animations)e.cancel();this.animations=[]}dispose(){this.cancel()}}function ur(i){const e=i;return!!e&&[0,1].includes(e.assist)&&[0,1].includes(e.variant)&&(e.version===2||e.version===3&&(e.mode==="chase"&&[1,2,5].includes(e.overs)||e.mode==="score"&&e.overs===2&&e.assist===0&&e.variant===0))}function Ms(i){const e=i.options;return(e==null?void 0:e.version)===3?{mode:e.mode,overs:e.overs,balls:e.overs*6}:{mode:"legacy",overs:2,balls:12}}function fr(i,e){const t=Ms(i);if(!Array.isArray(e)||!e.length||e.length>t.balls||e.some(n=>!n||![0,1,2,3,4,6].includes(n.runs)))return!1;const s=e.reduce((n,r)=>n+r.runs,0);return t.mode==="chase"?e.slice(0,-1).reduce((n,r)=>n+r.runs,0)<i.target&&(e.length===t.balls||s>=i.target):e.length===t.balls}const Rt="ant-cricket.two-over-target-progress.v1";function Ps(i=new Date){const e=i.toISOString().slice(0,10);let t=2166136261;for(const s of e)t=Math.imul(t^s.charCodeAt(0),16777619)>>>0;return{day:e,seed:t,target:[20,24,28][t%3],contacts:6,boundaries:2}}function st(i){return{score:i.reduce((e,t)=>e+t.runs,0),hits:i.filter(e=>e.hit).length,boundaries:i.filter(e=>!e.dismissal&&(e.runs===4||e.runs===6)).length,sixes:i.filter(e=>!e.dismissal&&e.runs===6).length,sweet:i.filter(e=>e.hit&&e.quality>.72).length,longest:Math.round(Math.max(0,...i.filter(e=>e.hit&&!e.dismissal).map(e=>e.distance)))}}function pr(i,e){const t=st(e);return[{label:"Score "+i.target,value:t.score,target:i.target},{label:"Connect with "+i.contacts,value:t.hits,target:i.contacts},{label:"Hit "+i.boundaries+" boundaries",value:t.boundaries,target:i.boundaries}].map(s=>({...s,complete:s.value>=s.target}))}const gr=()=>({best:0,completed:0,days:{},recentIds:[]}),De=(i,e)=>typeof i=="number"&&Number.isInteger(i)&&i>=0&&i<=e;class Ie{constructor(e,t=Rt){u(this,"data",gr());u(this,"storage");u(this,"key");u(this,"persistent",!0);if(this.storage=e,this.key=t,!e){this.persistent=!1;return}try{const s=JSON.parse(e.getItem(t)??"null");if(!s||!De(s.best,180)||!De(s.completed,1e6)||!s.days||typeof s.days!="object"||Array.isArray(s.days)||!Array.isArray(s.recentIds))return;const n={};for(const[r,a]of Object.entries(s.days).sort().slice(-35))/^\d{4}-\d{2}-\d{2}$/.test(r)&&a&&De(a.best,180)&&De(a.attempts,1e6)&&De(a.stars,3)&&(n[r]=a);this.data={best:s.best,completed:s.completed,days:n,recentIds:s.recentIds.filter(r=>typeof r=="string"&&r.length<=80).slice(-24)}}catch{this.persistent=!1}}get best(){return this.data.best}get completed(){return this.data.completed}restore(e){var s;const t=new Ie({getItem:()=>JSON.stringify(e),setItem:()=>{}});this.data=structuredClone(t.data);try{(s=this.storage)==null||s.setItem(this.key,JSON.stringify(this.data))}catch{this.persistent=!1}}day(e){return this.data.days[e]??{best:0,attempts:0,stars:0}}record(e,t,s){var l;if(!fr(t,s)||!e||this.data.recentIds.includes(e)||s.some(c=>!De(c.runs,6)||c.runs===5||!Number.isFinite(c.distance)||!Number.isFinite(c.quality)||typeof c.hit!="boolean"))return null;const n=st(s),r=this.day(t.day),a=pr(t,s).filter(c=>c.complete).length,o={stats:n,stars:a,newBest:n.score>this.data.best,newDailyBest:n.score>r.best,previousBest:r.best,attempt:r.attempts+1};this.data.best=Math.max(this.data.best,n.score),this.data.completed++,this.data.days[t.day]={best:Math.max(r.best,n.score),attempts:r.attempts+1,stars:Math.max(a,r.stars)},this.data.days=Object.fromEntries(Object.entries(this.data.days).sort().slice(-35)),this.data.recentIds=[...this.data.recentIds,e].slice(-24);try{(l=this.storage)==null||l.setItem(this.key,JSON.stringify(this.data))}catch{this.persistent=!1}return o}}const es={start:"Twelve balls to chase it. Here we go.",target:"That’s the target beaten! Keep the runs coming.",won:"Challenge won. What a finish!",short:"Not quite enough. They’ll want another go.",over:"Six balls left. Make them count.",overWon:"Target beaten. Six more balls to enjoy.",pullSix:"Pulled away, and that’s gone for six!",loftSix:"Up and over. That’s a lovely six!",six:"That’s gone a long way. Six runs!",sixAgain:"Brilliant strike. All the way for six!",four:"Finds the gap, and away for four!",timedFour:"Beautifully timed. That’s four runs.",fourAgain:"Racing to the boundary. Four more!",caught:"Taken! A good catch in the field.",bowled:"Bowled! Through the defence.",runout:"Run out! A sharp return.",single:"Nicely worked into the gap. A single.",singleAgain:"Tucked away into space. One more to the total.",two:"They’ve made it back for two. Well run.",twoAgain:"Good running, that. Two more to the total.",three:"They’ve run three there. Excellent running.",stopped:"Good stop. No run there.",dot:"No run from that one. Pressure on the batter.",dotAgain:"Nothing added. The bowler will be happy with that.",last:"Last ball now. Pick your gap."};function mr(i,e,t=0){const s=Math.max(0,e.target-e.score);if(i.type==="target")return e.mode==="chase"||e.mode==="score"?null:"target";if(i.type==="complete")return e.mode==="score"?null:s?"short":"won";if(i.type==="over")return(e.balls??12)-e.shots.length===6?e.mode==="score"||s?"over":"overWon":null;if(i.type!=="result")return null;const n=i.shot;return!s&&e.score-n.runs<e.target&&e.mode!=="chase"&&e.mode!=="score"?null:n.dismissal?n.dismissal==="caught"?"caught":n.dismissal==="bowled"?"bowled":"runout":n.runs===6?n.family==="pull"?"pullSix":n.family==="loft"?"loftSix":t%2?"sixAgain":"six":n.runs===4?t%3===0&&n.quality>.72?"timedFour":t%2?"fourAgain":"four":e.shots.length===(e.balls??12)-1&&(s||e.mode==="score")?"last":n.runs>0?n.runs===1?t%2?"singleAgain":"single":n.runs===2?t%2?"twoAgain":"two":"three":t%2===1?null:n.hit?"stopped":t%4?"dotAgain":"dot"}const br=async i=>{const e=await fetch(Ct("sounds/commentary/"+i+".mp3"));if(!e.ok)throw new Error("Commentary unavailable");return e.arrayBuffer()};class yr{constructor(e,t=()=>{},s=br){u(this,"context",null);u(this,"output",null);u(this,"active",null);u(this,"afterCurrent",null);u(this,"buffers",new Map);u(this,"loading",null);u(this,"enabled",!0);u(this,"disposed",!1);u(this,"variant",0);u(this,"duck");u(this,"status");u(this,"load");this.duck=e,this.status=t,this.load=s}attach(e){return this.disposed?Promise.resolve():this.loading?this.loading:(this.context=e,this.output||(this.output=e.createGain(),this.output.gain.value=.85,this.output.connect(e.destination)),this.status("loading"),this.loading=Promise.allSettled(Object.keys(es).map(async t=>{if(this.buffers.has(t))return;const s=await e.decodeAudioData(await this.load(t));this.disposed||this.buffers.set(t,s)})).then(()=>{this.disposed||(this.status(this.buffers.size?"ready":"unavailable"),this.buffers.size<Object.keys(es).length&&(this.loading=null))}),this.loading)}setEnabled(e){this.enabled=e,e||this.stop()}say(e){var n;this.stop();const t=this.buffers.get(e);if(this.disposed||!this.enabled||!t||!this.output||((n=this.context)==null?void 0:n.state)!=="running")return;const s=this.context.createBufferSource();s.buffer=t,s.connect(this.output),this.active=s,s.onended=()=>{if(this.active!==s)return;const r=this.afterCurrent;this.stop(),r&&this.say(r)};try{this.duck(!0),s.start()}catch{this.stop()}}event(e,t){if(e.type==="pause"){this.stop();return}const s=this.variant;e.type==="result"&&this.variant++;const n=mr(e,t,s);n&&(this.active&&(e.type==="over"||e.type==="complete")?this.afterCurrent=n:this.say(n))}stop(){const e=this.active;if(this.active=null,this.afterCurrent=null,e){e.onended=null;try{e.stop()}catch{}e.disconnect()}this.duck(!1)}dispose(){var e;this.disposed=!0,this.stop(),this.buffers.clear(),(e=this.output)==null||e.disconnect(),this.output=null}}class vr{constructor(e){u(this,"key","");u(this,"document");this.document=e}update(e,t,s){var m;const n=e.viewPhase,r=s.day(t.day),a=[t.day,t.target,e.overs,e.mode,e.shots.length,n,r.attempts,s.best,s.completed,s.persistent].join(":");if(a===this.key)return;this.key=a;const o=y=>this.document.getElementById(y),l=st(e.shots),c=e.balls-e.shots.length,p=e.mode==="score",d=Math.max(0,t.target-l.score),f=!p&&!d&&l.score-(((m=e.shots.at(-1))==null?void 0:m.runs)??0)<t.target,b=f?"TARGET REACHED · YOU WIN":hr(e.shots);o("result-note").hidden=n!=="result"||!b,o("result-note").textContent=b,o("result-note").dataset.target=String(f),o("challenge-status").textContent=p?`${c} BALLS LEFT · SCORE ATTACK`:d?c?`${d} TO WIN · ${c} BALLS`:`${d} SHORT OF TARGET`:c?`TARGET BEATEN · ${c} BALLS LEFT`:"CHALLENGE WON",o("challenge-status").dataset.complete=String(!p&&!d),o("target-label").textContent=p?"SCORE ATTACK":n==="finished"?"CHASE TARGET":"YOUR TARGET",o("target-unit").textContent=p?"balls":"runs",o("target-number").textContent=String(p?12:t.target),o("target-caption").textContent=p?"Two overs. Score as many runs as you can.":n==="finished"?`${l.score} scored · ${d?d+" short":"target beaten"}`:`${e.balls} balls · ${e.overs===1?e.plan[0].label.toLowerCase():"alternating pace and spin"}`,o("target-progress").style.transform=`scaleX(${p?e.shots.length/e.balls:Math.min(1,l.score/t.target)})`,o("target-track").setAttribute("aria-label",p?"Balls completed":"Runs toward target"),o("target-track").setAttribute("aria-valuenow",String(p?e.shots.length:l.score)),o("target-track").setAttribute("aria-valuemax",String(p?e.balls:Math.max(t.target,l.score))),o("challenge-record").textContent=s.best?`Your best: ${s.best} runs`:"Find a gap. Time it well. Make your first score.",Array.from(this.document.querySelectorAll(".over-balls")).forEach((y,_)=>{const I=e.shots.length>=(_+1)*k.ballsPerOver;y.dataset.active=String(!I&&_===Math.floor(e.shots.length/k.ballsPerOver)),y.dataset.complete=String(I),y.hidden=e.overs>2&&_!==Math.min(e.overs-1,Math.floor(Math.max(0,e.shots.length-(n==="result"?1:0))/6)),y.querySelector(".over-number").textContent=e.overs>2?String(_+1):e.plan[_].label,y.setAttribute("aria-label",`${e.plan[_].label} over: ${e.overScore[_]} runs`)})}}function ni(i,e,t){const s=Ps(new Date(i+"T00:00:00Z"));let n=s.seed;for(const a of e)n=Math.imul(n^a.charCodeAt(0),16777619)>>>0;if(t.version===3&&t.mode==="score")return{...s,seed:3917421,target:72,options:t};const r=t.version===3?t.overs/2:1;return{...s,seed:n,target:Math.round(([18,20,22,24,26][(n%5+t.variant)%5]-t.assist*2)*r),options:t}}function Mt(i){return i.challenge?ni(i.day,i.id,i.challenge):Ps(new Date(i.day+"T00:00:00Z"))}class wr{constructor(e){u(this,"storage");u(this,"previous",0);u(this,"losses",0);u(this,"lastCompleted","");this.storage=e;try{const t=JSON.parse((e==null?void 0:e.getItem("ant-cricket.challenge-rotation.v2"))||"null");t&&Number.isInteger(t.previous)&&t.previous>=8&&t.previous<=72&&Number.isInteger(t.losses)&&t.losses>=0&&t.losses<=6&&(this.previous=t.previous,this.losses=t.losses,this.lastCompleted=typeof t.lastCompleted=="string"?t.lastCompleted:"")}catch{}}save(){var e;try{(e=this.storage)==null||e.setItem("ant-cricket.challenge-rotation.v2",JSON.stringify({previous:this.previous,losses:this.losses,lastCompleted:this.lastCompleted}))}catch{}}next(e,t=new Date,s){const n=s?{version:3,...s,assist:s.mode==="score"?0:this.losses>=2?1:0,variant:0}:{version:2,assist:this.losses>=2?1:0,variant:0},r=t.toISOString().slice(0,10);let a=ni(r,e,n);return a.target===this.previous&&!(n.version===3&&n.mode==="score")&&(a=ni(r,e,{...n,variant:1})),this.previous=a.target,this.save(),{id:e,challenge:a}}complete(e,t,s){e===this.lastCompleted||!e||!Number.isInteger(t)||t<0||t>180||(this.lastCompleted=e,this.losses=t>=s?0:Math.min(6,this.losses+1),this.save())}}const _r=()=>{};var ts={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=function(i){const e=[];let t=0;for(let s=0;s<i.length;s++){let n=i.charCodeAt(s);n<128?e[t++]=n:n<2048?(e[t++]=n>>6|192,e[t++]=n&63|128):(n&64512)===55296&&s+1<i.length&&(i.charCodeAt(s+1)&64512)===56320?(n=65536+((n&1023)<<10)+(i.charCodeAt(++s)&1023),e[t++]=n>>18|240,e[t++]=n>>12&63|128,e[t++]=n>>6&63|128,e[t++]=n&63|128):(e[t++]=n>>12|224,e[t++]=n>>6&63|128,e[t++]=n&63|128)}return e},Ir=function(i){const e=[];let t=0,s=0;for(;t<i.length;){const n=i[t++];if(n<128)e[s++]=String.fromCharCode(n);else if(n>191&&n<224){const r=i[t++];e[s++]=String.fromCharCode((n&31)<<6|r&63)}else if(n>239&&n<365){const r=i[t++],a=i[t++],o=i[t++],l=((n&7)<<18|(r&63)<<12|(a&63)<<6|o&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=i[t++],a=i[t++];e[s++]=String.fromCharCode((n&15)<<12|(r&63)<<6|a&63)}}return e.join("")},Os={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(i,e){if(!Array.isArray(i))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let n=0;n<i.length;n+=3){const r=i[n],a=n+1<i.length,o=a?i[n+1]:0,l=n+2<i.length,c=l?i[n+2]:0,p=r>>2,d=(r&3)<<4|o>>4;let f=(o&15)<<2|c>>6,b=c&63;l||(b=64,a||(f=64)),s.push(t[p],t[d],t[f],t[b])}return s.join("")},encodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(i):this.encodeByteArray(xs(i),e)},decodeString(i,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(i):Ir(this.decodeStringToByteArray(i,e))},decodeStringToByteArray(i,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let n=0;n<i.length;){const r=t[i.charAt(n++)],o=n<i.length?t[i.charAt(n)]:0;++n;const c=n<i.length?t[i.charAt(n)]:64;++n;const d=n<i.length?t[i.charAt(n)]:64;if(++n,r==null||o==null||c==null||d==null)throw new Tr;const f=r<<2|o>>4;if(s.push(f),c!==64){const b=o<<4&240|c>>2;if(s.push(b),d!==64){const m=c<<6&192|d;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let i=0;i<this.ENCODED_VALS.length;i++)this.byteToCharMap_[i]=this.ENCODED_VALS.charAt(i),this.charToByteMap_[this.byteToCharMap_[i]]=i,this.byteToCharMapWebSafe_[i]=this.ENCODED_VALS_WEBSAFE.charAt(i),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]]=i,i>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)]=i,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)]=i)}}};class Tr extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Sr=function(i){const e=xs(i);return Os.encodeByteArray(e,!0)},Ns=function(i){return Sr(i).replace(/\./g,"")},Ls=function(i){try{return Os.decodeString(i,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kr(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Er=()=>kr().__FIREBASE_DEFAULTS__,Ar=()=>{if(typeof process>"u"||typeof ts>"u")return;const i=ts.__FIREBASE_DEFAULTS__;if(i)return JSON.parse(i)},Cr=()=>{if(typeof document>"u")return;let i;try{i=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=i&&Ls(i[1]);return e&&JSON.parse(e)},Ds=()=>{try{return _r()||Er()||Ar()||Cr()}catch(i){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${i}`);return}},Rr=()=>{var i;return(i=Ds())==null?void 0:i.config},Mr=i=>{var e;return(e=Ds())==null?void 0:e[`_${i}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Us(i){try{return(i.startsWith("http://")||i.startsWith("https://")?new URL(i).hostname:i).endsWith(".cloudworkstations.dev")}catch{return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function xr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(z())}function Or(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Nr(){const i=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof i=="object"&&i.id!==void 0}function Lr(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Dr(){const i=z();return i.indexOf("MSIE ")>=0||i.indexOf("Trident/")>=0}function Ur(){try{return typeof indexedDB=="object"}catch{return!1}}function Fr(){return new Promise((i,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",n=self.indexedDB.open(s);n.onsuccess=()=>{n.result.close(),t||self.indexedDB.deleteDatabase(s),i(!0)},n.onupgradeneeded=()=>{t=!1},n.onerror=()=>{var r;e(((r=n.error)==null?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br="FirebaseError";class Ee extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=Br,Object.setPrototypeOf(this,Ee.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ot.prototype.create)}}class ot{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},n=`${this.service}/${e}`,r=this.errors[e],a=r?zr(r,s):"Error",o=`${this.serviceName}: ${a} (${n}).`;return new Ee(n,o,s)}}function zr(i,e){return i.replace($r,(t,s)=>{const n=e[s];return n!=null?String(n):`<${s}?>`})}const $r=/\{\$([^}]+)}/g;function Hr(i){for(const e in i)if(Object.prototype.hasOwnProperty.call(i,e))return!1;return!0}function Pt(i,e){if(i===e)return!0;const t=Object.keys(i),s=Object.keys(e);for(const n of t){if(!s.includes(n))return!1;const r=i[n],a=e[n];if(is(r)&&is(a)){if(!Pt(r,a))return!1}else if(r!==a)return!1}for(const n of s)if(!t.includes(n))return!1;return!0}function is(i){return i!==null&&typeof i=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(i){const e=[];for(const[t,s]of Object.entries(i))Array.isArray(s)?s.forEach(n=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(n))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function Vr(i,e){const t=new qr(i,e);return t.subscribe.bind(t)}class qr{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let n;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Gr(e,["next","error","complete"])?n=e:n={next:e,error:t,complete:s},n.next===void 0&&(n.next=Yt),n.error===void 0&&(n.error=Yt),n.complete===void 0&&(n.complete=Yt);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?n.error(this.finalError):n.complete()}catch{}}),this.observers.push(n),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Gr(i,e){if(typeof i!="object"||i===null)return!1;for(const t of e)if(t in i&&typeof i[t]=="function")return!0;return!1}function Yt(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(i){return i&&i._delegate?i._delegate:i}class je{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ce="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Pr;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const n=this.getOrInitializeService({instanceIdentifier:t});n&&s.resolve(n)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(n){if(s)return null;throw n}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Kr(e))try{this.getOrInitializeService({instanceIdentifier:Ce})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const n=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:n});s.resolve(r)}catch{}}}}clearInstance(e=Ce){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ce){return this.instances.has(e)}getOptions(e=Ce){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const n=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,a]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(r);s===o&&a.resolve(n)}return n}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),n=this.onInitCallbacks.get(s)??new Set;n.add(e),this.onInitCallbacks.set(s,n);const r=this.instances.get(s);return r&&e(r,s),()=>{n.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const n of s)try{n(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:jr(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Ce){return this.component?this.component.multipleInstances?e:Ce:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jr(i){return i===Ce?void 0:i}function Kr(i){return i.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Wr(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var P;(function(i){i[i.DEBUG=0]="DEBUG",i[i.VERBOSE=1]="VERBOSE",i[i.INFO=2]="INFO",i[i.WARN=3]="WARN",i[i.ERROR=4]="ERROR",i[i.SILENT=5]="SILENT"})(P||(P={}));const Xr={debug:P.DEBUG,verbose:P.VERBOSE,info:P.INFO,warn:P.WARN,error:P.ERROR,silent:P.SILENT},Jr=P.INFO,Zr={[P.DEBUG]:"log",[P.VERBOSE]:"log",[P.INFO]:"info",[P.WARN]:"warn",[P.ERROR]:"error"},Qr=(i,e,...t)=>{if(e<i.logLevel)return;const s=new Date().toISOString(),n=Zr[e];if(n)console[n](`[${s}]  ${i.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Fs{constructor(e){this.name=e,this._logLevel=Jr,this._logHandler=Qr,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in P))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Xr[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,P.DEBUG,...e),this._logHandler(this,P.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,P.VERBOSE,...e),this._logHandler(this,P.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,P.INFO,...e),this._logHandler(this,P.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,P.WARN,...e),this._logHandler(this,P.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,P.ERROR,...e),this._logHandler(this,P.ERROR,...e)}}const ea=(i,e)=>e.some(t=>i instanceof t);let ss,ns;function ta(){return ss||(ss=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ia(){return ns||(ns=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Bs=new WeakMap,ri=new WeakMap,zs=new WeakMap,Xt=new WeakMap,Si=new WeakMap;function sa(i){const e=new Promise((t,s)=>{const n=()=>{i.removeEventListener("success",r),i.removeEventListener("error",a)},r=()=>{t(Te(i.result)),n()},a=()=>{s(i.error),n()};i.addEventListener("success",r),i.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Bs.set(t,i)}).catch(()=>{}),Si.set(e,i),e}function na(i){if(ri.has(i))return;const e=new Promise((t,s)=>{const n=()=>{i.removeEventListener("complete",r),i.removeEventListener("error",a),i.removeEventListener("abort",a)},r=()=>{t(),n()},a=()=>{s(i.error||new DOMException("AbortError","AbortError")),n()};i.addEventListener("complete",r),i.addEventListener("error",a),i.addEventListener("abort",a)});ri.set(i,e)}let ai={get(i,e,t){if(i instanceof IDBTransaction){if(e==="done")return ri.get(i);if(e==="objectStoreNames")return i.objectStoreNames||zs.get(i);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Te(i[e])},set(i,e,t){return i[e]=t,!0},has(i,e){return i instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in i}};function ra(i){ai=i(ai)}function aa(i){return i===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=i.call(Jt(this),e,...t);return zs.set(s,e.sort?e.sort():[e]),Te(s)}:ia().includes(i)?function(...e){return i.apply(Jt(this),e),Te(Bs.get(this))}:function(...e){return Te(i.apply(Jt(this),e))}}function oa(i){return typeof i=="function"?aa(i):(i instanceof IDBTransaction&&na(i),ea(i,ta())?new Proxy(i,ai):i)}function Te(i){if(i instanceof IDBRequest)return sa(i);if(Xt.has(i))return Xt.get(i);const e=oa(i);return e!==i&&(Xt.set(i,e),Si.set(e,i)),e}const Jt=i=>Si.get(i);function ca(i,e,{blocked:t,upgrade:s,blocking:n,terminated:r}={}){const a=indexedDB.open(i,e),o=Te(a);return s&&a.addEventListener("upgradeneeded",l=>{s(Te(a.result),l.oldVersion,l.newVersion,Te(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),o.then(l=>{r&&l.addEventListener("close",()=>r()),n&&l.addEventListener("versionchange",c=>n(c.oldVersion,c.newVersion,c))}).catch(()=>{}),o}const la=["get","getKey","getAll","getAllKeys","count"],ha=["put","add","delete","clear"],Zt=new Map;function rs(i,e){if(!(i instanceof IDBDatabase&&!(e in i)&&typeof e=="string"))return;if(Zt.get(e))return Zt.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,n=ha.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(n||la.includes(t)))return;const r=async function(a,...o){const l=this.transaction(a,n?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(o.shift())),(await Promise.all([c[t](...o),n&&l.done]))[0]};return Zt.set(e,r),r}ra(i=>({...i,get:(e,t,s)=>rs(e,t)||i.get(e,t,s),has:(e,t)=>!!rs(e,t)||i.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ua(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function ua(i){const e=i.getComponent();return(e==null?void 0:e.type)==="VERSION"}const oi="@firebase/app",as="0.14.9";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue=new Fs("@firebase/app"),fa="@firebase/app-compat",pa="@firebase/analytics-compat",ga="@firebase/analytics",ma="@firebase/app-check-compat",ba="@firebase/app-check",ya="@firebase/auth",va="@firebase/auth-compat",wa="@firebase/database",_a="@firebase/data-connect",Ia="@firebase/database-compat",Ta="@firebase/functions",Sa="@firebase/functions-compat",ka="@firebase/installations",Ea="@firebase/installations-compat",Aa="@firebase/messaging",Ca="@firebase/messaging-compat",Ra="@firebase/performance",Ma="@firebase/performance-compat",Pa="@firebase/remote-config",xa="@firebase/remote-config-compat",Oa="@firebase/storage",Na="@firebase/storage-compat",La="@firebase/firestore",Da="@firebase/ai",Ua="@firebase/firestore-compat",Fa="firebase",Ba="12.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const za="[DEFAULT]",$a={[oi]:"fire-core",[fa]:"fire-core-compat",[ga]:"fire-analytics",[pa]:"fire-analytics-compat",[ba]:"fire-app-check",[ma]:"fire-app-check-compat",[ya]:"fire-auth",[va]:"fire-auth-compat",[wa]:"fire-rtdb",[_a]:"fire-data-connect",[Ia]:"fire-rtdb-compat",[Ta]:"fire-fn",[Sa]:"fire-fn-compat",[ka]:"fire-iid",[Ea]:"fire-iid-compat",[Aa]:"fire-fcm",[Ca]:"fire-fcm-compat",[Ra]:"fire-perf",[Ma]:"fire-perf-compat",[Pa]:"fire-rc",[xa]:"fire-rc-compat",[Oa]:"fire-gcs",[Na]:"fire-gcs-compat",[La]:"fire-fst",[Ua]:"fire-fst-compat",[Da]:"fire-vertex","fire-js":"fire-js",[Fa]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=new Map,Ha=new Map,li=new Map;function os(i,e){try{i.container.addComponent(e)}catch(t){ue.debug(`Component ${e.name} failed to register with FirebaseApp ${i.name}`,t)}}function nt(i){const e=i.name;if(li.has(e))return ue.debug(`There were multiple attempts to register component ${e}.`),!1;li.set(e,i);for(const t of ci.values())os(t,i);for(const t of Ha.values())os(t,i);return!0}function Va(i,e){const t=i.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),i.container.getProvider(e)}function ie(i){return i==null?!1:i.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qa={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Me=new ot("app","Firebase",qa);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ga{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new je("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Me.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lt=Ba;function Wa(i,e={}){let t=i;typeof e!="object"&&(e={name:e});const s={name:za,automaticDataCollectionEnabled:!0,...e},n=s.name;if(typeof n!="string"||!n)throw Me.create("bad-app-name",{appName:String(n)});if(t||(t=Rr()),!t)throw Me.create("no-options");const r=ci.get(n);if(r){if(Pt(t,r.options)&&Pt(s,r.config))return r;throw Me.create("duplicate-app",{appName:n})}const a=new Yr(n);for(const l of li.values())a.addComponent(l);const o=new Ga(t,s,a);return ci.set(n,o),o}function $e(i,e,t){let s=$a[i]??i;t&&(s+=`-${t}`);const n=s.match(/\s|\//),r=e.match(/\s|\//);if(n||r){const a=[`Unable to register library "${s}" with version "${e}":`];n&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),n&&r&&a.push("and"),r&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ue.warn(a.join(" "));return}nt(new je(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="firebase-heartbeat-database",Ka=1,rt="firebase-heartbeat-store";let Qt=null;function $s(){return Qt||(Qt=ca(ja,Ka,{upgrade:(i,e)=>{switch(e){case 0:try{i.createObjectStore(rt)}catch(t){console.warn(t)}}}}).catch(i=>{throw Me.create("idb-open",{originalErrorMessage:i.message})})),Qt}async function Ya(i){try{const t=(await $s()).transaction(rt),s=await t.objectStore(rt).get(Hs(i));return await t.done,s}catch(e){if(e instanceof Ee)ue.warn(e.message);else{const t=Me.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ue.warn(t.message)}}}async function cs(i,e){try{const s=(await $s()).transaction(rt,"readwrite");await s.objectStore(rt).put(e,Hs(i)),await s.done}catch(t){if(t instanceof Ee)ue.warn(t.message);else{const s=Me.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ue.warn(s.message)}}}function Hs(i){return`${i.name}!${i.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xa=1024,Ja=30;class Za{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new eo(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const n=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ls();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(a=>a.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:n}),this._heartbeatsCache.heartbeats.length>Ja){const a=to(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){ue.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=ls(),{heartbeatsToSend:s,unsentEntries:n}=Qa(this._heartbeatsCache.heartbeats),r=Ns(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,n.length>0?(this._heartbeatsCache.heartbeats=n,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return ue.warn(t),""}}}function ls(){return new Date().toISOString().substring(0,10)}function Qa(i,e=Xa){const t=[];let s=i.slice();for(const n of i){const r=t.find(a=>a.agent===n.agent);if(r){if(r.dates.push(n.date),hs(t)>e){r.dates.pop();break}}else if(t.push({agent:n.agent,dates:[n.date]}),hs(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class eo{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ur()?Fr().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ya(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return cs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return cs(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function hs(i){return Ns(JSON.stringify({version:2,heartbeats:i})).length}function to(i){if(i.length===0)return-1;let e=0,t=i[0].date;for(let s=1;s<i.length;s++)i[s].date<t&&(t=i[s].date,e=s);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function io(i){nt(new je("platform-logger",e=>new da(e),"PRIVATE")),nt(new je("heartbeat",e=>new Za(e),"PRIVATE")),$e(oi,as,i),$e(oi,as,"esm2020"),$e("fire-js","")}io("");var so="firebase",no="12.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */$e(so,no,"app");function Vs(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ro=Vs,qs=new ot("auth","Firebase",Vs());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=new Fs("@firebase/auth");function ao(i,...e){xt.logLevel<=P.WARN&&xt.warn(`Auth (${lt}): ${i}`,...e)}function vt(i,...e){xt.logLevel<=P.ERROR&&xt.error(`Auth (${lt}): ${i}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ne(i,...e){throw Ei(i,...e)}function ee(i,...e){return Ei(i,...e)}function ki(i,e,t){const s={...ro(),[e]:t};return new ot("auth","Firebase",s).create(e,{appName:i.name})}function Pe(i){return ki(i,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function oo(i,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&ne(i,"argument-error"),ki(i,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ei(i,...e){if(typeof i!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=i.name),i._errorFactory.create(t,...s)}return qs.create(i,...e)}function S(i,e,...t){if(!i)throw Ei(e,...t)}function le(i){const e="INTERNAL ASSERTION FAILED: "+i;throw vt(e),new Error(e)}function fe(i,e){i||le(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hi(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.href)||""}function co(){return ds()==="http:"||ds()==="https:"}function ds(){var i;return typeof self<"u"&&((i=self.location)==null?void 0:i.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(co()||Nr()||"connection"in navigator)?navigator.onLine:!0}function ho(){if(typeof navigator>"u")return null;const i=navigator;return i.languages&&i.languages[0]||i.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,t){this.shortDelay=e,this.longDelay=t,fe(t>e,"Short delay should be less than long delay!"),this.isMobile=xr()||Lr()}get(){return lo()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ai(i,e){fe(i.emulator,"Emulator should always be set here");const{url:t}=i.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gs{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;le("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;le("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;le("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fo=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],po=new ht(3e4,6e4);function Ci(i,e){return i.tenantId&&!e.tenantId?{...e,tenantId:i.tenantId}:e}async function Ze(i,e,t,s,n={}){return Ws(i,n,async()=>{let r={},a={};s&&(e==="GET"?a=s:r={body:JSON.stringify(s)});const o=ct({key:i.config.apiKey,...a}).slice(1),l=await i._getAdditionalHeaders();l["Content-Type"]="application/json",i.languageCode&&(l["X-Firebase-Locale"]=i.languageCode);const c={method:e,headers:l,...r};return Or()||(c.referrerPolicy="no-referrer"),i.emulatorConfig&&Us(i.emulatorConfig.host)&&(c.credentials="include"),Gs.fetch()(await js(i,i.config.apiHost,t,o),c)})}async function Ws(i,e,t){i._canInitEmulator=!1;const s={...uo,...e};try{const n=new mo(i),r=await Promise.race([t(),n.promise]);n.clearNetworkTimeout();const a=await r.json();if("needConfirmation"in a)throw gt(i,"account-exists-with-different-credential",a);if(r.ok&&!("errorMessage"in a))return a;{const o=r.ok?a.errorMessage:a.error.message,[l,c]=o.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw gt(i,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw gt(i,"email-already-in-use",a);if(l==="USER_DISABLED")throw gt(i,"user-disabled",a);const p=s[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw ki(i,p,c);ne(i,p)}}catch(n){if(n instanceof Ee)throw n;ne(i,"network-request-failed",{message:String(n)})}}async function go(i,e,t,s,n={}){const r=await Ze(i,e,t,s,n);return"mfaPendingCredential"in r&&ne(i,"multi-factor-auth-required",{_serverResponse:r}),r}async function js(i,e,t,s){const n=`${e}${t}?${s}`,r=i,a=r.config.emulator?Ai(i.config,n):`${i.config.apiScheme}://${n}`;return fo.includes(t)&&(await r._persistenceManagerAvailable,r._getPersistenceType()==="COOKIE")?r._getPersistence()._getFinalTarget(a).toString():a}class mo{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(ee(this.auth,"network-request-failed")),po.get())})}}function gt(i,e,t){const s={appName:i.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const n=ee(i,e,s);return n.customData._tokenResponse=t,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bo(i,e){return Ze(i,"POST","/v1/accounts:delete",e)}async function Ot(i,e){return Ze(i,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tt(i){if(i)try{const e=new Date(Number(i));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function yo(i,e=!1){const t=Je(i),s=await t.getIdToken(e),n=Ri(s);S(n&&n.exp&&n.auth_time&&n.iat,t.auth,"internal-error");const r=typeof n.firebase=="object"?n.firebase:void 0,a=r==null?void 0:r.sign_in_provider;return{claims:n,token:s,authTime:tt(ei(n.auth_time)),issuedAtTime:tt(ei(n.iat)),expirationTime:tt(ei(n.exp)),signInProvider:a||null,signInSecondFactor:(r==null?void 0:r.sign_in_second_factor)||null}}function ei(i){return Number(i)*1e3}function Ri(i){const[e,t,s]=i.split(".");if(e===void 0||t===void 0||s===void 0)return vt("JWT malformed, contained fewer than 3 sections"),null;try{const n=Ls(t);return n?JSON.parse(n):(vt("Failed to decode base64 JWT payload"),null)}catch(n){return vt("Caught error parsing JWT payload as JSON",n==null?void 0:n.toString()),null}}function us(i){const e=Ri(i);return S(e,"internal-error"),S(typeof e.exp<"u","internal-error"),S(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function at(i,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof Ee&&vo(s)&&i.auth.currentUser===i&&await i.auth.signOut(),s}}function vo({code:i}){return i==="auth/user-disabled"||i==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=tt(this.lastLoginAt),this.creationTime=tt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Nt(i){var d;const e=i.auth,t=await i.getIdToken(),s=await at(i,Ot(e,{idToken:t}));S(s==null?void 0:s.users.length,e,"internal-error");const n=s.users[0];i._notifyReloadListener(n);const r=(d=n.providerUserInfo)!=null&&d.length?Ks(n.providerUserInfo):[],a=Io(i.providerData,r),o=i.isAnonymous,l=!(i.email&&n.passwordHash)&&!(a!=null&&a.length),c=o?l:!1,p={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:a,metadata:new di(n.createdAt,n.lastLoginAt),isAnonymous:c};Object.assign(i,p)}async function _o(i){const e=Je(i);await Nt(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Io(i,e){return[...i.filter(s=>!e.some(n=>n.providerId===s.providerId)),...e]}function Ks(i){return i.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function To(i,e){const t=await Ws(i,{},async()=>{const s=ct({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:n,apiKey:r}=i.config,a=await js(i,n,"/v1/token",`key=${r}`),o=await i._getAdditionalHeaders();o["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:o,body:s};return i.emulatorConfig&&Us(i.emulatorConfig.host)&&(l.credentials="include"),Gs.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function So(i,e){return Ze(i,"POST","/v2/accounts:revokeToken",Ci(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){S(e.idToken,"internal-error"),S(typeof e.idToken<"u","internal-error"),S(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):us(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){S(e.length!==0,"internal-error");const t=us(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(S(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:n,expiresIn:r}=await To(e,t);this.updateTokensAndExpiration(s,n,Number(r))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:n,expirationTime:r}=t,a=new He;return s&&(S(typeof s=="string","internal-error",{appName:e}),a.refreshToken=s),n&&(S(typeof n=="string","internal-error",{appName:e}),a.accessToken=n),r&&(S(typeof r=="number","internal-error",{appName:e}),a.expirationTime=r),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new He,this.toJSON())}_performRefresh(){return le("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function me(i,e){S(typeof i=="string"||typeof i>"u","internal-error",{appName:e})}class Z{constructor({uid:e,auth:t,stsTokenManager:s,...n}){this.providerId="firebase",this.proactiveRefresh=new wo(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=n.displayName||null,this.email=n.email||null,this.emailVerified=n.emailVerified||!1,this.phoneNumber=n.phoneNumber||null,this.photoURL=n.photoURL||null,this.isAnonymous=n.isAnonymous||!1,this.tenantId=n.tenantId||null,this.providerData=n.providerData?[...n.providerData]:[],this.metadata=new di(n.createdAt||void 0,n.lastLoginAt||void 0)}async getIdToken(e){const t=await at(this,this.stsTokenManager.getToken(this.auth,e));return S(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return yo(this,e)}reload(){return _o(this)}_assign(e){this!==e&&(S(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Z({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){S(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await Nt(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ie(this.auth.app))return Promise.reject(Pe(this.auth));const e=await this.getIdToken();return await at(this,bo(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,n=t.email??void 0,r=t.phoneNumber??void 0,a=t.photoURL??void 0,o=t.tenantId??void 0,l=t._redirectEventId??void 0,c=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:d,emailVerified:f,isAnonymous:b,providerData:m,stsTokenManager:y}=t;S(d&&y,e,"internal-error");const _=He.fromJSON(this.name,y);S(typeof d=="string",e,"internal-error"),me(s,e.name),me(n,e.name),S(typeof f=="boolean",e,"internal-error"),S(typeof b=="boolean",e,"internal-error"),me(r,e.name),me(a,e.name),me(o,e.name),me(l,e.name),me(c,e.name),me(p,e.name);const I=new Z({uid:d,auth:e,email:n,emailVerified:f,displayName:s,isAnonymous:b,photoURL:a,phoneNumber:r,tenantId:o,stsTokenManager:_,createdAt:c,lastLoginAt:p});return m&&Array.isArray(m)&&(I.providerData=m.map(L=>({...L}))),l&&(I._redirectEventId=l),I}static async _fromIdTokenResponse(e,t,s=!1){const n=new He;n.updateFromServerResponse(t);const r=new Z({uid:t.localId,auth:e,stsTokenManager:n,isAnonymous:s});return await Nt(r),r}static async _fromGetAccountInfoResponse(e,t,s){const n=t.users[0];S(n.localId!==void 0,"internal-error");const r=n.providerUserInfo!==void 0?Ks(n.providerUserInfo):[],a=!(n.email&&n.passwordHash)&&!(r!=null&&r.length),o=new He;o.updateFromIdToken(s);const l=new Z({uid:n.localId,auth:e,stsTokenManager:o,isAnonymous:a}),c={uid:n.localId,displayName:n.displayName||null,photoURL:n.photoUrl||null,email:n.email||null,emailVerified:n.emailVerified||!1,phoneNumber:n.phoneNumber||null,tenantId:n.tenantId||null,providerData:r,metadata:new di(n.createdAt,n.lastLoginAt),isAnonymous:!(n.email&&n.passwordHash)&&!(r!=null&&r.length)};return Object.assign(l,c),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fs=new Map;function he(i){fe(i instanceof Function,"Expected a class definition");let e=fs.get(i);return e?(fe(e instanceof i,"Instance stored in cache mismatched with class"),e):(e=new i,fs.set(i,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Ys.type="NONE";const ui=Ys;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wt(i,e,t){return`firebase:${i}:${e}:${t}`}class Ve{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:n,name:r}=this.auth;this.fullUserKey=wt(this.userKey,n.apiKey,r),this.fullPersistenceKey=wt("persistence",n.apiKey,r),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ot(this.auth,{idToken:e}).catch(()=>{});return t?Z._fromGetAccountInfoResponse(this.auth,t,e):null}return Z._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,s="authUser"){if(!t.length)return new Ve(he(ui),e,s);const n=(await Promise.all(t.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let r=n[0]||he(ui);const a=wt(s,e.config.apiKey,e.name);let o=null;for(const c of t)try{const p=await c._get(a);if(p){let d;if(typeof p=="string"){const f=await Ot(e,{idToken:p}).catch(()=>{});if(!f)break;d=await Z._fromGetAccountInfoResponse(e,f,p)}else d=Z._fromJSON(e,p);c!==r&&(o=d),r=c;break}}catch{}const l=n.filter(c=>c._shouldAllowMigration);return!r._shouldAllowMigration||!l.length?new Ve(r,e,s):(r=l[0],o&&await r._set(a,o.toJSON()),await Promise.all(t.map(async c=>{if(c!==r)try{await c._remove(a)}catch{}})),new Ve(r,e,s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(i){const e=i.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Qs(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Xs(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(tn(e))return"Blackberry";if(sn(e))return"Webos";if(Js(e))return"Safari";if((e.includes("chrome/")||Zs(e))&&!e.includes("edge/"))return"Chrome";if(en(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=i.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function Xs(i=z()){return/firefox\//i.test(i)}function Js(i=z()){const e=i.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Zs(i=z()){return/crios\//i.test(i)}function Qs(i=z()){return/iemobile/i.test(i)}function en(i=z()){return/android/i.test(i)}function tn(i=z()){return/blackberry/i.test(i)}function sn(i=z()){return/webos/i.test(i)}function Mi(i=z()){return/iphone|ipad|ipod/i.test(i)||/macintosh/i.test(i)&&/mobile/i.test(i)}function ko(i=z()){var e;return Mi(i)&&!!((e=window.navigator)!=null&&e.standalone)}function Eo(){return Dr()&&document.documentMode===10}function nn(i=z()){return Mi(i)||en(i)||sn(i)||tn(i)||/windows phone/i.test(i)||Qs(i)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rn(i,e=[]){let t;switch(i){case"Browser":t=ps(z());break;case"Worker":t=`${ps(z())}-${i}`;break;default:t=i}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${lt}/${s}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ao{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=r=>new Promise((a,o)=>{try{const l=e(r);a(l)}catch(l){o(l)}});s.onAbort=t,this.queue.push(s);const n=this.queue.length-1;return()=>{this.queue[n]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const n of t)try{n()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Co(i,e={}){return Ze(i,"GET","/v2/passwordPolicy",Ci(i,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ro=6;class Mo{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Ro,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,n=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),n&&(t.meetsMaxPasswordLength=e.length<=n)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let n=0;n<e.length;n++)s=e.charAt(n),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,n,r){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=n)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e,t,s,n){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=n,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new gs(this),this.idTokenSubscription=new gs(this),this.beforeStateQueue=new Ao(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=qs,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=n.sdkClientVersion,this._persistenceManagerAvailable=new Promise(r=>this._resolvePersistenceManagerAvailable=r)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=he(t)),this._initializationPromise=this.queue(async()=>{var s,n,r;if(!this._deleted&&(this.persistenceManager=await Ve.create(this,e),(s=this._resolvePersistenceManagerAvailable)==null||s.call(this),!this._deleted)){if((n=this._popupRedirectResolver)!=null&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((r=this.currentUser)==null?void 0:r.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ot(this,{idToken:e}),s=await Z._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var r;if(ie(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,n=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(r=this.redirectUser)==null?void 0:r._redirectEventId,o=s==null?void 0:s._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===o)&&(l!=null&&l.user)&&(s=l.user,n=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(n)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return S(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Nt(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ho()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ie(this.app))return Promise.reject(Pe(this));const t=e?Je(e):null;return t&&S(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&S(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ie(this.app)?Promise.reject(Pe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ie(this.app)?Promise.reject(Pe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(he(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Co(this),t=new Mo(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ot("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await So(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&he(e)||this._popupRedirectResolver;S(t,this,"argument-error"),this.redirectPersistenceManager=await Ve.create(this,[he(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,n){if(this._deleted)return()=>{};const r=typeof t=="function"?t:t.next.bind(t);let a=!1;const o=this._isInitialized?Promise.resolve():this._initializationPromise;if(S(o,this,"internal-error"),o.then(()=>{a||r(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,s,n);return()=>{a=!0,l()}}else{const l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return S(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=rn(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var n;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((n=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(ie(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&ao(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Pi(i){return Je(i)}class gs{constructor(e){this.auth=e,this.observer=null,this.addObserver=Vr(t=>this.observer=t)}get next(){return S(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xi={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function xo(i){xi=i}function Oo(i){return xi.loadJS(i)}function No(){return xi.gapiScript}function Lo(i){return`__${i}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(i,e){const t=Va(i,"auth");if(t.isInitialized()){const n=t.getImmediate(),r=t.getOptions();if(Pt(r,e??{}))return n;ne(n,"already-initialized")}return t.initialize({options:e})}function Uo(i,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(he);e!=null&&e.errorMap&&i._updateErrorMap(e.errorMap),i._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class an{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return le("not implemented")}_getIdTokenResponse(e){return le("not implemented")}_linkToIdToken(e,t){return le("not implemented")}_getReauthenticationResolver(e){return le("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qe(i,e){return go(i,"POST","/v1/accounts:signInWithIdp",Ci(i,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fo="http://localhost";class xe extends an{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new xe(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):ne("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:n,...r}=t;if(!s||!n)return null;const a=new xe(s,n);return a.idToken=r.idToken||void 0,a.accessToken=r.accessToken||void 0,a.secret=r.secret,a.nonce=r.nonce,a.pendingToken=r.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return qe(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,qe(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,qe(e,t)}buildRequest(){const e={requestUri:Fo,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ct(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt extends Oi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be extends dt{constructor(){super("facebook.com")}static credential(e){return xe._fromParams({providerId:be.PROVIDER_ID,signInMethod:be.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return be.credentialFromTaggedObject(e)}static credentialFromError(e){return be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return be.credential(e.oauthAccessToken)}catch{return null}}}be.FACEBOOK_SIGN_IN_METHOD="facebook.com";be.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce extends dt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return xe._fromParams({providerId:ce.PROVIDER_ID,signInMethod:ce.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ce.credentialFromTaggedObject(e)}static credentialFromError(e){return ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return ce.credential(t,s)}catch{return null}}}ce.GOOGLE_SIGN_IN_METHOD="google.com";ce.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye extends dt{constructor(){super("github.com")}static credential(e){return xe._fromParams({providerId:ye.PROVIDER_ID,signInMethod:ye.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ye.credentialFromTaggedObject(e)}static credentialFromError(e){return ye.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ye.credential(e.oauthAccessToken)}catch{return null}}}ye.GITHUB_SIGN_IN_METHOD="github.com";ye.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve extends dt{constructor(){super("twitter.com")}static credential(e,t){return xe._fromParams({providerId:ve.PROVIDER_ID,signInMethod:ve.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ve.credentialFromTaggedObject(e)}static credentialFromError(e){return ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return ve.credential(t,s)}catch{return null}}}ve.TWITTER_SIGN_IN_METHOD="twitter.com";ve.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,n=!1){const r=await Z._fromIdTokenResponse(e,s,n),a=ms(s);return new Ke({user:r,providerId:a,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const n=ms(s);return new Ke({user:e,providerId:n,_tokenResponse:s,operationType:t})}}function ms(i){return i.providerId?i.providerId:"phoneNumber"in i?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt extends Ee{constructor(e,t,s,n){super(t.code,t.message),this.operationType=s,this.user=n,Object.setPrototypeOf(this,Lt.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,n){return new Lt(e,t,s,n)}}function on(i,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(i):t._getIdTokenResponse(i)).catch(r=>{throw r.code==="auth/multi-factor-auth-required"?Lt._fromErrorAndOperation(i,r,e,s):r})}async function Bo(i,e,t=!1){const s=await at(i,e._linkToIdToken(i.auth,await i.getIdToken()),t);return Ke._forOperation(i,"link",s)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zo(i,e,t=!1){const{auth:s}=i;if(ie(s.app))return Promise.reject(Pe(s));const n="reauthenticate";try{const r=await at(i,on(s,n,e,i),t);S(r.idToken,s,"internal-error");const a=Ri(r.idToken);S(a,s,"internal-error");const{sub:o}=a;return S(i.uid===o,s,"user-mismatch"),Ke._forOperation(i,n,r)}catch(r){throw(r==null?void 0:r.code)==="auth/user-not-found"&&ne(s,"user-mismatch"),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $o(i,e,t=!1){if(ie(i.app))return Promise.reject(Pe(i));const s="signIn",n=await on(i,s,e),r=await Ke._fromIdTokenResponse(i,s,n);return t||await i._updateCurrentUser(r.user),r}function Ho(i,e,t,s){return Je(i).onAuthStateChanged(e,t,s)}function Vo(i){return Je(i).signOut()}const bs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(bs,"1"),this.storage.removeItem(bs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qo=1e3,Go=10;class ln extends cn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=nn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),n=this.localCache[t];s!==n&&e(t,n,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,o,l)=>{this.notifyListeners(a,l)});return}const s=e.key;t?this.detachListener():this.stopPolling();const n=()=>{const a=this.storage.getItem(s);!t&&this.localCache[s]===a||this.notifyListeners(s,a)},r=this.storage.getItem(s);Eo()&&r!==e.newValue&&e.newValue!==e.oldValue?setTimeout(n,Go):n()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const n of Array.from(s))n(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},qo)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ln.type="LOCAL";const Wo=ln;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn extends cn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}hn.type="SESSION";const dn=hn;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(i="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return i+t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(){return window}function jo(i){Se().location.href=i}new ht(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(i,e){return e?he(e):(S(i._popupRedirectResolver,i,"argument-error"),i._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni extends an{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return qe(e,this._buildIdpRequest())}_linkToIdToken(e,t){return qe(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return qe(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Ko(i){return $o(i.auth,new Ni(i),i.bypassAuthState)}function Yo(i){const{auth:e,user:t}=i;return S(t,e,"internal-error"),zo(t,new Ni(i),i.bypassAuthState)}async function Xo(i){const{auth:e,user:t}=i;return S(t,e,"internal-error"),Bo(t,new Ni(i),i.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e,t,s,n,r=!1){this.auth=e,this.resolver=s,this.user=n,this.bypassAuthState=r,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:n,tenantId:r,error:a,type:o}=e;if(a){this.reject(a);return}const l={auth:this.auth,requestUri:t,sessionId:s,tenantId:r||void 0,postBody:n||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(l))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ko;case"linkViaPopup":case"linkViaRedirect":return Xo;case"reauthViaPopup":case"reauthViaRedirect":return Yo;default:ne(this.auth,"internal-error")}}resolve(e){fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){fe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo=new ht(2e3,1e4);async function Zo(i,e,t){if(ie(i.app))return Promise.reject(ee(i,"operation-not-supported-in-this-environment"));const s=Pi(i);oo(i,e,Oi);const n=fn(s,t);return new Re(s,"signInViaPopup",e,n).executeNotNull()}class Re extends pn{constructor(e,t,s,n,r){super(e,t,n,r),this.provider=s,this.authWindow=null,this.pollId=null,Re.currentPopupAction&&Re.currentPopupAction.cancel(),Re.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return S(e,this.auth,"internal-error"),e}async onExecution(){fe(this.filter.length===1,"Popup operations only handle one event");const e=un();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ee(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(ee(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Re.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ee(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Jo.get())};e()}}Re.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qo="pendingRedirect",_t=new Map;class ec extends pn{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=_t.get(this.auth._key());if(!e){try{const s=await tc(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}_t.set(this.auth._key(),e)}return this.bypassAuthState||_t.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function tc(i,e){const t=nc(e),s=sc(i);if(!await s._isAvailable())return!1;const n=await s._get(t)==="true";return await s._remove(t),n}function ic(i,e){_t.set(i._key(),e)}function sc(i){return he(i._redirectPersistence)}function nc(i){return wt(Qo,i.config.apiKey,i.name)}async function rc(i,e,t=!1){if(ie(i.app))return Promise.reject(Pe(i));const s=Pi(i),n=fn(s,e),a=await new ec(s,n,t).execute();return a&&!t&&(delete a.user._redirectEventId,await s._persistUserIfCurrent(a.user),await s._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac=600*1e3;class oc{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!cc(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!gn(e)){const n=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(ee(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ac&&this.cachedEventUids.clear(),this.cachedEventUids.has(ys(e))}saveEventToCache(e){this.cachedEventUids.add(ys(e)),this.lastProcessedEventTime=Date.now()}}function ys(i){return[i.type,i.eventId,i.sessionId,i.tenantId].filter(e=>e).join("-")}function gn({type:i,error:e}){return i==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function cc(i){switch(i.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return gn(i);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lc(i,e={}){return Ze(i,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,dc=/^https?/;async function uc(i){if(i.config.emulator)return;const{authorizedDomains:e}=await lc(i);for(const t of e)try{if(fc(t))return}catch{}ne(i,"unauthorized-domain")}function fc(i){const e=hi(),{protocol:t,hostname:s}=new URL(e);if(i.startsWith("chrome-extension://")){const a=new URL(i);return a.hostname===""&&s===""?t==="chrome-extension:"&&i.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===s}if(!dc.test(t))return!1;if(hc.test(i))return s===i;const n=i.replace(/\./g,"\\.");return new RegExp("^(.+\\."+n+"|"+n+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pc=new ht(3e4,6e4);function vs(){const i=Se().___jsl;if(i!=null&&i.H){for(const e of Object.keys(i.H))if(i.H[e].r=i.H[e].r||[],i.H[e].L=i.H[e].L||[],i.H[e].r=[...i.H[e].L],i.CP)for(let t=0;t<i.CP.length;t++)i.CP[t]=null}}function gc(i){return new Promise((e,t)=>{var n,r,a;function s(){vs(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{vs(),t(ee(i,"network-request-failed"))},timeout:pc.get()})}if((r=(n=Se().gapi)==null?void 0:n.iframes)!=null&&r.Iframe)e(gapi.iframes.getContext());else if((a=Se().gapi)!=null&&a.load)s();else{const o=Lo("iframefcb");return Se()[o]=()=>{gapi.load?s():t(ee(i,"network-request-failed"))},Oo(`${No()}?onload=${o}`).catch(l=>t(l))}}).catch(e=>{throw It=null,e})}let It=null;function mc(i){return It=It||gc(i),It}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc=new ht(5e3,15e3),yc="__/auth/iframe",vc="emulator/auth/iframe",wc={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},_c=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Ic(i){const e=i.config;S(e.authDomain,i,"auth-domain-config-required");const t=e.emulator?Ai(e,vc):`https://${i.config.authDomain}/${yc}`,s={apiKey:e.apiKey,appName:i.name,v:lt},n=_c.get(i.config.apiHost);n&&(s.eid=n);const r=i._getFrameworks();return r.length&&(s.fw=r.join(",")),`${t}?${ct(s).slice(1)}`}async function Tc(i){const e=await mc(i),t=Se().gapi;return S(t,i,"internal-error"),e.open({where:document.body,url:Ic(i),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:wc,dontclear:!0},s=>new Promise(async(n,r)=>{await s.restyle({setHideOnLeave:!1});const a=ee(i,"network-request-failed"),o=Se().setTimeout(()=>{r(a)},bc.get());function l(){Se().clearTimeout(o),n(s)}s.ping(l).then(l,()=>{r(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sc={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},kc=500,Ec=600,Ac="_blank",Cc="http://localhost";class ws{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Rc(i,e,t,s=kc,n=Ec){const r=Math.max((window.screen.availHeight-n)/2,0).toString(),a=Math.max((window.screen.availWidth-s)/2,0).toString();let o="";const l={...Sc,width:s.toString(),height:n.toString(),top:r,left:a},c=z().toLowerCase();t&&(o=Zs(c)?Ac:t),Xs(c)&&(e=e||Cc,l.scrollbars="yes");const p=Object.entries(l).reduce((f,[b,m])=>`${f}${b}=${m},`,"");if(ko(c)&&o!=="_self")return Mc(e||"",o),new ws(null);const d=window.open(e||"",o,p);S(d,i,"popup-blocked");try{d.focus()}catch{}return new ws(d)}function Mc(i,e){const t=document.createElement("a");t.href=i,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc="__/auth/handler",xc="emulator/auth/handler",Oc=encodeURIComponent("fac");async function _s(i,e,t,s,n,r){S(i.config.authDomain,i,"auth-domain-config-required"),S(i.config.apiKey,i,"invalid-api-key");const a={apiKey:i.config.apiKey,appName:i.name,authType:t,redirectUrl:s,v:lt,eventId:n};if(e instanceof Oi){e.setDefaultLanguage(i.languageCode),a.providerId=e.providerId||"",Hr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,d]of Object.entries({}))a[p]=d}if(e instanceof dt){const p=e.getScopes().filter(d=>d!=="");p.length>0&&(a.scopes=p.join(","))}i.tenantId&&(a.tid=i.tenantId);const o=a;for(const p of Object.keys(o))o[p]===void 0&&delete o[p];const l=await i._getAppCheckToken(),c=l?`#${Oc}=${encodeURIComponent(l)}`:"";return`${Nc(i)}?${ct(o).slice(1)}${c}`}function Nc({config:i}){return i.emulator?Ai(i,xc):`https://${i.authDomain}/${Pc}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti="webStorageSupport";class Lc{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=dn,this._completeRedirectFn=rc,this._overrideRedirectResult=ic}async _openPopup(e,t,s,n){var a;fe((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const r=await _s(e,t,s,hi(),n);return Rc(e,r,un())}async _openRedirect(e,t,s,n){await this._originValidation(e);const r=await _s(e,t,s,hi(),n);return jo(r),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:n,promise:r}=this.eventManagers[t];return n?Promise.resolve(n):(fe(r,"If manager is not set, promise should be"),r)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Tc(e),s=new oc(e);return t.register("authEvent",n=>(S(n==null?void 0:n.authEvent,e,"invalid-auth-event"),{status:s.onEvent(n.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(ti,{type:ti},n=>{var a;const r=(a=n==null?void 0:n[0])==null?void 0:a[ti];r!==void 0&&t(!!r),ne(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=uc(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return nn()||Js()||Mi()}}const Dc=Lc;var Is="@firebase/auth",Ts="1.12.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uc{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){S(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fc(i){switch(i){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Bc(i){nt(new je("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),n=e.getProvider("heartbeat"),r=e.getProvider("app-check-internal"),{apiKey:a,authDomain:o}=s.options;S(a&&!a.includes(":"),"invalid-api-key",{appName:s.name});const l={apiKey:a,authDomain:o,clientPlatform:i,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:rn(i)},c=new Po(s,n,r,l);return Uo(c,t),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),nt(new je("auth-internal",e=>{const t=Pi(e.getProvider("auth").getImmediate());return(s=>new Uc(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),$e(Is,Ts,Fc(i)),$e(Is,Ts,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zc=300;Mr("authIdTokenMaxAge");function $c(){var i;return((i=document.getElementsByTagName("head"))==null?void 0:i[0])??document}xo({loadJS(i){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",i),s.onload=e,s.onerror=n=>{const r=ee("internal-error");r.customData=n,t(r)},s.type="text/javascript",s.charset="UTF-8",$c().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Bc("Browser");const Hc="https://ggpsvpq13j.execute-api.us-east-1.amazonaws.com",mn={apiUrl:Hc},Ss="ant-cricket.guest-matches.v1";function fi(i){const e=i;if(!e||typeof e.id!="string"||!e.id||e.id.length>128||typeof e.day!="string"||!/^\d{4}-\d{2}-\d{2}$/.test(e.day)||!Array.isArray(e.shots)||!e.shots.length||e.shots.length>30||e.shots.some(s=>!s||typeof s!="object")||!["camera","touch"].includes(e.inputMode)||e.challenge!==void 0&&!ur(e.challenge))return!1;const t=new Date(e.day+"T00:00:00Z");return Number.isFinite(t.getTime())&&t.toISOString().slice(0,10)===e.day&&!!new Ie(null).record(e.id,Mt(e),e.shots)}class Vc{constructor(e){u(this,"progress");u(this,"persistent");u(this,"matches",[]);this.storage=e,this.progress=new Ie(e,`${Rt}.guest`),this.persistent=this.progress.persistent;try{const t=JSON.parse((e==null?void 0:e.getItem(Ss))||"[]");Array.isArray(t)&&(this.matches=t.filter(fi).filter(s=>{const n=s.claimedBy;return n===void 0||typeof n=="string"&&n.length>0&&n.length<=128}))}catch{this.persistent=!1}}persist(){var e;try{(e=this.storage)==null||e.setItem(Ss,JSON.stringify(this.matches))}catch{this.persistent=!1}}record(e){if(this.matches.some(s=>s.id===e.id)||!fi(e))return null;const t=this.progress.record(e.id,Mt(e),e.shots);return t?(this.matches.push(structuredClone(e)),this.persist(),t):null}available(e){return this.matches.some(t=>t.id===e&&!t.claimedBy)}claim(e,t){const s=this.matches.find(a=>a.id===e);if(!s||s.claimedBy&&s.claimedBy!==t)return null;s.claimedBy=t,this.persist();const{claimedBy:n,...r}=s;return structuredClone(r)}forUser(e){return this.matches.filter(t=>t.claimedBy===e).map(({claimedBy:t,...s})=>structuredClone(s))}acknowledge(e,t){this.matches=this.matches.filter(s=>s.id!==e||s.claimedBy!==t),this.persist()}}const ii={onAuthStateChanged(e){setTimeout(()=>e(null),0);return()=>{}},signOut(){return Promise.resolve()}};class Ue extends Error{constructor(){super("Sign in with Google again to load your records and save your progress.")}}class mt extends Error{}class qc{constructor(e){u(this,"guest");u(this,"user",null);u(this,"progress",new Ie(null));u(this,"loading",!0);u(this,"ready",!1);u(this,"saving",!1);u(this,"error","");u(this,"saved",!1);u(this,"recordsLoading",!1);u(this,"browserHelp",!1);u(this,"recordsReady",!1);u(this,"reauthenticationRequired",!1);u(this,"queue",[]);u(this,"memoryQueues",new Map);u(this,"generation",0);u(this,"storage",null);u(this,"syncing",null);u(this,"changed");var t;this.changed=e;try{this.storage=localStorage}catch{}this.guest=new Vc(this.storage),Ho(ii,s=>{this.load(s)},()=>{this.loading=!1,this.error="Could not check your account. Reload to try again.",this.changed()}),window.addEventListener("online",()=>{this.user&&this.retry()}),(t=window.setInterval)==null||t.call(window,()=>{this.user&&!this.needsSignIn&&(!this.recordsReady||this.pending)&&this.retry()},3e4)}get pending(){return this.queue.length}get needsSignIn(){return!this.user||this.reauthenticationRequired}async saveForLeaderboard(e,t){var r;const s=Date.now()+16e3;for(;(this.loading||this.recordsLoading)&&Date.now()<s;)await new Promise(a=>setTimeout(a,100));const n=this.user;if(!n||this.needsSignIn)throw new Error("Sign in with Google to submit your score.");if(t&&t!==n.uid)throw new Error("Sign in to the account that played this match to submit it.");if(this.guest.available(e)&&!this.saveGuest(e))throw new Error("Could not prepare this score. Try saving again.");if(await this.retry(),((r=this.user)==null?void 0:r.uid)!==n.uid)throw new Error("Your account changed. Sign in again to submit.");if(this.queue.some(a=>a.id===e)||!this.recordsReady)throw new Error("Your score is still syncing. Retry submitting when it is saved.");return n}key(e=(t=>(t=this.user)==null?void 0:t.uid)()){return`ant-cricket.pending.v1.${e}`}storedQueue(e){var s;let t=[];try{const n=JSON.parse(((s=this.storage)==null?void 0:s.getItem(this.key(e)))||"[]");t=Array.isArray(n)?n.filter(fi):[]}catch{}return[...new Map([...t,...this.memoryQueues.get(e)||[]].map(n=>[n.id,n])).values()]}cacheQueue(){var e;this.user&&this.memoryQueues.set(this.user.uid,[...this.queue]);try{(e=this.storage)==null||e.setItem(this.key(),JSON.stringify(this.queue))}catch{}}async request(e,t,s,n){var a;const r=mn.apiUrl;for(let o=0;o<2;o++){let l;try{l=await t.getIdToken(o>0)}catch(d){throw["auth/user-token-expired","auth/invalid-user-token","auth/user-disabled"].includes(d.code||"")?new Ue:d}o===0&&(n==null||n());let c;try{c=await fetch(r+e,{method:"POST",headers:{Authorization:`Bearer ${l}`,"Content-Type":"application/json"},body:JSON.stringify(s||{}),signal:AbortSignal.timeout(15e3),cache:"no-store"})}catch{throw new mt}if(c.status===401&&o===0)continue;if(c.status===401)throw new Ue;if(c.status>=500||c.status===429)throw new mt;if(!c.ok)throw new Error("Could not reach your saved records. Try again.");const p=await c.json();if(((a=p.profile)==null?void 0:a.uid)!==t.uid||!p.profile.progress)throw new Error("Could not load your records. Try again.");return p}throw new Ue}restore(e){this.progress.restore(e.progress);for(const t of this.queue)this.progress.record(t.id,Mt(t),t.shots)}async load(e){var a,o;this.user&&this.cacheQueue();const t=++this.generation,n=!!e&&((a=this.user)==null?void 0:a.uid)===e.uid&&this.ready,r=e&&((o=this.user)==null?void 0:o.uid)===e.uid?this.queue:[];if(this.user=e,this.ready=n,this.loading=!!e&&!n,this.error="",this.saved=!1,this.saving=!1,this.syncing=null,this.recordsLoading=!!e,this.recordsReady=!1,this.browserHelp=!1,this.reauthenticationRequired=!1,this.queue=r,this.progress=new Ie(e?this.storage:null,`${Rt}.${(e==null?void 0:e.uid)||"signed-out"}`),e&&(this.queue=[...new Map([...this.storedQueue(e.uid),...r,...this.guest.forUser(e.uid)].map(l=>[l.id,l])).values()]),this.changed(),!!e){try{const{profile:l}=await this.request("/session",e,void 0,()=>{t===this.generation&&(this.ready=!0,this.loading=!1,this.changed())});if(t!==this.generation)return;this.restore(l),this.ready=!0,this.recordsReady=!0}catch(l){if(t===this.generation){const c=l.code||"";this.reauthenticationRequired=l instanceof Ue||["auth/user-token-expired","auth/invalid-user-token","auth/user-disabled"].includes(c),this.ready=!this.reauthenticationRequired&&l instanceof mt,this.error=this.reauthenticationRequired?new Ue().message:l instanceof mt?"Records are offline. You can play; scores will retry syncing automatically.":"Could not load your records. Try again."}}finally{t===this.generation&&(this.loading=!1,this.recordsLoading=!1,this.changed())}t===this.generation&&this.ready&&await this.flush()}}async signIn(){if(this.loading)return!1;const e=this.generation;this.error="",this.browserHelp=!1,this.loading=!0,this.changed();try{const t=await Zo(ii,new ce,Dc);return e===this.generation&&await this.load(t.user),!0}catch(t){const s=t.code;return e!==this.generation||(this.browserHelp=["auth/popup-blocked","auth/operation-not-supported-in-this-environment","auth/web-storage-unsupported"].includes(s||""),this.error=s==="auth/popup-closed-by-user"||s==="auth/cancelled-popup-request"?"Sign-in cancelled. Continue with Google when you are ready.":s==="auth/popup-blocked"?"Your browser blocked Google sign-in. Allow pop-ups, or copy the link and open it in Safari or Chrome.":s==="auth/network-request-failed"?"Google could not connect. Check your connection and try again.":"Google sign-in could not finish. Open this page in Safari or Chrome and try again.",this.loading=!1,this.changed()),!1}}async signOut(){await Vo(ii)}async retry(){!this.user||this.loading||this.recordsLoading||(!this.ready||!this.recordsReady?await this.load(this.user):await this.flush())}record(e,t,s,n,r=(a=>(a=this.user)==null?void 0:a.uid)()??null){var c,p;const o={id:e,day:t.day,shots:structuredClone(s),inputMode:n,...t.options?{challenge:t.options}:{}};if(!r)return this.guest.record(o);if(r!==((c=this.user)==null?void 0:c.uid)){const f=new Ie(this.storage,`${Rt}.${r}`).record(e,t,s);if(f){const b=[...new Map([...this.storedQueue(r),o].map(m=>[m.id,m])).values()];this.memoryQueues.set(r,b);try{(p=this.storage)==null||p.setItem(this.key(r),JSON.stringify(b))}catch{}}return f}const l=this.progress.record(e,t,s);return l?(this.queue.push(o),this.saved=!1,this.cacheQueue(),this.flush(),l):null}saveGuest(e){if(!this.user||this.needsSignIn)return!1;const t=this.guest.claim(e,this.user.uid);return t?(this.progress.record(t.id,Mt(t),t.shots),this.queue.some(s=>s.id===t.id)||this.queue.push(t),this.saved=!1,this.cacheQueue(),this.changed(),this.flush(),!0):!1}flush(){if(this.syncing)return this.syncing;const e=this.generation,t=this.user;return!t||!this.ready||!this.recordsReady||!this.queue.length?Promise.resolve():(this.syncing=(async()=>{this.saving=!0,this.error="",this.changed();try{for(;this.queue.length&&e===this.generation;){const s=this.queue[0],{profile:n}=await this.request("/matches",t,s);if(e!==this.generation)return;this.guest.acknowledge(s.id,t.uid),this.queue=this.queue.filter(r=>r.id!==s.id),this.cacheQueue(),this.restore(n)}this.saved=!0}catch(s){e===this.generation&&(this.reauthenticationRequired=s instanceof Ue,this.reauthenticationRequired&&(this.ready=!1),this.error=this.reauthenticationRequired?s.message:"Your score has not synced yet. Keep this page open and retry saving.")}finally{e===this.generation&&(this.saving=!1,this.syncing=null,this.changed())}})(),this.syncing)}}async function bn(i,e){const t=mn.apiUrl;for(let s=0;s<2;s++){const n={"Content-Type":"application/json"};e&&(n.Authorization="Bearer "+await e.user.getIdToken(s>0));let r;try{r=await fetch(t+(e?"/leaderboard/submit":"/leaderboard"),{method:"POST",headers:n,body:JSON.stringify(e?{matchId:e.matchId,nickname:e.nickname}:{inputMode:i}),cache:"no-store",signal:AbortSignal.timeout(15e3)})}catch{throw new Error("Leaderboard offline. Your saved score is safe; try again.")}if(r.status===401&&e&&s===0)continue;const a=await r.json();if(!r.ok)throw new Error(r.status===401?"Sign in with Google again to submit.":a.error||"Leaderboard unavailable. Try again.");if(!Array.isArray(a.entries))throw new Error("Leaderboard unavailable. Try again.");return a}throw new Error("Sign in with Google again to submit.")}async function Gc(i){if(navigator.share)try{return await navigator.share(i),"shared"}catch(e){if(e.name==="AbortError")return"cancelled"}try{return await navigator.clipboard.writeText(i.url),"copied"}catch{return"manual"}}function N(i,e={}){var t;try{(t=window.gtag)==null||t.call(window,"event",i,{...e,game:"cricket",send_to:"G-8C3YMXDYVQ",transport_type:"beacon"})}catch{}}function Wc(i,e,t,s){var n,r;return{match_id:t,input_mode:s,target:e.target,seed:e.seed,day:e.day,score:i.score,balls:i.shots.length,ruleset:"match-formats-v3",match_mode:i.mode,overs:i.overs,field_plan:i.tactics.kind,challenge_version:((n=e.options)==null?void 0:n.version)??1,target_assist:((r=e.options)==null?void 0:r.assist)??0}}function jc(i,e,t){var s,n;if(i.type==="result"){const r=i.shot,a={...t,ball:e.shots.length,family:r.family??"none",runs:r.runs,loft:r.loft??((s=e.stroke)==null?void 0:s.lift)??0,hit:r.hit,direction:r.direction,quality:r.quality,distance:Math.round(r.distance),speed:r.speed??((n=e.stroke)==null?void 0:n.speed)??0,dismissal:r.dismissal??"none",timing:r.timing};if(N("shot",a),r.dismissal?N("wicket",a):r.runs===4?N("four",a):r.runs===6&&N("six",a),e.shots.length%k.ballsPerOver===0){const o=e.shots.length/k.ballsPerOver;N("over_complete",{...t,over:o,runs:e.overScore[o-1]})}}else i.type==="complete"?N("match_complete",{...t,score:i.score,won:e.won}):i.type==="pause"&&N("pause",{...t,reason:i.reason})}/^\/cricket(?:\/index\.html)?\/?$/i.test(location.pathname)&&history.replaceState(history.state,"","/cricket/"+location.search+location.hash);document.querySelector("#app").innerHTML=`
  <header class="topbar">
    <a class="brand home-link" href="/" aria-label="ANTCRICKET Home"><span class="ant-badge">AI 3D</span> ANT<span class="accent">CRICKET</span></a>
    <div class="edition" id="edition">YOUR SWING. YOUR MATCH.</div>
    <div class="personal">Personal best <strong id="best-score">—</strong></div>
  </header>
  <main class="ground" id="ground" data-camera="false" aria-label="ANTCRICKET Arena cricket challenge">
    <canvas id="pitch" aria-label="Cricket pitch, bowler and batter"></canvas>
    <div class="vignette"></div><div class="boundary-frame" id="boundary-frame" aria-hidden="true"></div><div class="shot-readout" id="shot-readout" hidden><span id="shot-flight-name"></span><strong id="shot-metres">0 m</strong><span id="shot-flight-state">IN FLIGHT</span></div><div class="swipe-hint" id="swipe-hint" hidden>Swipe toward a gap when the cue turns green</div><svg id="swipe-guide" class="swipe-guide" aria-hidden="true" hidden><line id="swipe-line"/><circle id="swipe-start" r="6"/></svg>
    <div class="scoreboard" aria-label="Scoreboard">
      <div class="score"><strong id="score">0</strong><span>RUNS</span></div>
      <div><p class="over-label" id="over-label">TWO OVERS · TWELVE CHANCES</p><div class="balls" id="balls"></div><p class="challenge-status" id="challenge-status">12 BALLS TO MAKE IT COUNT</p><p class="last-ball" id="last-ball" hidden></p></div>
    </div>
    <div class="venue-label">ANTCRICKET ARENA<span>Camera batting · pick your gap</span></div>
    <section class="panel" id="panel" aria-labelledby="panel-title">
      <p class="eyebrow" id="panel-eyebrow">YOUR CAMERA. YOUR SWING.</p>
      <h1 id="panel-title">CHASE IT DOWN.</h1>
      <p class="panel-copy" id="panel-copy">Sit or stand. Swing with one hand or both and find the gaps. No bat needed.</p>
      <div class="coach" id="coach">
        <svg viewBox="0 0 160 78" aria-label="Move a hand toward a direction on the field map" role="img">
          <path d="M21 66V47q0-14 14-14h22q14 0 14 14v19M23 66v-8h40v8" class="coach-body"/>
          <circle cx="46" cy="17" r="10" class="coach-body"/>
          <path d="M30 41l-9 16M61 41l17-13M92 60l43-40m-15 0h15v15" class="coach-arrow"/>
          <g class="coach-hands"><circle cx="21" cy="57" r="5"/><circle cx="78" cy="28" r="5"/></g>
        </svg>
        <div><strong id="coach-title">YOUR SWING. YOUR WAY.</strong><span id="coach-copy">Swing sideways to place it. Lift for height; swing down to keep it low.</span></div>
      </div>
      <div class="summary-stats" id="summary-stats" hidden><div><strong id="summary-hits">0/12</strong><span>balls connected</span></div><div><strong id="summary-distance">0 m</strong><span>longest hit</span></div></div>
      <div class="target-card" id="challenge-goals"><span id="target-label">YOUR TARGET</span><strong id="target-number">24</strong><span class="target-unit" id="target-unit">runs</span><p id="target-caption">12 balls · pace then spin</p><div class="target-track" id="target-track" role="progressbar" aria-label="Runs toward target" aria-valuemin="0" aria-valuemax="24" aria-valuenow="0"><i id="target-progress"></i></div></div><p class="challenge-record" id="challenge-record"></p>
      <fieldset class="match-format" id="match-format"><legend id="format-legend">Choose your match</legend><label>Mode<select id="match-mode"><option value="chase">Target chase</option><option value="score">Score Attack · leaderboard</option></select></label><label>Length<select id="match-overs"><option value="1">1 over · 6 balls</option><option value="2" selected>2 overs · 12 balls</option><option value="5">5 overs · 30 balls</option></select></label><p id="format-caption">Reach the target to win. A fresh chase every match.</p></fieldset>
      <fieldset class="input-choice"><legend>How will you play?</legend><label><input type="radio" name="input-mode" value="camera" checked>Camera swing</label><label><input type="radio" name="input-mode" value="touch">Swipe to bat</label></fieldset><button class="primary" id="action" type="button" disabled>Preparing the ground…</button>
      <p class="privacy" id="privacy">Camera processing stays on this device. No video is uploaded.</p>
      <section class="save-result" id="save-result" aria-labelledby="save-title" hidden>
        <strong id="save-title">Save this score?</strong>
        <p id="save-copy">Sign in with Google to keep it across devices. You can skip and keep playing.</p>
        <div><button class="quiet save-google" id="account-signin" type="button">Save with Google</button><button class="quiet" id="skip-signin" type="button">Skip for now</button></div>
      </section>
      <section class="publish-score" id="publish-score" aria-labelledby="publish-title" hidden><strong id="publish-title">Put your score on the board</strong><p>Google sign-in saves your result. Only your chosen nickname and score appear publicly.</p><label for="board-nickname">Public nickname</label><input id="board-nickname" type="text" minlength="2" maxlength="20" autocomplete="off" placeholder="Choose a nickname" aria-describedby="nickname-help"/><p id="nickname-help">2–20 letters, numbers, spaces, dots or dashes. Start with a letter.</p><button class="quiet save-google" id="publish-button" type="button">Sign in & submit score</button><button class="quiet" id="skip-publish" type="button">Skip for now</button><p id="publish-status" role="status"></p></section>
      <details class="leaderboard" id="leaderboard"><summary>Two-over leaderboard</summary><p>Score Attack · 12 balls · same starting challenge. Camera and swipe have separate standings.</p><label>Show standings<select id="board-input"><option value="camera">Camera swing</option><option value="touch">Swipe to bat</option></select></label><ol id="board-list" aria-label="Top 25 scores"></ol><p id="board-status" role="status"></p><button class="quiet" id="board-refresh" type="button">Refresh standings</button></details>
      <p class="account-note" id="account-status" role="status">Play now. Sign-in is optional after your match.</p>
      <button class="quiet" id="copy-login-link" type="button" hidden>Copy link to open in browser</button>
      <button class="quiet" id="retry-save" type="button" hidden>Retry saving</button>
      <button class="quiet" id="share-game" type="button">Share cricket</button>
      <p class="account-note" id="share-status" role="status"></p>
      <input class="share-link" id="share-link" aria-label="Cricket link to copy" readonly value="https://faizanshekh351.github.io/ant-cricket/" hidden />
      <p class="load-state" id="load-state" role="status">Loading ANTCRICKET Arena…</p>
    </section>
    <div class="callout" id="callout" hidden aria-live="polite" aria-atomic="true"><span class="result-value" id="result-value" hidden aria-hidden="true"></span><h2 id="callout-title"></h2><p id="callout-copy"></p><p class="result-note" id="result-note" hidden></p><span class="result-progress" id="result-progress" hidden aria-hidden="true"></span></div>
    <aside class="running-panel" id="running-panel" aria-label="Running between wickets" hidden>
      <div class="running-heading"><strong id="running-call">RUNNING</strong><span><b id="running-count">0</b> banked</span></div>
      <div class="running-view" id="running-view" aria-hidden="true"></div>
      <svg viewBox="0 0 240 56" role="img" aria-label="Both batters moving between the creases"><path class="run-strip" d="M34 7h172v42H34z"/><path class="run-creases" d="M36 7v42M204 7v42"/><g id="runner-0"><circle r="5"/><path d="M3 4l7 4"/></g><g id="runner-1"><circle r="5"/><path d="M-3 4l-7 4"/></g></svg>
      <p id="running-state">Automatic running is on</p>
      <div class="run-controls"><button id="call-run" type="button">Run another</button><button id="hold-run" type="button">Hold next</button></div>
      <span class="sr-only" id="running-announcement" aria-live="polite"></span>
    </aside>
    <div class="field-call" id="field-call" hidden role="status"><strong id="field-call-title"></strong><span id="field-call-hint"></span></div>
    <aside class="placement" id="placement" aria-label="Shot direction and field positions">
      <div class="placement-top">TOWARD BOWLER <span>↑</span></div>
      <canvas id="field-map" width="220" height="230" aria-label="Field map: amber fielders, lime direction, white ball"></canvas>
      <div class="placement-bottom">↓ BEHIND WICKET</div>
      <strong id="shot-direction">Straight drive</strong><p id="field-status">Swing toward a gap</p>
    </aside>
    <aside class="camera-panel" id="camera-panel" hidden aria-label="Your camera and tracking status">
      <div class="camera-image"><video id="camera-video" autoplay playsinline muted></video><canvas id="skeleton" width="320" height="240"></canvas><div class="camera-label"><i></i>CAMERA ON</div></div>
      <div class="camera-caption" id="camera-caption">Allow camera access to begin.</div>
    </aside>
    <div class="timing" id="timing" hidden><div class="timing-label" id="timing-label">Watch the ball</div><div class="timing-track"><div id="timing-fill"></div></div></div>
  </main>
  <footer class="controls">
    <span class="bowling-plan">Pace → Spin</span>

    <label class="control-label"><span>Shot height</span><select id="shot-height" aria-label="Shot height"><option value="auto">Follow my swing</option><option value="0">Keep it down</option><option value="0.8">Loft it</option></select></label>
    <button class="quiet" id="help-open" type="button">How to play</button>
    
    <div class="control-spacer"></div>
    <button class="quiet" id="pause-play" type="button" hidden>Pause</button>
    <button class="quiet" id="account-signout" type="button" hidden>Sign out</button>
    <details class="settings"><summary>Settings</summary><div class="settings-menu">    <label class="control-label"><span>Batting</span><select id="handedness" aria-label="Batting hand"><option value="right">Right-handed</option><option value="left">Left-handed</option></select></label><label>Sound<input id="sound" type="checkbox" checked></label><label>Commentary<input id="commentary" type="checkbox" checked></label><label class="control-label"><span>View</span><select id="game-view" aria-label="Camera view"><option value="broadcast">Broadcast</option><option value="eyes">Eyes / hands and bat</option><option value="tactical">Tactical wide</option></select></label><p class="voice-status" id="voice-status">Ready when you play</p><label>Show crowd<input id="crowd" type="checkbox" checked></label><label>Reduce motion<input id="reduce-motion" type="checkbox"></label><button class="quiet camera-off" id="camera-off" type="button" hidden>Turn camera off</button></div></details>
  </footer>
  <dialog class="help" id="help-dialog" aria-labelledby="help-title"><button class="quiet" id="help-close" type="button" aria-label="Close instructions">Close</button><p class="eyebrow">SIT OR STAND</p><h2 id="help-title">PICK A GAP. TIME YOUR SWING.</h2><p><strong>Swipe mode:</strong> choose Swipe to bat, then swipe on the pitch when the cue is green. Release to play the shot. Longer swipes add power; swipe slightly upward toward either side to loft it. The height control can force ground or loft. No camera needed.</p><ol><li>Keep your upper body and at least one hand in camera view. Sit, stand or turn side-on; no stance to hold.</li><li>Swing with either hand or both, together or apart. Swing left or right to place the ball on that side. A downward arm swing plays forward or square; raising the swing adds loft. The camera estimates placement from your arm movement.</li><li>Lift your swing for an aerial shot, or sweep level to keep it lower. You can also choose Keep it down or Loft it. A firmer swing gives more power.</li><li>Watch the ball and swing when SWING NOW appears. Keep moving between shots. Play resumes when the camera sees you again.</li></ol><p>Fielders chase and return the ball. Your batters run automatically when a gap leaves time, up to three completed runs. Run another commits one extra run and can risk a run-out; Hold next stops new runs after the current one. Settings offers Broadcast, Eyes (hands and bat while batting), and Tactical wide views. Eyes view switches wide after your shot so you can follow the running. A catch scores zero; a run-out keeps completed runs. Four if the ball touches the ground inside before reaching the boundary; six if it reaches the boundary on the full. Passing high over the rope alone is not a score. Choose a 1, 2 or 5-over target chase. Reaching the target wins immediately after the scoring signal. Or choose two-over Score Attack: play all 12 balls and try for the highest score. Pace and spin alternate between overs. The captain moves fielders after your shots, so watch the amber markers between balls. Repeated shots draw extra cover. Change direction or loft over the ring. Each match has a new target and bowling order. After consecutive chase losses, the next target eases in proportion to the match length. Score Attack always starts with the same challenge. The captain responds to your completed shots. Each ball is a fresh batting attempt; a wicket does not end your match. Play without an account. After a chase, choose Save with Google or Skip for now. After Score Attack, choose a public nickname and sign in with Google to submit to the leaderboard, or skip and play again. Camera and swipe scores have separate boards.</p><p>Keep hands empty. No video is uploaded. Guest scores stay on this device. Sign in after a match to save that score across devices.</p><button class="primary" id="help-done" type="button">Got it</button></dialog>
`;const g=i=>document.getElementById(i),v=(i,e)=>{const t=g(i);t.textContent!==e&&(t.textContent=e)};let h=new Kn;const re=new Jn;let yn=null;try{yn=localStorage}catch{}const Dt=new wr(yn);let W={mode:"chase",overs:2},ke=Dt.next(crypto.randomUUID(),new Date,W),H=ke.challenge,O="camera";h.configureFormat(W.mode,W.overs);h.configureChallenge(H.seed,H.target);let de=new Ie(null),T,Ye=null,D="",pi="";const B=new sr,Kc=new tr(g("field-map"));let Y=!1,Li="",Ge=!1,We=!1,Tt="",vn="",bt=0,Ut=0;const si=g("camera-video"),Yc=g("skeleton"),G=Yc.getContext("2d"),gi=g("handedness"),zt=g("action");let C=null,_e=!1,we=!1,se=!1,$="",Be=0,w=null,Oe=-1/0,Di=-1/0,Xe="right",Ft="",mi=!1,wn=!1,Ui=0,Bt=performance.now(),A=null;const J=window.antCommentary=new yr(i=>A==null?void 0:A.setDucked(i),i=>{v("voice-status",i==="ready"?"Commentary ready":i==="loading"?"Loading commentary…":"Commentary unavailable. Match sounds still work.")});let K=null,Fi="",it=0,Fe=null,bi=.08,yi=1/30;v("best-score",de.best?`${de.best} runs`:"—");function Bi(){g("balls").innerHTML=Array.from({length:h.overs},(i,e)=>`<div class="over-balls" aria-label="Over ${e+1}"><span class="over-number">${e+1}</span>${Array.from({length:k.ballsPerOver},(t,s)=>`<span class="ball-chip" aria-label="Over ${e+1}, ball ${s+1}, not bowled"></span>`).join("")}</div>`).join(""),g("balls").dataset.long=String(h.overs>2)}Bi();const _n=new dr(document),Xc=new cr(document),Jc=new vr(document),X=()=>Wc(h,H,D,O);let vi=!1;function Zc(i){!D||vi||h.phase==="finished"||(vi=!0,N("quit",{...X(),reason:i,phase:h.phase}))}function zi(i){for(const e of i)jc(e,h,X())}function St(i){v("camera-caption",i),v("load-state",i)}const U=new Qn(si,{status:St,error(i){N("camera_error",{...X(),reason:i.slice(0,100)}),B.record("camera error",performance.now(),{message:i}),$=i,se=!1,w=null,h.pause("Camera tracking stopped. This ball will be bowled again."),re.clearMotion(),St(i),x()},pose(i,e){const t=performance.now(),s=(e-Oe)/1e3;s>0&&s<.22&&(yi=yi*.8+s*.2),bi=bi*.8+Math.max(0,Math.min(.22,(t-e)/1e3))*.2,Oe=e,B.pose(e,t);const n=w==null?void 0:w.valid,r=h.time-(t-e)/1e3,a=["idle","paused","finished"].includes(h.phase)||h.phase==="delivery"&&r>=h.contactTime-k.strokeLead-k.window;if(w=re.sample(i,e,si.videoWidth/Math.max(1,si.videoHeight),a),t-e>220&&(w.valid=!1,w.signal=null,w.message="Tracking is too slow. Improve lighting or close other busy apps."),w.valid&&(Di=e),!n&&w.valid&&B.record("tracking acquired",t,{inputMode:"free-swing",handedness:Xe}),n!==void 0&&n!==w.valid&&B.record(w.valid?"tracking recovered":"tracking lost",t,{reason:w.message}),St(w.message),g("camera-panel").dataset.ready=String(w.valid),Qc(i),w.signal&&w.valid&&(Ut=w.signal.direction,h.phase==="delivery"&&h.swingAt===null)){const o=h.swing(w.signal,h.time-(t-w.signal.timestamp)/1e3,h.time-(t-w.signal.onsetTimestamp)/1e3);N("swing_attempt",{...X(),ball:h.ballNumber,accepted:o,family:h.strokeFamily,loft:w.signal.lift,reason:h.lastSwingVerdict}),o&&(Fe=w.signal),Fi=o?"SWING REGISTERED":h.lastSwingVerdict==="too early"?"WAIT FOR GREEN":"TOO LATE · NEXT BALL",it=t+850,B.record("swing",t,{accepted:o,reason:h.lastSwingVerdict,ball:h.ballNumber,hand:w.signal.hand,speed:w.signal.speed,direction:w.signal.direction,lift:w.signal.lift,captureAgeMs:t-w.signal.timestamp,recognitionMs:w.signal.timestamp-w.signal.onsetTimestamp})}if(w.refinement&&w.valid&&h.phase==="delivery"&&w.refinement.hand===(Fe==null?void 0:Fe.hand)&&w.refinement.onsetTimestamp===Fe.onsetTimestamp){const o=w.refinement;h.refineSwing(o,h.time-(t-o.timestamp)/1e3)&&(Ut=h.stroke.direction,B.record("swing refined",t,{speed:h.stroke.speed,direction:h.stroke.direction,lift:h.stroke.lift,ball:h.ballNumber}))}x()}});function Qc(i){if(G.clearRect(0,0,320,240),!!i){G.lineWidth=2,G.strokeStyle=w!=null&&w.valid?"#c4ff36":"#ecc178";for(const[e,t]of[[11,12],[11,13],[13,15],[12,14],[14,16],[11,23],[12,24],[23,24]])!i[e]||!i[t]||(i[e].visibility??0)<.5||(i[t].visibility??0)<.5||(G.beginPath(),G.moveTo(i[e].x*320,i[e].y*240),G.lineTo(i[t].x*320,i[t].y*240),G.stroke());G.fillStyle="#f4f6e9";for(const e of[15,16])!i[e]||(i[e].visibility??0)<.5||(G.beginPath(),G.arc(i[e].x*320,i[e].y*240,4,0,Math.PI*2),G.fill())}}function el(i){document.hidden||(A==null||A.play(i),J.event(i,h))}async function tl(){const i=++Be,e=performance.now();B.record("camera requested",e),Y=!0,se=!0,$="",w=null,re.reset(),Oe=-1/0,Di=performance.now(),g("camera-panel").hidden=!1,g("camera-off").hidden=!1,g("ground").dataset.camera="true",x();try{await U.start(),i===Be&&U.running&&(B.record("camera ready",performance.now(),{startupMs:performance.now()-e}),N("camera_enable",{...X(),startup_ms:Math.round(performance.now()-e)}))}catch(t){if(i===Be){const s=!!$;$=Zn(t),St($),s||N("camera_error",{...X(),reason:$.slice(0,100)})}}finally{i===Be&&(se=!1,x())}}function wi(){var i;if(B.record(h.phase==="paused"?"resume":"challenge started",performance.now(),{inputMode:"free-swing",handedness:Xe}),$="",re.clearMotion(),Fe=null,A==null||A.beginMatch(h.phase!=="paused"),h.phase==="paused")h.resume(),N("resume",X());else{H=ke.challenge;const e=Ms(H);h.configureFormat(e.mode,e.overs),h.configureChallenge(H.seed,H.target),Bi(),D=ke.id,Ye=((i=T.user)==null?void 0:i.uid)??null,de=Ye?T.progress:T.guest.progress,Li="",pi="",h.start(),mi=!1,vi=!1,N("match_start",X()),h.mode==="chase"&&h.balls===12&&J.say("start")}Ft="",x()}function il(){if(we){location.reload();return}if(!(!_e||$t.open||document.hidden)){try{A??(A=new or(new AudioContext)),A.setEnabled(g("sound").checked),A.resume().catch(()=>{}),J.attach(A.audioContext)}catch{}if(O==="touch"){Y=!0,wi();return}if(!U.running&&!se&&!U.starting){tl();return}Y=!0,w!=null&&w.valid&&performance.now()-Oe<300&&wi()}}zt.addEventListener("click",il);g("camera-off").addEventListener("click",()=>{J.stop(),A==null||A.stop(),B.record("camera off",performance.now()),Be++,Y=!1,U.stop(),se=!1,$="",w=null,re.reset(),h.pause("Camera is off. Enable it to retry this ball."),g("camera-panel").hidden=!0,g("camera-off").hidden=!0,g("ground").dataset.camera="false",G.clearRect(0,0,320,240),x()});gi.addEventListener("change",()=>{Xe=gi.value==="left"?"left":"right",h.battingLeft=Xe==="left",x()});g("shot-height").addEventListener("change",i=>{const e=i.target.value;re.lift=e==="auto"?null:Number(e)});const $t=g("help-dialog");g("sound").addEventListener("change",i=>{A==null||A.setEnabled(i.target.checked),J.setEnabled(i.target.checked&&g("commentary").checked),A==null||A.resume().catch(()=>{}),i.target.checked&&!["idle","paused","finished"].includes(h.phase)&&(A==null||A.beginMatch(!1))});g("commentary").addEventListener("change",()=>J.setEnabled(g("sound").checked&&g("commentary").checked));g("help-open").addEventListener("click",()=>{Y=!1,J.stop(),h.pause("Take a moment. This ball will be bowled again."),$t.showModal(),x()});for(const i of["help-close","help-done"])g(i).addEventListener("click",()=>$t.close());g("crowd").addEventListener("change",i=>C==null?void 0:C.setCrowd(i.target.checked));g("reduce-motion").checked=matchMedia("(prefers-reduced-motion: reduce)").matches;g("ground").dataset.reduced=String(g("reduce-motion").checked);g("reduce-motion").addEventListener("change",i=>{const e=i.target.checked;C==null||C.setReducedMotion(e),g("ground").dataset.reduced=String(e)});document.addEventListener("visibilitychange",()=>{if(document.hidden){Y=!1,J.stop(),K=null,g("swipe-guide").hidden=!0,h.pause("Welcome back. This ball will be bowled again.");const i=h.drainEvents();zi(i),Tn.push(...i),re.clearMotion(),A==null||A.stop()}Bt=performance.now(),x()});document.querySelectorAll('[name="input-mode"]').forEach(i=>i.addEventListener("change",()=>{["idle","finished","paused"].includes(h.phase)&&(O=i.value==="touch"?"touch":"camera",O==="touch"&&N("swipe_mode",X()),Be++,U.stop(),se=!1,$="",w=null,Y=!1,re.reset(),K=null,J.stop(),g("camera-panel").hidden=!0,g("camera-off").hidden=!0,g("ground").dataset.camera="false",g("swipe-guide").hidden=!0,h.phase==="paused"?(Y=!0,wi()):x())}));g("game-view").addEventListener("change",()=>{const i=g("game-view").value;C==null||C.setView(i),N("view_selected",{...X(),view:i})});function In(i){if(h.phase!=="flight"||!h.hit||h.phaseTime<=.6)return;(i==="run"?h.field.callRun():h.field.holdRuns())&&N("running_call",{...X(),command:i,completed:h.field.completed}),x()}g("call-run").addEventListener("click",()=>In("run"));g("hold-run").addEventListener("click",()=>In("hold"));g("pause-play").addEventListener("click",()=>{Y=!1,J.stop(),K=null,g("swipe-guide").hidden=!0,h.pause("Your match is paused. Resume when you are ready."),x()});const j=g("pitch");j.addEventListener("pointerdown",i=>{if(O!=="touch"||!i.isPrimary||i.button!==0||h.phase!=="delivery"||h.swingAt!==null)return;K={id:i.pointerId,x:i.clientX,y:i.clientY,time:performance.now()},j.setPointerCapture(i.pointerId),i.preventDefault();const e=j.getBoundingClientRect(),t=i.clientX-e.left,s=i.clientY-e.top;g("swipe-guide").hidden=!1;for(const[n,r]of Object.entries({x1:t,y1:s,x2:t,y2:s}))g("swipe-line").setAttribute(n,String(r));g("swipe-start").setAttribute("cx",String(t)),g("swipe-start").setAttribute("cy",String(s))});j.addEventListener("pointermove",i=>{if(!K||i.pointerId!==K.id)return;const e=j.getBoundingClientRect();g("swipe-line").setAttribute("x2",String(i.clientX-e.left)),g("swipe-line").setAttribute("y2",String(i.clientY-e.top))});j.addEventListener("pointerup",i=>{if(!K||i.pointerId!==K.id)return;const e=K;if(K=null,g("swipe-guide").hidden=!0,j.hasPointerCapture(i.pointerId)&&j.releasePointerCapture(i.pointerId),performance.now()-e.time>700||h.phase!=="delivery")return;const t=Yn(i.clientX-e.x,i.clientY-e.y,j.clientWidth,j.clientHeight,re.lift);if(!t)return;const s=h.swing(t);Ut=t.direction,N("swing_attempt",{...X(),ball:h.ballNumber,accepted:s,family:h.strokeFamily,loft:t.lift,reason:h.lastSwingVerdict}),Fi=s?"SHOT REGISTERED":h.lastSwingVerdict==="too early"?"WAIT FOR GREEN":"TOO LATE · NEXT BALL",it=performance.now()+750,x()});j.addEventListener("pointercancel",()=>{K=null,g("swipe-guide").hidden=!0});j.addEventListener("lostpointercapture",()=>{K=null,g("swipe-guide").hidden=!0});function x(){var n,r,a,o,l;const i=O==="touch"||!!(w!=null&&w.valid)&&performance.now()-Oe<300,e=["idle","paused","finished"].includes(h.phase)||$||!_e;g("panel").hidden=!e,g("callout").hidden=!!e||!["result","interval"].includes(h.phase),g("timing").hidden=!!e||!["countdown","windup","delivery"].includes(h.phase)&&performance.now()>it,g("summary-stats").hidden=h.phase!=="finished",g("match-format").hidden=!["idle","finished"].includes(h.phase),g("leaderboard").hidden=!["idle","finished"].includes(h.phase),v("format-legend",h.phase==="finished"?"Your next match":"Choose your match"),v("edition",`${h.overs} OVER${h.overs===1?"":"S"} · ${h.mode==="score"?"SCORE ATTACK":"TARGET CHASE"}`),v("format-caption",W.mode==="score"?"Twelve balls. Highest score wins a place on the board.":`Reach ${ke.challenge.target} to win. ${W.overs*6} balls maximum.`),g("challenge-goals").hidden=h.phase==="paused",g("challenge-record").hidden=h.phase==="paused",gi.disabled=!["idle","finished","paused"].includes(h.phase),g("shot-height").disabled=["windup","delivery","collecting","flight"].includes(h.phase),g("coach").hidden=!0,v("coach-title","YOUR SWING. YOUR WAY."),v("coach-copy","One hand or both. Swing sideways to place it. Lift for height; swing down to keep it low."),g("ground").dataset.overlay=String(!!e),g("ground").dataset.input=O,g("ground").dataset.phase=h.viewPhase,g("ground").dataset.fieldShift=String(h.viewPhase==="countdown"&&h.field.setting),g("pause-play").hidden=!!e,g("swipe-hint").hidden=O!=="touch"||!!e||h.phase!=="countdown",document.querySelectorAll('[name="input-mode"]').forEach(c=>{c.disabled=!["idle","finished","paused"].includes(h.phase);c.checked=(c.value===O)});const t=h.viewPhase==="flight"&&h.hit;g("shot-readout").hidden=!t,t&&(v("shot-flight-name",h.field.returning?"Fielder’s return":ji(h.strokeFamily,(n=h.stroke)==null?void 0:n.lift)),v("shot-metres",h.field.returning?h.field.completed+" RUN"+(h.field.completed===1?"":"S"):Math.round(h.shotDistance)+" m"),v("shot-flight-state",h.field.returning?h.field.retreating?"SENT BACK":h.field.runsInProgress?"MAKING THE CREASE":"RETURN TO THE KEEPER":h.field.runsInProgress?"RUNNING · "+h.field.completed+" COMPLETED":h.ball.y>.3?"IN THE AIR":"ALONG THE GROUND")),v("privacy",O==="touch"?"No camera needed. Play first, save your score after.":"Camera processing stays on this device. No video is uploaded.");const s=((r=h.stroke)==null?void 0:r.direction)??(w==null?void 0:w.direction)??Ut;if(v("shot-direction",h.stroke?ji(h.strokeFamily,h.stroke.lift):er(s,Xe==="left")),v("field-status",h.viewPhase==="flight"?h.field.status:h.keeperCollecting?h.deliveryWicketBroken?"Ball struck the stumps":"Keeper collecting":"Amber dots are fielders · find a gap"),Kc.draw(h,s),g("field-call").hidden=h.viewPhase!=="countdown"||!h.shots.length,v("field-call-title",h.tactics.label),v("field-call-hint",h.tactics.hint),v("score",String(h.score)),h.phase==="finished"&&!mi){B.record("challenge finished",performance.now(),{score:h.score,hits:h.shots.filter(p=>p.hit).length}),mi=!0,Y=!1;const c=T.record(D,H,h.shots,O,Ye);h.mode==="chase"&&Dt.complete(D,h.score,H.target),ke=Dt.next(crypto.randomUUID(),new Date,W),pi=h.won?"TARGET CHASED":c!=null&&c.newBest?"NEW PERSONAL BEST":"INNINGS COMPLETE",v("publish-status",""),v("best-score",`${de.best} runs`)}if(e){const c=h.phase==="finished",p=h.phase==="paused";v("panel-eyebrow",we?"GROUND UNAVAILABLE":c?pi:p?"PLAY ON HOLD":U.running?"CAMERA BATTING":"YOUR CAMERA. YOUR SWING."),v("panel-title",we?"LET’S RELOAD.":c?h.mode==="score"?"THAT’S YOUR SCORE.":h.won?"CHALLENGE WON.":"GO AGAIN?":p?"READY WHEN YOU ARE.":h.mode==="score"?"MAKE EVERY BALL COUNT.":"CHASE IT DOWN."),v("panel-copy",we?"The ground could not finish loading. Reload to try again.":$||(c?h.mode==="score"?`${h.score} runs from 12 balls. ${st(h.shots).sixes} sixes. Submit it to the ${O==="camera"?"camera":"swipe"} leaderboard below.`:h.won?`${h.score} runs. You won with ${h.balls-h.shots.length} balls to spare. Pick your next challenge below.`:`${h.score} runs — ${H.target-h.score} short. Find a gap and release your swing on the green cue.`:p?h.pauseReason:O==="touch"?"Swipe on the pitch when the cue turns green. Longer swipes hit harder. A slight upward swipe adds loft.":"Sit or stand. Swing with either hand when the cue turns green. Lift toward a side to send it over the rope."));const d=W.mode==="score"?"Play Score Attack":`Play ${W.overs} over${W.overs===1?"":"s"} · chase ${ke.challenge.target}`;v("action",we?"Reload ground":_e?se||U.starting?"Starting camera…":p?"Resume match":c||O==="touch"?d:U.running?!i&&Y?"Looking for your hand…":d:$?"Retry camera":"Enable camera & play":"Preparing the ground…"),zt.disabled=!we&&(!_e||se||U.starting||O==="camera"&&U.running&&!i&&Y),g("load-state").hidden=_e&&!se&&!$&&(!U.running||i),c&&(v("summary-hits",`${h.shots.filter(f=>f.hit).length}/${h.shots.length}`),v("summary-distance",`${st(h.shots).longest} m`))}if(Ft!==h.phase){Ft=h.phase,h.phase==="countdown"&&(re.clearMotion(),it=0);const c=h.viewPhase==="result"?h.shots.length:h.ballNumber;v("over-label",h.phase==="finished"?h.won?"CHASE COMPLETE":"INNINGS COMPLETE":h.phase==="interval"?`OVER ${Math.floor(h.shots.length/6)} COMPLETE`:`OVER ${Math.ceil(c/6)} OF ${h.overs} · BALL ${(c-1)%6+1} OF 6`),h.phase==="windup"&&(A==null||A.prepareDelivery(),v("callout-title",""),v("callout-copy","")),h.phase==="delivery"&&(v("callout-title",""),v("callout-copy","")),h.phase==="flight"&&(v("callout-title",""),v("callout-copy","")),h.phase==="collecting"&&(v("callout-title",""),v("callout-copy","Ball through. Next ball coming."))}if(h.phase==="countdown"&&(v("timing-label",h.field.setting?"FIELD CHANGING":`GET READY \u00B7 ${Math.max(1,Math.ceil(h.countdownDuration-h.phaseTime))}`),g("timing").dataset.window="false",g("timing-fill").style.transform="scaleX(0)"),h.phase==="interval"){const c=h.plan[h.overNumber-1],p=h.overNumber-2;v("callout-title",c.label.toUpperCase()+" UP NEXT"),v("callout-copy",`${h.overScore[p]} from ${h.plan[p].label.toLowerCase()}. ${c.hint} Over ${h.overNumber} in ${Math.max(1,Math.ceil(k.interval-h.phaseTime))}.`)}if(h.phase==="delivery"){const c=h.deliveries.spec(h.shots.length).contactTime-k.strokeLead,p=O==="touch"?.06:Math.max(.08,yi*2)+bi+.06,d=h.sweepCueOpen&&h.time<=h.contactTime-p;g("timing").dataset.window=String(d),g("timing-fill").style.transform=`scaleX(${Math.min(1,h.phaseTime/c)})`,v("timing-label",d?O==="touch"?"SWIPE NOW":"SWING NOW":(h.time<h.contactTime-k.strokeLead-k.window,"Watch the ball"))}else h.phase==="windup"&&(g("timing").dataset.window="false",g("timing-fill").style.transform="scaleX(0)",v("timing-label","Watch the bowler"));if(performance.now()<it&&(v("timing-label",Fi),g("timing").dataset.window=String(h.strokeWillHit)),Jc.update(h,H,de),_n.update(h,g("reduce-motion").checked),Xc.update(h),T){const c=((o=(a=T.user)==null?void 0:a.displayName)==null?void 0:o.split(" ")[0])||"Player";v("best-score",de.best?`${de.best} runs`:"—");const p=h.phase==="finished",d=p&&T.guest.available(D),f=p&&Ye===((l=T.user)==null?void 0:l.uid)&&T.pending>0,b=p&&Li!==D&&(d||f&&T.needsSignIn),m=T.guest.persistent&&T.guest.progress.persistent,y=p&&h.mode==="score";g("save-result").hidden=!b||y,g("publish-score").hidden=!y||vn===D,g("publish-button").disabled=We||T.loading||Tt===D,v("publish-button",We?"Saving & submitting…":Tt===D?"Score submitted":T.needsSignIn?"Sign in & submit score":"Submit score"),g("board-nickname").disabled=We||Tt===D,v("save-title",d?"Save this score?":"Finish saving your score?"),v("save-copy",d?"Sign in with Google to keep it across devices. You can skip and keep playing.":"Sign in again to sync your score. You can skip and keep playing."),v("account-signin",Ge||T.loading?"Connecting…":T.needsSignIn?"Save with Google":"Save score to my account"),g("account-signin").disabled=Ge||T.loading,v("account-status",d&&!Ge&&!T.error?m?"Score saved on this device.":"Score kept for this visit. Device storage is unavailable.":p&&T.error?T.error:T.saving?"Saving your score…":T.pending?`${T.pending} match${T.pending===1?"":"es"} waiting to sync.`:T.saved?"Score saved to your account.":T.user?`Signed in as ${c}. Your next scores save automatically.`:"Play now. Sign-in is optional after your match."),g("retry-save").hidden=!p||!T.user||T.needsSignIn||!T.error,g("copy-login-link").hidden=!b||!T.browserHelp,g("retry-save").disabled=T.saving||T.recordsLoading,g("account-signout").hidden=!T.user||!["idle","finished"].includes(h.phase),g("account-signout").disabled=T.loading||T.saving,v("share-game",p?"Share score":"Share cricket")}}const Tn=[];function Sn(i){if(wn)return;const e=(i-Bt)/1e3;if(Bt=i,!document.hidden){["idle","paused","finished"].includes(h.phase)||B.frame(e*1e3),O==="camera"&&Y&&_e&&U.running&&!se&&!$&&!$t.open&&["idle","paused","finished"].includes(h.phase)&&(w==null?void 0:w.valid)&&i-Oe<300&&wi(),O==="camera"&&(U.running||U.starting)&&h.phase==="countdown"&&h.phaseTime>1.5&&(i-Oe>3500||i-Di>3500)&&h.pause("Camera cannot see a hand. Bring either hand into view to retry this ball."),h.advance(e),A==null||A.running(h);const s=h.drainEvents();zi(s);for(const n of[...Tn.splice(0),...s])n.type==="result"?B.record("result",i,{...n.shot,ball:h.shots.length}):n.type==="pause"?B.record("pause",i,{reason:n.reason}):B.record(n.type,i,{ball:h.ballNumber,simulationTime:h.time}),C==null||C.event(n,h.ball),el(n);C==null||C.render(h,e,Xe),x()}Ui=requestAnimationFrame(Sn)}async function sl(){try{const{CricketScene:i}=await On(async()=>{const{CricketScene:e}=await import("./CricketScene-CavlwYGC.js");return{CricketScene:e}},[]);C=new i(g("pitch")),window.antScene=C,window.antGame=h,C.onContextLost=()=>{h.pause("Graphics were interrupted. Reload the ground to continue."),U.stop(),_e=!1,we=!0,x()},await C.load(),C.setBowlingStyle(h.bowlingStyle),C.setView(g("game-view").value),C.setCrowd(g("crowd").checked),C.setReducedMotion(g("reduce-motion").checked),_e=!0,v("load-state","Ground ready."),x(),Bt=performance.now(),Ui=requestAnimationFrame(Sn)}catch(i){we=!0,C==null||C.dispose(),v("load-state",i instanceof Error?i.message:"The ground could not load."),x()}}window.addEventListener("pagehide",()=>{zi(h.drainEvents()),Zc("pagehide"),wn=!0,cancelAnimationFrame(Ui),U.stop(),C==null||C.dispose(),A==null||A.dispose(),J.dispose(),_n.dispose()});window.addEventListener("pageshow",i=>{i.persisted&&location.reload()});g("retry-save").addEventListener("click",()=>{T.retry()});g("account-signin").addEventListener("click",async()=>{if(h.phase!=="finished"||Ge)return;const i=D;Ge=!0,x();try{if(T.needsSignIn&&!await T.signIn())return;T.guest.available(i)?T.saveGuest(i):T.retry()}finally{Ge=!1,x()}});g("skip-signin").addEventListener("click",()=>{Li=D,x(),zt.focus()});g("copy-login-link").addEventListener("click",async()=>{try{await navigator.clipboard.writeText("https://faizanshekh351.github.io/ant-cricket/"),v("share-status","Link copied. Paste it into Safari or Chrome, then continue with Google.")}catch{const i=g("share-link");i.hidden=!1,i.focus(),i.select(),v("share-status","Copy the selected link and open it in Safari or Chrome.")}});g("account-signout").addEventListener("click",()=>{T.signOut().catch(()=>v("account-status","Could not sign out. Please try again."))});g("share-game").addEventListener("click",async()=>{const i=g("share-game");i.disabled=!0;const e=h.phase==="finished"?`I scored ${h.score} runs in ANTCRICKET. Can you beat it?`:"Your swing. Your match. Play ANTCRICKET.",t=await Gc({title:"ANTCRICKET",text:e,url:"https://faizanshekh351.github.io/ant-cricket/"});v("share-status",t==="copied"?"Cricket link copied.":t==="manual"?"Copy this link to share cricket.":"");const s=g("share-link");s.hidden=t!=="manual",s.hidden||(s.focus(),s.select()),i.disabled=!1});T=new qc(()=>{var i;(!D||Ye===((i=T.user)==null?void 0:i.uid))&&(de=T.user?T.progress:T.guest.progress),x()});de=T.guest.progress;function kn(){if(!["idle","finished"].includes(h.phase))return;const i=g("match-mode").value,e=g("match-overs");i==="score"&&(e.value="2"),e.disabled=i==="score",W={mode:i,overs:Number(e.value)},ke=Dt.next(crypto.randomUUID(),new Date,W),h.phase==="idle"&&(H=ke.challenge,h.configureFormat(i,W.overs),h.configureChallenge(H.seed,H.target),Bi(),Ft=""),x()}g("match-mode").addEventListener("change",kn);g("match-overs").addEventListener("change",kn);function nl(i){const e=g("board-list");e.replaceChildren();for(const t of i.entries){const s=document.createElement("li"),n=document.createElement("span"),r=document.createElement("strong"),a=document.createElement("small");n.textContent=t.nickname,r.textContent=t.score+" runs",a.textContent=t.sixes+" sixes",s.append(n,r,a),e.append(s)}v("board-status",i.entries.length?"Top 25 · one best score per player. Ties use sixes, then earliest score.":"No scores yet. Play Score Attack and set the first mark.")}async function Ht(){const i=++bt;g("board-refresh").disabled=!0,v("board-status","Loading standings…");try{const e=await bn(g("board-input").value);i===bt&&nl(e)}catch(e){i===bt&&(g("board-list").replaceChildren(),v("board-status",e instanceof Error?e.message:"Could not load standings. Try again."))}finally{i===bt&&(g("board-refresh").disabled=!1)}}g("leaderboard").addEventListener("toggle",()=>{g("leaderboard").open&&Ht()});g("board-refresh").addEventListener("click",()=>{Ht()});g("board-input").addEventListener("change",()=>{Ht()});g("skip-publish").addEventListener("click",()=>{vn=D,x(),zt.focus()});g("publish-button").addEventListener("click",async()=>{if(We||h.phase!=="finished"||h.mode!=="score")return;const i=g("board-nickname").value.trim();if(!new RegExp("^\\p{L}[\\p{L}\\p{N} _.-]{1,19}$","u").test(i)){v("publish-status","Choose a nickname using 2–20 letters, numbers, spaces, dots or dashes. Start with a letter."),g("board-nickname").focus();return}const e=D,t=Ye,s=O;We=!0,v("publish-status",""),x();try{if(T.needsSignIn&&!await T.signIn())return;const n=await T.saveForLeaderboard(e,t),r=await bn(s,{user:n,matchId:e,nickname:i});Tt=e,D===e&&v("publish-status",r.rank?`Submitted. Your best is #${r.rank} on the ${s==="camera"?"camera":"swipe"} board.`:"Score saved. Keep going for a place in the top 25."),g("leaderboard").open&&Ht(),N("leaderboard_submit",{game:"cricket",input_mode:s,match_id:e})}catch(n){D===e&&v("publish-status",n instanceof Error?n.message:"Score not submitted. Try again.")}finally{We=!1,x()}});sl();export{Q as B,al as D,Es as L,lr as M,Rs as R,Ct as a,hl as b,dl as c,qn as d,At as e,cl as f,k as g,ll as h,Kt as i,F as j,ol as l,ul as r};

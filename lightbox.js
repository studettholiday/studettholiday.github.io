(function(){
var imgs=[].slice.call(document.querySelectorAll('img[src*="photos/"]'));
if(!imgs.length)return;
var idx=0;
var ov=document.createElement('div');
ov.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.92);display:none;align-items:center;justify-content:center;z-index:1000;user-select:none';
var big=document.createElement('img');
big.style.cssText='max-width:92vw;max-height:88vh;border-radius:8px';
function mk(t,css){var b=document.createElement('div');b.textContent=t;b.style.cssText='position:absolute;color:#fff;cursor:pointer;font:700 44px/1 sans-serif;padding:16px;'+css;return b}
var prev=mk('‹','left:6px;top:50%;transform:translateY(-50%)');
var next=mk('›','right:6px;top:50%;transform:translateY(-50%)');
var close=mk('✕','top:6px;right:10px;font-size:28px');
var cnt=document.createElement('div');
cnt.style.cssText='position:absolute;bottom:14px;left:50%;transform:translateX(-50%);color:#fff;font:14px sans-serif';
ov.appendChild(big);ov.appendChild(prev);ov.appendChild(next);ov.appendChild(close);ov.appendChild(cnt);
document.body.appendChild(ov);
function show(i){idx=(i+imgs.length)%imgs.length;big.src=imgs[idx].src;cnt.textContent=(idx+1)+' / '+imgs.length;ov.style.display='flex'}
function hide(){ov.style.display='none'}
imgs.forEach(function(im,i){im.style.cursor='zoom-in';var t=im.closest('a')||im;t.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();show(i)})});
prev.onclick=function(e){e.stopPropagation();show(idx-1)};
next.onclick=function(e){e.stopPropagation();show(idx+1)};
close.onclick=hide;
ov.onclick=function(e){if(e.target===ov)hide()};
document.addEventListener('keydown',function(e){if(ov.style.display==='none')return;if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1);if(e.key==='Escape')hide()});
var sx=0;
ov.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
ov.addEventListener('touchend',function(e){var d=e.changedTouches[0].clientX-sx;if(d>40)show(idx-1);else if(d<-40)show(idx+1)},{passive:true});
})();

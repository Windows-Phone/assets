var Wdc=void 0===Wdc?{}:Wdc;Wdc.Cpub=void 0===Wdc.Cpub?{}:Wdc.Cpub,Wdc.Cpub.Common=void 0===Wdc.Cpub.Common?{}:Wdc.Cpub.Common,function(){function a(a){MscomCustomEvent("ms.InteractionType","100","ms.video.completionrate","0","cn",a+": video started")}function b(a){MscomCustomEvent("ms.InteractionType","103","ms.video.completionrate","100","cn",a)}Wdc.Cpub.Common.InitializeYoutubeVideos=function(){function c(a,b){return"<img class='img-responsive embed-responsive-item' src='"+a+"' alt='"+b+"'/>"}function d(){function c(){e=new YT.Player("player",{videoId:f,playerVars:{controls:1,modestbranding:1},events:{onReady:d}})}function d(c){var d=!1,f=!1,h=!1;c.target.playVideo();var i=e.getDuration();e.addEventListener("onStateChange",function(c){var j,k;1===c.data&&(a(g),k=setInterval(function(){j=(e.getCurrentTime()/i*100).toFixed(2),Math.floor(j)>=25&&!d&&(MscomCustomEvent("ms.InteractionType","101","ms.video.completionrate","25","cn",g),d=!0),Math.floor(j)>=50&&!f&&(MscomCustomEvent("ms.InteractionType","101","ms.video.completionrate","50","cn",g),f=!0),Math.floor(j)>=75&&!h&&(MscomCustomEvent("ms.InteractionType","101","ms.video.completionrate","75","cn",g),h=!0)},1e3)),0===c.data&&(b(g),clearInterval(k))})}var e,f=this.parentNode.dataset.id,g=this.parentNode.dataset.cn;c()}if("zh-cn"!==window.location.pathname.split("/")[1].toLowerCase()){var e=document.getElementsByClassName("yt-player"),f=e.length,g=document.createElement("script");$.getScript("https://www.youtube.com/iframe_api",function(a,b,c){"success"===b&&200===c.status&&g.setAttribute("src","https://www.youtube.com/iframe_api")});var h=document.getElementsByTagName("script")[0];h.parentNode.insertBefore(g,h);for(var i=0;i<f;i++){var j=document.getElementById("player");j.innerHTML=c(e[i].dataset.poster,e[i].dataset.alt),j.onclick=d,e[i].appendChild(j)}}},Wdc.Cpub.Common.InitializeHtml5Videos=function(){function c(){var c,d=!1,e=!1,f=!1,g=this.duration,h=this.dataset.cn;a(h),this.ontimeupdate=function(){c=(this.currentTime/g*100).toFixed(2),25!==Math.floor(c)||d||(MscomCustomEvent("ms.InteractionType","101","ms.video.completionrate","25","cn",h),d=!0),50!==Math.floor(c)||e||(MscomCustomEvent("ms.InteractionType","101","ms.video.completionrate","50","cn",h),e=!0),75!==Math.floor(c)||f||(MscomCustomEvent("ms.InteractionType","101","ms.video.completionrate","75","cn",h),f=!0)},this.addEventListener("ended",function(){b(h)})}for(var d=document.getElementsByTagName("video"),e=0;e<d.length;e++)d[e].addEventListener("play",c)},Wdc.Cpub.Common.InitializeHtml5VideoOnClick=function(){for(var a=document.getElementsByClassName("video-img"),b=function(a){var b="<video controls autoplay data-cn='"+a.getAttribute("data-cn")+"'><source src='"+a.getAttribute("data-video")+"' type='video/mp4'>"+a.getAttribute("data-fallback")+"</video>";a.style.display="none",a.parentNode.innerHTML=b,Wdc.Cpub.Common.InitializeHtml5Videos()},c=function(a){a.addEventListener("click",function(){b(this)}),a.addEventListener("keypress",function(a){13===a.keyCode&&b(this)})},d=0;d<a.length;d++)c(a[d])},Wdc.Cpub.Common.UpdateAccessibility=function(){var a=0;$("a, input, select, option, .video-img").each(function(){this.tabIndex=a++})}}(),$(function(){Wdc.Cpub.Common.InitializeYoutubeVideos(),Wdc.Cpub.Common.InitializeHtml5Videos(),Wdc.Cpub.Common.InitializeHtml5VideoOnClick(),Wdc.Cpub.Common.UpdateAccessibility()});
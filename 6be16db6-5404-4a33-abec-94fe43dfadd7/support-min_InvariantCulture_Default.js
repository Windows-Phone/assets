if(typeof Wdc==="undefined")Wdc={};if(typeof Wdc.Cpub==="undefined")Wdc.Cpub={};if(typeof Wdc.Cpub.support==="undefined")Wdc.Cpub.support={};var lpTag=lpTag||{};lpTag.vars=lpTag.vars||[];(function(w){"use strict";var a="hidden",l=".chatNowBtn",x="#lpButtonDiv",j="#lpButtonDiv a",f=".msame_Drop_active_right .msame_Drop_active_email",d=".msame_Drop_active_right .msame_Drop_active_name",m=".msame_Header_pic",e=".sign-in-chat",h="color",g="white",u="21661174",s="WW.EN.DS.WINDOWS-STORE-DEVELOPER",c="page",t="session",v="unit",r="language",q="1.User_Email",o="2.Full_Name",p="DS.WINDOWS-STORE-DEVELOPER",n="WW.EN",b="VARIABLE_VALUE";function k(){window.arrLPvars=[{scope:c,name:v,value:p},{scope:t,name:r,value:n},{scope:c,name:q,value:b},{scope:c,name:o,value:b}];lpTag.site=u;lpTag.section=s;lpTag.vars.push(arrLPvars)}function i(){var p=window.location.href.toLowerCase().split("/").indexOf("en-us")!==-1;if(p){var k,i,c,n=setInterval(function(){k=$(m);i=$(f);c=$(d);if(k.length>0&&i.length>0&&c.length>0){window.arrLPvars[2].value=$(f).text();window.arrLPvars[3].value=$(d).text();if(window.arrLPvars[2].value!==b&&window.arrLPvars[3].value!==b){lpTag.vars.push(arrLPvars);$(e).addClass(a);$(l).removeClass(a);$(j).css(h,g);clearInterval(n)}}},500);setTimeout(function(){clearInterval(n)},6e4)}else{$(e).addClass(a);var o=$("ul div.btn-group").siblings();$(o[2]).addClass(a)}}w.init=function(){k();i()}})(Wdc.Cpub.support);Wdc.Cpub.support.init()
var Wdc=Wdc||{};Wdc.Cpub=Wdc.Cpub||{},Wdc.Cpub.Blogs=Wdc.Cpub.Blogs||{},Wdc.Cpub.Blogs=function(){"use strict";function a(){for(var a in m)if(m.hasOwnProperty(a)){var b=m[a].replace("_InvariantCulture_Default","");o.push(b)}$.each(o,function(a,b){t.getXmlDocs(o[a])}),o.length>1&&t.buildBlogDropdownToggle()}function b(){a()}var c="",d=0,e=!1,f="all",g="hidden",h=".blog-link",i="#blogs-select",j=".blog-name",k="#latest-blogs-body",l=".network-error",m=$("#blog-cntr").data(),n=$("#blogs-select option").data().all,o=[],p=[],q=[],r=[],s={},t={createBlogEntries:function(a){var b=[],c=["January","February","March","April","May","June","July","August","September","October","November","December"],d=function(a){$.each(a,function(b,d){var e=a[b].title,f=a[b].link,g=a[b].creator,h=a[b].pubDate,i=new Date(h),j=c[i.getMonth()],l=i.getDate(),m=i.getFullYear(),n=$("<li class='blog-entry'></li>"),o=$("<div class='blog-entry-info'></div>"),p=$("<div class='blog-list'><a target='_blank' href='"+f+"'><div class='title'>"+e+"</div></a></div>"),q=$("<div class='date'><span>"+j+" "+l+", "+m+" </span> <span>"+g+"</span></div>");$(k).append(n.append(o.append(p).append(q)))})},e=function(a,c){$.each(s[a],function(d,e){d>=c||b.push(s[a][d])})};if(a===f||void 0===typeof s[a]){for(var g=0;g<p.length;g++)switch(p.length){case 1:e(p[g],6);break;case 2:e(p[g],3);break;case 3:e(p[g],2)}b.sort(function(a,b){return new Date(b.pubDate)-new Date(a.pubDate)}),d(b)}else d(s[a])},addChannelNameToDropDown:function(a){var b=$("<option value='"+a+"'>"+a+"</option>");$(i).append(b)},setupBlogEntries:function(a){return e?void $(l).removeClass(g):($.each(a,function(b,c){var d=a[b].getElementsByTagName("title")[0].textContent,e=a[b].getElementsByTagName("link")[1].textContent;r.push({name:d,link:e}),p.push(d);var f=a[b].getElementsByTagName("item");s[d]=[],$.each(f,function(a,b){var c={};c.title=f[a].getElementsByTagName("title")[0].textContent,c.link=f[a].getElementsByTagName("link")[0].textContent,c.pubDate=f[a].getElementsByTagName("pubDate")[0].textContent,c.creator=f[a].getElementsByTagNameNS("http://purl.org/dc/elements/1.1/","creator")[0].textContent,a>5||s[d].push(c)}),t.addChannelNameToDropDown(d)}),1===a.length&&$(h).attr("href",r[0].link).removeClass(g),void t.createBlogEntries(f))},getXmlDocs:function(a){d++,$.ajax({type:"GET",url:a,success:function(a){var b=a.getElementsByTagName("channel")[0];q.push(b)},error:function(){e=!0},complete:function(){d--,0===d&&t.setupBlogEntries(q)}})},buildBlogDropdownToggle:function(){$(i).removeClass(g);var a=$(j).text();$(i).on("change",function(){var b=this.value;$(k).html(c),t.createBlogEntries(b),$.each(r,function(c,d){return r[c].name===b?($(h).attr("href",r[c].link).removeClass(g),void $(j).html(n)):b===f?($(h).addClass(g),void $(j).html(a)):void 0})})}};return{init:b}}(),$(function(){Wdc.Cpub.Blogs.init()});
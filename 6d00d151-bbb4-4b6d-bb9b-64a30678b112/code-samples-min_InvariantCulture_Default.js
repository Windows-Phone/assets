var Wdc=Wdc||{};Wdc.Cx=Wdc.Cx||{},Wdc.Cx.Samples=Wdc.Cx.Samples||{},function(a){"use strict";function b(){B.createFilteredSamples()}function c(){B.createOptionElement(B.getUniqueSortedValues("Category"),j),B.createOptionElement(B.getUniqueSortedValues("Language"),k),B.createOptionElement(B.getUniqueSortedValues("Platform"),l)}function d(){var a,b=1e3,c=x;i.on("keyup",function(){var d=i.val().replace(/\s/g,x);d!==c&&(c=d,clearTimeout(a),a=setTimeout(B.createFilteredSamples,b))}).on("keypress",function(a){if(13===a.keyCode)return!1})}function e(){var a=[j,k,l];a.forEach(function(a){a.on("change",function(){B.createFilteredSamples()})})}function f(){t.on("click",function(a){a.preventDefault(),B.resetToDefault()}).on("keypress",function(a){13===a.keyCode&&B.resetToDefault()})}var g=window.codeSamplesData.Samples,h=$(".table tbody"),i=$("#searchBox"),j=$("#categorySelect"),k=$("#langugeSelect"),l=$("#platformSelect"),m=$(".resultCount"),n=$(".forLabel"),o=$(".searchLabel"),p=$(".categoryLabel"),q=$(".languageLabel"),r=$(".platformLabel"),s=$(".resetLabel"),t=$(".resetBtn"),u=$(".pagination"),v="hidden",w="active",x="",y=" ",z=12,A=1,B={getUniqueSortedValues:function(a){var b=[];return g.forEach(function(c){var d=c[a].split(y);d.forEach(function(a){$.inArray(a,b)===-1&&b.push(a)})}),b.sort()},createOptionElement:function(a,b){a.forEach(function(a){var c=$("<option value='"+a.toLowerCase()+"'>"+a.replace(/([A-Z][a-z])/g," $1")+"</option>");b.append(c)})},updateStatusUi:function(a,b){var c=[n,o,p,q,r,s];c.forEach(function(a){a.addClass(v)}),m.text(a),b.filter(function(a){return a.value!==x&&(n.removeClass(v),a.key.removeClass(v).children("span").text(a.value),void s.removeClass(v))})},renderTableRowsUi:function(a){var b=h.find("tr");b.filter(function(c){var d=$(b[c])[0].dataset.rownum;return parseInt(d)===parseInt(a)?$(b[c]).show():$(b[c]).hide()}),A=a},updatePageNumbersList:function(a,b,c,d){$(".pagination li").hasClass(w)&&$(".pagination li").removeClass(w),$(".pagination li[data-page-num='"+a+"']").addClass(w),$(".page").addClass(v);var e=[];if(b<=5){c.hide(),d.hide();for(var f=1;f<=b;f++)e.push(f)}else a<=2||a>=b-1?(c.show(),d.hide(),e.push(1,2,b-1,b)):(c.show(),d.show(),e.push(1,b),3===a?e.push(3,4,5):a===b-2?e.push(b-4,b-3,b-2):e.push(a-1,a,a+1));for(var g=0;g<e.length;g++)$("li.page[data-page-num='"+e[g]+"']").removeClass(v)},createPagination:function(a){u.html(x);var b=$("<li class='previous-pagination'><a href='#' aria-label='Previous'><span aria-label='true'></span></a></li>"),c=$("<li class='next-pagination'><a href='#' aria-label='Next'><span aria-label='true'></span></a></li>"),d=$("<li class='left-ellipsis-dots disabled' data-page-num='left-dots'><a href='#'>...</a></li>"),e=$("<li class='right-ellipsis-dots disabled' data-page-num='right-dots'><a href='#'>...</a></li>");u.append(b);for(var f=Math.ceil(a/z),g=1;g<=f;g++){u.append("<li class='page hidden' data-page-num='"+g+"'><a href='#'>"+g+"</a></li>"),f>6&&(2===g?u.append(d):g===f-1&&u.append(e))}u.append(c),B.updatePageNumbersList(1,f,d,e),$(".page").on("click",function(a){a.preventDefault();var b=$(this).data("page-num");B.updatePageNumbersList(b,f,d,e),B.renderTableRowsUi(b)}),$(".previous-pagination a").on("click",function(a){a.preventDefault(),1!==A&&(B.updatePageNumbersList(A-1,f,d,e),B.renderTableRowsUi(--A))}),$(".next-pagination a").click(function(a){a.preventDefault(),A<f&&(B.updatePageNumbersList(A+1,f,d,e),B.renderTableRowsUi(++A))})},ellipsisSampleText:function(a,b){a.each(function(a,c){var d=$(c).text();if(d.length<b)return!0;var e=d.substr(0,b)+"...";$(c).text(e)})},createTableUi:function(a){var b=1,c=0,d=1;if(h.html(x),0===a.length)return void u.html(x);a.forEach(function(a){++c;var d=$("<tr data-rowNum='"+b+"'></tr>"),e=$("<td class='nameEllipsis' title='"+a.Name+"'><a target='_blank' href='"+a.Url+"'>"+a.Name+"</a></td><td title='"+a.Description+"' class='ellipsis'>"+a.Description+"</td>");h.append(d.append(e)),12===c&&(b++,c=0)});var e=$(".ellipsis"),f=135,g=$(".nameEllipsis a"),i=60;B.ellipsisSampleText(e,f),B.ellipsisSampleText(g,i),B.renderTableRowsUi(d),B.createPagination(a.length),B.updateAccessibility()},createSearchResult:function(a){var b=a.replace(/[^\w\s]/gi,x).split(y),c=[];return g.filter(function(a){var d=a.Description.concat(a.Name).toLowerCase().replace(/[^\w\s]/gi,x);b.forEach(function(b){var e=d.match("\\b"+b+"\\b");null!==e&&$.inArray(a,c)===-1&&c.push(a)})}),c},createFilteredSamples:function(){var a=[],b=[],c=i.val().toLowerCase(),d=j.val().toLowerCase(),e=k.val().toLowerCase(),f=l.val().toLowerCase(),h=[{key:o,value:c},{key:p,value:d},{key:q,value:e},{key:r,value:f}];if(c===x&&d===x&&e===x&&f===x)return B.updateStatusUi(g.length,h),void B.createTableUi(g);if(c!==x&&(b=B.createSearchResult(c),0===b.length))return B.updateStatusUi(b.length,h),void B.createTableUi(b);var m=b.length>0?b:g,n=[{key:"Category",value:d},{key:"Language",value:e},{key:"Platform",value:f}].filter(function(a){return a.value!==x});return 0===n.length?(B.updateStatusUi(m.length,h),void B.createTableUi(m)):(m.filter(function(b){var c=0;n.forEach(function(d){var e=d.value.replace(/[^\w\s]/gi,x).split(y).filter(Boolean);e.forEach(function(e){$.inArray(e,b[d.key].toLowerCase().replace(/[^\w\s]/gi,x).split(y))!==-1&&(c++,n.length===c&&a.push(b))})})}),B.updateStatusUi(a.length,h),void B.createTableUi(a))},resetToDefault:function(){var a=[i,j,k,l];a.forEach(function(a){a.val(x)}),B.updateStatusUi(g.length,[]),B.createTableUi(g)},updateAccessibility:function(){var a=0;$("a, input, select, option").each(function(){this.tabIndex=a++}),$(".left-ellipsis-dots a, .right-ellipsis-dots a").removeAttr("tabindex")}};a.init=function(){b(),c(),d(),e(),f()}}(Wdc.Cx.Samples),$(function(){Wdc.Cx.Samples.init()});
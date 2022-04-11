!function(e){var r={};function t(o){if(r[o])return r[o].exports;var n=r[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=r,t.d=function(e,r,o){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:o})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=3)}([function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function e(){this.emptyString="",this.$dropdownSelect=$("#regionCountrySelect"),this.$table=$(".provider-table tbody"),this.$providerCountry=$(".provider-country"),this.$providerRegion=$(".provider-region"),this.$providerRegionSpan=$(".provider-region span"),this.$providerCountrySpan=$(".provider-country span"),this.$cTable=$(".c-table"),this.$regionCountrySelect=$("#regionCountrySelect"),this.classStringHidden="x-hidden",this.regionArray=[]}return e.prototype.generateTableRow=function(e,r){var t=void 0!==e.localization&&void 0!==e.localization[r]?e.localization[r].company:e.company,o=void 0!==e.localization&&void 0!==e.localization[r]?e.localization[r].link:e.link,n=-1!==e.link.indexOf("?")?o.split("?")[0]:o;return'\n         <tr>\n            <td>\n               <div data-grid="col-12">\n                  <div data-grid="col-2">\n                     <a target="_blank" title="'+t+'" href="'+o+'">\n                        <img class="c-image img-responsive" src="'+e.logo+'" alt="provider logo" />\n                     </a>\n                  </div>\n                  <div data-grid="col-1"></div>\n                  <div data-grid="col-8">\n                     <div><a target="_blank" href="'+o+'">'+t+"</a></div>\n                     <div>"+n+"</div>\n                  </div>\n               </div>\n            </td>\n         </tr>\n      "},e.prototype.updatePageCss=function(){this.$dropdownSelect.css("width","100%"),this.$cTable.css("overflow-x","hidden"),this.$regionCountrySelect.css({height:"36px",padding:"3px 0 3px 6px"})},e.prototype.getMatchedRegionProviders=function(e,r,t){var o=this,n=[];if(this.regionArray=[],e.forEach(function(e){r===e.region&&(n.push(e),-1===$.inArray(e.region,o.regionArray)&&o.regionArray.push(e.region))}),"country"===t)n.sort(function(e,r){var t=e.country.toLowerCase(),o=r.country.toLowerCase();return t<o?-1:t>o?1:0});else{n.sort(function(e,r){var t=e.company.toLowerCase(),o=r.company.toLowerCase();return t<o?-1:t>o?1:0});var i=[],a=[];n.forEach(function(e){-1===$.inArray(e.link,i)&&(i.push(e.link),a.push(e))}),n=a}return n},e.prototype.getMatchedLocaleProviders=function(e,r){var t=this,o=[];return this.regionArray=[],$.each(r,function(r,n){var i=n.locale.toLowerCase().split(",").filter(Boolean);-1!==$.inArray(e,i)&&(o.push(n),-1===$.inArray(n.region,t.regionArray)&&t.regionArray.push(n.region))}),o},e.prototype.getMatchedCountryProviders=function(e,r){var t=[];return e.forEach(function(e){r===e.country&&t.push(e)}),t.sort(function(e,r){var t=e.company.toLowerCase(),o=r.company.toLowerCase();return t<o?-1:t>o?1:0}),t},e.prototype.createTableUi=function(e){var r=this;this.$table.html(this.emptyString);var t=location.pathname.toLocaleLowerCase().split("/").filter(Boolean)[0];e.sort(function(e,r){var t=e.company.toLowerCase(),o=r.company.toLowerCase();return t<o?-1:t>o?1:0}),e.forEach(function(e){var o=r.generateTableRow(e,t);r.$table.append(o)})},e.prototype.updateProviderRegionUi=function(){this.$providerRegion.hasClass(this.classStringHidden)&&(this.$providerRegion.removeClass(this.classStringHidden),this.$providerCountry.addClass(this.classStringHidden));var e=String(this.regionArray.join(" & "));this.$providerRegionSpan.text(e)},e.prototype.updateProviderCountryUi=function(e){this.$providerCountry.hasClass(this.classStringHidden)&&(this.$providerRegion.addClass(this.classStringHidden),this.$providerCountry.removeClass(this.classStringHidden)),this.$providerCountrySpan.text(e)},e}();r.Helper=o},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=new(t(0).Helper),n=$("#regionCountrySelect"),i=void 0===window.navigator.language?"en-us":window.navigator.language.toLowerCase(),a="default";r.initPageCSSUpdates=function(){o.updatePageCss()},r.initDropdownData=function(e){var r=[],t=[];e.forEach(function(e){-1===$.inArray(e.region,r)&&r.push(e.region)}),r.sort(),r.forEach(function(r){var i='<option value="'+r+'" class="optGroupRegion" style="font-weight: 600;">'+r+'</option>")';n.append(i),o.getMatchedRegionProviders(e,r,"country").forEach(function(e){if(-1===$.inArray(e.country,t)&&e.country!==r){t.push(e.country);var o='<option value="'+e.country+'">&nbsp;&nbsp;&nbsp;'+e.country+'</option>")';n.append(o)}})})},r.initRecommendedProviders=function(e){var r=o.getMatchedLocaleProviders(i,e);o.updateProviderRegionUi(),o.createTableUi(r)},r.initFilter=function(e){n.on("change",function(){var r=this.value,t=$(this).find(":selected").hasClass("optGroupRegion");if(r===a){var n=o.getMatchedLocaleProviders(i,e);o.updateProviderRegionUi(),o.createTableUi(n)}else if(r!==a&&t){var s=o.getMatchedRegionProviders(e,r,"company");o.updateProviderRegionUi(),o.createTableUi(s)}else{var c=o.getMatchedCountryProviders(e,r);o.updateProviderCountryUi(r),o.createTableUi(c)}})}},function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function e(){}return e.prototype.getProviderData=function(e,r){$.get(e).then(function(e){var t,o=[];t="localhost"===window.location.hostname||-1!==window.location.hostname.indexOf("10.91.180.221")?e:JSON.parse(e),$.each(t.allProviders,function(e,r){o.push(r)}),r(o)}).fail(function(){})},e}();r.Service=o},function(e,r,t){"use strict";var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r};Object.defineProperty(r,"__esModule",{value:!0});var n=t(2),i=o(t(1));(new n.Service).getProviderData("https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE1YtJv",function(e){i.initPageCSSUpdates(),i.initDropdownData(e),i.initRecommendedProviders(e),i.initFilter(e)})}]);
var mdvEval={};mdvEval.formFlag=false;mdvEval.decisionTreeResults={platforms:[],technology:"",executedOn:"",crossPlatform:""};mdvEval.setVariables=function(){mdvEval.$q1=$("#mdv-eval-q-1");mdvEval.$q1dropdown=$("#mdv-eval-q-1-dropdown");mdvEval.$q1selector=$("#mdv-eval-q-1-selector");mdvEval.$q2=$("#mdv-eval-q-2");mdvEval.$q2dropdown=$("#mdv-eval-q-2-dropdown");mdvEval.$q2selector=$("#mdv-eval-q-2-selector");mdvEval.$q22=$("#mdv-eval-q-2-2");mdvEval.$q22dropdown=$("#mdv-eval-q-2-2-dropdown");mdvEval.$q22selector=$("#mdv-eval-q-2-2-selector");mdvEval.$responseSingle=$("#mdv-eval-single-response");mdvEval.$responseMulti=$("#mdv-eval-multi-response");mdvEval.$signUpForm=$("#mdv-eval-signUp");mdvEval.hasSubmittedOneOnOne=false};mdvEval.updateDataForINTL=function(){var optn=$("#mdv-eval-q-1-dropdown").find(".optn"),optnSpan=$(optn).find("span"),spanTextArr=[];$.each(optnSpan,function(indx,val){var spanText=$(val).text();spanTextArr.push(spanText)});$.each(optn,function(idx,obj){$(obj).attr("data-title",spanTextArr[idx])})};mdvEval.setCustValMessages=function(){var email=$("#mdv-eval-email"),custEmailMess=$("#custEmailValMess").text();$(email).on("invalid",function(e){e.target.setCustomValidity(custEmailMess)});$(email).on("input",function(e){e.target.setCustomValidity("")})};mdvEval.setButtonTagging=function(){$("button").on("click",function(){var buttonVal=$(this).attr("data-button");MscomCustomEvent("cn",buttonVal)});if(window.location.href.indexOf("#list-view")>-1){var $navTab=$(".nav-tabs li");$navTab.first().removeClass("active");$navTab.last().addClass("active");$(".tab-content div.active").removeClass("active");$(".tab-content div#list-view").addClass("active")}};mdvEval.pageInit=function(){mdvEval.setVariables();mdvEval.updateDataForINTL();mdvEval.setCustValMessages();mdvEval.setButtonTagging()};mdvEval.setHandlers=function(){$(".question:not(.response)").on("keyup",mdvEval.keyHandler);$(".empty-blank, .response, .blue-txt",$(".question")).on("click",mdvEval.blankClickHandler);$(".dropdown-multi").on("click",".chbx",function(){mdvEval.multipleDropDownHandler($(this))});$(".dropdown-single").on("click",".optn",function(){mdvEval.singleDropDownHandler($(this))});mdvEval.$q1.on("click",".submit",mdvEval.firstDropdownHandler);mdvEval.$q2selector.on("click",".submit",mdvEval.secondDropdownHandler);mdvEval.$q22selector.on("click",".submit",mdvEval.thirdDropdownHandler);mdvEval.$signUpForm.on("submit",mdvEval.formSubmit);setTimeout(function(){mdvEval.formFlag=true},6e3);$("html").hasClass("no-placeholder")&&$("#mdv-eval-signUp label").each(function(){!($(this).attr("id")==="mdv-eval-honeyPotlabel")&&$(this).removeClass("sr-only")})};mdvEval.singleDropDownHandler=function($optn){$(".optn").removeClass("active");$optn.addClass("active")};mdvEval.multipleDropDownHandler=function($chbx){var $myParent=$chbx.parents(".optn");$myParent.toggleClass("active")};mdvEval.keyHandler=function(e){e.stopPropagation();switch(e.keyCode){case 27:mdvEval.dropdownClose();break;case 13:$(e.target).hasClass("optn")&&$(e.target).toggleClass("active");if($(e.target).hasClass("question")){var id=$(e.target).attr("id");$("#"+id+" .response").click()}break}};mdvEval.setCurrentDropdown=function($dropdown){mdvEval.$currentDropdown=$dropdown;$(".blue-txt",mdvEval.$currentDropdown).attr("tabindex",0).focus();$(".optn",mdvEval.$currentDropdown).attr("tabindex",0);$(document).on("keyup",mdvEval.keyHandler);$(document).on("click",mdvEval.outsideDropdownClose)};mdvEval.dropdownClose=function(){$(document).off("keyup",mdvEval.keyHandler);if(mdvEval.$currentDropdown){mdvEval.$currentDropdown.hide().attr("aria-hidden",true);mdvEval.$currentDropdown.parent(".question").removeClass("active");mdvEval.$currentDropdown=null;$(document).off("click",mdvEval.outsideDropdownClose)}};mdvEval.outsideDropdownClose=function(e){$(e.target).parents(".question").length===0&&mdvEval.dropdownClose()};mdvEval.blankClickHandler=function(e){var $selector=$(this).closest(".question"),$dropdown=$(".tree-dropdown",$selector).first();if($dropdown.is(":visible")===false){mdvEval.resetSteps($selector.data("step"));$dropdown.show().attr("aria-hidden",false);$selector.addClass("active");mdvEval.setCurrentDropdown($dropdown)}else mdvEval.dropdownClose()};mdvEval.resetSteps=function(step){switch(step){case 1:$(".chbx").attr("checked",false);$(".optn",mdvEval.$q1dropdown).removeClass("active");$(".empty-blank",mdvEval.$q1selector).show().attr("aria-hidden",false);$(".response",mdvEval.$q1selector).hide().html("").attr("aria-hidden",true);mdvEval.$q2.removeClass("active").hide().attr("aria-hidden",true);mdvEval.$responseSingle.removeClass("active").hide().attr("aria-hidden",true);mdvEval.$responseMulti.removeClass("active").hide().attr("aria-hidden",true);mdvEval.$q2dropdown.hide().attr("aria-hidden",true);$(".optn",mdvEval.$q2dropdown).remove();case 2:$(".empty-blank",mdvEval.$q2selector).show().attr("aria-hidden",false);$(".response",mdvEval.$q2selector).hide().html("").attr("aria-hidden",true);$(".optn",mdvEval.$q2dropdown).removeClass("active");mdvEval.$q22.removeClass("inline");$(".optn",mdvEval.$q22).removeClass("active");case 3:$(".empty-blank",mdvEval.$q22).addClass("inline");$(".response",mdvEval.$q22).hide().html("").attr("aria-hidden",true)}$(".results").hide();$(".question").attr("tabindex",0)};mdvEval.nextQuestion=function(activelySelect){if(activelySelect.length===1&&(activelySelect[0].html()!=="html/css"||activelySelect[0].html()!=="cross-platform solution"))mdvEval.$responseSingle.addClass("active").show().attr("aria-hidden",false);else mdvEval.$responseMulti.addClass("active").show().attr("aria-hidden",false);mdvEval.$q2.addClass("active").show().attr("aria-hidden",false);for(var techChoices=[],i=0;i<activelySelect.length;i++){var tempContain=mdvEval.allTech[activelySelect[i].data("content")].specificTech;mdvEval.decisionTreeResults.platforms.push(activelySelect[i].data("content"));for(var j=0;j<tempContain.length;j++){for(var tempTech=true,k=0;k<techChoices.length;k++)if(techChoices[k].name===tempContain[j].name)tempTech=false;tempTech&&techChoices.push(tempContain[j])}}for(var l=0;l<techChoices.length;l++){var $newListItem=$(document.createElement("li"));$newListItem.attr("id","q2-list-item"+l).addClass("list-item");var $newOpt=$(document.createElement("div"));$newOpt.addClass("optn").data("content",techChoices[l].name).html(techChoices[l].title);if(l===0)$($newListItem).insertAfter("#q2-select-text");else $($newListItem).insertAfter("#q2-list-item"+(l-1));$newListItem.append($newOpt)}};mdvEval.replaceText=function(activelySelect){for(var andText=$("#andTextOptn").text(),combinedString="",i=0;i<activelySelect.length;i++)if(i===0)combinedString+=activelySelect[i].data("title");else if(i==activelySelect.length-1)combinedString+=" "+andText+" "+activelySelect[i].data("title");else combinedString+=",  "+activelySelect[i].data("title");return combinedString};mdvEval.firstDropdownHandler=function(e){var activelySelect=[];$(".optn.active",$(this).parents(".dropdown-multi")).each(function(){var selected=$(this);activelySelect.push(selected)});if(activelySelect.length!==0){mdvEval.$q1dropdown.hide().attr("aria-hidden",true);var newText=mdvEval.replaceText(activelySelect),$question=$(this).parents(".question");$(".response",$question).show().html(newText).attr("aria-hidden",false);mdvEval.decisionTreeResults.platforms=[];mdvEval.nextQuestion(activelySelect);if(newText==="other"){$("#mdv-eval-single-response").hide();$("#mdv-eval-q-2").hide();$("#other").show()}}else mdvEval.$q1dropdown.toggle();mdvEval.dropdownClose();$(".question").attr("tabindex",0);mdvEval.$q2selector.attr("tabindex",1)};mdvEval.secondDropdownHandler=function(e){var preferredTechSelect;mdvEval.dropdownClose();var selected=$(".optn.active",mdvEval.$q2dropdown);preferredTechSelect=selected;if(preferredTechSelect.length!==0){var $question=$(this).parents(".question");$(".response",$question).show().attr("aria-hidden",false).append($(preferredTechSelect).html());mdvEval.decisionTreeResults.technology=preferredTechSelect.data("content");mdvEval.decisionTreeResults.executedOn="";mdvEval.decisionTreeResults.crossPlatform="";if(preferredTechSelect.data("content")==="htmlJS"){mdvEval.$q22.addClass("inline");$(".empty-blank",mdvEval.$q22).addClass("inline");$(".question").attr("tabindex",0);mdvEval.$q22selector.attr("tabindex",1)}else $("#"+preferredTechSelect.data("content")).show()}else mdvEval.$q2dropdown.toggle()};mdvEval.thirdDropdownHandler=function(e){var itemSelect,selected=$(".optn.active",mdvEval.$q22dropdown);itemSelect=selected;if(itemSelect.length!==0){mdvEval.$q22dropdown.removeClass("inline");$(".empty-blank",mdvEval.$q22selector).removeClass("inline");$(".response",mdvEval.$q22selector).show().attr("aria-hidden",false).append($(itemSelect).html());$("#"+itemSelect.data("content")).show();mdvEval.decisionTreeResults.executedOn="#"+itemSelect.data("content")}else mdvEval.$q22dropdown.toggle();mdvEval.dropdownClose()};mdvEval.allTech={ios:{specificTech:[{name:"objectiveCSwift",title:$("#objCSwiftOptn").text()},{name:"crossPlatformSolution",title:$("#crossPlatOptn").text()},{name:"htmlJS",title:$("#htmlJavaScrOptn").text()},{name:"other",title:$("#otherOptn").text()}]},android:{specificTech:[{name:"java",title:$("#javaOptn").text()},{name:"crossPlatformSolution",title:$("#crossPlatOptn").text()},{name:"htmlJS",title:$("#htmlJavaScrOptn").text()},{name:"other",title:$("#otherOptn").text()}]},windows:{specificTech:[{name:"silverlight",title:$("#silverlightOptn").text()},{name:"windowsRuntimeApp",title:$("#winRunAppOptn").text()},{name:"netWin32",title:$("#netWin32Optn").text()},{name:"htmlJS",title:$("#htmlJavaScrOptn").text()},{name:"crossPlatformSolution",title:$("#crossPlatOptn").text()},{name:"other",title:$("#otherOptn").text()}]},hostedWebsite:{specificTech:[{name:"htmlJS",title:$("#htmlJavaScrOptn").text()},{name:"other",title:$("#otherOptn").text()}]},other:{specificTech:[{name:"other",title:$("#otherOptn").text()}]}};mdvEval.validateEmail=function(value){var emailPattern=/^([0-9a-zA-Z](.)?)*[!#$%&'*+-/=?^_`{|}~]*((.)?[0-9a-zA-Z])*@([0-9a-z]+([-][0-9a-z]+)*\.)+[a-z]{2,7}$/i;return value.match(emailPattern)};mdvEval.displayError=function($el){var $error=$el.find(".alert-error");$error.removeClass("hidden")};mdvEval.showServerSuccess=function($el){var successText=$(".serverSuccessText").text(),$message=$("#submitStatusText");$message.text(successText);var $success=$el.find(".alert-submit-status");$success.removeClass("hidden");$el.find(".form-group").addClass("hidden")};mdvEval.showServerError=function($el){var errorText=$(".serverErrorText").text(),$message=$("#submitStatusText");$message.text(errorText);var $error=$el.find(".alert-submit-status");$error.removeClass("hidden");$el.find(".form-group").addClass("hidden")};mdvEval.showMultiRequest=function($el){var mulitRequestText=$(".serverMultiSubmit").text(),$message=$("#submitStatusText");$message.text(mulitRequestText);var $multiMessage=$el.find(".alert-submit-status");$multiMessage.removeClass("hidden");$el.find(".form-group").addClass("hidden")};mdvEval.resetForm=function($el){$el.find("input").val("");var $error=$el.find(".alert-error");$error.addClass("hidden");$el.find(".form-group").removeClass("hidden");var $status=$el.find(".alert-submit-status");$status.addClass("hidden");$el.off(".mdv-eval-goBack").off("click")};mdvEval.formSubmit=function(event){event.preventDefault();var $form=$(this),email=$("#mdv-eval-email").val(),firstName=$("#mdv-eval-firstName").val(),lastName=$("#mdv-eval-lastName").val(),antiForgeryToken=$("input[name='__RequestVerificationToken']").val(),ocid=$("input[name='mdv-eval-ocid']").val();if(mdvEval.formFlag===false||$("#mdv-eval-honeyPot").val().length!==0)return false;if(mdvEval.validateEmail(email)!==null&&firstName.trim().length!==0&&lastName.trim().length!==0){mdvEval.sendToEndpoint($form,email,firstName,lastName,mdvEval.decisionTreeResults,antiForgeryToken,ocid);$form.find(".mdv-eval-goBack").on("click",function(event){event.preventDefault();mdvEval.resetForm($form)})}else mdvEval.displayError($form)};mdvEval.sendToEndpoint=function($el,email,firstName,lastName,treeResults,antiForgeryToken,ocid){var destinationUrl=$el.attr("action"),data={};data.firstName=firstName;data.lastName=lastName;data.email=email;data.decisionTreeResults=treeResults;data.__RequestVerificationToken=antiForgeryToken;data.ocid=ocid;$.ajax({type:"POST",dataType:"html",url:destinationUrl,data:data,timeout:1e4,success:function(data){mdvEval.hasSubmittedOneOnOne=true;mdvEval.showServerSuccess($el)},error:function(jqXHR,textStatus,errorThrown){if(jqXHR.status!="200"&&mdvEval.hasSubmittedOneOnOne===true)mdvEval.showMultiRequest($el);else if(jqXHR.status!="200")mdvEval.showServerError($el);else{mdvEval.hasSubmittedOneOnOne=true;mdvEval.showServerSuccess($el)}}})};$(document).ready(function(){(function(){mdvEval.pageInit();mdvEval.setHandlers()})()})
require.config({baseUrl:"//cdn.support.services.microsoft.com/support-web-sdk/v2/latest",paths:{MsSupportSdk:"support.sdk.all"},config:{app:{appConfig:{env:"PRODUCTION",partnerId:"devcenter",appId:"support-portal"},issueConfig:{product:"WindowsDevCenter",issue:void 0,language:void 0,country:void 0},chatConfig:{}}}}),define("app",["require","MsSupportSdk","module"],function(a,b,c){"use strict";function d(){X=ca.detectBrowserLanguage(),$.inArray(X,Z)!==-1&&B.removeClass(E)}function e(){var a=[u,q,s,t];$.each(a,function(a,b){b.css("width","100%")})}function f(){V=window.location.pathname.split("/").filter(Boolean)[0].toLocaleLowerCase();var a=V.split("-");c.config().issueConfig.language=a[0],c.config().issueConfig.country=a[1]}function g(){ca.watchSupportTopicSelect(),ca.watchIssueTypeSelect(),ca.watchHardwareIssueTypeSelect(),ca.watchSubcategorySelect(),ca.watchChatNowButton()}function h(){var a=window.location.search.toLowerCase(),b=a.indexOf("?topic")!==-1,c=C.eq(0);b?(ca.selectTab(D),ca.prePopulateDropdown()):ca.selectTab(c)}function i(){j.init(T).then(function(){d(),e(),f(),g(),h()})}var j=a("MsSupportSdk"),k=$(".issueTypeWrapper"),l=$(".subcategoryWrapper"),m=$(".contactMethodWrapper"),n=$(".liveChatWrapper"),o=$(".incidentWrapper"),p=$(".customWrapper"),q=$("#subcategorySelect"),r=$("#subcategorySelect option"),s=$("#issueTypeSelect"),t=$("#hardwareIssueTypeSelect"),u=$("#supportTopicSelect"),v=$(".chatNow"),w=$(".peopleWaiting"),x=$(".queueLength"),y=$(".chatUnavailable"),z=$(".signInMessage"),A=$(".incidentHref"),B=$(".optionViewable"),C=$(".cx-tablist"),D=$(".cx-contact-us"),E="x-hidden",F="default",G="hide",H="show",I="enabled",J="disabled",K="issuetype",L="incidentUrl",M="topic",N=":selected",O="hardware",P="f-active",Q="DevCenterT1",R="DevCenterT2",S={writeEvent:function(a){}},T={logger:S,partnerId:c.config().appConfig.partnerId,appId:c.config().appConfig.appId},U={POPUP:2,WIDTH:360,HEIGHT:480},V=null,W=null,X=null,Y=["en-us"],Z=["en-us","en-ca"],_=["dashboard","dashboardissueforofficeprogram","migratedesktipapptowin10","win10uwpappdev","winmixedrealitydev","desktopbridge","windesktipappdev","wdk","hlkhck","helpwithotherdevtools"],aa=["accountsetupandmanagement","payout","reportingoranalytics","adsinapps","appcertificationfailures","apppromotion","appsubmissions","inApppurchases","collaborate","hardwaresubmissionsandsigning"],ba=["packagemanagement","ageratings","lobapps","other","sdkintegration","nonsdk"],ca={detectBrowserLanguage:function(){var a=window.navigator.language.toLowerCase();return a},updateButtonUi:function(a,b){switch(a){case"show":$.each(b,function(a,b){b.removeClass(E)});break;case"hide":$.each(b,function(a,b){b.addClass(E)});break;case"disabled":$.each(b,function(a,b){b.attr("aria-disabled","true"),b.css("pointer-events","none")});break;case"enabled":$.each(b,function(a,b){b.attr("aria-disabled","false"),b.css("pointer-events","auto")})}},filterSubCategory:function(a){r.each(function(){$(this).val()!==F&&($(this).parent().is("span")&&$(this).unwrap(),$(this).data(K)!==a&&$(this).wrap("<span class='x-hidden'></span>"))}),ca.updateButtonUi(H,[l])},initChatModalities:function(){c.config().issueConfig.environment=j.api.modalities.Environment[c.config().appConfig.env],c.config().issueConfig.mode="";var a=j.api.modalities.get(c.config().issueConfig);return a},createChatEvents:function(){return{onUnloaded:function(){ca.updateButtonUi(I,[v]),ca.updateButtonUi(H,[w])}}},renderButtonControl:function(a,b){if(A.attr("href",b),"appcertificationfailures"===a||W===O)return void ca.updateButtonUi(H,[m,o]);var d=["inAppPurchases","packageManagement","ageRatings","lobApps","sdkIntegration","collaborate","hardwareDriversOrIot"],e=$.inArray(a,d)!==-1?R:Q;c.config().issueConfig.issue=e,ca.initChatModalities().then(function(a){c.config().chatConfig=ca.createChatEvents(),c.config().chatConfig.modalities=a,$.when(a[0].getAvailability().then(function(a){},function(a){ca.updateButtonUi(H,[y])}),a[0].getQueueLength().then(function(a){x.text(a)},function(a){w.hide()})).promise().done(function(){ca.updateButtonUi(G,[z])})},function(){ca.updateButtonUi(H,[y])}),$.inArray(V,Y)===-1?ca.updateButtonUi(H,[m,o]):ca.updateButtonUi(H,[m,n,o])},displayIssueTypeSelectElement:function(a){a===O?(s.addClass(E),t.removeClass(E)):(s.removeClass(E),t.addClass(E))},render:function(a){var b=a.value,c=$(a).find(N).data("subcategory"),d=$(a).find(N).data("supportUrl");ca.updateButtonUi(G,[l,m,n,o,z,y]),q.prop("selectedIndex",0),ca.updateButtonUi(I,[v]),ca.updateButtonUi(H,[w]),c?ca.filterSubCategory(b):b===F||c||ca.renderButtonControl(b,d)},watchSupportTopicSelect:function(){u.on("change",function(){var a=this.value,b=$(this).find(N).data(K),c=$(this).find(N).data(L),d=$(this).find(N).data(M);W=d,ca.updateButtonUi(G,[k,l,m,n,o,p,z,y]),s.prop("selectedIndex",0),t.prop("selectedIndex",0),ca.updateButtonUi(I,[v]),ca.updateButtonUi(H,[w]),A.attr("href",c),b?(ca.displayIssueTypeSelectElement(d),ca.updateButtonUi(H,[k])):"migratedesktipapptowin10"===a?ca.updateButtonUi(H,[p]):a!==F&&ca.updateButtonUi(H,[m,o])})},watchIssueTypeSelect:function(){s.on("change",function(){var a=this;ca.render(a)})},watchHardwareIssueTypeSelect:function(){t.on("change",function(){var a=this;ca.render(a)})},watchSubcategorySelect:function(){q.on("change",function(){var a=this.value,b=$(this).find(N).data("supportUrl");ca.updateButtonUi(I,[v]),ca.updateButtonUi(H,[w]),a!==F?ca.renderButtonControl(a,b):ca.updateButtonUi(G,[m,n,o,z])})},watchChatNowButton:function(){v.on("click",function(a){a.preventDefault();var b=window.msCommonShell.meControlOptions().userData,d=b.idp,e=b.firstName+" "+b.lastName,f=b.memberName;return window.msCommonShell.AuthState.NotSignedIn===b.authenticatedState?void ca.updateButtonUi(H,[z]):(c.config().chatConfig.uiInfo={type:U.POPUP,width:U.WIDTH,height:U.HEIGHT},c.config().chatConfig.authInfo={type:d},c.config().chatConfig.surveyType=j.ui.SurveyType.NONE,c.config().chatConfig.context=[{name:"full name",value:e},{name:"email",value:f}],ca.updateButtonUi(J,[v]),ca.updateButtonUi(G,[w]),void j.ui.chat.render(c.config().chatConfig))})},getQueryParamUrlValue:function(a){var b=new RegExp("[?&]"+a.toLowerCase()+"=([^&#]*)").exec(window.location.search.toLowerCase());return null!==b&&(b[1]||0)},selectTab:function(a){a.addClass(P)},prePopulateDropdown:function(){var a=ca.getQueryParamUrlValue("topic"),b=ca.getQueryParamUrlValue("issuetype"),c=ca.getQueryParamUrlValue("subcategory"),d=$.inArray(a,_)!==-1,e=$.inArray(b,aa)!==-1,f=$.inArray(c,ba)!==-1;d&&(u.val(a).trigger("change"),e&&(s.val(b).trigger("change"),f&&q.val(c).trigger("change")))}};return{init:i}}),require(["app"],function(a){a.init()});
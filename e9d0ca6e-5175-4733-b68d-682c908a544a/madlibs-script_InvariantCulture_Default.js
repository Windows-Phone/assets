$((function(){if($("main").is("#mgsHome")){$.extend($.easing,{easeInOutExpo:function easeInOutExpo(x,t,b,c,d){return 0===t?b:t===d?b+c:(t/=d/2)<1?c/2*Math.pow(2,10*(t-1))+b:c/2*(2-Math.pow(2,-10*--t))+b}});var animateSentence={$sentenceContainer:$(),$lineContainers:$(),$changingWordContainers:$(),$elementsHiddenUntilLoaded:$(),wordHeight:0,lineHeight:0,setUpElements:function setUpElements(){var _this=this;this.$sentenceContainer=$("[gs-data-animated=changing-word-sentence]"),this.$lineContainers=$("[gs-data-animated=changing-word-line]"),this.$changingWordContainers=$("[gs-data-animated=changing-word-container]"),this.$elementsHiddenUntilLoaded=$("[gs-data-animated=hide-until-loaded]"),this.wordHeight=Number(this.$sentenceContainer.css("font-size").slice(0,-2)),this.lineHeight=Number(this.$sentenceContainer.css("line-height").slice(0,-2)),this.$changingWordContainers.each((function(i,el){var $el=$(el);$el.height(2*_this.wordHeight),$el.css("top",_this.wordHeight-2),$el.find("[gs-data-visible-word]").length>0?$el.width($el.find('[gs-data-visible-word="true"]').width()+2):$el.width($el.find(">:first-child").width()+2)})),this.$lineContainers.each((function(i,el){var $el;$(el).css("top",-1*_this.wordHeight*(i+1))})),this.$sentenceContainer.height(this.wordHeight*(this.$lineContainers.length+1)-(this.lineHeight-this.wordHeight)),this.$sentenceContainer.css("visibility","visible"),this.$elementsHiddenUntilLoaded.css("visibility","visible")},startAnimation:function startAnimation(){this.setUpElements(),animateSentence.animateContainers()},swapWords:function swapWords($outWord,$inWord){var offset=this.wordHeight;$inWord.css("top",offset+"px"),$outWord.animate({top:-1*offset},{easing:"easeInOutExpo",duration:666,queue:!1}),$inWord.animate({top:0},{easing:"easeInOutExpo",duration:666,queue:!1}),$outWord.animate({opacity:0},{easing:"linear",duration:333,queue:!0,start:function start(){$outWord.attr("gs-data-visible-word","false")},done:function done(){$inWord.animate({opacity:1},{easing:"linear",duration:333,queue:!0,start:function start(){$inWord.attr("gs-data-visible-word","true")}})}})},changeContainerWidth:function changeContainerWidth($container,newWidth){$container.animate({width:newWidth+4},{easing:"easeInOutExpo",duration:666,queue:!0})},animateWords:function animateWords($wordsContainer,$words,index){var _this2=this,numWords,nextWordIndex=index===$words.length-1?0:index+1;this.changeContainerWidth($wordsContainer,$words.eq(nextWordIndex).width()),this.swapWords($words.eq(index),$words.eq(nextWordIndex)),$wordsContainer.promise().done((function(){_this2.wordTimeout=setTimeout((function(){_this2.animateWords($wordsContainer,$words,nextWordIndex)}),5e3)}))},animateContainers:function animateContainers(){for(var _this3=this,wordContainerOrder=[3,1,0,2],containerSecondsDelay=[1,2,3,3.5],_loop=function _loop(i){var $currentContainer=_this3.$changingWordContainers.eq(wordContainerOrder[i]);_this3.containerTimeout=setTimeout((function(){_this3.animateWords($currentContainer,$currentContainer.children(),0)}),1e3*containerSecondsDelay[i])},i=0;i<wordContainerOrder.length;i++)_loop(i)}},resizeTimer;animateSentence.startAnimation(),$(window).on("resize",(function(e){clearTimeout(resizeTimer),animateSentence.$sentenceContainer.css("visibility","hidden"),animateSentence.$elementsHiddenUntilLoaded.css("visibility","hidden"),resizeTimer=setTimeout((function(){animateSentence.setUpElements()}),250)})),$('[gs-data-animated="changing-word-sentence"]').on("mouseenter mouseleave click",(function(e){var $eventReceiver=$("[gs-data-receive-animation-events]");"click"===e.type?$eventReceiver[0].click():$eventReceiver.toggleClass("gs-hover")}))}}));
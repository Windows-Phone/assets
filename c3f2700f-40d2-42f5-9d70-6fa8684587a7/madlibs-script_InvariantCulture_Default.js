$(function () {
  if ($("main").is("#mgsHome")) {
    //extend jQuery animation easing for bezier curve formula
    $.extend($.easing, {
      easeInOutExpo: function easeInOutExpo(x, t, b, c, d) {
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    }); // animation data and functions for hero animated sentence

    var animateSentence = {
      $sentenceContainer: $(),
      $lineContainers: $(),
      $changingWordContainers: $(),
      $elementsHiddenUntilLoaded: $(),
      wordHeight: 0,
      lineHeight: 0,
      isPaused: false,
      setUpElements: function setUpElements() {
        var _this = this;

        this.$sentenceContainer = $("[gs-data-animated=changing-word-sentence]");
        this.$lineContainers = $("[gs-data-animated=changing-word-line]");
        this.$changingWordContainers = $("[gs-data-animated=changing-word-container]");
        this.$elementsHiddenUntilLoaded = $("[gs-data-animated=hide-until-loaded]");
        this.wordHeight = Number(this.$sentenceContainer.css("font-size").slice(0, -2));
        this.lineHeight = Number(this.$sentenceContainer.css("line-height").slice(0, -2)); // give changing word containers the correct initial height and width

        this.$changingWordContainers.each(function (i, el) {
          var $el = $(el);
          $el.height(_this.wordHeight * 2);
          $el.css("top", _this.wordHeight - 2); // if animation is in progress, set width to visible word

          if ($el.find("[gs-data-visible-word]").length > 0) {
            $el.width($el.find('[gs-data-visible-word="true"]').width() + 2); // else set width to first element
          } else {
            $el.width($el.find(">:first-child").width() + 2);
          }
        }); // adjust position of each line to ignore space needed for word container animation

        this.$lineContainers.each(function (i, el) {
          var $el = $(el);
          $el.css("top", _this.wordHeight * -1 * (i + 1));
        }); // update height of sentence container

        this.$sentenceContainer.height(this.wordHeight * (this.$lineContainers.length + 1) - (this.lineHeight - this.wordHeight)); // show sentence and hidden elements once everything is in position

        this.$sentenceContainer.css("visibility", "inherit");
        this.$elementsHiddenUntilLoaded.css("visibility", "inherit");
      },
      startAnimation: function startAnimation() {
        this.setUpElements(); // start animating the sentence

        animateSentence.animateContainers();
      },
      swapWords: function swapWords($outWord, $inWord, $changingWordContainer) {
        if (!this.isPaused) {
          var offset = this.wordHeight; // position incoming word to below current word

          $inWord.css("top", offset + "px"); // move current word up

          $outWord.animate({
            top: offset * -1
          }, {
            easing: "easeInOutExpo",
            duration: 666,
            queue: false
          }); // move new word up

          $inWord.animate({
            top: 0
          }, {
            easing: "easeInOutExpo",
            duration: 666,
            queue: false
          }); // reduce opacity of current word

          $outWord.animate({
            opacity: 0
          }, {
            easing: "linear",
            duration: 333,
            queue: true,
            start: function start() {
              $outWord.attr("gs-data-visible-word", "false");
            },
            done: function done() {
              // increase opacity of new word
              $inWord.animate({
                opacity: 1
              }, {
                easing: "linear",
                duration: 333,
                queue: true,
                start: function start() {
                  // support reset from paused state
                  $changingWordContainer.children('*:first').attr('gs-data-visible-word', 'false').css('opacity', '0');
                  $changingWordContainer.children('[gs-data-visible-word=true]').attr('gs-data-visible-word', 'false').css('opacity', '0');
                  $inWord.attr("gs-data-visible-word", "true");
                }
              });
            }
          });
        }
      },
      changeContainerWidth: function changeContainerWidth($container, newWidth) {
        if (!this.isPaused) {
          // animate container width to width of next word
          $container.animate({
            width: newWidth + 4
          }, {
            easing: "easeInOutExpo",
            duration: 666,
            queue: true
          });
        }
      },
      animateWords: function animateWords($wordsContainer, $words, index) {
        var _this2 = this;

        // word changing animation
        var numWords = $words.length;
        var nextWordIndex = index === numWords - 1 ? 0 : index + 1;
        this.changeContainerWidth($wordsContainer, $words.eq(nextWordIndex).width());
        this.swapWords($words.eq(index), $words.eq(nextWordIndex), $wordsContainer);
        $wordsContainer.promise().done(function () {
          _this2.wordTimeout = setTimeout(function () {
            _this2.animateWords($wordsContainer, $words, nextWordIndex);
          }, 5000);
        });
      },
      animateContainers: function animateContainers() {
        var _this3 = this;

        // overall sentence animation: order and timing of each word container
        var wordContainerOrder = [3, 1, 0, 2];
        var containerSecondsDelay = [1, 2, 3, 3.5];

        var _loop = function _loop(i) {
          var $currentContainer = _this3.$changingWordContainers.eq(wordContainerOrder[i]);

          _this3.containerTimeout = setTimeout(function () {
            _this3.animateWords($currentContainer, $currentContainer.children(), 0);
          }, containerSecondsDelay[i] * 1000);
        };

        for (var i = 0; i < wordContainerOrder.length; i++) {
          _loop(i);
        }
      }
    }; // start hero animation on page load

    animateSentence.startAnimation(); // correct hero animation on window resize for type ramp changes

    var resizeTimer;
    $(window).on("resize", function (e) {
      clearTimeout(resizeTimer); // hide elements that are supposed to be hidden until animation loads

      animateSentence.$sentenceContainer.css("visibility", "hidden");
      animateSentence.$elementsHiddenUntilLoaded.css("visibility", "hidden"); // wait until resizing is done, then reset animation element setup

      resizeTimer = setTimeout(function () {
        animateSentence.setUpElements();
      }, 250);
    }); // trigger events on element linked to animation element events

    $('[gs-data-animated="changing-word-sentence"]').on("click", function (e) {
      // uncomment if we want to link madlib area button to header events again (was also mouseenter mouseleave)
      // let $eventReceiver = $("[gs-data-receive-animation-events]")
      // if (e.type === "click") {
      //   $eventReceiver[0].click()
      // } else {
      //   $eventReceiver.toggleClass("gs-hover")
      // }
      if (animateSentence.isPaused) {
        // remove remaining animation attributes
        //animateSentence.$changingWordContainers.children().attr('gs-data-visible-word','false').css('opacity','0');
        // continue
        animateSentence.isPaused = false;
      } else {
        // pause
        animateSentence.isPaused = true;
      }
    });
  }
});
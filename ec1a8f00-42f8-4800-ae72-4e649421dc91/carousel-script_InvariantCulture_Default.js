$(function () {
  if ($("main").is("#mgsHome")) {
    // show new slide
    var showNewSlide = function showNewSlide(slideTo) {
      // hide all slides
      $("[data-carousel-item]").attr("aria-hidden", "true").addClass("carousel-hidden"); // figure out which slide number should be next

      if (slideTo > numSlides - 1) {
        currentSlide = 0;
      } else if (slideTo < 0) {
        currentSlide = numSlides - 1;
      } else {
        currentSlide = slideTo;
      } // show new slide


      $("[data-carousel-item=".concat(currentSlide, "]")).attr("aria-hidden", "false").removeClass("carousel-hidden"); // update sequence indicators

      updateSequenceIndicators(currentSlide);
    }; // get height of tallest carousel item


    var getCarouselHeight = function getCarouselHeight() {
      var tallest = 0;
      $("[data-carousel-item]").each(function () {
        tallest = $(this).children().first().outerHeight() > tallest ? $(this).children().first().outerHeight() : tallest;
      });
      return tallest;
    }; // update carousel item sequence indicator attributes to reflect new state


    var updateSequenceIndicators = function updateSequenceIndicators(currentSlideNum) {
      // loop through all indicators
      $("[data-carousel-item-indicator]").each(function () {
        // if this indicator should be the new active indicator
        if ($(this).attr('data-carousel-item-indicator') === currentSlideNum.toString()) {
          // update attributes for active states
          $(this).attr("tabIndex", "0").attr("aria-selected", "true"); // else update for inactive state
        } else {
          $(this).attr("tabIndex", "-1").attr("aria-selected", "false");
        }
      });
    }; // clear and restart timer


    var restartTimer = function restartTimer() {
      window.clearInterval(timer);
      timer = window.setInterval(function () {
        $("[data-carousel-control=\"next\"]").click();
      }, timerInterval);
    };

    var pauseCarousel = function pauseCarousel() {
      // show play button
      $("[data-carousel-control=\"playControl\"]").attr('value', 'play').attr('aria-label', 'play').attr('class', 'carousel_controls_btn--play').attr('data-carousel-control-state', 'play'); // clear timer

      window.clearInterval(timer); // set paused state

      isPaused = true;
    };

    var playCarousel = function playCarousel() {
      // show pause button
      $("[data-carousel-control=\"playControl\"]").attr('value', 'pause').attr('aria-label', 'pause').attr('class', 'carousel_controls_btn--pause').attr('data-carousel-control-state', 'pause'); // restart timer

      restartTimer(); // set paused state

      isPaused = false;
    }; // on next button click


    var timerInterval = 6000,
        timer = setInterval(function () {
      $("[data-carousel-control=\"next\"]").click();
    }, timerInterval),
        currentSlide = 0,
        numSlides = $("[data-carousel-item]").length,
        isPaused = false; // set height of carousel to height of tallest item

    $("[data-carousel-container]").height(getCarouselHeight()); // show carousel once height has been set

    $("[data-carousel-container]").css('visibility', 'inherit'); // remove preload class preventing animation

    $("[data-carousel-container]").removeClass('carousel--preload');
    $("[data-carousel-control=\"next\"]").click(function () {
      showNewSlide(currentSlide + 1);

      if (!isPaused) {
        restartTimer();
      }
    }); // on previous button click

    $("[data-carousel-control=\"previous\"]").click(function () {
      showNewSlide(currentSlide - 1);

      if (!isPaused) {
        restartTimer();
      }
    }); // on carousel play/pause button click

    $("[data-carousel-control=\"playControl\"]").click(function () {
      isPaused === true ? playCarousel() : pauseCarousel();
    }); // pause carousel when a control within an item has focus or mouse enters

    $('[data-carousel-item]').on('focusin mouseenter', function () {
      window.clearInterval(timer);
    }); // if not paused, play carousel when a control within an item has focus or mouse leaves

    $('[data-carousel-item]').on('focusout mouseleave', function () {
      if (!isPaused) {
        restartTimer();
      }
    }); // pause carousel when sequence indicators have focus

    $('[data-carousel-item-indicator]').on('focusin', function () {
      window.clearInterval(timer);
    }); // if not paused, restart carousel when sequence indicators are blurred

    $('[data-carousel-item-indicator]').on('focusout', function () {
      if (!isPaused) {
        restartTimer();
      }
    }); // on carousel item sequence indicator click

    $("[data-carousel-item-indicator]").click(function () {
      // update carousel
      showNewSlide(Number($(this).attr('data-carousel-item-indicator'))); // if not paused, clear autoplay timer

      if (!isPaused) {
        restartTimer();
      }
    }); // on carousel item sequence indicator left/right arrow key

    $("[data-carousel-item-indicator]").keydown(function (e) {
      if (e.which === 37 || e.which === 39) {
        var moveTo,
            startedAt = Number($(this).attr('data-carousel-item-indicator')),
            lastOne = numSlides - 1; // if left key, move slide down one unless at beginning

        if (e.which === 37) {
          moveTo = startedAt === 0 ? lastOne : startedAt - 1;
        } // if right key, move slide up one unless at end


        if (e.which === 39) {
          moveTo = startedAt === lastOne ? 0 : startedAt + 1;
        } // update slides


        showNewSlide(moveTo); // set focus on current slide indicator

        $("[data-carousel-item-indicator=".concat(moveTo, "]")).focus();
      }
    }); // update carousel height on resize to match possible child height changes

    var resizeTimer;
    $(window).on("resize", function (e) {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        $("[data-carousel-container]").height(getCarouselHeight());
      }, 250);
    });
  }
});
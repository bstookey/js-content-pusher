$ = window.jQuery;
// CREATE APP
var APP = (window.APP = window.APP || {});

var $debug = true;

APP.PushItems = (function () {
  var $pusher, $pushItem;

  var initPushers = function () {
    var rloTimer;
    $(window).on("resize load orientationchange", function () {
      clearPushers();
      clearTimeout(rloTimer);
      rloTimer = setTimeout(function () {
        addPushrs();
      }, 500);
    });
  };

  var addPushrs = function () {
    $pusher.each(function () {
      var $pushBox = $(this);
      var $pushBoxItem = $pushBox.find("ul.pushWrap > li");

      var w1 = $pushBox.innerWidth(); //calc the width of the whole ul
      var w2 = $pushBoxItem.outerWidth(); //calc the width of the li's
      var pushrIndex = parseInt(Math.floor(w1 / w2)); //calc how many lis per row

      var pushrs = Math.ceil($pushBoxItem.length / pushrIndex); //calc total number of pushrs needed

      for (var i = pushrs; i >= 0; i--) {
        //loop to add new pushrs
        $pushBox
          .find("ul.pushWrap > li:eq(" + (pushrIndex * i - 1) + ")")
          .after(
            '<li class="push-wrapper"><div class="container"><div class="push-content"></div><span class="close"></span></div></li>'
          );
      }
      pushers();
    });
  };

  var pushers = function () {
    $pushItem.on("click", function (e) {
      e.preventDefault();

      var $this = $(this);
      var $pushrHtml = $this.find(".reveal-text").html();
      var $pushWrapper = $(".push-wrapper");

      $pushWrapper.removeClass("active");

      if ($this.hasClass("open")) {
        $this.removeClass("open");
      } else {
        $pushItem.removeClass("open");
        var $sct = "";
        if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
          $sct = "body,html";
        } else {
          $sct = "html";
        }

        $($sct).animate(
          {
            scrollTop: $this.offset().top,
          },
          0,
          function () {
            $this.addClass("open");
            $this
              .nextAll(".push-wrapper")
              .first()
              .addClass("active")
              .find(".push-content")
              .html($pushrHtml);
          }
        );
      }
    });

    $("body").on("click", ".close", function () {
      clearPushers();
    });
  };

  var clearPushers = function () {
    $(".push-wrapper").remove();
    $pushItem.removeClass("open");
  };

  var init = function () {
    $pusher = $(".pushr");
    $pushItem = $(".pushItem");
    initPushers();
  };

  return {
    init: init,
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  APP.PushItems.init();
});

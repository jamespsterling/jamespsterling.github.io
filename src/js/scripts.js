(function ($) {
  // Remove no-js class
  $("html").removeClass("no-js");

  // Animate to section when nav is clicked
  $("header a").click(function (e) {
    e.preventDefault();
    var heading = $(this).attr("href");
    var scrollDistance = $(heading).offset().top;

    $("html, body").animate(
      {
        scrollTop: scrollDistance + "px",
      },
      300
    );

    // Hide the menu once clicked if mobile
    if ($("header").hasClass("active")) {
      $("header, body").removeClass("active");
    }
  });

  // Scroll to top
  $("#to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      300
    );
  });

  // Scroll to first element
  $("#lead-down span").click(function () {
    var scrollDistance = $("#lead").next().offset().top;
    $("html, body").animate(
      {
        scrollTop: scrollDistance + "px",
      },
      500
    );
  });

  // Create timeline
  $("#experience-timeline").each(function () {
    $this = $(this); // Store reference to this
    $userContent = $this.children("div"); // user content

    // Create each timeline block
    $userContent.each(function () {
      $(this)
        .addClass("vtimeline-content")
        .addClass("shadow-large")
        .wrap(
          '<div class="vtimeline-point"><div class="vtimeline-block"></div></div>'
        );
    });

    // Add icons to each block
    var i = 0,
      icons = [
        "fab fa-angular",
        "fab fa-node-js",
        "fas fa-laptop-code",
        "fab fa-php",
        "fas fa-code",
      ];
    $this.find(".vtimeline-point").each(function () {
      $(this).prepend(
        '<div class="vtimeline-icon"><i class="' + icons[i] + '"></i></div>'
      );
      i++;
    });

    // Add dates to the timeline if exists
    $this.find(".vtimeline-content").each(function () {
      var date = $(this).data("date");
      if (date) {
        // Prepend if exists
        $(this)
          .parent()
          .prepend('<span class="vtimeline-date">' + date + "</span>");
      }
    });
  });

  // Open mobile menu
  $("#mobile-menu-open").click(function () {
    $("header, body").addClass("active");
  });

  // Close mobile menu
  $("#mobile-menu-close").click(function () {
    $("header, body").removeClass("active");
  });

  var myLazyLoad = new LazyLoad({
    elements_selector: ".lazy",
  });
})(jQuery);
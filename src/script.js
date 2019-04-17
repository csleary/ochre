$.stellar({
  horizontalScrolling: false
});

$.get("https://ochremusic.com/api/spotify", function(data) {
  $("#followers .spotify").html(data.spotify);
});

$.get("https://ochremusic.com/api/soundcloud", function(data) {
  $("#followers .soundcloud").html(data.soundcloud);
});

$.get("https://ochremusic.com/api/facebook", function(data) {
  $("#followers .facebook").html(data.facebook);
});

$.get("https://ochremusic.com/api/twitter", function(data) {
  $("#followers .twitter").html(data.twitter);
});

$.get("https://ochremusic.com/api/mailchimp", function(data) {
  $("aside #mailchimp").html(data.mailchimp);
});

$("#eth-button").click(function() {
  $(".eth-info").toggle();
  $(".btc-info").hide();
  $(".xem-info").hide();
});

$("#xem-button").click(function() {
  $(".xem-info").toggle();
  $(".btc-info").hide();
  $(".eth-info").hide();
});

$("#btc-button").click(function() {
  $(".btc-info").toggle();
  $(".eth-info").hide();
  $(".xem-info").hide();
});

var $contactForm = $("#contact-form");
$contactForm.submit(function(e) {
  e.preventDefault();
  var $submit = $("input:submit", $contactForm);
  var defaultSubmitText = $submit.val();

  $.ajax({
    url: "//formspree.io/" + "mail" + "@" + "ochremusic" + "." + "com",
    method: "POST",
    data: $(this).serialize(),
    dataType: "json",
    beforeSend: function() {
      $submit.attr("disabled", true).val("Sending message…");
    },
    success: function(data) {
      $submit.val("Message sent!");
      $("#contact-form")[0].reset();
      setTimeout(function() {
        $submit.attr("disabled", false).val(defaultSubmitText);
      }, 5000);
    },
    error: function(err) {
      $submit.val("Sending failed, sorry.");
      setTimeout(function() {
        $submit.attr("disabled", false).val(defaultSubmitText);
      }, 5000);
    }
  });
});

$(window).load(function() {
  setTimeout(function() {
    $('svg[data-hash="5652f831c72d"]').each(function(i) {
      $(this)
        .parent()
        .next("div.text-wrapper")
        .find("a.author")
        .first()
        .addClass("chris");
    });
  }, 500);
});

$.stellar({
  horizontalScrolling: false
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
      //$contactForm.append("<div class="alert alert--loading">Sending message…</div>");
      $submit.attr("disabled", true).val("Sending message…");
    },
    success: function(data) {
      //$contactForm.append("<div class="alert alert--success">Message sent!</div>");
      $submit.val("Message sent!");
      $("#contact-form")[0].reset();
      setTimeout(function() {
        //$(".alert--success").remove();
        $submit.attr("disabled", false).val(defaultSubmitText);
      }, 5000);
    },
    error: function(err) {
      //$contactForm.find(".alert--loading").hide();
      //$contactForm.append("<div class="alert alert--error">Error.</div>");
      $submit.val("Sending failed, sorry.");
      setTimeout(function() {
        //$(".alert--error").remove();
        $submit.attr("disabled", false).val(defaultSubmitText);
      }, 5000);
    }
  });
});

$(window).load(function() {
  setTimeout(function(){
    $("svg[data-hash='5652f831c72d']").each(function( i ) {
      $(this).parent()
      .next("div.text-wrapper")
      .find("a.author")
      .first()
      .addClass("chris");
    });
  }, 500);
});

// var ws = new WebSocket("ws://ochremusic.com/followers/");
var ws = new WebSocket("ws://localhost:8081");
ws.onmessage = function (event) {
  var followers = JSON.parse(event.data);
  document.getElementById('spotify').textContent = followers.spotify;
  document.getElementById('soundcloud').textContent = followers.soundcloud;
  document.getElementById('facebook').textContent = followers.facebook;
  document.getElementById('twitter').textContent = followers.twitter;
  document.getElementById('mailchimp').textContent = followers.mailchimp;
  document.getElementById('gig-date').textContent = followers.date;
  document.getElementById('gig-venue').textContent = followers.venue;
  document.getElementById('gig-location').textContent = followers.location;
  document.getElementById('gig-time').textContent = followers.time;
  document.getElementById('gig-link').href = followers.link;
  // console.log(followers);
};

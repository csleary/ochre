$.stellar({
  horizontalScrolling: false
});

var ws = new WebSocket("ws://ochremusic.com/followers/");
// var ws = new WebSocket("ws://localhost:8081");
ws.onmessage = function (event) {
  var data = JSON.parse(event.data);
  document.getElementById('spotify').textContent = data.spotify;
  document.getElementById('soundcloud').textContent = data.soundcloud;
  document.getElementById('facebook').textContent = data.facebook;
  document.getElementById('twitter').textContent = data.twitter;
  document.getElementById('mailchimp').textContent = data.mailchimp;
  document.getElementById('gig-date').textContent = data.date;
  document.getElementById('gig-venue').textContent = data.venue;
  document.getElementById('gig-location').textContent = data.location;
  document.getElementById('gig-time').textContent = data.time;
  document.getElementById('gig-link').href = data.link;
};

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

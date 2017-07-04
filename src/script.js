$.stellar({
  horizontalScrolling: false
});

var socket = new WebSocket('wss://ochremusic.com/followers/');
// var socket = new WebSocket("ws://localhost:8081");
socket.onmessage = function(response) {
  var data = JSON.parse(response.data);
  switch (data.service) {
    case 'spotify':
      $('#followers .spotify').html(data.followers);
      break;
    case 'soundcloud':
      $('#followers .soundcloud').html(data.followers);
      break;
    case 'facebook':
      $('#followers .facebook').html(data.likes);
      break;
    case 'twitter':
      $('#followers .twitter').html(data.followers);
      break;
    case 'mailchimp':
      $('aside #mailchimp').html(data.subscribers);
      break;
    case 'songkick':
      songkickList = data.gigs;

      function songkick(array) {
        var list = document.createElement('ul');
        for (i = 0; i < array.length; i++) {
          var item = document.createElement('li');
          item.appendChild(document.createTextNode(array[i].date));
          item.appendChild(document.createTextNode('\u00A0' + String.fromCharCode(8226) + '\u00A0'));
          var a = document.createElement('a');
          var linkText = document.createTextNode(array[i].venue);
          a.appendChild(linkText);
          a.title = "Visit the event page on Songkick.";
          a.href = array[i].link;
          item.appendChild(a);
          item.appendChild(document.createElement('br'));
          item.appendChild(document.createTextNode(array[i].location));
          item.appendChild(document.createTextNode(array[i].time));
          list.appendChild(item);
        }
        return list;
      }

      if (songkickList.length !== 0) {
        var placeholder = document.getElementById('sk-none');
        document.getElementById('songkick').replaceChild(songkick(songkickList), placeholder);
      }
      break;
  }
};

$('#eth-button').click(function() {
  $('.eth-info').toggle();
  $('.btc-info').hide();
  $('.xem-info').hide();
});

$('#xem-button').click(function() {
  $('.xem-info').toggle();
  $('.btc-info').hide();
  $('.eth-info').hide();
});

$('#btc-button').click(function() {
  $('.btc-info').toggle();
  $('.eth-info').hide();
  $('.xem-info').hide();
});

var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
  e.preventDefault();
  var $submit = $('input:submit', $contactForm);
  var defaultSubmitText = $submit.val();

  $.ajax({
    url: "//formspree.io/" + "mail" + "@" + "ochremusic" + "." + "com",
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      //$contactForm.append("<div class="alert alert--loading">Sending message…</div>");
      $submit.attr('disabled', true).val("Sending message…");
    },
    success: function(data) {
      //$contactForm.append("<div class="alert alert--success">Message sent!</div>");
      $submit.val("Message sent!");
      $('#contact-form')[0].reset();
      setTimeout(function() {
        //$(".alert--success").remove();
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
    error: function(err) {
      //$contactForm.find(".alert--loading").hide();
      //$contactForm.append("<div class="alert alert--error">Error.</div>");
      $submit.val("Sending failed, sorry.");
      setTimeout(function() {
        //$(".alert--error").remove();
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    }
  });
});

$(window).load(function() {
  setTimeout(function() {
    $('svg[data-hash="5652f831c72d"]').each(function( i ) {
      $(this).parent()
      .next('div.text-wrapper')
      .find('a.author')
      .first()
      .addClass('chris');
    });
  }, 500);
});

$.stellar({
  horizontalScrolling: false,
});

document.addEventListener('lazybeforeunveil', function(e) {
  var bg = e.target.getAttribute('data-bg');
  if (bg) {
    e.target.style.backgroundImage = 'url(' + bg + ')';
  }
});

$.get('https://ochremusic.com/api/spotify', function(data) {
  $('#followers .spotify').html(data.spotify);
});

$.get('https://ochremusic.com/api/soundcloud', function(data) {
  $('#followers .soundcloud').html(data.soundcloud);
});

$.get('https://ochremusic.com/api/facebook', function(data) {
  $('#followers .facebook').html(data.facebook);
});

$.get('https://ochremusic.com/api/twitter', function(data) {
  $('#followers .twitter').html(data.twitter);
});

$.get('https://ochremusic.com/api/mailchimp', function(data) {
  $('aside #mailchimp').html(data.mailchimp);
});

$('#list-subscribe').submit(function(event) {
  event.preventDefault();
  var $submit = $('input:submit', $(this));
  var defaultSubmitText = $submit.val();

  $submit.prop('disabled', true).val('Sending…');

  var url = $(this).attr('action');
  var data = $(this).serialize();

  $.post(url, data, function(res) {
    $submit.prop('disabled', false).val(defaultSubmitText);
    if (res.error && res.status === 'subscribed') {
      $('#list-res-error').html('Error: ' + res.error);
      $('#list-res').html(
        'You can update your profile <a href="' + res.updateUrl + '">here</a>.'
      );
      return;
    }
    if (
      res.error &&
      (res.status === 'unsubscribed' || res.status === 'pending')
    ) {
      $('#list-res-error').html('Error: ' + res.error);
      $('#list-res').html(
        'You can always resubscribe <a href="http://eepurl.com/gphAPb">here</a>. You will receive a confirmation opt-in email.'
      );
      return;
    }
    if (res.error) {
      $('#list-res-error').html('Error: ' + res.error);
      $('#list-res').empty();
      return;
    }
    $('#list-res-error').empty();
    $('#list-res').html(res.success);
  });
});

var $contactForm = $('#contact-form');
$contactForm.submit(function(e) {
  e.preventDefault();
  var $submit = $('input:submit', $contactForm);
  var defaultSubmitText = $submit.val();

  $.ajax({
    url: '//formspree.io/' + 'mail' + '@' + 'ochremusic' + '.' + 'com',
    method: 'POST',
    data: $(this).serialize(),
    dataType: 'json',
    beforeSend: function() {
      $submit.attr('disabled', true).val('Sending message…');
    },
    success: function(data) {
      $submit.val('Message sent!');
      $('#contact-form')[0].reset();
      setTimeout(function() {
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
    error: function(err) {
      $submit.val('Sending failed, sorry.');
      setTimeout(function() {
        $submit.attr('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
  });
});

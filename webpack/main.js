$(document).ready(() => {
  const container = $('.container');
  let containerTop;
  const header = $('header.parallax');
  let headerPosition;
  let lastScrollY = 0;
  const nav = $('nav');

  $(window).scroll(() => {
    lastScrollY = $(window).scrollTop();
    headerPosition = lastScrollY - header.offset().top;
    containerTop = container.offset().top;

    if (lastScrollY < containerTop) {
      header.css('backgroundPositionY', lastScrollY / 2 + 'px');
    }

    if (lastScrollY > containerTop) {
      nav.addClass('sticky');
    }

    if (lastScrollY === 0) {
      nav.removeClass('sticky');
    }
  });

  $.get('https://ochremusic.com/api/spotify', data => {
    $('#followers .spotify').html(data.spotify);
  });

  $.get('https://ochremusic.com/api/soundcloud', data => {
    $('#followers .soundcloud').html(data.soundcloud);
  });

  $.get('https://ochremusic.com/api/twitter', data => {
    $('#followers .twitter').html(data.twitter);
  });

  // $.get('https://ochremusic.com/api/facebook', (data) => {
  //   $('#followers .facebook').html(data.facebook);
  // });

  // $.get('https://ochremusic.com/api/mailchimp', data => {
  //   $('aside #mailchimp').html('Join ' + data.mailchimp + ' subscribers and');
  // });
});

const contactForm = $('#contact-form');
contactForm.submit(e => {
  e.preventDefault();
  const submitButton = $('.send');
  const defaultSubmitText = submitButton.val();

  $.post({
    url: 'https://ochremusic.com/api/contact',
    data: $(contactForm).serialize(),
    dataType: 'json',
    beforeSend: () => {
      submitButton.prop('disabled', true).val('Sending message…');
    },
    success: res => {
      contactForm.append(`<div class='success'>${res.success}</div>`);
      submitButton.val('Message sent!');
      $('#contact-form')[0].reset();
      setTimeout(() => {
        $('.success').fadeOut(function () {
          $(this).remove();
        });
        submitButton.prop('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
    error: err => {
      contactForm.append(`<div class='error'>${err.error}</div>`);
      submitButton.val('Sending failed!');
      setTimeout(() => {
        $('.error').fadeOut(function () {
          $(this).remove();
        });
        submitButton.prop('disabled', false).val(defaultSubmitText);
      }, 5000);
    }
  });
});

// module.exports = {
//   onSubmit
// };

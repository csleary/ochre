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

$('.subscribe-input').focus(() => {
  $('.apology').addClass('show');
});

const button = $('.subscribe, .button');
const onSubmit = () => {
  button.prop('disabled', true);
  $('.list-res, .error').remove();
  $('.list-res, .success').remove();
  $('.list-subscribe').after(`<p class="list-res">Sending…</p>`);
  const url = 'https://ochremusic.com/api/list-subscribe';
  const data = $('.subscribe-input').serialize();

  $.post(url, data, res => {
    button.prop('disabled', false);

    if (res.error) {
      $('.list-res').remove();
      $('.list-subscribe').after(`
        <p class=list-res error>Error: ${res.error}</p>
        <p class="list-res">You can always subscribe manually <a href="https://sibforms.com/serve/MUIEANtw8O76011XmV9-7HGDJ9E0wlGF3W1y9Sls0LW_MabRdAKw01IlVGki8NBVpupxuI9LmNFwCuOge1QV_3eEiBTtI0sZ9GiTdOEj1WlPQa0D8LR1XlAZ6xdNmdOsqcDoKZKCHmEa6MbX0i_9zIoMWqXYiYVn8lqYVsEsMZdtlyZDa1EUOeMEjMnyz-BDcnwQ04_31fXRIWjJ">here</a>. You will receive a confirmation opt-in email.</p>
        `);
      return;
    }

    $('.list-res').remove();
    $('.list-subscribe').after(`<p class="list-res success">${res.success}</p>`);
    $('.list-subscribe')[0].reset();
  });
};

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
        $('.success').fadeOut(function() {
          $(this).remove();
        });
        submitButton.prop('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
    error: err => {
      contactForm.append(`<div class='error'>${err.error}</div>`);
      submitButton.val('Sending failed!');
      setTimeout(() => {
        $('.error').fadeOut(function() {
          $(this).remove();
        });
        submitButton.prop('disabled', false).val(defaultSubmitText);
      }, 5000);
    }
  });
});

module.exports = {
  onSubmit
};

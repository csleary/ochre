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

  $.get('/.netlify/functions/socials', (data) => {
    const { spotify, twitter } = JSON.parse(data);
    $('#followers .spotify').html(spotify);
    $('#followers .twitter').html(twitter);
  });

  $.get('/.netlify/functions/twitter', (data) => {});
});

const contactForm = $('#contact-form');

contactForm.submit((e) => {
  e.preventDefault();
  const submitButton = $('.send');
  const defaultSubmitText = submitButton.val();

  $.post({
    url: '/',
    contentType: 'application/x-www-form-urlencoded',
    data: $(contactForm).serialize(),
    beforeSend: () => {
      submitButton.prop('disabled', true).val('Sending message…');
    },
    success: () => {
      contactForm.append(
        `<div class='success'>Thank you. Your message has been sent successfully.</div>`
      );
      submitButton.val('Message sent!');
      $('#contact-form')[0].reset();
      setTimeout(() => {
        $('.success').fadeOut(function () {
          $(this).remove();
        });
        submitButton.prop('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
    error: () => {
      contactForm.append(
        `<div class='error'>Sorry, your message could not be sent. Please email contact@ochremusic.com directly instead.</div>`
      );
      submitButton.val('Sending failed!');
      setTimeout(() => {
        $('.error').fadeOut(function () {
          $(this).remove();
        });
        submitButton.prop('disabled', false).val(defaultSubmitText);
      }, 5000);
    },
  });
});

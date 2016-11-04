// Parallax
$(function() {
	$.stellar({
		horizontalScrolling: false,
	});
});

// Responsive nav menu

function nav() {
    var x = document.getElementById("main-nav");
    if (x.className === "nav-menu") {
        x.className += " responsive";
    } else {
        x.className = "nav-menu";
    }
}

// Contact form AJAX
var $contactForm = $('#contact-form');

$contactForm.submit(function(e) {
	e.preventDefault();
	var $submit = $('input:submit', $contactForm);
	var defaultSubmitText = $submit.val();

	$.ajax({
		url: '//formspree.io/mail@ochremusic.com',
		method: 'POST',
		data: $(this).serialize(),
		dataType: 'json',
		beforeSend: function() {
			//$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
			$submit.attr('disabled', true).val('Sending message…');
		},
		success: function(data) {
			//$contactForm.append('<div class="alert alert--success">Message sent!</div>');
			$submit.val('Message sent!');
      $("#contact-form")[0].reset();
			setTimeout(function() {
				//$('.alert--success').remove();
				$submit.attr('disabled', false).val(defaultSubmitText);
			}, 5000);
		},
		error: function(err) {
			//$contactForm.find('.alert--loading').hide();
			//$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
			$submit.val('Ops, there was an error.');
			setTimeout(function() {
				//$('.alert--error').remove();
				$submit.attr('disabled', false).val(defaultSubmitText);
			}, 5000);
		}
	});
});

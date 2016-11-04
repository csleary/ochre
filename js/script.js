$(function() {
	$.stellar({
		horizontalScrolling: false,
	});
});

function nav() {
    var x = document.getElementById("main-nav");
    if (x.className === "nav-menu") {
        x.className += " responsive";
    } else {
        x.className = "nav-menu";
    }
}

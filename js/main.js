$(document).ready(function() {

	var viewportHeight = $(window).outerHeight();

	$('.mCustomScrollbar').mCustomScrollbar({
		mouseWheel:{ scrollAmount: viewportHeight / 2 }
	});
});
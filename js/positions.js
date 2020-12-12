$('document').ready(function(){
	let width = $('#map').css('width').split('px');
	$('.nstp2').css({
		'left': $('#map').css('width'),
		'top': width[0]/3+'px',
	});
});
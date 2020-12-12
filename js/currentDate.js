$('document').ready(function(){
	$('body').on('click','.b-calendar__day, .b-calendar__weekend',function(){
		$('.currentDate').removeClass('currentDate');
		$(this).addClass('currentDate');
	});
});
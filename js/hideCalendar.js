$('document').ready(function(){
	var cursorOnCalendar = false;
	$('body').on('mouseenter','#listOfEvents', function(){
		cursorOnCalendar = true;
	});
	$('body').on('mouseleave','#listOfEvents', function(){
		if (cursorOnCalendar == true) $('#listOfEvents').remove();
	});
	$('#map-container, #title').on('click', function(){ 
		$('.bigCalendar, #listOfEvents').remove(); 
		$('.activeYear').removeClass('activeYear'); 
		$('#foundEvents').remove();
	})
});
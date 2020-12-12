$(".year").on("click", function(){
	$('#foundEvents').remove();
	$('.bigCalendar').remove();
	$('.activeYear').removeClass('activeYear');
	$(this).addClass('activeYear');
	$.ajax({
		url: 'php/show_calendar.php',
		type: 'POST',
		dataType: 'text',
		data: {year: this.textContent},
		success: success_query
	});
});


function success_query(data)
{
	$("body").append(data);
	$(".bigCalendar").css({
		"margin-left": $("#mainMenu").width() + "px",
		"top": '30%'
	});
};
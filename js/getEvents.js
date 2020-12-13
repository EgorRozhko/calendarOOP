$('document').ready(function(){
	var elem;
	var y;
	var x;
	var date;
	$('body').on('click','.b-calendar__day',function(){
		$('#listOfEvents').remove();
		elem = this.getBoundingClientRect();
		x = elem.x;
		y = elem.y;
		date = $(this).attr('value');
		$.ajax({
			url: "php/repeat_dates.php",
			type: "POST",
			data: ({i_id: date }),
			dataType: "text",
			success: func_success_repeat_dates
		});
	});
	$('body').on('click','.addEvent', function(){
		$(location).attr('href','createArticlePage.php?parameters='+date);
	});
	function func_success_repeat_dates(data)
	{
		$("body").append(data);
		$("#listOfEvents").css({
			"margin-left": $("#mainMenu").width() + $(".bigCalendar").width() + "px",
			"margin-top": y - 20 + "px"
		});
	};
});
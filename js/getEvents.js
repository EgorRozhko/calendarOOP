$('document').ready(function(){
	var item_id;
	var elem;
	var y;
	var x;
	$('body').on('click','.b-calendar__day',function(){
		$('#listOfEvents').remove();
		item_id = this.id;
		elem = this.getBoundingClientRect();
		x = elem.x;
		y = elem.y;
		$.ajax({
			url: "php/repeat_dates.php",
			type: "POST",
			data: ({i_id: $(this).attr('value') }),
			dataType: "text",
			success: func_success_repeat_dates
		});
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
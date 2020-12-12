$('document').ready(function(){
	var date;
	var regionId;
	$('body').on('click','.b-calendar__weekend',function(){
		date = this.id;
		$('#list').empty();
		var currentURL = window.location.href;
		regionId = currentURL.split('=');
		$.ajax({
			url: "php/repeat_dates2.php",
			type: "POST",
			data: ({i_id: this.id, regionId: regionId[1]}),
			dataType: "text",
			success: func_success_repeat_dates
		});
	});
	$('body').on('click','.oneOfEvents',function(){
		$.ajax({
			url: "php/showEvent.php",
			type: "POST",
			data: ({i_id: this.id}),
			dataType: "text",
			success: showEvent
		});
	});
	
	$('body').on('click','.icon_anim', function(){
		$(location).attr('href','article.php?a='+this.id+'-f-a');
	});

	$('body').on('click','.addEvent', function(){
		$(location).attr('href','createArticlePage.php?parameters='+date+'-'+regionId[1]);
	});
	$('.bigMap').css('width',$('#bigMapContainer').css('width'));
	function func_success_repeat_dates(data){
		$('#list').append(data);
	}
	$('body').on('click','.b-calendar__day',function(){
		var currentURL = window.location.href;
		regionId = currentURL.split('=');
		date = this.id;
		$('#list').empty();
		$('#list').append(
			'<div id="warning">В этот день не было значимых событий</div><div class="addEvent"><p>Добавить событие</p></div>');
	});

	function showEvent(data)
	{
		$('#bigMapContainer').append(data);
	}
});
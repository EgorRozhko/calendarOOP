$(document).ready(function(){
	$('body').on('click','.oneOfEvents',function(){
		var item_id = this.id;
		$.ajax({
			url: "php/ssd.php",
			type: "POST",
			data: ({i_id: item_id}),
			dataType: "text",
			success: func_success
		});
		$('#listOfEvents').empty();
		$('#listOfEvents').css({
			display:'none'
		});
		$(".bigCalendar").remove();
		$('.obla2').remove(); 
	});

	$('body').on('click','.obla',function(){
		var item_id = this.id;
  		$.ajax({
			url: "php/show_region.php",
			type: "POST",
			data: ({i_id: item_id}),
			dataType: "text",
			success: func_success
		});
	});

	$('body').on('click','.icon_anim', function(){
		$(location).attr('href','article.php?a='+this.id+'-f-a');
	});
	$('body').on('click','.readMore', function(){
		$(location).attr('href','article.php?a='+this.id+'-f-a');
	});

	function func_success(data)
	{
		$('area').remove();
		$('.obla').remove();
		$('#map-container').append(data);
		$('body, html').animate({scrollTop: $('.obla').offset().top }, 1500);
		$('.obla').addClass('b');
	};
});
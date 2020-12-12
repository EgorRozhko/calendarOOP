$('document').ready(function(){
	$('body').on('click', '#searchButton', function(){
		$('.bigCalendar').remove();
		$('.activeYear').removeClass('activeYear');
		$('#foundEvents').remove();
		$.ajax({
			url: 'php/search.php',
			type: 'POST',
			dataType: 'text',
			data: { searchText: $('#search').val() },
			success: success_query
		});
	});
	$('body').on('mouseleave', '#foundEvents', function(){
		this.remove();
	});
	$('body').on('click', '.result', function(){
		$('.monument').remove();
		$('#map').attr("src","images/secondObla.png");
		$.ajax({
			url: "php/ssd.php",
			type: "POST",
			data: ({ i_id:this.id }),
			dataType: "text",
			success: successFunction
		});
	});
	function successFunction(data){
		$('.obla').remove();
		$('#map-container').append(data);
		$('.obla').addClass('b');
		$('body, html').animate({scrollTop: $('.obla').offset().top }, 1500);
	}
	function success_query(data){
		$('body').append(data);
		$('#foundEvents').css('margin-top', $('header').height());
	}
});
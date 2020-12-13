$('document').ready(function(){
	$('body').on('click', '#searchButton', function(){
		$('.bigCalendar, #foundEvents').remove();
		$('.activeYear').removeClass('activeYear');
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
		$('.monument, #eventTitle').remove();
		$('body').append('<div id="eventTitle"><p>'+$(this).text()+'</p><img id="closeEvent" src="images/close.png"></div>');
		$('#eventTitle').css('margin-top', $('header').height());
		$.ajax({
			url: "php/ssd.php",
			type: "POST",
			data: ({ i_id:this.id }),
			dataType: "text",
			success: function(data){
				$('area, .monument, .obla2, #foundEvents, .obla').remove();
				$('#map').attr('src','images/blockedObla.png');
				$('#map-container').append(data);
				$('body, html').animate({ scrollTop: $('.obla').offset().top - 50 }, 1000);
				$('.obla').addClass('b');
			}
		});
	});
	function success_query(data){
		$('body').append(data);
		$('#foundEvents').css('margin-top', $('header').height());
	}
});
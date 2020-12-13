$(document).ready(function(){
	$('body').on('click','.oneOfEvents',function(){
		var item_id = this.id;				
		$('body').append('<div id="eventTitle"><p>'+$(this).text()+'</p><img id="closeEvent" src="images/close.png"></div>');
		$('#eventTitle').css('margin-top', $('header').height());
		$.ajax({
			url: "php/ssd.php",
			type: "POST",
			data: ({i_id: item_id}),
			dataType: "text",
			success: function(data){
				$('area, .bigCalendar, .monument, .obla2, #listOfEvents, .obla').remove();
				$('.activeYear').removeClass('activeYear');
				$('#map').attr('src','images/blockedObla.png');
				$('#map-container').append(data);
				$('body, html').animate({scrollTop: $('.obla').offset().top }, 1500);
				$('.obla').addClass('b');
			}
		});
	});

	$('body').on('click','.obla',function(){
		var item_id = this.id;
  		$.ajax({
			url: "php/show_region.php",
			type: "POST",
			data: ({i_id: item_id}),
			dataType: "text",
			success: function(data){ $('body').append(data); }
		});
	});

	$('body').on('click', '#closeEvent', function(){
		$('#map').attr('src','images/secondObla.png');
		$('.obla, #eventTitle').remove();
		$.ajax({
			url: 'php/show_monuments.php',
			dataType: 'text',
			type: 'POST',
			data: ({ secondInclude: 1 }),
			success: function(data){ $('#map-container').append(data); }
		});
		$.ajax({
			url: 'php/showArea.php',
			dataType: 'text',
			type: 'POST',
			data: ({ secondInclude: 1 }),
			success: function(data){ $('map').append(data); }
		});
	});
	$('body').on('click','.icon_anim', function(){
		$(location).attr('href','article.php?a='+this.id+'-f-a');
	});
	$('body').on('click','.readMore', function(){
		$(location).attr('href','article.php?a='+this.id+'-f-a');
	});
});
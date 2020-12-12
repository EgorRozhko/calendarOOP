$(document).ready(function(){
	$('body').on('click','.oneOfEvents',function(){
		var item_id = this.id;
		$.ajax({
			url: "php/ssd.php",
			type: "POST",
			data: ({i_id: item_id}),
			dataType: "text",
			success: function(data){
				$('map, .bigCalendar, .monument, .obla2').remove();
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

	$('body').on('click','.icon_anim', function(){
		$(location).attr('href','article.php?a='+this.id+'-f-a');
	});
	$('body').on('click','.readMore', function(){
		$(location).attr('href','article.php?a='+this.id+'-f-a');
	});
});
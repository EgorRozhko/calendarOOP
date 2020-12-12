$('document').ready(function(){
	$('body').on('mouseenter','area',function(){
		$.ajax({
			url: 'php/showRegion.php',
			type: 'POST',
			dataType: 'text',
			data: ({ id: this.id }),
			success: success
		});
	});
	function success(data)
	{
		$('.obla').remove();
		$('.obla2').remove();
		$('#map-container').append(data);
		$('.obla2').addClass('b');
	}
});
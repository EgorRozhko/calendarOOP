$('document').ready(function(){
	var currentURL = window.location.href;
	var regionId = currentURL.split('=');
	$('p').on('click',function(){
		$.ajax({
			url: 'php/calendarOnEventPage.php',
			type: 'POST',
			dataType: 'text',
			data: ({ year: this.textContent, regionId: regionId[1] }),
			success: success 
		});
	});
	function success(data)
	{
		$('.warning').remove();
		$('.bigCalendar').remove();
		$('hr').remove();
		$('#calendar').append(data);
	}
});
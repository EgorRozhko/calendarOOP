$('document').ready(function(){
	$('body').on('click', '.obla2', function(){
		$(location).attr('href', 'regionPage.php?regionId='+this.id);
	});
});
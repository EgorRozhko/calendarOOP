$('document').ready(function(){
	$('#password').val('');
	$('body').on('click', '#enter', function(){
		$.ajax({
			url: 'php/adminPassword.php',
			type: 'POST',
			dataType: 'text',
			data: ({ password: $('#password').val() }),
			success: function(data){
				$answer = data.split(';')
				if ($answer[0] == 'true') {
					$('#content').empty();
					$('#content').append($answer[1]);
				}
				else{
					$('#warning').text($answer[1]);
					$('#password').val('');
				}
			}
		});
	});
	$('body').on('click', '#newArticles', function(){
		$.ajax({
			url: 'php/showNewArticles.php',
			success: function(data){
				$('#newArticles').text('Список новых статей:');
				$('#eventsList').empty();
				$('#eventsList').append(data);
			}
		});
	});
	$('body').on('click', '.article', function(){
		$(location).attr('href','article.php?a='+this.id+'-t-a');
	});
	$('body').on('click', '#removeArticle', function(){
		$.ajax({
			url: 'php/removeArticle.php',
			type: 'POST',
			dataType: 'text',
			data: ({ aId: $('#articleId').val() }),
			success: function(data){
				if (data == 'true')	$(location).attr('href','admin.php');
				else alert(data);
			}
		});
	});
	$('body').on('click', '#relizeArticle', function(){
		$.ajax({
			url: 'php/relizeArticle.php',
			type: 'POST',
			dataType: 'text',
			data: ({ aId: $('#articleId').val() }),
			success: function(data){
				if (data == 'true')	$(location).attr('href','admin.php');
				else alert(data);
			}
		});
	});
});
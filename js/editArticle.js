$('document').ready(function(){
	let elementId = parseInt($('#elementList p, #elementList img').last().attr('id').match(/\d+/));
	$('#saveArticle').css({ 'visibility': 'visible' });
	//ДОБАВЛЕНИЕ ФОРМ ДЛЯ ОБЪЕКТОВ
	$('body').on('click', '#p', function(){
		$('#elementSetting').empty();
		$('.editElement, .addElement').remove();
		$('#textareaParagraph').val('');
		$.ajax({
			url: 'components/createArticle/paragraphForm.php',
			success: function(data){
				$('#hiddenframe').remove();
				$('#elementSetting').append(data);
			}
		});
	});
	$('body').on('click', '#img', function(){
		$('#elementSetting').empty();
		$('.addElement, .editElement').remove();
		$('#textareaParagraph').val('');
		$.ajax({
			url: 'components/createArticle/imageForm.php',
			success: function(data){
				$('#hiddenframe').remove();
				$('#elementSetting').append(data);
			}
		});
	});
	$('body').on('change','#userfile', function(){
		$('#uploadImage').css('visibility','visible');
	});

	//ЗАГРУЗКА КАРТИНКИ
	$('body').on('click', '#uploadImage', function(){
		$.ajax({
			url: 'components/createArticle/uploadImageForm.php',
			success: function(data){
				$('#userfile').val('');
				$('#hiddenframe').append(data);
				$('#editImgInArticle, #addImgInArticle').css('visibility','visible');
			}
		});
	});

	//ДОБАВЛЕНИЕ ОБЪЕКТОВ В СТАТЬИ
	$('body').on('click', '#addParagraphButton', function(){
			elementId++;
			$('#elementList').append('<p class="articleElement articleParagraph" id="paragraph'+elementId+'">'+$('#textareaParagraph').val()+'</p>');
			$('#elementSetting').empty();
			$('#addParagraph').remove();
	});
	$('body').on('click', '#addImgInArticle', function(){
		$('#addImgInArticle').css('visibility','visible');
		if ($('#hiddenframe').contents().find('input').val() == 'success') 
		{
			$('#warning').css('color','#23a300');
			$('#warning').html('Изображение было добавлено в статью');
			elementId ++;
			let arr = $('#hiddenframe').contents().find('img').attr('src').split('../../');
			let source = '../'+arr[1];
			$('#elementList').append('<img class="articleImg articleElement" id="image'+elementId+'" src='+source+'>');
			$('#elementSetting').empty();
			$('.addElement').remove();
		}
		else{
			$('#warning').css('color','red');
			$('#warning').html('Произошла ошибка. Недопустимый тип файла или размер превышает 3 Mb.');
		}
		$('#uploadImageBlock').remove();
	});
	$('body').on('click', '#internetImageAdd', function(){
		if ($('#imageUrl').val() == '') $('#warning2').html('Пустое поле');
		else
		{
			elementId ++;
			$('#elementList').append('<img class="articleImg articleElement" id="image'+elementId+'" src='+$('#imageUrl').val()+'><br>');
			$('#elementSetting').empty();
			$('#imageUrl').val() == '';
			$('.addElement').remove();
		}
	});


	//РЕДАКТИРОВАНИЕ ЭЛЕМЕНТОВ
	$('body').on('click', '.articleElement', function(){
		currentEl = this.id;
		$('#elementSetting').empty();
		$('.editElement').remove();
		$.ajax({
			url: 'components/createArticle/editElement.php',
			type: 'POST',
			dataType: 'text',
			data: ({ currentElement: $(this).prop('tagName'), text: $(this).text() }),
			success: function(data){
				$('.addElement').remove(),
				$('#elementSetting').append(data);
			}
		});
	});

	$('body').on('click', '#saveEditP', function(){
		$('#'+currentEl).html($('#editTextArea').val());
		$('#elementSetting').empty();
		$('.editElement').remove();
	});

	$('body').on('click', '#removeP', function(){
		$('#'+currentEl).remove();
		$('#elementSetting').empty();
	});
	
	$('body').on('click', '#editImg', function(){
		if($('#imageUrl').val() == "") $('#warning2').text('Введите адрес изображения');
		else
		{
			$('#'+currentEl).attr('src', $('#imageUrl').val());
			$('#imageUrl').val() == '';
			$('.editElement').remove();
			$('#elementSetting').empty();
		}
	});
	
	$('body').on('click', '#editImgInArticle', function(){
		let arr = $('#hiddenframe').contents().find('img').attr('src').split('../../');
		let source = '../'+arr[1];
		let element = '<img class="articleImg articleElement" id="image'+elementId+'" src='+source+'>';
		$('#'+currentEl).attr('src', source);
		$('#elementSetting').empty();
		$('.editElement').remove();
	});
	$('body').on('click', '#removeImg', function(){
		$('#'+currentEl).remove();
		$('.editElement').remove();
		$('#elementSetting').empty();
	});
	
	$('body').on('click', '#saveArticle', function(){
		if ($('#elementList').text() == '') alert('Нельзя сохранить пустую статью');
		else{
			$.ajax({
				url: 'php/updateArticle.php',
				type: 'POST',
				dataType: 'text',
				data: ({
					content: $('#elementList').html(),
					articleId: $('#a_id').val()
				}),
				success: function(data){
					if(data === 'true') window.location.href = 'admin.php';
					else alert(data);
				}
			});
		}
	});
});
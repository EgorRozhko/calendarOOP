$('document').ready(function(){
	var step = 1;
	var coords;
	var firstElement = false;
	var articleContent = new Map();
	var currentElement;
	var elementId = 1;
	var filename;
	var currentIcon = false;
	var currentEl;
	function checkStep(x, y = '')
	{
		$('#title').text('Создание статьи. Шаг '+x+' из 3');
		if(x == 1)
		{
			var currentURL = window.location.href;
			var regionId = currentURL.split('=');
			var date = regionId[1].split('-');
			$.ajax({
			url: 'components/createArticle/step'+x+'.php',
			type: 'POST',
			dataType: 'text',
			data: ({ 
				date: date[2]+'.'+date[1]+'.'+date[0],
				originDate: date[0]+'-'+date[1]+'-'+date[2]
			}),  
			success: function(data){
				$('#content').append(data);
				$('#regions').val(date[3]);
				}
			});	
		}
		else if(x == 2)
		{
			$.ajax({
				url: 'components/createArticle/step'+x+'.php',
				type: 'POST',
				dataType: 'text',
				data: ({ 
					title: $('#articleTitle').val(), 
					date: $('#date').val(), 
					region: $('.regionItem').val(), 
					regionId: $('#regions').find('option:selected').data('region-id'), 
					step: x,
					shortDescription: $('#shortDescription').val()
				}),
				success: function (data){	
					$('#content').remove();
					$('body').append(data);
				} 
			});
		}
		else if(x == 3)
		{
			$.ajax({
				url: 'components/createArticle/step'+x+'.php',
				type: 'POST',
				dataType: 'text',
				data: ({
					title: $('#articleTitle').val(), 
					date: $('#showDate').val(), 
					regionId: $('#region').val(),
					imageIcon: $('#iconOnMap').attr('src'),
					coords: y,
					step: x,
					shortDescription: $('#shortDescription').val()
				}),
				success: function (data){	
					$('body').empty();
					$('body').append(data);
				}
			});
		}
	}
	function checkElementList()
	{
		if($('#elementList').text() != '') $('#saveArticle').css('visibility', 'visible');
		else $('#saveArticle').css('visibility','collapse');
	}
	checkStep(step);
	$('body').on('click', '#nextStep1', function(){
		$('#warning').html('');
		if ($('#articleTitle').val() == '') $('#warning').html('Введите название статьи');
		else if($('#shortDescription').val() == '') $('#warning').html('Введите краткое описание статьи');
		else if($('#regions').val() == null) $('#warning').html('Выберите район из списка');
		else{
			step++;
			checkStep(step, coords);
		}
	});
	$('body').on('click', '#map', function(e){
		if (currentIcon == false) alert('Сначала выберите иконку для события');
		else
		{
			$('#iconOnMap').remove();
			let target = this.getBoundingClientRect();
			let x = e.clientX - target.left;
			let y = e.clientY - target.top;
			$('#bigMap').append("<img id='iconOnMap' src='"+$('.currentIcon').attr('src')+"'>");
			let widthIcon = $('#iconOnMap').css('width').split('px');
			let heightIcon = $('#iconOnMap').css('height').split('px');
			$('#iconOnMap').css({
				'left': x - widthIcon[0]/2 +"px",
				'top': y - widthIcon[0]/2 +"px"
			});
			coords = x - widthIcon[0]/2 + ';';
			coords += y - widthIcon[0]/2;
			console.log(coords);
		}
	});
	$('body').on('click', '#imageIcon', function(){
		currentIcon = true;
		$('.currentIcon').removeClass('currentIcon');
		$(this).addClass('currentIcon');
	});
	$('body').on('click','.nstp2', function(){
		if (currentIcon == false) alert('Сначала выберите иконку для события');
		else if(coords == undefined) alert('Определите место события на карте');
		else{
			step++;
			checkStep(step, coords);
		}
	});
	$('body').on('click', '#p', function(){
		$('#elementSetting').empty();
		$('.editElement').remove();
		$('.addElement').remove();
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
		$('.addElement').remove();
		$('.editElement').remove();
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
	$('body').on('click', '#uploadImage', function(){
		$.ajax({
			url: 'components/createArticle/uploadImageForm.php',
			success: function(data){
				$('#userfile').val('');
				$('#hiddenframe').append(data);
				$('#addImgInArticle').css('visibility','visible');
				$('#editImgInArticle').css('visibility','visible');
			}
		});
	});


	$('body').on('click', '#addParagraphButton', function(){
			elementId++;
			$('#elementList').append('<p class="articleElement articleParagraph" id="paragraph'+elementId+'">'+$('#textareaParagraph').val()+'</p>');
			$('#elementSetting').empty();
			$('#addParagraph').remove();
			checkElementList()
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
			checkElementList()
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
			checkElementList()
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
		checkElementList()
	});

	$('body').on('click', '#removeP', function(){
		$('#'+currentEl).remove();
		$('#elementSetting').empty();
		checkElementList()
	});
	
	$('body').on('click', '#editImg', function(){
		if($('#imageUrl').val() == "") $('#warning2').text('Введите адрес изображения');
		else
		{
			$('#'+currentEl).attr('src', $('#imageUrl').val());
			$('#imageUrl').val() == '';
			$('.editElement').remove();
			$('#elementSetting').empty();
			checkElementList()
		}
	});
	
	$('body').on('click', '#editImgInArticle', function(){
		let arr = $('#hiddenframe').contents().find('img').attr('src').split('../../');
		let source = '../'+arr[1];
		let element = '<img class="articleImg articleElement" id="image'+elementId+'" src='+source+'>';
		$('#'+currentEl).attr('src', source);
		$('#elementSetting').empty();
		$('.editElement').remove();
		checkElementList()
	});
	$('body').on('click', '#removeImg', function(){
		$('#'+currentEl).remove();
		$('.editElement').remove();
		$('#elementSetting').empty();
		checkElementList()
	});
	
	$('body').on('click', '#saveArticle', function(){
		if ($('#elementList').text() == '') alert('Нельзя сохранить пустую статью');
		else{
			$.ajax({
				url: 'components/createArticle/saveArticle.php',
				type: 'POST',
				dataType: 'text',
				data: ({
					title: $('#artTitle').val(),
					date: $('#date').val(),
					regionId: $('#regionId').val(),
					imageIcon: $('#imageIcon').val(),
					coords: $('#coords').val(),
					content: $('#elementList').html(),
					shortDescription: $('#shortDescription').val(),
					fileName: $('#filename').val()
				}),
				success: function(data){
					if(data === 'true') location.reload();
					else alert(data);
				}
			});
		}
	});
});
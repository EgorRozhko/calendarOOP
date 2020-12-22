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
					imageIcon: $('#imageIcon').attr('src'),
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
		if (firstElement === false) {
			filename = new Date();
			filename = filename.getTime()+'.html';
			$('#filename').attr('value',filename);
			let element = '<p class="articleElement articleParagraph" id="paragraph'+elementId+'">'+$('#textareaParagraph').val()+'</p>';
			elementId ++;
			firstElement = true;
			$.ajax({
				url: 'php/articleFile.php',
				type: 'POST',
				dataType: 'text',
				data: ({ 
					element: element,
					articleFileName: filename,
					title: $('#artTitle').val()
				}),
				success: function(data){
					$('#elementSetting').empty();
					$('#elementList').empty();
					$('#elementList').append(data);
					checkElementList();
				}
			});
		}
		else{
			filename = $('#filename').attr('value');
			let element = '<p class="articleElement articleParagraph" id="paragraph'+elementId+'">'+$('#textareaParagraph').val()+'</p>';
			elementId ++;
			$.ajax({
				url: 'php/articleFile.php',
				type: 'POST',
				dataType: 'text',
				data: ({ 
					element: element,
					title: $('#artTitle').val(),
					articleFileName: filename 
				}),
				success: function(data){
					$('#elementSetting').empty();
					$('#elementList').empty();
					$('#elementList').append(data);
					checkElementList();
				}
			});
		}
		$('#addParagraph').remove();
	});
	$('body').on('click', '#addImgInArticle', function(){
		$('#addImgInArticle').css('visibility','visible');
		if ($('#hiddenframe').contents().find('input').val() == 'success') {
			$('#warning').css('color','#23a300');
			$('#warning').html('Изображение было добавлено в статью');
			if (firstElement === false) {
				let arr = $('#hiddenframe').contents().find('img').attr('src').split('../../');
				let source = '../'+arr[1];
				filename = new Date();
				filename = filename.getTime()+'.html';
				$('#filename').attr('value',filename);
				let element = '<img class="articleImg articleElement" id="image'+elementId+'" src='+source+'>';
				elementId ++;
				firstElement = true;
				$.ajax({
					url: 'php/articleFile.php',
					type: 'POST',
					dataType: 'text',
					data: ({ 
						element: element,
						title: $('#artTitle').val(),
						articleFileName: filename 
					}),
					success: function(data){
						$('#elementSetting').empty();
						$('#elementList').empty();
						$('#elementList').append(data);
						$('.addElement').remove();
						checkElementList();
					}
				});
			}
			else{
				let arr = $('#hiddenframe').contents().find('img').attr('src').split('../../');
				let source = '../'+arr[1];
				filename = $('#filename').attr('value');
				let element = '<img class="articleImg articleElement" id="image'+elementId+'" src='+source+'>';
				elementId ++;
				$.ajax({
					url: 'php/articleFile.php',
					type: 'POST',
					dataType: 'text',
					data: ({ 
						element: element,
						title: $('#artTitle').val(),
						articleFileName: filename 
					}),
					success: function(data){
						$('#elementSetting').empty();
						$('#elementList').empty();
						$('#elementList').append(data);
						$('.addElement').remove();
						checkElementList();
					}
				});
			}
		}
		else{
			$('#warning').css('color','red');
			$('#warning').html('Произошла ошибка. Недопустимый тип файла или размер превышает 3 Mb.');
		}
		$('#uploadImageBlock').remove();
	});
	$('body').on('click', '#internetImageAdd', function(){
		if ($('#imageUrl').val() == '') $('#warning2').html('Пустое поле');
		else{
			if (firstElement === false) {
				filename = new Date();
				filename = filename.getTime()+'.html';
				$('#filename').attr('value',filename);
				let element = '<img class="articleImg articleElement" id="'+elementId+'" src='+$('#imageUrl').val()+'><br>';
				elementId ++;
				firstElement = true;
				$.ajax({
					url: 'php/articleFile.php',
					type: 'POST',
					dataType: 'text',
					data: ({ 
						element: element,
						title: $('#artTitle').val(),
						articleFileName: filename 
					}),
					success: function(data){
						$('#elementSetting').empty();
						$('#imageUrl').val() == '';
						$('#elementList').empty();
						$('#elementList').append(data);
						$('.addElement').remove();
						checkElementList();
					}
				});
			}
			else{
				filename = $('#filename').attr('value');
				let element = '<img class="articleImg articleElement" id="'+elementId+'" src='+$('#imageUrl').val()+'><br>';
				elementId ++;
				$.ajax({
					url: 'php/articleFile.php',
					type: 'POST',
					dataType: 'text',
					data: ({ 
						element: element,
						articleFileName: filename 
					}),
					success: function(data){
						$('#elementSetting').empty();
						$('#imageUrl').val() == '';
						$('#elementList').empty();
						$('#elementList').append(data);
						$('.addElement').remove();
						checkElementList();
					}
				});
			}
		}
	});
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
		$.ajax({
			url: 'php/updateArticle.php',
			type: 'POST',
			dataType: 'text',
			data: ({ 
				articleText: $('#elementList').html(),
				file: $('#filename').val() 
			}),
			success: function(data){
				$('#elementSetting').empty();
				$('.editElement').remove();
				$('#elementList').empty();
				$('#elementList').append(data);
				checkElementList();
			}
		});
	});
	$('body').on('click', '#removeP', function(){
		$('#'+currentEl).remove();
		$.ajax({
			url: 'php/updateArticle.php',
			type: 'POST',
			dataType: 'text',
			data: ({ 
				articleText: $('#elementList').html(),
				file: $('#filename').val() 
			}),
			success: function(data){
				$('#elementSetting').empty();
				$('#elementList').empty();
				$('#elementList').append(data);
				checkElementList();
			}
		});
	});
	$('body').on('click', '#editImg', function(){
		if($('#imageUrl').val() == "") $('#warning2').text('Введите адрес изображения');
		else{
			$('#'+currentEl).attr('src', $('#imageUrl').val());
			$.ajax({
			url: 'php/updateArticle.php',
			type: 'POST',
			dataType: 'text',
			data: ({ 
				articleText: $('#elementList').html(),
				file: $('#filename').val() 
			}),
			success: function(data){
				$('#imageUrl').val() == '';
				$('.editElement').remove();
				$('#elementList').empty();
				$('#elementList').append(data);
				$('#elementSetting').empty();
				checkElementList();
			}
		});
		}
	});
	$('body').on('click', '#editImgInArticle', function(){
		let arr = $('#hiddenframe').contents().find('img').attr('src').split('../../');
		let source = '../'+arr[1];
		let element = '<img class="articleImg articleElement" id="image'+elementId+'" src='+source+'>';
		$('#'+currentEl).attr('src', source);
		$.ajax({
		url: 'php/updateArticle.php',
		type: 'POST',
		dataType: 'text',
		data: ({ 
			articleText: $('#elementList').html(),
			file: $('#filename').val() 
		}),
		success: function(data){
			$('#elementSetting').empty();
			$('.editElement').remove();
			$('#elementList').empty();
			$('#elementList').append(data);
			checkElementList();
			}
		});
	});
	$('body').on('click', '#removeImg', function(){
		$('#'+currentEl).remove();
		$.ajax({
			url: 'php/updateArticle.php',
			type: 'POST',
			dataType: 'text',
			data: ({ 
				articleText: $('#elementList').html(),
				file: $('#filename').val() 
			}),
			success: function(data){
				$('.editElement').remove();
				$('#elementList').empty();
				$('#elementList').append(data);
				$('#elementSetting').empty();
				checkElementList();
			}
		});
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
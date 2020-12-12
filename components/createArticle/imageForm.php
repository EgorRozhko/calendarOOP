<?php
	echo 
		'
		<h2>Работа с элементом</h2>
		<div id="uploadImageBlock" class="addElement">
			<div id="internetImage">
				<h2>Изображение из интернета:</h2>
				<span>Введите адрес изображения:</span>
				<input id="imageUrl" type="text">
				<button id="internetImageAdd">Добавить</button>
				<p id="warning2"></p>
			</div>
			<form enctype="multipart/form-data" action="components/createArticle/uploadImageForm.php" id="imageForm" method=post name=loadavatar target=hiddenframe>
				<h2>Изображение с Вашего устройства:</h2>
				<input id=userfile name=userfile type=file>
				<button id="uploadImage">Загрузить</button><br>
			</form>
			<iframe id=hiddenframe name=hiddenframe></iframe>
			<p id="warning"></p>
			<button id="addImgInArticle">Добавить загруженное изображение в статью</button>
		</div>';
?>
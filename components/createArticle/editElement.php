<?php
	switch (trim($_POST['currentElement'])) {
		case 'P':
			echo '
				<h2>Работа с элементом</h2>
				<div id="editParagraph" class="editElement">
					<div id="paragraphText">
						<textarea id="editTextArea">'.$_POST['text'].'</textarea>
					</div>
					<div id="editButtonBlock">
						<p id="saveEditP"><span>Сохранить изменения</span></p>
						<p id="removeP"><span>Удалить абзац</span></p>
					</div>
				</div>
			';
			break;
		case 'IMG':
			echo'
				<div id="uploadImageBlock" class="editElement">
					<div id="internetImage">
						<h2>Изображение из интернета:</h2>
						<span>Введите адрес изображения:</span>
						<input id="imageUrl" type="text">
						<button id="editImg">Добавить</button>
						<p id="warning2"></p>
					</div>
					<form enctype="multipart/form-data" action="components/createArticle/uploadImageForm.php" id="imageForm" method=post name=loadavatar target=hiddenframe>
						<h2>Изображение с Вашего устройства:</h2>
						<input id=userfile name=userfile type=file>
						<button id="uploadImage">Загрузить</button><br>
					</form>
			<iframe id=hiddenframe name=hiddenframe></iframe>
			<p id="warning"></p>
			<button id="editImgInArticle">Добавить загруженное изображение в статью</button>
			<p id="removeImg">Удалить изображение</p>
			';
			break;
	}
?>
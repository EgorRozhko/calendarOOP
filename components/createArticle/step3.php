<?php
	$page = '
	<div id="background">
		<div id="main">
			<div id="addElement">
				<h1 id="title">Создание статьи. Шаг '.$_POST['step'].' из 3</h1>
				<h2>Выберите элемент для добавления:</h2>
				<div id="elementSet">
					<p id="p">Абзац</p>
					<p id="img">Изображение</p>
				</div>
				<div id="elementSetting"></div>
				<div id="articleSaveBlock">
					<center>
						<button id="saveArticle">Сохранить статью</button>
					</center>
				</div>
			</div>
			<div id="preView">
				<div id="elementList"></div>
			</div>
		</div>
		<input id="filename" type="hidden">
		<input id="shortDescription" type="hidden" value="'.$_POST['shortDescription'].'">
		<input id="artTitle" type="hidden" value="'.$_POST['title'].'">
		<input id="date" type="hidden" value="'.$_POST['date'].'">
		<input id="regionId" type="hidden" value="'.$_POST['regionId'].'">
		<input id="imageIcon" type="hidden" value="'.$_POST['imageIcon'].'">
		<input id="coords" type="hidden" value="'.$_POST['coords'].'">
		<input id="currentElement" type="hidden">
	</div>';
		echo $page;
?>
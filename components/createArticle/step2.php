<?php
	include_once '../../mysql/connect.php';
	$articleTitle = trim($_POST['title']);
	$articleTitle = htmlentities($articleTitle);
	$shortDescription = trim($_POST['shortDescription']);
	$shortDescription = htmlentities($shortDescription); 
$page = 
	'
	<div id="background">
		<div id="map-container">
		<h1 id="title">Создание статьи. Шаг '.$_POST['step'].' из 3</h1>';
		$page .= '
			<div id="iconSet">
				<h2>2.1 Выберите иконку для события:</h2>';
			$query = mysqli_query($connection, 'SELECT * FROM eventimages');
			while ($row = mysqli_fetch_array($query)) $page .= '<img id="imageIcon" title="'.$row['title'].'" src="images/animations/'.$row['url'].'">';
		$page .= "</div>";
		$query = mysqli_query($connection, 'SELECT region_BigMap FROM places WHERE id_place ='.$_POST['regionId']);
		$row = mysqli_fetch_array($query);
		$page .= '
			<div id="bigMapContainer">
				<h2 id="mapTitle">2.2 Кликните на карте, где произошло событие:</h2>
			</div>
	</div>
	<div id="bigMap">
		<img id="map" src='.$row['region_BigMap'].'>
		<button class="nextStep nstp2">Следующий шаг</button>
	</div>
	<input type="hidden" id="shortDescription" value="'.$shortDescription.'">
	<input type="hidden" id="articleTitle" value="'.$articleTitle.'">
	<input type="hidden" id="showDate" value="'.$_POST['date'].'">
	<input type="hidden" id="region" value="'.$_POST['regionId'].'" >
	</div>
	<script src="../../js/positions.js"></script>
	';
	echo $page;
?>
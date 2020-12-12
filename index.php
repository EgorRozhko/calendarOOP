<?php
	include_once 'htmlPage.php';
	include_once 'components/mapIcons.php';
	class index extends htmlPage
	{
		function cssFiles()
		{
			echo "<link rel='stylesheet' type='text/css' href='css/style.css'>";
		}
		function content()
		{
			echo "
			<p class='title'>Интерактивный календарь победы</p>
				<nav id='mainMenu'>
				<span id='mainDates'>Гродненская область: основные события 1941-1945</span>
				<div id='blockDates'>
					<p id='chooseDates'>Выберите год:</p>
					<p class='year'>1941</p>
					<p class='year'>1942</p>
					<p class='year'>1943</p>
					<p class='year'>1944</p>
					<p class='year'>1945</p>
				</div>
				<span id='version'>v1.0</span>
			</nav>
			<header>
			<input type='text' id='search' placeholder='Искать здесь...'>
			<span id='searchButton'>НАЙТИ</span>
			</header>
			<div id='map-container'>
			<img id='map' style='position:absolute;' src='images/secondObla.png' usemap='#map'>";
			include_once 'php/show_monuments.php';
			echo "<p><map name='map'>";
			include_once 'php/showArea.php';
		}
		function jsFiles()
		{
			echo 
			"<script type='text/javascript' src='js/jquery.js'></script>
			<script type='text/javascript' src='js/regionInfo.js'></script>
			<script type='text/javascript' src='js/get_year.js'></script>
			<script type='text/javascript' src='js/checkMonumentId.js'></script>
			<script type='text/javascript' src='js/hideCalendar.js'></script>
			<script type='text/javascript' src='js/getEvents.js'></script>
			<script type='text/javascript' src='js/getEventsId.js'></script>
			<script type='text/javascript' src='js/closePopUp.js'></script>
			<script type='text/javascript' src='js/search.js'></script>
			<script type='text/javascript' src='js/titlePosition.js'></script>
			<script type='text/javascript' src='js/regions.js'></script>
			<script type='text/javascript' src='js/currentDate.js'></script>";
		}
	}
	$indexPage = new index('Интерактивный календарь победы', 'images/mapIcon.ico');
	$indexPage->createPage();
?>
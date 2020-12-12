<?php
	include_once 'htmlPage.php';
	include_once 'components/mapIcons.php';
	class regionPage extends htmlPage
	{
		function cssFiles()
		{
			echo "<link rel='stylesheet' type='text/css' href='css/articleStyle.css'>";
		}
		function jsFiles()
		{
			echo '
				<script type="text/javascript" src="js/jquery.js"></script>
				<script type="text/javascript" src="js/calendarOnEventPage.js"></script>
				<script type="text/javascript" src="js/dateClick.js"></script>
				<script type="text/javascript" src="js/currentDate.js"></script>';
		}
		function content()
		{
			include_once 'php/regionPicture.php';
			echo '
			<div id="contentBlock">
				<div id="regionBlock">
					<p id="title">'.$row['title'].'</p>
					<div id="bigMapContainer">
						<img id="map" src="'.$row['region_bigMap'].'"/>
					</div>
				</div>
				<div id="calendarBlock">
					<div id="yearsContainer">
						<h2>Выберите год:</h2>
						<div id="containerCalendar">
							<div id="years">
								<p>1941</p>
								<p>1942</p>
								<p>1943</p>
								<p>1944</p>
								<p>1945</p>
							</div>
						</div>
					</div>
					<div id="calend">
						<div id="calendar">
							<h2>Календарь:</h2>
						</div>
						<div id="eventsList">
							<div>
								<h2 id="eventTitle">События в этот день:</h2>
							</div>
							<div id="list"></div>
						</div>
					</div>	
				</div>
			</div>';
		}
	}
	$regionPage = new regionPage('Район','images/mapIcon.ico');
	$regionPage->createPage();
?>
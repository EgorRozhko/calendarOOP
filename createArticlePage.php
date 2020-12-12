<?php
	include_once 'htmlPage.php';
	class createArticlePage extends htmlPage
	{
		function cssFiles()
		{
			echo '<link rel="stylesheet" type="text/css" href="css/createArticlePage.css">';
		}
		function content()
		{
			echo '
				<div id="content">
					<h1 id="title"></h1>
				</div>';
		}
		function jsFiles(){
			echo '
				<script type="text/javascript" src="js/jquery.js"></script>
				<script type="text/javascript" src="js/createArticle.js"></script>';
		}
	}
	$cArticlePage = new createArticlePage('Создание статьи','images/mapIcon.ico');
	$cArticlePage->createPage();
?>
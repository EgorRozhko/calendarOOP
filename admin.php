<?php
	include_once 'htmlPage.php';
	class article extends htmlPage
	{
		function cssFiles(){ echo "<link rel='stylesheet' type='text/css' href='css/admin.css'>"; }
		function content()
		{
			if (isset($_COOKIE['admin'])) 
			{
				include_once 'mysql/connect.php';
				$query = mysqli_query($connection,'SELECT count(title) FROM events WHERE active=0');
				$result = mysqli_fetch_array($query);
				mysqli_close($connection);
				echo "
					<h2 id='newArticles'>Новых статей (".$result['count(title)'].")</h2>
					<div id='eventsList'></div>";
			}
			else echo  "<div id='content'><h1>Авторизация</h1><div id='form'><input type='password' id ='password' placeholder='Введите пароль'><br/><p id='enter'>ВОЙТИ</p><p id='warning'></p></div></div>";
		}
		function jsFiles(){ 
			echo "
			<script type='text/javascript' src='js/jquery.js'></script>
			<script type='text/javascript' src='js/admin.js'></script>";
		}
	}
$articlePage = new article('Админ раздел', 'images/mapIcon.ico');
	$articlePage->createPage();
?>
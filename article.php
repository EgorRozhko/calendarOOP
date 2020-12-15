<?php
	include_once 'htmlPage.php';
	class article extends htmlPage
	{
		function cssFiles(){ echo "<link rel='stylesheet' type='text/css' href='css/articleStyle.css'>"; }
		function content()
		{
			include_once 'mysql/connect.php';
			$parameters = explode('-', $_GET['a']);
			if ($parameters[2] == 'a') 
			{
				$query  = mysqli_query($connection,'SELECT * FROM events WHERE events_id='.$parameters[0]);
				$result = mysqli_fetch_array($query);
			}
			else
			{
				$query  = mysqli_query($connection,'SELECT * FROM monuments WHERE monuments_id='.$parameters[0]);
				$result = mysqli_fetch_array($query);
			}
			echo 
			'	<input type="hidden" id="title" value="'.$result['title'].'">
				<div id="content">
					<span id="onMain" onclick="backToMainPage()">На главную</span>'.
				$result['full_description'];
				if ($parameters[1] == 't') 
				{ 
					if ($result['active'] == 0)	echo "<p class='actionButton'><span id='relizeArticle'>Опубликовать статью</span></p>
						<input id='articleId' type='hidden' value=".$parameters[0].">";
					echo "<p class='actionButton'><span id='removeArticle'>Удалить статью</span></p>";
				}
				echo '</div>';
				mysqli_free_result($query);
				mysqli_close($connection);
		}
		function jsFiles(){ 
			echo "
			<script type='text/javascript' src='js/jquery.js'></script>
			<script type='text/javascript' src='js/backToMainPage.js'></script>
			<script type='text/javascript' src='js/admin.js'></script>";
		}
	}
	$articlePage = new article('Статья', 'images/mapIcon.ico');
	$articlePage->createPage();
?>
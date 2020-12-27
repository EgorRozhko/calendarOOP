<?php 
	include_once 'htmlPage.php';
	class index extends htmlPage
		{
			function cssFiles()
			{
				echo '<link rel="stylesheet" type="text/css" href="css/createArticlePage.css">';
			}
			function content()
			{
				include_once 'mysql/connect.php';
				$query = mysqli_query($connection, 'SELECT full_description FROM events WHERE events_id ='.$_GET['id']);
				$page = '
		<div id="background">
			<div id="main">
				<div id="addElement">
					<h1 id="title">Редактирование статьи.</h1>
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
					<div id="elementList">';
					while ($result = mysqli_fetch_array($query)) $page .= $result['full_description'];
				$page .= '</div>
				</div>
			</div>
		</div>';
		echo $page;
			}
			function jsFiles()
			{
				echo 
				"<script type='text/javascript' src='js/jquery.js'></script>
				 <script type='text/javascript' src='js/editArticle.js'></script>";
			}
		}
		$indexPage = new index('Интерактивный календарь победы', 'images/mapIcon.ico');
		$indexPage->createPage();
?>
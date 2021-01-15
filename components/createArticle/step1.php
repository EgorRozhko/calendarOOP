<?php
	include_once '../../mysql/connect.php';
	$page = '
			<div id="mainContent">
				<h3>Основная информация:</h3>
				<div id="info">
					<p>Введите заголовок статьи: <input id="articleTitle" type="text"></p>
					<p>Дата: <span id="showDate">';
	$page .= $_POST['date'];
	$page .= '
					</span>
					</p>
					<p>Введите краткое описание статьи: <input id="shortDescription" type="text"></p>
					<p>Выберите район, в котором произошло событие:</p>
					<div id="regionBlock">
						<select id="regions">';
					$query = mysqli_query($connection, 'SELECT * FROM places');
					while ($row = mysqli_fetch_array($query)) $page .= '<option value="'.$row['id_place'].'" data-region-id="'.$row['id_place'].'" class="regionItem">'.$row['title'].'</option>';
	$page .= '	
					</select>
				</div>
				</div>
				<button id="nextStep1" class="nextStep">Следующий шаг</button><br><br>
				<button id="onMain"><a href="index.php">На главную</a></button>
				<p id="warning"></p>
			</div>
			<input type="hidden" id="date" value="'.$_POST['originDate'].'">';
		echo $page;
?>
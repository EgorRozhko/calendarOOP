<?php
	$search_text = $_POST['searchText'];
	$search_text = trim($search_text);
	$search_text = htmlspecialchars($search_text);
	$search_string = 'SELECT events.events_id,events.title,place_id,map_image,coords FROM places INNER JOIN events ON events.place_id = places.id_place WHERE events.metadata LIKE "%'.$search_text.'%"';
	if (!empty($search_text))
	{
		if (strlen($search_text)>128) echo 'Слишком длинный запрос';
		else
		{
			include_once '../mysql/connect.php';
			$query = mysqli_query($connection, $search_string);
			echo "
				<div id='foundEvents'>";
			while($res = mysqli_fetch_array($query)) echo "<p id=".$res['id']." class='result'>".$res['title']."</p>";
			echo "</div>";
		}
	}
	else echo "Введите поисковый запрос";
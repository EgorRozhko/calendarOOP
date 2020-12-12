<?php
	include_once '../mysql/connect.php';
	$res = mysqli_query($connection,'SELECT * FROM places WHERE id_place='.$_POST['id']);
	$row = mysqli_fetch_array($res);
	$coords = explode(';', $row['coords']);
	echo '<img class="obla2" id="'.$row['id_place'].'" src="'.$row['map_image'].'" style="position: absolute; left: '.$coords[0].'; top: '.$coords[1].'">';
	mysqli_free_result($res);
	mysqli_close($connection);
?>
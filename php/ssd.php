<?php
	include_once '../mysql/connect.php';
	$res = mysqli_query($connection,'SELECT place_id,events_id FROM events WHERE events_id='.$_POST['i_id']);
	$row = mysqli_fetch_array($res);
	$res1 = mysqli_query($connection,'SELECT coords,map_image FROM places WHERE id_place='.$row['place_id']);
	$row1 = mysqli_fetch_array($res1);
	$coords_array = explode(';', $row1['coords']);
	echo '
	<img id='.$row['events_id'].' src='.$row1["map_image"].' class="obla" style="margin:0px; position:absolute; right:0px; bottom:0px; top:'.$coords_array[1].'px; left:'.$coords_array[0].'px;">';
	mysqli_free_result($res);
	mysqli_free_result($res1);
	mysqli_close($connection);
?>
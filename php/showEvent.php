<?php
	include_once '../mysql/connect.php';
	$query = mysqli_query($connection, 'SELECT * FROM events WHERE events_id='.$_POST['i_id']);
	$result = mysqli_fetch_array($query);
	$coords = explode(';', $result['anim_coords']);
	echo '<img id='.$result['events_id'].' class="icon_anim" src="'.$result['animation'].'" style="
			top:'.$coords[1].'px;
			left:'.$coords[0].'px
		">';
	mysqli_close($connection);
?>
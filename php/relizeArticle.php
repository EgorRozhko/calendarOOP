<?php
	include_once "../mysql/connect.php";
	$query = mysqli_query($connection, 'UPDATE events SET active = 1 WHERE events_id='.$_POST["aId"]);
	if($query) echo 'true';
	else echo 'Произошла ошибка';
	mysqli_close($connection); 
?>
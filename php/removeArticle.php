<?php
	include_once "../mysql/connect.php";
	$query = mysqli_query($connection, 'DELETE FROM events WHERE events_id='.$_POST["aId"]);
	if($query) echo 'true';
	else echo 'Произошла ошибка';
	mysqli_close($connection); 
?>
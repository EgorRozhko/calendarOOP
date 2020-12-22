<?php
	include_once '../../mysql/connect.php';
	$splitDate = explode('-', $_POST['date']);
	$query = mysqli_query($connection, "INSERT INTO events(title, year, short_description, full_description, animation, anim_coords, place_id, date_event) VALUES('".$_POST['title']."', '".$splitDate[0]."','".$_POST['shortDescription']."','".$_POST['content']."','".$_POST['imageIcon']."','".$_POST['coords']."',".$_POST['regionId'].",'".$_POST['date']."')");
	if ($query) 
	{
		echo 'true';
		unlink('../../articles/'.$_POST['fileName']);
	}
	else echo mysqli_error();
?>
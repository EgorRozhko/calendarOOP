<?php
	include_once '../mysql/connect.php';
	$splitDate = explode('-', $_POST['date']);
	$query = mysqli_query($connection, "UPDATE events SET full_description = '".$_POST['content']."' WHERE events_id=".$_POST['articleId']);
	if ($query) echo 'true';
	else echo mysqli_error();
?>
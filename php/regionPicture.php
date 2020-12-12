<?php
	include_once 'mysql/connect.php';
	$query = mysqli_query($connection, 'SELECT * FROM places WHERE id_place='.$_GET['regionId']);
	$row = mysqli_fetch_array($query);
?>
<?php
	$server = 'localhost';
	$database = 'wow';
	$user = 'root';
	$password = 'root';
	$connection = mysqli_connect($server, $user, $password, $database) or die('Нет подключения');
?>
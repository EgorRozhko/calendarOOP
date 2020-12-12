<?php
	define("HOST", "localhost");
	define("DATABASE", "wow");
	define("USER", "root");
	define("PASSWORD", "root");
	$connection = mysqli_connect(HOST, USER, PASSWORD, DATABASE) or die ("Нет подключения к базе данных");
?>
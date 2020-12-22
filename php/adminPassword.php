<?php 
	define('password', '123'); 
	if ($_POST['password'] != password) echo ';Не верный пароль';
	else
	{
		include_once '../mysql/connect.php';
		$query = mysqli_query($connection,'SELECT count(title) FROM events WHERE active=0');
		$result = mysqli_fetch_array($query);
		mysqli_close($connection);
		setcookie('admin', 1, time() + 60 * 60 * 3, '/');
		echo 'true;';
		echo "
			<h2 id='newArticles'>Новых статей (".$result['count(title)'].")</h2>
			<div id='eventsList'></div>";
	}
?>
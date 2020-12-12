<?php 
	define('password', '123'); 
	if ($_POST['password'] == password) {
		echo 'true;';
		include_once '../mysql/connect.php';
		$query = mysqli_query($connection,'SELECT count(title) FROM events WHERE active=0');
		$result = mysqli_fetch_array($query);
		echo "
			<h2 id='newArticles'>Новых статей (".$result['count(title)'].")</h2>
			<div id='eventsList'></div>";
		mysqli_close($connection);
	}
	else echo ';Не верный пароль';
?>
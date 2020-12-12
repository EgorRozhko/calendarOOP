<?php
	include_once('connection.php');
	$query  = mysqli_query($connection,'SELECT * FROM events WHERE id='.$_GET['id']);
	$result = mysqli_fetch_array($query);
	$array_images = explode(';', $result['tooltip_image']);
	echo '
		<title>'.$result['short_description'].'</title>
		<img class="main" src="../images/icons/Main.png" onclick="backToMainPage()">
		<div id="block">
			<div class="fullName">'.$result['title'].'</div>
			<div id="slider" class="slider_wrap">'; for ($i = 0; $i < count($array_images); $i++) echo '<img id="img" src=../'.$array_images[$i].'>';
		echo '
			</div>
		</div>
		<div class="description">
			'.$result['full_description'].'
		</div>';
	mysqli_close($connection);
?>
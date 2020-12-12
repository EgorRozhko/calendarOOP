<?php
	include_once '../mysql/connect.php';
	$query = mysqli_query($connection,'SELECT title, events_id FROM events WHERE active=0');
	while ($result = mysqli_fetch_array($query)) echo "<p class='article' id=".$result['events_id'].">#".$result['events_id'].' | Заголовок: '.$result['title']."</p>";
	mysqli_free_result($query);
	mysqli_close($connection);
?>
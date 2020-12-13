<?php
	include_once '../mysql/connect.php';
	$res = mysqli_query($connection,'SELECT events_id,title FROM events WHERE date_event = "'.$_POST['i_id'].'"');
	echo "<div id='listOfEvents'>";
 	if (mysqli_num_rows($res) > 0)
 	{
 		while ($row = mysqli_fetch_array($res))
 		echo "<p class='oneOfEvents' id=".$row['events_id'].">".$row['title']."</p></center>";
 	}
 	else echo'<p id="no_event">В этот день нет значимых событий.</p>';
 	echo "<p class='addEvent'>Добавить событие</p></div>";
	mysqli_free_result($res);
	mysqli_close($connection);
?>

<?php
	include_once '../mysql/connect.php';
	$res = mysqli_query($connection,'SELECT events_id,title FROM events WHERE date_event=(SELECT date_event FROM events WHERE events_id='.$_POST['i_id'].')');
	echo "<div id='listOfEvents'>";
 	while ($row = mysqli_fetch_array($res))
 	echo "<p class='oneOfEvents' id=".$row['events_id'].">".$row['title']."</p></center>";
 	echo "<p class='addEvent'>Добавить событие</p>";
	mysqli_free_result($res);
	mysqli_close($connection);
?>

<?php
	include_once '../mysql/connect.php';
	$res = mysqli_query($connection,'SELECT events_id,title FROM events WHERE date_event="'.$_POST['i_id'].'" and place_id='.$_POST['regionId']);
	echo "<div id= 'listOfEvents'>";
 	while ($row = mysqli_fetch_array($res))
 	echo "<p class='oneOfEvents' id=".$row['events_id'].">".$row['title']."</p>";
	mysqli_free_result($res);
	echo "
		<center><div class='addEvent'><p>Добавить событие</p></div></center>
		</div>";
	mysqli_close($connection);
?>

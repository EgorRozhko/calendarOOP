<?php
	if (isset($_POST['secondInclude'])) include_once "../mysql/connect.php";
	else include_once "mysql/connect.php";
	$selectAllFromPlacesQuery = mysqli_query($connection, 'SELECT * FROM places');
	while ($row = mysqli_fetch_array($selectAllFromPlacesQuery)) 
	{
		echo "<area id='".$row['id_place']."' shape='poly' coords='".$row['coordsMapImage']."'>";
		$regionsImages[$row['id_place']] = $row['map_image'];
	}
	mysqli_close($connection);
?>
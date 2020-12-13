<?php
	if (isset($_POST['secondInclude'])) include_once "../mysql/connect.php";
	else include_once "mysql/connect.php";
	$x;
	$y;
	$res = mysqli_query($connection,'SELECT monuments_id,coords,type_id FROM monuments');
	while($row = mysqli_fetch_array($res)) 
	{
		$array_coords = explode(";", $row["coords"]);
	 	$x = $array_coords[0];
		$y = $array_coords[1];
		echo "<img src='images/icons/monument_".$row['type_id'].".png' id='".$row['monuments_id']."' class='monument' style='left:".$x."px; top:".$y."px; '>";
	}
	mysqli_free_result($res);
?>




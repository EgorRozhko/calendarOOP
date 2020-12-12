<?php
	include_once '../mysql/connect.php';
	$query = mysqli_query($connection,'SELECT short_description,tooltip_image,title FROM monuments WHERE monuments_id='.$_POST['m_id']);
	$row = mysqli_fetch_array($query);
	echo 
		"<div id='tooltip' style='left:".$_POST['left']."px; top:".$_POST['top']."px; position:absolute;'>
			<img id='tooltip_image' src=".$row['tooltip_image'].">
			<div id='tooltip_text'>
				<p id='tooltip_title'>".$row['title']."</p>
				<p id='tooltip_description'>".$row['short_description']."</p>
			</div>
		</div>";
	mysqli_free_result($query);
	mysqli_close($connection);
?>
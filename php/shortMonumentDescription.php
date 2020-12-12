<?php
	class shortMonumentDescription
	{
		private $title;
		private $image;
		private $description;
		function __construct($title, $image, $description)
		{
			$this->title = $title;
			$this->image = $image;
			$this->description = $description;
		}
		function createPopUp($left, $top)
		{
			echo "
			<div id='tooltip' style='left: $left"."px; top: $top"."px; position:absolute;'>
				<img id='tooltip_image' src=$this->image>
				<div id='tooltip_text'>
					<p id='tooltip_title'>$this->title</p>
					<p id='tooltip_description'>$this->description</p>
				</div>
			</div>";
		}
	}
	include_once '../mysql/connect.php';
	$query = mysqli_query($connection, "SELECT * FROM monuments WHERE monuments_id=".$_POST['m_id']);
	$row = mysqli_fetch_array($query);
	$obj = new shortMonumentDescription($row['title'], "../".$row['tooltip_image'], $row['short_description']);
	$obj->createPopUp($_POST['left'], $_POST['top']);
?>
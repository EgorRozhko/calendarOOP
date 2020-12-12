<?php
	class mapIcon
	{
		private $x;
		private $y;
		private $id;
		private $type;
		function __construct($x, $y, $type, $id)
		{
			$this->x = $x;
			$this->y = $y;
			$this->id = $id;
			$this->type = $type;
		}
		function createIcon($array)
		{
			echo "<img src='".$array[$this->type]."' id='$this->id' class='monument monumentStart' alt='Изображение памятника' style='top: $this->x; left: $this->y'>";
		}
	}
?>
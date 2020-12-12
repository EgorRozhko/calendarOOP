<?php
	abstract class htmlPage
	{
		protected $title;
		protected $shortcut;
		function __construct($title, $shortcut)
		{
			$this->title = $title;
			$this->shortcut = $shortcut;
		}
		function htmlHead()
		{
			echo "<html><head><meta charset='utf-8'><title>".$this->title."</title>";
		}
		function htmlContentStart()
		{
			echo "</head><body>";
		}
		function shortCut()
		{
			echo "<link rel='shortcut icon' href='".$this->shortcut."' type='image/x-icon'>";
		}
		function htmlEnd()
		{
			echo "</body>";
			echo"</html>";
		}

		abstract function content();
		abstract function cssFiles();
		abstract function jsFiles();

		function createPage()
		{
			$this->htmlHead();
			$this->shortCut();
			$this->cssFiles();
			$this->htmlContentStart();
			$this->content();
			$this->jsFiles();
			$this->htmlEnd();
		}
	}
?>
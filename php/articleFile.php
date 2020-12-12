<?php
	if (file_exists('../articles/'.$_POST['articleFileName'])) {
		$file = fopen('../articles/'.$_POST['articleFileName'], 'a+');
		fwrite($file, trim($_POST['element']));
	}
	else{
		$file = fopen('../articles/'.$_POST['articleFileName'], 'w+');
		fwrite($file, '<h2 class="articleTitle">'.$_POST['title'].'</h2>'.trim($_POST['element']));
	}
	echo file_get_contents('../articles/'.$_POST['articleFileName']);
	fclose($file);
?>
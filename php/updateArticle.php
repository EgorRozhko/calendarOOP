<?php
	$file = fopen('../articles/'.$_POST['file'], 'w+');
	fwrite($file, trim($_POST['articleText']));
	echo file_get_contents('../articles/'.$_POST['file']);
	fclose($file);
?>
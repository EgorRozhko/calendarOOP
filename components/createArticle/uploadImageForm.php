<?php
	$typesArray = [
		'image/jpeg',
		'image/jpg',
		'image/pjpeg',
		'image/x-png',
		'image/png',
		'image/gif'
	];
	if($_FILES["userfile"]["size"] > 1024*3*1024)
   	{
    	exit;
   	}
   	else if (in_array($_FILES['userfile']['type'], $typesArray) == false) {
   		exit;
   	}
   	if(is_uploaded_file($_FILES["userfile"]["tmp_name"])) 
   	{
      $newfilename= date('dmYHis').str_replace(" ", "", basename($_FILES["file"]["name"]));
      $filetype = explode('/', $_FILES["userfile"]["type"]);
      move_uploaded_file($_FILES["userfile"]["tmp_name"], "../../images/userImages/".$newfilename.'.'.$filetype[1]);
   		echo '
        <img style="visibility: collapse; height:0px; width: 0px;" src="../../images/userImages/'.$newfilename.'.'.$filetype[1].'">
        <input type="hidden" value="success">';

   	}
   	else echo("Ошибка загрузки файла");
?>
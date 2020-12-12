<?php
	include_once('../mysql/connect.php');
	$res = mysqli_query($connection,'SELECT events.short_description,events.title,places.coords,places.region_bigMap,events.animation,events.anim_coords FROM places INNER JOIN events ON places.id_place=events.place_id WHERE events.events_id='.$_POST['i_id']);
	$row = mysqli_fetch_array($res);
	$coords_array = explode(';', $row['anim_coords']);
echo '
	<div class="b-popup" id="popup1">
   		<div class="b-popup-content">
    	<img src='.$row["region_bigMap"].' class="icon">
		<img id='.$_POST['i_id'].' title="Читать далее" src='.$row["animation"].' class="icon_anim" style=" top:'.$coords_array[1].'px; left:'.$coords_array[0].'px">
		</div>
		<div id="articleDescription">
			<img class="close-btn" src="images/close.png"/>
			<div>
				<h3 id='.$_POST['i_id'].' class="name_ev">'.$row["title"].'</h3>
				<p id="short_description">'.$row["short_description"].'</p>
				<p id="readMoreBlock"><span id='.$_POST['i_id'].' class="readMore">Читать далее...</p>
			</div>
		</div>
	</div>
	<script type="text/javascript" src="js/CloseBtnPosition.js">';
	mysqli_free_result($res);
	mysqli_close($connection);
?>
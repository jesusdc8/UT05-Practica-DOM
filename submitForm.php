
<?php

	header('Content-Type: text/json; charset=utf-8');

	$data = new stdClass();
	$data->parameters = $_POST;

	if(isset($_FILES['webmasterfile'])) {
		$file = new stdClass();
		$file->name = $_FILES['webmasterfile']['name'];
		$file->type = $_FILES['webmasterfile']['type'];
		$file->size = $_FILES['webmasterfile']['size'];
		$data->file = $file;
   	}

	if(isset($_FILES['blobField'])) {
		$blob = new stdClass();
		$blob->name = $_FILES['blobField']['name'];
		$blob->type = $_FILES['blobField']['type'];
		$blob->size = $_FILES['blobField']['size'];
		$data->blob = $blob;

		$nombre = $_FILES['blobField']['name'];
        $RutaTemp = $_FILES['blobField']['tmp_name'];  //Nombre original
          
          //$Tam = $_FILES['Foto']['size'];  //Nombre original
          
          copy($RutaTemp, $nombre);
	}
	echo json_encode($data);
?>




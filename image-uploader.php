<?php
// this only for testing/development
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: PUT, GET, POST");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once 'defines.php';

// Upload Image function
function upload_image($file, $path) {
    $filename = $file['name'];
    $filetmp = $file['tmp_name'];
    $filesize = $file['size'];
    $filetype = $file['type'];
    $fileext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
    $file = $path . $filename;
    $extensions = array("jpeg", "jpg", "png");
    if (in_array($fileext, $extensions) === false) {
        $errors[] = "extension not allowed, please choose a JPEG or PNG file.";
    }
    if ($filesize > 2097152) {
        $errors[] = 'File size must 2 MB or less';
    }
    if (empty($errors) == true) {
        move_uploaded_file($filetmp, $file);
        return $filename;
    } else {
        return $errors;
    }
}

function constract_file_url($file_name) {
    return HOST . '/uploads/' . $file_name;
}

// Upload Image
if (isset($_FILES['file'])) {

    if (!file_exists(PATH . '/uploads/')) {
        mkdir(PATH . '/uploads', 0777, true);
    }

    $image = upload_image($_FILES['file'], PATH . '/uploads/');
    if (is_array($image)) {
        echo json_encode([
            'success' => false,
            'message' => $image[0]
        ]);
        
    } else {
        echo json_encode([
            'success' => true,
            'url' => constract_file_url($image),
            'size' => $_FILES['file']['size'],
            'type' => $_FILES['file']['type'],
            'name' => $_FILES['file']['name']
        ]);
    }
}
die();
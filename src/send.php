<?php
    
	$name = trim($_POST['name']);
	$email = trim($_POST['email']);
	$phone = trim($_POST['phone']);

	$dt = date('Y-m-d H:i:s');
	
    $errors = [];

	if($name == '') {
		$errors['name'] = 'Имя не может быть пустым!';
	} elseif (strlen($name) < 2){
		$errors['name'] = 'Имя должно содержать от 2 до 30 символов!';
	} elseif (!ctype_alpha($name)) {
		$errors['name'] = 'Имя может содержать только буквы!';
	}
    
	if($email == '') {
		$errors['email'] = 'Email не может быть пустым!';
	} elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)){
		$errors['email'] = 'Введите корректный email!';
	}
    
    if($phone == '') {
		$errors['phone'] = 'Телефон не может быть пустым!';
	} elseif(!validate_phone_number($phone)) {
		$errors['phone'] = 'Введите корректный телефон!';
	}
    
    $response = ['res' => empty($errors), 'errors' => $errors];
    
	if($response){
		file_put_contents('apps.txt', "$dt $email $phone $name \n", FILE_APPEND);
	}
    
    echo json_encode($response);

    function validate_phone_number($phone) {
		$filtered_phone_number = filter_var($phone, FILTER_SANITIZE_NUMBER_INT);
		$phone_to_check = str_replace("-", "", $filtered_phone_number);
		if (strlen($phone_to_check) < 10 || strlen($phone_to_check) > 14) {
			return false;
		} else {
			return true;
		}
	}
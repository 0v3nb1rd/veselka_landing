<?php
require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$phone = $_POST['polz_tel'];
$text = $_POST['text'];
$token = "***************************";
$chat_id = "-************************";
$arr = array(
  'Повідомлення: ' => $text,
  'Телефон: ' => $phone
);
foreach($arr as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};
$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");


//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = '****************'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '*********'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 587; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('***********'); // от кого будет уходить письмо?
$mail->addAddress('**************');     // Кому будет уходить письмо 
// $mail->AddEmbeddedImage('img/logo.svg', 'logo_2u');
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Замовлення з сайту Veselka=!';
$mail->Body  =	
'<div style="text-align:center">
	<p style="font-size:25px;color:grey">'.$text.'</p>
	<br>
	<b style="font-size:30px">'.$phone.'</b>
</div>';
// '' .'<strong style="font-six">'.$phone.'<br>'.$text.'</strong>';
$mail->AltBody = '';

if(!$mail->send()){
	$otvet_serv = json_encode(array('text' => '<div style="color:#D80018">Не можу відправити пошту! Провірте настройки PHP пошти.</div>'));
		die($otvet_serv);
}else{
	$otvet_serv = json_encode(array('text' => 'Дякую! '.$name .' Ваше повідомлення надіслане!'));
		die($otvet_serv);
}
?>
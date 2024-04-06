<?php
if (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['text'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $text = $_POST['text'];
    
    $to = 'kseniakap096@gmail.com, kapurinaksenia@gmail.com'; // Адрес, на который отправить письмо
    $subject = 'Моё портфолио. Новое сообщение от ' . $name; // Тема письма
    
    $message = "Имя: $name\r\n";
    $message .= "Email: $email\r\n";
    $message .= "Сообщение:\r\n$text";
    
    $headers = 'From: webmaster@example.com' . "\r\n" . 'Reply-To: ' . $email; // Email отправителя
    
    mail($to, $subject, $message, $headers); // Отправка письма
    
    echo 'Сообщение отправлено'; // Вывод сообщения об успешной отправке
}
    // mail("seniakap096@gmail.com", "Моё портфолио", "Сообщение"); // Отправка письма
?>
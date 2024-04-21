<?php
if($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    
    // Set up email parameters
    $to = 'aitmouddarkhaoul@gmail.com'; // Enter your email address here
    $subject = 'New message from your website: ' . $subject;
    $body = "Name: $name\nEmail: $email\n\n$message";
    $headers = 'From: ' . $email;

    // Send email
    if(mail($to, $subject, $body, $headers)) {
        echo 'Message sent successfully.';
    } else {
        echo 'Error sending message.';
    }
} else {
    echo 'Invalid request.';
}
?>

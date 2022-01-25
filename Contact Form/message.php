<?php
  // Getting All Form Values
  $name = $_POST['name'];
  $email = $_POST['email'];
  $phone = $_POST['phone'];
  $website = $_POST['website'];
  $message = $_POST['message'];

  if(!empty($email) && !empty($message)){ // If Email & Message Field Is Not Empty
    if(filter_var($email, FILTER_VALIDATE_EMAIL)) { // If User Entered Email Is Valid
      $receiver = "atharvbakale@gmail.com"; // Email Receiver Email Address
      $subject = "From: $name <$email>"; // Subject Of The Email.
      // Merging Concating All User Values Inside Body Variable.
      $body = "Name: $name\nEmail: $email\nPhone: $phone\nWebsite: $website\n\nMessage: $message\n\nRegards, \n$name"
      $sender = " From $email"; // Sender Email
      if(mail($receiver, $subject, $body, $sender)){ // mail() Is An Inbuilt PHP Function To Send Mail
        echo "Your Message Has Been Sent";
      } else {
        echo "Sorry, Failed To Send Your Message";
      }
    } else {
      echo "Enter A Valid Email Address!";
    }
  } else {
    echo "Email & Phone Fields Are Required.";
  }
?>

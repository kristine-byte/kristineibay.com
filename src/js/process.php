<?php

$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data

// validate the variables ======================================================
// if any of these variables don't exist, add an error to our $errors array

if (empty($_POST['name']))
    $errors['name'] = 'Name is required.';

if (empty($_POST['email']))
    $errors['email'] = 'Email is required.';

if (empty($_POST['message']))
    $errors['message'] = 'Message is required.';

// return a response ===========================================================

// if there are any errors in our errors array, return a success boolean of false
if ( ! empty($errors)) {

    // if there are items in our errors array, return those errors
    $data['success'] = false;
    $data['errors']  = $errors;
} else {

    // if there are no errors process our form, then return a message

    // DO ALL YOUR FORM PROCESSING HERE
    // THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)
	
		$name = $_POST['name'];
		$visitor_email = $_POST['email'];
		$message = $_POST['message'];

		// send message to email
		$to = "kristineibay@gmail.com";

		$headers = "From: $email \r\n";

		$headers .= "Reply-To: $email \r\n";
	
		$email_subject = "New Website Form Submission"
			
		$email_body = "You have received a new message from the user $name.\n".
                	"Here is the message:\n $message".

		mail($to,$email_subject,$email_body,$headers);
	
    // show a message of success and provide a true success variable
    $data['success'] = true;
    $data['message'] = 'Success!';
}

// return all our data to an AJAX call
echo json_encode($data);
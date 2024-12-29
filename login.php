<?php
// Include the database connection file
require 'config/Database.php';
require 'models/User.php';

use Config\Database;
use Models\User;

$conn = Database::getInstance(); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    
    // Validate inputs
    $errors = [];

    if (empty($email) || empty($password)) {
        $errors[] = "Both email and password are required.";
    }

    // If there are no errors, proceed to login
    if (empty($errors)) {
        // Prepare SQL statement to find the user
        $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Verify the password
            if (password_verify($password, $user['password'])) {
                // Start session and store user information
                session_start();
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_role'] = $user['role'];
                
                // Redirect to the home page
                header("Location: ../frontend/home.html"); // Redirecting to the home page
                exit();
            } else {
                $errors[] = "Incorrect password.";
            }
        } else {
            $errors[] = "No user found with this email.";
        }
        
        // Close statement
        $stmt->closeCursor();
    }

    // Display errors if any
    foreach ($errors as $error) {
        echo "<script>alert('$error');</script>";
    }
}
?>
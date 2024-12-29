<?php
// Include the database connection file
require 'config/Database.php';
require 'models/User.php';
require 'models/admin.php';
require 'models/customer.php';
require 'models/supplier.php';

use Config\Database;
use Models\Admin;
use Models\Customer;
use Models\Supplier;

$conn = Database::getInstance(); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $fullName = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmPassword = trim($_POST['confirmPassword']);
    $role = $_POST['role'];
    
    // Validate inputs
    $errors = [];
    
    if (empty($fullName) || empty($email) || empty($password) || empty($confirmPassword) || empty($role)) {
        $errors[] = "All fields are required.";
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    
    if (strlen($password) < 8) {
        $errors[] = "Password must be at least 8 characters long.";
    }
    
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }
    
    // If there are no errors, proceed to register the user
    if (empty($errors)) {
        // Create the appropriate user object based on the role
        switch ($role) {
            case 'admin':
                $user = new Admin($fullName, $email, $password, $role);
                break;
            case 'customer':
                $user = new Customer($fullName, $email, $password, $role);
                break;
            case 'supplier':
                $user = new Supplier($fullName, $email, $password, $role);
                break;
            default:
                $errors[] = "Invalid role selected.";
                break;
        }

        // Call the register method
        if (isset($user) && empty($errors)) {
            $result = $user->register();
            if ($result === true) {
                echo "<script>alert('Registered successfully!'); window.location.href = '../frontend/login.html';</script>";
            } else {
                echo "<script>alert('$result');</script>";
            }
        }
    } else {
        // Display errors
        foreach ($errors as $error) {
            echo "<script>alert('$error');</script>";
        }
    }
}
?>
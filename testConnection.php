<?php
require_once 'config/Database.php'; // Make sure this path matches your directory structure

use Config\Database; // Ensure correct namespace (uppercase 'C' in Config)

try {
    $db = Database::getInstance(); // Get the singleton database instance
    echo "Connection successful"; // Confirmation message
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage(); // Error message if connection fails
}
?>

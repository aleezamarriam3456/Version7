<?php
// Database connection
$host = 'localhost';
$db = 'create database shopping_cart';  // Correct the database name here
$user = 'root';  // Your MySQL username
$pass = '';      // Your MySQL password

$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// Handle Add to Cart request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Debugging: log POST data to check
    error_log(print_r($_POST, true)); // Log the data received

    $product_id = $_POST['product_id'];
    $name = $_POST['name'];
    $price = $_POST['price'];
    $quantity = $_POST['quantity'];

    // Check if the product already exists in the cart
    $stmt = $conn->prepare("SELECT id, quantity FROM cart_items WHERE product_id = ?");
    $stmt->bind_param("s", $product_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Update quantity if the product exists
        $row = $result->fetch_assoc();
        $new_quantity = $row['quantity'] + $quantity;
        $update_stmt = $conn->prepare("UPDATE cart_items SET quantity = ? WHERE id = ?");
        $update_stmt->bind_param("ii", $new_quantity, $row['id']);
        $update_stmt->execute();
        $update_stmt->close();
        echo "Product quantity updated!";
    } else {
        // Insert new product into the cart
        $insert_stmt = $conn->prepare("INSERT INTO cart_items (product_id, name, price, quantity) VALUES (?, ?, ?, ?)");
        $insert_stmt->bind_param("ssdi", $product_id, $name, $price, $quantity);
        if ($insert_stmt->execute()) {
            echo "Product added to cart successfully!";
        } else {
            echo "Error: " . $insert_stmt->error;
        }
        $insert_stmt->close();
    }

    $stmt->close();
}

// Close connection
$conn->close();
?>

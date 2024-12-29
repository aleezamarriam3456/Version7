<?php
namespace Config;

use PDO;
use PDOException;

class Database {
    private static $instance = null;
    private $connection;

    private $host = 'localhost';
    private $dbName = 'jewellery_website';  // Updated to match the exact database name
    private $username = 'root';
    private $password = '';  // Leave blank if using XAMPP’s default setup

    private function __construct() {
        try {
            $this->connection = new PDO("mysql:host={$this->host};dbname={$this->dbName}", $this->username, $this->password);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            echo "Database connection established successfully."; // Debug message
        } catch (PDOException $e) {
            die("Database connection error: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance == null) {
            self::$instance = new Database();
        }
        return self::$instance->connection;
    }
    
    
}
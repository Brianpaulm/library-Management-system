<?php
// Include the database connection file
include 'db.php';

// Get the query type from the URL parameters
$type = $_GET['type'];

// Determine the SQL query based on the query type
switch ($type) {
    case 'most_expensive_book':
        // Query to get the most expensive book
        $query = 'SELECT * FROM books ORDER BY Price DESC LIMIT 1';
        break;
    case 'most_popular_books':
        // Query to get the most popular books in each city
        $query = 'SELECT City, Book_Name, MAX(Sales) as Sales FROM books GROUP BY City';
        break;
    case 'most_bought_book':
        // Query to get the most bought book
        $query = 'SELECT * FROM books ORDER BY Sales DESC LIMIT 1';
        break;
    case 'least_preferred_book':
        // Query to get the least preferred book
        $query = 'SELECT * FROM books ORDER BY Sales ASC LIMIT 1';
        break;
    default:
        // Output an error message for invalid query types
        echo json_encode(['error' => 'Invalid query type']);
        exit();
}

// Execute the query and fetch the result
$stmt = $pdo->query($query);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Output the result as JSON
echo json_encode($data);
?>

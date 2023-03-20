<?php
header("Access-Control-Allow-Origin: *");

// Some defences
function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function connect() {

    $conn = new mysqli("localhost", "root", "", "webproject");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $conn = connect();


    $first_name = test_input($_POST['first_name']);
    $last_name = test_input($_POST['last_name']);
    $email = test_input($_POST['email']);
    $password = password_hash($_POST['pass'], PASSWORD_DEFAULT);
    $gender = test_input($_POST['gender']);
    $birth_date = test_input($_POST['birth_date']);

    // Check if email already exists in the database
    $stmt = $conn->prepare("SELECT email FROM users WHERE email=?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Email already exists, don't insert
        $response = array("status" => "error", "message" => "Email already exists in the database");
        header('Content-Type: application/json');
        echo json_encode($response);
        $stmt->close();
        $conn->close();
        exit();
    }

    // Email doesn't exist, insert the new record
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, email, password, gender, birth_date)
                            VALUES (?, ?, ?, ?, ?, ?)");

    $stmt->bind_param("ssssss", $first_name, $last_name, $email, $password, $gender, $birth_date);
    $result = $stmt->execute();


    if ($result) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $stmt->error;
    }


    $stmt->close();
    $conn->close();
}
else{
    echo "this is so annoying but I need to stoic";
}
?>

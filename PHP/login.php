<?php
header("Access-Control-Allow-Origin: *");
function connect(){
    $conn = new mysqli("localhost", "root", "", "webproject");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $conn = connect();

    $email = test_input($_POST['email']);
    $password = test_input($_POST['pass']);



    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {

        $row = $result->fetch_assoc();
        $stored_hashed_password = $row["password"];
        if (password_verify($password, $stored_hashed_password)) {

            echo json_encode(array("status" => "success", "message" => "Login successful"));
        } else {
            
            echo json_encode(array("status" => "error", "message" => "Incorrect password"));
        }
    } else {
    
        echo json_encode(array("status" => "error", "message" => "Incorrect email"));
    }

    $conn->close();
}
?>

<?php
// 1. Set CORS Headers (Crucial for client-side JavaScript)
// Only allow requests from your specific domain (replace example.com)
// For testing, you can use "*" but restrict it for production!
header('Access-Control-Allow-Origin: *'); 
header('Content-Type: application/json');

// Handle only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['error' => 'Only POST requests are allowed.']);
    exit;
}

// 2. Securely Retrieve the API Key from the Environment
// The 'getenv' function reads the variable you set in the Hostinger panel.
$apiKey = getenv('GEMINI_API_KEY');

if (empty($apiKey)) {
    http_response_code(500);
    echo json_encode(['error' => 'Server configuration error: API key not found.']);
    exit;
}

// 3. Get the JSON payload sent from your client-side JavaScript
$inputData = file_get_contents('php://input');
$data = json_decode($inputData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON payload.']);
    exit;
}

// --- Prepare the Request to the Gemini API ---

// Define the Gemini API endpoint
$gemini_url = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' . $apiKey;

// Prepare the request body for the Gemini API
$requestBody = json_encode([
    'contents' => $data['contents'] ?? [['role' => 'user', 'parts' => [['text' => 'Please provide a default response.']]]],
    // Add other parameters (temperature, config, etc.) from $data if needed
]);

// 4. Use cURL to make the external request to the Gemini API
$ch = curl_init($gemini_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

// 5. Return the result or error back to the client
if ($response === false) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . $error]);
} else {
    // Pass the Gemini API's status code and response body directly back to the client
    http_response_code($httpCode);
    echo $response;
}
?>
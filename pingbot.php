<?php
header('Content-Type: application/json; charset=utf-8');

$input = $_POST['message'] ?? '';
$model = $_POST['model'] ?? 'gpt'; // 預設用 GPT

if (trim($input) === '') {
    echo json_encode(['reply' => '請輸入訊息']);
    exit;
}

// 共用簡歷內容（System Prompt）
$resume_context = <<<EOT
你是一位名叫 Ping Hsu 的前端工程師。
以下是你的履歷摘要：
- 技能：HTML、CSS、JavaScript、PHP、React
- 經歷：曾任 ABC 科技公司前端工程師
- 學歷：XX 電子工程系
請根據以上資訊簡潔回答使用者問題。
EOT;

if ($model === 'gpt') {
    // 使用 OpenAI GPT-3.5-turbo
    $api_key = 'sk-你的-OpenAI-Key'; // 請替換成你的 API 金鑰
    $data = [
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            ['role' => 'system', 'content' => $resume_context],
            ['role' => 'user', 'content' => $input]
        ],
        'temperature' => 0.7
    ];

    $ch = curl_init('https://api.openai.com/v1/chat/completions');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $api_key
        ],
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($data),
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($response, true);

    if (isset($result['choices'][0]['message']['content'])) {
        echo json_encode(['reply' => trim($result['choices'][0]['message']['content'])]);
    } else {
        echo json_encode(['reply' => '🤖 GPT 回應失敗']);
    }
} else {
    // 使用 Hugging Face API
    $hf_token = 'hf_你的HuggingFaceToken'; // 請替換成你的 Hugging Face Token
    $payload = [
        "inputs" => $input,
        "parameters" => ["max_new_tokens" => 100],
        "options" => ["wait_for_model" => true]
    ];

    $ch = curl_init('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $hf_token,
            'Content-Type: application/json'
        ],
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($payload),
    ]);

    $response = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($response, true);

    if (isset($result[0]['generated_text'])) {
        echo json_encode(['reply' => $result[0]['generated_text']]);
    } else {
        echo json_encode(['reply' => '🤖 Hugging Face 回應失敗']);
    }
}

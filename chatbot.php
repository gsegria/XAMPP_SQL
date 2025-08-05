<?php
header('Content-Type: application/json; charset=utf-8');

$api_key = 'YOUR_API_KEY_HERE'; // ← 請替換成你自己的 OpenAI API 金鑰

$input = $_POST['message'] ?? '';

if (trim($input) === '') {
  echo json_encode(['reply' => '請輸入一些文字來與我對話吧！']);
  exit;
}

$resume_context = <<<EOT
你是一位名叫 Ping Hsu 的專業人才。以下是你的履歷資訊摘要：

- 👤 姓名：Ping Hsu
- 💼 職稱：前端工程師 / 軟體開發人員
- 🎓 學歷：資訊工程學士，國立XX大學
- 🧠 技能：HTML、CSS、JavaScript、PHP、React、Node.js、MySQL
- 📂 經歷：
  - 在 ABC 科技擔任前端開發工程師 3 年
  - 曾在 XYZ 新創負責全端網站架構與開發
- 🌐 網站作品：個人履歷網站、公司官網、電子商務平台

請根據這份履歷，用中文簡潔回答訪客問題。
EOT;

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
  echo json_encode(['reply' => '抱歉，我目前無法提供回應。']);
}
?>

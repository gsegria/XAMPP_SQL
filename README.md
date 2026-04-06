# XAMPP_SQL

# 在 XAMPP_SQL 資料夾打開 terminal
python3 -m http.server 8000


## 專案架構
XAMPP_SQL/
│
├─ css/
│   └─ style.css            # 全域樣式 CSS，index.html 和 sections 都會引用
│
├─ js/
│   ├─ chatbot.js           # 聊天機器人功能 JS
│   ├─ main.js              # 主要頁面載入、fetch sections HTML
│   ├─ Pingbot.js           # 可能是另一個機器人或輔助 JS
│   └─ script.js            # 其他通用功能 JS
│
├─ keyboard_game/           # 遊戲專案資料夾
│   └─ ...                  # 遊戲 HTML、CSS、JS 等
│
├─ medicine/                # 醫療相關專案
│   └─ heart.html           # 醫療示例頁面
│
├─ pics/                    # 圖片素材資料夾
│   └─ ...                  # PNG, JPG, GIF 等
│
├─ sections/                # 各區塊內容 HTML (用 fetch 載入到 index.html)
│   ├─ 01_python.html       # Python 專案內容
│   ├─ 02_xmapp.html        # XAMPP 專案內容
│   ├─ 03_medicine.html     # 醫療專案內容
│   ├─ 04_npm.html           # npm 專案內容
│   ├─ 05_STM32_IDE.html     # STM32 IDE 專案內容
│   ├─ 06_dark.html          # Dark 主題專案內容
│   └─ 07_certificate.html   # 證書展示區塊
│
├─ uploads/                 # 上傳的圖片檔案
│   ├─ xxx.jpg
│   └─ xxx.png
│
├─ chatbot.php              # 後端 PHP，提供聊天機器人功能
├─ index.html               # 主頁，載入 sections，整合所有區塊
├─ README.md                # 專案說明文件
├─ resule.html              # 可能是結果頁
└─ resule.php               # 可能是 PHP 版結果頁

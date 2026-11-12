# XAMPP_SQL – Personal Portfolio & Project Showcase

個人技術作品集與專案展示平台，整合嵌入式系統、Linux 開發、AI 應用、Python、STM32、Web 開發及個人技術成果。

透過 HTML、CSS、JavaScript、PHP 建立模組化展示網站，並使用不同的專案區塊呈現技術開發經驗與實作成果。

---

## 1. Project Overview

本專案是一個以 Web 技術開發的個人作品集平台，主要功能包括：

- **Technical Portfolio**：展示個人技術經歷及開發成果。
- **Project Showcase**：整合 Python、Rock 5B+、Jetson、STM32 等專案。
- **Interactive Web Interface**：使用 HTML、CSS、JavaScript 建立互動式網頁。
- **Chatbot Integration**：整合 PHP 後端及 JavaScript 聊天機器人功能。
- **Medical Demo**：醫療相關網頁展示。
- **Certificate Display**：技術證照及相關成果展示。
- **Responsive UI**：提供不同裝置的網頁瀏覽體驗。

## 2. Technology Stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | PHP |
| Web Server | Apache / Python HTTP Server |
| Database Environment | XAMPP / MySQL |
| Development | Python, Linux, Git |
| Embedded & AI | STM32, Rock 5B+, NVIDIA Jetson |

## 3. Project Structure

```text
XAMPP_SQL/
│
├── css/
│   ├── style.css
│   └── style_bot.css
│
├── js/
│   ├── chatbot.js
│   ├── main.js
│   ├── Pingbot.js
│   └── script.js
│
├── keyboard_game/
│   └── ...
│
├── medicine/
│   └── heart.html
│
├── pics/
│   └── ...
│
├── results/
│   └── ...
│
├── scripts/
│   └── ...
│
├── sections/
│   ├── 01_python.html
│   ├── 02_rock5b_plus.html
│   ├── 03_medicine.html
│   ├── 04_npm.html
│   ├── 05_STM32_IDE.html
│   ├── 06_dark.html
│   ├── 07_xmapp.html
│   ├── 08_certificate.html
│   └── 09_nvida_jetson.html
│
├── uploads/
│   └── ...
│
├── .gitignore
├── birthday.html
├── chatbot.php
├── index.html
├── index1.php
├── pingbot.html
├── pingbot.php
├── resume.html
├── resume.php
└── README.md
```

### Directory Description

| Directory / File | Description |
|---|---|
| `css/` | 網站 CSS 樣式 |
| `js/` | JavaScript 功能模組 |
| `keyboard_game/` | 鍵盤遊戲專案 |
| `medicine/` | 醫療相關展示 |
| `pics/` | 網站圖片素材 |
| `results/` | 結果及相關資料 |
| `scripts/` | 輔助執行腳本 |
| `sections/` | 主頁各項專案展示內容 |
| `uploads/` | 上傳圖片檔案 |
| `index.html` | 網站主要入口 |
| `index1.php` | PHP 網頁入口 |
| `chatbot.php` | 聊天機器人 PHP 後端 |
| `pingbot.html` | Pingbot 網頁介面 |
| `pingbot.php` | Pingbot PHP 後端 |
| `resume.html` | 個人履歷頁面 |
| `resume.php` | PHP 履歷頁面 |
| `birthday.html` | 生日相關展示頁面 |

## 4. Main Project Sections

網站透過 `sections/` 管理不同技術展示內容。

| Section | Project |
|---|---|
| 01 | Python Development |
| 02 | Rock 5B+ Development |
| 03 | Medical Application |
| 04 | npm Development |
| 05 | STM32 IDE |
| 06 | Dark Theme |
| 07 | XAMPP Development |
| 08 | Certificates |
| 09 | NVIDIA Jetson |

## 5. Installation & Execution

### Option A. Python HTTP Server

適合瀏覽不需要 PHP 後端的靜態網頁。

在專案根目錄執行：

```bash
python3 -m http.server 8000
```

瀏覽器開啟：

```text
http://localhost:8000
```

### Option B. XAMPP Apache Server

若需要使用 PHP 後端功能：

1. 安裝並啟動 XAMPP。
2. 將專案放入 Apache 的 `htdocs` 目錄。
3. 啟動 Apache。
4. 依需求啟動 MySQL。
5. 瀏覽器開啟：

```text
http://localhost/XAMPP_SQL/
```

注意：PHP 功能應透過 Apache 執行，Python HTTP Server 不會執行 PHP 程式。

## 6. Development Environment

建議開發環境：

- Windows / Linux
- XAMPP
- Python 3
- Visual Studio Code
- Git / GitHub
- Modern Web Browser

## 7. Repository

GitHub Source Code:

https://github.com/gsegria/XAMPP_SQL

---

## 8. License

This project is maintained as a personal technical portfolio and development showcase.


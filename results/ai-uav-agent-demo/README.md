# AI UAV Agent Demo

GitHub-ready reference implementation for:

**Web/App UI → REST API → FastAPI → LLM/VLM/RAG → Agent → Safety Layer → Jetson/Edge AI → Camera/Sensor/GNSS → Robot/UAV → MAVLink**

## Run

```bash
python -m venv .venv

# Windows PowerShell
.venv\Scripts\Activate.ps1

# Linux / Jetson
source .venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# .venv
cd ~/proj/nvidia/ai-uav-agent-demo
source .venv/bin/activate
pkill -f 'uvicorn.*8000' || true
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000


```

Windows SSH → Jetson:
ssh jetson
cd ~/proj/nvidia/ai-uav-agent-demo
source .venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000

Open `http://127.0.0.1:8000`.
Open `http://192.168.50:8000`.

## Demo

1. `目前 UAV 狀態如何？`
2. `分析目前 Camera 畫面`
3. `電池低於多少需要返航？`
4. Click **Battery = 25%**
5. Ask `如果電池低於 30%，請返航`

The last scenario demonstrates:

`User → Agent → Telemetry → Safety Layer → RTL → UAV Adapter → simulated MAVLink`

## LLM / VLM
LLM_PROVIDER=mock
VLM_PROVIDER=mock

Default `LLM_PROVIDER=mock`, so it runs without an external AI service.

Optional Ollama:

```bash
ollama pull qwen3:8b
ollama pull qwen2.5vl:7b
```

Set `.env`:

```text
LLM_PROVIDER=ollama
OLLAMA_MODEL=qwen3:8b

VLM_PROVIDER=ollama
VLM_MODEL=qwen2.5vl:7b
OLLAMA_URL=http://127.0.0.1:11434

```

### YOLO

YOLO is used for real-time object detection.

Model:

`yolo11n.pt`

The model is automatically loaded by the application when YOLO detection is enabled.

## Real MAVLink

For SITL first:

```text
UAV_PROVIDER=mavlink
MAVLINK_CONNECTION=udp:127.0.0.1:14550
```

The MAVLink adapter is intentionally isolated from the Agent and Safety Layer.

## Tests

```bash
pytest -q
```

## Structure

```text

ai-uav-agent-demo/
│
├── app/
│   ├── main.py              # FastAPI API / Web 入口
│   ├── agent.py             # AI Agent / Tool Routing
│   ├── llm.py               # LLM 服務
│   ├── rag.py               # RAG 知識查詢
│   ├── safety.py            # UAV 安全規則
│   ├── vision.py            # VLM / Image 分析 ; 這個場景代表什麼
│   ├── schemas.py           # API 資料格式
│   ├── yolo.py              # 看到了什麼、在哪裡、有幾個
│   │
│   └── uav/
│       ├── __init__.py      # UAV module
│       ├── base.py          # UAV Adapter 介面
│       ├── mock.py          # 模擬 UAV
│       └── mavlink.py       # MAVLink UAV
│
├── knowledge/
│   └── safety_rules.md      # UAV 安全知識 / RAG
│
├── static/
│   ├── index.html           # Web UI / Demo 頁面
│   │
│   ├── css/
│   │   └── style.css        # Web UI 樣式
│   │
│   └── js/
│        ├── app.js             # 啟動與初始化
│        ├── api.js             # 所有 fetch / API
│        ├── vision.js          # Image + YOLO + VLM
│        ├── uav.js             # UAV status
│        ├── chat.js            # AI Assistant
│        └── ui.js              # Help / 共用 UI
│
│
├── tests/
│   └── test_api.py          # API 測試
│
├── requirements.txt         # Python 套件
├── setup.sh                 # Jetson / Linux 安裝
├── clean.sh                 # Linux 清理
├── clean.bat                # Windows 清理
├── Dockerfile               # Docker Image
├── docker-compose.yml       # Docker Compose
└── .env.example             # 環境變數範例

```


## Architecture

```text
Web UI
  ↓
FastAPI
  ↓
Agent
  ├── LLM      # Natural language understanding
  ├── VLM      # Image analysis
  ├── RAG      # Safety knowledge
  ↓
Safety Layer  # Check before UAV command
  ↓
UAV Adapter   # Mock / MAVLink
  ↓
UAV / Robot

```

## Safety

Never use `LLM → MAVLink → UAV` directly. Use:

`LLM → Agent → Safety Layer → UAV Adapter → MAVLink`.

For real aircraft add human confirmation, geofence, failsafes, telemetry timeout, authorization, audit logging, and hardware flight-controller failsafes.


## Camera AI — YOLO + VLM

本單元提供 Camera / Image 的 AI 視覺分析能力，結合 **YOLO 物件偵測**與 **VLM 視覺語言模型**，將影像從「物件偵測」進一步延伸至「場景理解」。
### AI Vision Pipeline

```text
                    Camera Image
                         │
                         ▼
                ┌─────────────────┐
                │      YOLO       │
                │    Detection    │
                └────────┬────────┘
                         │
              Structured Detection
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       person           car            bird
       count=2         count=1         count=3
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                ┌─────────────────┐
                │       VLM       │
                │   Qwen2.5-VL    │
                └────────┬────────┘
                         │
                         ▼
                Scene Understanding
                    / Description
                         │
                         ▼
                ┌─────────────────┐
                │   LLM / Agent   │
                └────────┬────────┘
                         │
                         ▼
                  UAV Decision


```

## Processing Architecture

                       Camera / Image
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
          analyze_upload()              detect()
                 │                         │
                 ▼                         ▼
            Ollama VLM                   YOLO
           qwen2.5vl:7b               yolo11n.pt
                 │                         │
                 ▼                         ▼
         Scene Understanding        Object Detection
                 │                         │
                 └────────────┬────────────┘
                              │
                              ▼
                     AI Vision Result



## Author
```text
Ping Hsu

AI Software Engineer

GitHub: https://github.com/


```

## Copyright
```text
Copyright © 2026 Ping Hsu. Released under the MIT License.

This project and its source code are protected by copyright law. Unauthorized copying, modification, distribution, or commercial use of substantial portions of this project is prohibited unless permitted by the terms of the accompanying license.

The project may include third-party open-source components, which remain subject to their respective licenses.

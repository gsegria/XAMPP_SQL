# Edge AI SDK

A lightweight, hardware-independent Edge AI software platform for building vision, device, event-processing, and AI applications.

Designed for edge platforms such as:

- ROCK 5B+ / RK3588
- NVIDIA Jetson
- x86 AI PC
- Windows / Linux

The public repository provides a runnable demonstration of the Edge AI runtime architecture.

---

## Features

- Hardware-independent architecture
- Camera / image / video input
- Vision processing abstraction
- Demo vision backend
- Event processing engine
- REST API
- WebSocket real-time events
- Device monitoring
- Electron desktop console
- Structured logging and statistics
- OpenAPI documentation

---

## Architecture

```text
Camera / Image / Video
          │
          ↓
       Vision
          │
          ↓
      Detection
          │
          ↓
     Event Engine
       │       │
       ↓       ↓
     REST   WebSocket
       │       │
       └───┬───┘
           ↓
    Edge AI Console
```

The architecture separates application logic from hardware-specific AI acceleration.

---

## Quick Start

### 1. Create Python Environment

```bash
python -m venv .venv
```

Linux:

```bash
source .venv/bin/activate
```

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Start Backend

```bash
python app/demo.py
```

The API will be available at:

```text
http://127.0.0.1:8000
```

### 4. Open API Documentation

```text
http://127.0.0.1:8000/docs
```

### 5. Start Electron Console

```bash
cd electron
npm install
npm start
```

---

## API

Main API groups:

```text
Runtime
├── GET  /api/status
├── GET  /api/device
└── GET  /health

Camera
├── GET  /api/cameras
├── POST /api/camera/start
└── POST /api/camera/stop

Vision
├── POST /api/model/load
├── POST /api/process
└── GET  /api/detections

Events
├── GET  /api/events
└── POST /api/events/test
```

See [API.md](docs/API.md) for details.

---

## Project Structure

```text
edge-ai-sdk/
├── README.md
├── docs/
│   ├── README_Process.md     ← ★ 開發中斷後從這裡繼續
│   ├── README_Step1.md       ← ★ 現在正在做
│   ├── README_Step2.md       ← 下一階段
│   ├── README_Step3.md       ← AI 階段
│   ├── API.md                ← API 詳細資料
│   ├── ARCHITECTURE.md       ← 架構
│   └── COMMERCIAL.md         ← 商業版邊界
│
├── edgeai/
├── electron/
├── app/
├── examples/
└── tests/
```

---

## Development Status

Current public release:

```text
Version: 0.1.0
Status: Public Demo
Phase: v0.1 Runtime Foundation
```

Development progress is tracked in:

[README_Process.md](docs/README_Process.md)

---

## Development Steps

| Step | Version | Focus | Status |
|---|---|---|---|
| Step 1 | v0.1 | Runtime Foundation | In Progress |
| Step 2 | v0.2 | Vision & Device | Planned |
| Step 3 | v0.3 | AI Extensions | Planned |

---

## Documentation

- [Development Process](docs/README_Process.md)
- [Step 1 — Runtime Foundation](docs/README_Step1.md)
- [Step 2 — Vision & Device](docs/README_Step2.md)
- [Step 3 — AI Extensions](docs/README_Step3.md)
- [API Reference](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Commercial Edition](docs/COMMERCIAL.md)

---

## Hardware Acceleration

Hardware-specific acceleration is intentionally separated from the public runtime.

Potential production runtimes include:

- RKNN
- TensorRT
- CUDA
- ONNX Runtime
- CPU

Hardware-specific implementations may be provided separately.

---

## License

See [LICENSE](LICENSE).

Copyright © 2026 Ping Hsu.

# ROCK 5B+ ROS 2 System Monitor Demo

A lightweight ROS 2 functional demo running on **ROCK 5B+**, demonstrating basic ROS 2 node communication and system monitoring on an ARM64 edge platform.

## Demo Overview

This project demonstrates a simple ROS 2 pipeline:

```text
System Monitor Node
        │
        │ Publish
        ▼
   /system/status
        │
        ▼
   Topic Monitor
```

The `system_monitor` node periodically collects system information and publishes it through a ROS 2 topic.

### Monitored Data

* CPU usage
* Memory usage
* CPU temperature
* System uptime
* System status

## Example Output

```text
[system_monitor]: Publish:
cpu=0.5%, memory=8.5%, temperature=49.0C,
uptime=25442s, status=OK

[system_monitor]: Publish:
cpu=0.8%, memory=8.5%, temperature=49.0C,
uptime=25483s, status=OK
```

## Platform

| Item       | Specification  |
| ---------- | -------------- |
| Platform   | ROCK 5B+       |
| CPU        | ARM64 / RK3588 |
| OS         | Linux          |
| Middleware | ROS 2          |
| Language   | Python         |
| Interface  | ROS 2 Topic    |

## What This Demo Validates

* ROS 2 Node creation and execution
* Publisher / Subscriber communication
* ROS 2 Topic-based data flow
* Periodic system monitoring
* ARM64 edge-platform deployment
* Basic ROS 2 functional testing


## Run

```bash
source /opt/ros/<ros2-distro>/setup.bash
source install/setup.bash

ros2 run <package_name> system_monitor
```

Check the published topic:

```bash
ros2 topic list
ros2 topic echo /system/status
```

## Engineering Focus

This demo is a small validation project for building a **ROS 2 + Edge Computing** foundation on ARM64 hardware.

It can be extended toward:

```text
ROS 2
  │
  ├── Sensor Data
  ├── System Monitor
  ├── Camera / Vision
  ├── Edge AI
  └── UAV / Robotics Integration
```

## Status

**Functional Demo**

The basic ROS 2 node, topic communication, and system monitoring pipeline have been verified on real ROCK 5B+ hardware.

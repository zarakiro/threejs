# PopShock - 3D Simulation of a Concussion-Detecting Rugby Helmet

## Overview

![image](https://github.com/user-attachments/assets/aef16975-4bc5-4d9d-8318-ea29b227773c)


**PopShock** is a connected rugby helmet designed for the prevention and management of concussions in rugby. The helmet integrates advanced sensor technology to detect violent impacts, promoting player safety. The **PopShock project** is a Three.js-based 3D simulation of the helmet structure, allowing users to interact with the model, explore its components, and simulate collisions.

## Purpose

The purpose of this project is to:

1. **Visualize the structure** of the PopShock helmet and its components, such as accelerometers and piezoelectric sensors.
2. **Simulate a collision** by launching balls of different sizes towards the helmet to simulate impact scenarios, with the system alerting when a critical shock is detected.
3. **Interact with the 3D model** to learn about the helmet's components, through clickable "stars" that provide detailed information about sensors, microcontrollers, and other elements.

## Features

### 1. Helmet Model and Components
The 3D model of the PopShock helmet is loaded into the scene, showcasing different components such as:
- **Piezoelectric sensors** distributed across the helmet.
- **ESP32-C3 Mini** microcontroller that centralizes data collection.
- **MPU 6050 accelerometer** for detecting head acceleration during impacts.
- **Wires and connections** for integrating the components.

### 2. Launch Balls to Simulate Impacts
Users can launch balls of varying sizes towards the helmet to simulate impacts. The size of the ball correlates with the intensity of the simulated shock:
- **Large balls** indicate **severe impacts** that trigger a change in the helmet's status to **"Severe Shock Detected"**.
- **Smaller balls** simulate **minor impacts**, and the status message remains as **"No Shock Detected"**.

### 3. Interactive Stars for Helmet Component Descriptions
Clickable stars are placed on various parts of the helmet to describe its components. These include:
- **Piezo sensors** positioned at different points around the helmet.
- **ESP32-C3 Mini**, responsible for managing sensor data.
- **MPU 6050 accelerometer**, measuring head acceleration.
- **Electronic wires**, connecting the sensors and microcontroller.

### 4. Camera Controls and Rotation
- The **camera** can be controlled using **OrbitControls**, allowing users to freely rotate and zoom the 3D scene.
- Press **Space** to toggle automatic rotation of the helmet.

### 5. Tooltip for Component Information
When the user clicks on the "stars" representing different components of the helmet, a tooltip appears showing detailed information about that component.

### 6. Helmet Description (Left Side)
On the left side of the scene, a description of the PopShock helmet is displayed. It includes information about the helmet's design, its purpose in concussion prevention, and how the sensors and microcontroller work together to detect impacts and alert medical staff when necessary.

### 7. Image and Model Sources
- The images of the helmet components used in this project were sourced from the internet.
- The 3D model of the PopShock helmet was created using the Polycam application, which allowed for precise 3D scanning and modeling.

## How to Use

1. **Explore the Helmet**: Rotate the helmet using the mouse or trackpad. Zoom in and out to get a closer look at the details.
2. **Launch Balls**: Click on the "Launch a Ball" text to simulate an impact with the helmet.
3. **Click on Stars**: Click on the yellow stars scattered around the helmet to learn about different sensors and components.
4. **Toggle Rotation**: Press the **Space** bar to toggle the automatic rotation of the helmet.

## Technology Stack

- **Three.js**: A 3D library for rendering the helmet model and simulating interactions.
- **GLTFLoader**: Loads the 3D model of the helmet.
- **OrbitControls**: Provides camera controls for rotating and zooming the scene.
- **FontLoader & TextGeometry**: For rendering 3D text elements like "PopShock" and status messages.
- **CSS2DRenderer**: Renders HTML elements (like tooltips) in 3D space for interactive information display.

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Improvements

- **Enhanced Impact Detection**: Integrating real-time data from actual sensors for more accurate impact simulations.
- **Mobile Compatibility**: Making the 3D scene more responsive for mobile devices.
- **Real-world Simulation**: Simulating the interaction of the helmet with real-world physics for more dynamic feedback.

---

For more information, please visit [the official PopShock project page](https://ift.devinci.fr/).
"""

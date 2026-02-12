# Gemini Project Overview

This file contains an overview of the project structure, technologies, and features, as understood by the Gemini agent.

## Project Summary

This project is a feature-rich web application built with React and Vite. It serves as a platform for 3D designers and creators.

### Core Functionality
It's a marketplace or portfolio platform for 3D models. Users can browse models and designers. Creators can upload, manage, and edit their 3D designs.

### Technology Stack
- **Frontend**: React, Vite, Tailwind CSS.
- **3D Rendering**: `three.js` with `@react-three/fiber` and `@react-three/drei`.
- **Routing**: `react-router-dom`.
- **Real-time**: `pusher-js` and `laravel-echo` (suggesting a Laravel backend).
- **API Communication**: `axios`.

### Key Features
- **2D/3D Editor**: A core feature is the ability to upload a DXF file for a 2D floor plan, place items like doors and windows, and then view the result as a 3D model.
- **User Roles**: The application has roles like `admin` and `creator`, with a `PrivateRoute` system to manage access.
- **Creator Dashboard**: Creators have a dedicated section to manage their models, view analytics, and manage settings.
- **Authentication**: The application has a full authentication system with login.
- **Payments**: A payment system is integrated.
- **CAD Support**: The application is built around parsing and displaying `DXF` files.

## Agent Notes & Observations
- The project uses a combination of `three.js` primitives and loaded GLB models (`.glb`).
- The coordinate system within the 3D `House` component is rotated, making the Z-axis the "up" direction for positioning elements.
- State management for the editor is handled primarily in `Viewer3D.jsx`.

# 3D House Maker (FilRouge)

A comprehensive web application for 3D architectural modeling and design. This platform allows users to upload 2D DXF floor plans, visualize them in 3D, furnishing the interior with a library of components, and manage their designs.

##  Features

*   **DXF to 3D Conversion**: Automatically parses uploaded `.dxf` files to generate 3D walls and structures.
*   **3D Editor**: Interactive 3D environment built with **Three.js** and **React Three Fiber**.
*   **2D/3D Toggling**: Switch between a 2D floor plan view and a fully immersive 3D walkthrough.
*   **Component Library**: Drag-and-drop system for adding doors, windows, and furniture.
*   **User Accounts**: Authentication system for creators and admins.
*   **Project Management**: Save, update, and manage multiple design projects.

## 🛠️ Tech Stack

### Frontend
*   **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **3D Engine**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **State Management**: React Hooks (Context/State)
*   **Real-time**: Laravel Echo + Pusher

### Backend
*   **Framework**: [Laravel](https://laravel.com/)
*   **Database**: MySQL (implied)
*   **API**: RESTful API with JWT Authentication

## 📂 Project Roots & Structure

The project is divided into two main root directories:

```
FillRouge/
├── backend/            # Laravel Backend API
│   ├── app/            # Controllers, Models, Core Logic
│   ├── config/         # App configuration (CORS, Database)
│   ├── database/       # Migrations and Seeders
│   ├── routes/         # API Routes (api.php)
│   └── storage/        # File storage (DXF files, images)
│
└── frontend/           # React Frontend Application
    ├── src/
    │   ├── components/ # Reusable UI components & 3D objects
    │   ├── models/     # Three.js component logic (DXFModel.jsx)
    │   ├── pages/      # Main views (Viewer3D.jsx, House.jsx)
    │   └── services/   # API integration (api.js, dxfHelpers.js)
    └── public/         # Static assets
```

## ⚡ Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18+ recommended)
*   [PHP](https://www.php.net/) (v8.1+)
*   [Composer](https://getcomposer.org/)
*   Database Server (MySQL/MariaDB)

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install PHP dependencies:
    ```bash
    composer install
    ```
3.  Set up environment setup:
    ```bash
    cp .env.example .env
    ```
    *   Configure your database credentials in `.env`.
4.  Generate application key:
    ```bash
    php artisan key:generate
    ```
5.  Run migrations (and seeders if applicable):
    ```bash
    php artisan migrate
    ```
6.  Start the development server:
    ```bash
    php artisan serve
    ```
    The API will be available at `http://127.0.0.1:8000`.

### 2. Frontend Setup

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install Node dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173`.

## 📖 Documentation

*   i will a documentation ASAP


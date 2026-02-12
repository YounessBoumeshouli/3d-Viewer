# Modeling Lifecycle: DXF to Three.js

This document outlines the lifecycle of a DXF file within the application, from upload to 3D rendering. It covers the backend handling, API endpoints, and frontend parsing and visualization logic.

## 1. Overview

The core feature of this application is the ability to upload a 2D floor plan in DXF format and visualize it as a 3D model. The process involves:
1.  **Upload**: User uploads a DXF file via the frontend.
2.  **Storage**: Backend stores the file and records metadata in the database.
3.  **Retrieval**: Frontend fetches the raw DXF content from the backend.
4.  **Parsing**: Frontend parses the DXF entities (Lines, Polylines).
5.  **Rendering**:
    *   **2D View**: Renders the 2D SVG/Canvas representation for editing.
    *   **3D View**: Extrudes the 2D shapes into 3D geometries using Three.js.

---

## 2. Backend (Laravel)

The backend is responsible for securely storing the DXF files and serving them to the frontend on demand.

### 2.1. API Endpoints

*   **POST `/api/upload`**
    *   **Controller**: `App\Http\Controllers\FileUploadController@upload`
    *   **Request**: `multipart/form-data` containing `file` (DXF), `type`, `dimensions`, `price`, `name`.
    *   **Logic**:
        *   Validates the file type.
        *   Stores the file in `storage/app/public/dxf-files`.
        *   Creates a `DxfFile` record in the database linking the file to the authenticated user (`designer_id`).
    *   **Response**: JSON with success message and file path.

*   **GET `/api/files/{path}`**
    *   **Controller**: `App\Http\Controllers\FileController@serve`
    *   **Logic**:
        *   Checks if the file exists in storage.
        *   Returns the raw file content with the appropriate `Content-Type` (e.g., `application/dxf` or `text/plain`).
    *   **Note**: This endpoint is critical for the frontend parser to access the raw DXF data.

*   **GET `/api/myfiles`**
    *   **Controller**: `App\Http\Controllers\FileController@index`
    *   **Logic**: Returns a list of DXF files belonging to the authenticated user.

### 2.2. Configuration & Security

*   **CORS (Cross-Origin Resource Sharing)**:
    *   Configured in `config/cors.php`.
    *   **Policy**: Allows all origins (`*`), methods (`*`), and headers (`*`).
    *   **Paths**: `api/*`, `image/*`, `storage/*`.
    *   This ensures the frontend (running on a different port/domain) can fetch the DXF files without browser security blocks.

*   **Middleware**:
    *   **`api` group**: Applies standard API throttling and binding substitution.
    *   **`JwtMiddleware`**: Protects routes requiring authentication (like upload and listing files).
    *   **`EncryptCookies`**: Encrypts cookies for security.

---

## 3. Frontend (React + Three.js)

The frontend handles the complexity of parsing the DXF format and generating the 3D geometry.

### 3.1. File Upload

*   **Component**: `src/components/Maker/FileUploadModal.jsx`
*   **Action**: capturing the file input and sending a `POST` request to `/api/upload`.
*   **State**: Updates the list of available files upon success.

### 3.2. DXF Parsing (The Core Logic)

The application uses the `dxf-parser` library to convert raw DXF text into JavaScript objects.

**Parsing occurs in two places:**

1.  **For 2D View & Snapping (`src/services/dxfHelpers.js`)**:
    *   **Trigger**: When a file is selected in `Viewer3D.jsx`.
    *   **Process**:
        *   Fetches file content from `/api/files/{path}`.
        *   Parses the content using `DxfParser`.
        *   Extracts `POLYLINE`, `LWPOLYLINE`, and `LINE` entities.
        *   Converts them into a simplified "Wall" structure: `{ start: {x, y}, end: {x, y} }`.
    *   **Usage**: Used by `TwoDViewer` for the 2D editor and for snapping doors/windows to walls.

2.  **For 3D Rendering (`src/models/DFXModel.jsx`)**:
    *   **Trigger**: When the `House` component mounts (3D mode).
    *   **Process**:
        *   Fetches the file content *again*.
        *   Parses existing entities.
        *   Calculates wall lengths and identifies the longest wall (for scaling/positioning).
    *   **Geometry Generation**:
        *   Iterates through parsed entities.
        *   The parsed entities are converted into `THREE.Shape`.
        *   `THREE.ExtrudeGeometry` is used to extrude the 2D shape into a 3D wall with a specified `depth` (height).
        *   Materials are applied (e.g., stone texture).

### 3.3. 3D Visualization (`src/pages/house.jsx`)

*   **Container**: `Canvas` from `@react-three/fiber`.
*   **Components**:
    *   `DXFModel`: Renders the extruded walls from the DXF file.
    *   `Door` / `Window`: Placed based on user design data, snapping to the parsed walls.
    *   `Room`: Renders floor/ceiling geometries for defined rooms.
    *   `CameraController`: Handles user navigation within the 3D space.

## 4. Work in Progress / Improvements

*   **Optimization**: Currently, the DXF file is fetched and parsed twice (once for 2D, once for 3D). This could be optimized by passing the parsed data from `Viewer3D` to `DXFModel` via the `House` component, avoiding the second network request and parse operation.
*   **Error Handling**: Robust error handling for malformed DXF files or network failures during file fetching.

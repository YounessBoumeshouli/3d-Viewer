import React, { useEffect, useRef, useState } from 'react';

const TwoDViewer = ({ walls, onUpdateDesign }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // Viewport state
    const [transform, setTransform] = useState({ scale: 1, offsetX: 0, offsetY: 0 });

    // ADDED: 'windows' array to state
    const [designElements, setDesignElements] = useState({ doors: [], rooms: [], windows: [] });

    // ADDED: 'window' to modes
    const [mode, setMode] = useState('view'); // 'view', 'door', 'room', 'window'

    // 1. AUTO-FIT (Keep existing logic)
    useEffect(() => {
        if (!walls || walls.length === 0 || !canvasRef.current) return;
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        walls.forEach(wall => {
            minX = Math.min(minX, wall.start.x, wall.end.x);
            minY = Math.min(minY, wall.start.y, wall.end.y);
            maxX = Math.max(maxX, wall.start.x, wall.end.x);
            maxY = Math.max(maxY, wall.start.y, wall.end.y);
        });
        const houseWidth = maxX - minX;
        const houseHeight = maxY - minY;
        const padding = 50;
        const canvasWidth = canvasRef.current.width;
        const canvasHeight = canvasRef.current.height;
        const scaleX = (canvasWidth - padding * 2) / houseWidth;
        const scaleY = (canvasHeight - padding * 2) / houseHeight;
        const scale = Math.min(scaleX, scaleY);
        const offsetX = (canvasWidth - houseWidth * scale) / 2 - minX * scale;
        const offsetY = (canvasHeight - houseHeight * scale) / 2 - minY * scale;
        setTransform({ scale, offsetX, offsetY });
    }, [walls]);

    // 2. RENDER LOOP
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear Canvas
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const toScreen = (x, y) => ({
            x: x * transform.scale + transform.offsetX,
            y: canvas.height - (y * transform.scale + transform.offsetY)
        });

        // --- DRAW WALLS ---
        ctx.beginPath();
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        walls.forEach(wall => {
            const start = toScreen(wall.start.x, wall.start.y);
            const end = toScreen(wall.end.x, wall.end.y);
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
        });
        ctx.stroke();

        // --- DRAW DOORS (Red) ---
        designElements.doors.forEach(door => {
            const pos = toScreen(door.x, door.y);
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 6, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.font = '10px Arial';
            ctx.fillText("DOOR", pos.x + 8, pos.y);
        });

        // --- ADDED: DRAW WINDOWS (Blue) ---
        designElements.windows.forEach(win => {
            const pos = toScreen(win.x, win.y);
            ctx.fillStyle = '#3b82f6'; // Blue
            ctx.beginPath();
            ctx.rect(pos.x - 5, pos.y - 5, 10, 10); // Square for window
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.font = '10px Arial';
            ctx.fillText("WINDOW", pos.x + 8, pos.y);
        });

        // --- DRAW ROOMS (Green) ---
        designElements.rooms.forEach(room => {
            const pos = toScreen(room.x, room.y);
            ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
            ctx.strokeStyle = '#166534';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            ctx.fillStyle = '#166534';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText("ROOM", pos.x, pos.y);
        });

    }, [walls, transform, designElements]);

    // 3. INTERACTION
    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        const worldX = (clickX - transform.offsetX) / transform.scale;
        const worldY = ((canvas.height - clickY) - transform.offsetY) / transform.scale;

        if (mode === 'door') {
            const newDoors = [...designElements.doors, { x: worldX, y: worldY, id: Date.now() }];
            setDesignElements(prev => ({ ...prev, doors: newDoors }));
            onUpdateDesign(newDoors, designElements.rooms, designElements.windows);
        }
        else if (mode === 'room') {
            const newRooms = [...designElements.rooms, { x: worldX, y: worldY, id: Date.now() }];
            setDesignElements(prev => ({ ...prev, rooms: newRooms }));
            onUpdateDesign(designElements.doors, newRooms, designElements.windows);
        }
        // ADDED: Window Click Logic
        else if (mode === 'window') {
            const newWindows = [...designElements.windows, { x: worldX, y: worldY, id: Date.now() }];
            setDesignElements(prev => ({ ...prev, windows: newWindows }));
            onUpdateDesign(designElements.doors, designElements.rooms, newWindows);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-sm overflow-hidden" ref={containerRef}>
            {/* Toolbar */}
            <div className="flex gap-2 p-3 bg-gray-50 border-b overflow-x-auto">
                <button
                    onClick={() => setMode('view')}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'view' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
                >
                    View
                </button>
                <button
                    onClick={() => setMode('door')}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'door' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
                >
                    Add Door
                </button>
                {/* ADDED WINDOW BUTTON */}
                <button
                    onClick={() => setMode('window')}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'window' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
                >
                    Add Window
                </button>
                <button
                    onClick={() => setMode('room')}
                    className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${mode === 'room' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border'}`}
                >
                    Add Room
                </button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-gray-50">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleCanvasClick}
                    className="w-full h-full cursor-crosshair block"
                    style={{ touchAction: 'none' }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs text-gray-500 pointer-events-none shadow">
                    Mode: {mode.toUpperCase()}
                </div>
            </div>
        </div>
    );
};

export default TwoDViewer;
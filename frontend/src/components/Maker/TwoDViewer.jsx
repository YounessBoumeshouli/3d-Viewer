import React, { useEffect, useRef, useState } from 'react';

const TwoDViewer = ({ walls, savedDesign, onUpdateDesign }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    // Viewport state
    const [transform, setTransform] = useState({ scale: 1, offsetX: 0, offsetY: 0 });

    // Design State: Initialize with empty arrays
    const [designElements, setDesignElements] = useState({ doors: [], rooms: [], windows: [] });

    // Drawing State
    const [mode, setMode] = useState('view'); // 'view', 'door', 'window', 'draw_room'
    const [currentPoly, setCurrentPoly] = useState([]); // Points for the room currently being drawn
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // Track mouse for preview lines

    // --- NEW: LOAD SAVED DESIGN ---
    useEffect(() => {
        if (savedDesign) {
            setDesignElements({
                doors: savedDesign.doors || [],
                rooms: savedDesign.rooms || [],
                windows: savedDesign.windows || []
            });
        }
    }, [savedDesign]);

    // 1. AUTO-FIT (Standard Logic)
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

        // Clear
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Helper: World to Screen
        const toScreen = (x, y) => ({
            x: x * transform.scale + transform.offsetX,
            y: canvas.height - (y * transform.scale + transform.offsetY)
        });

        // --- DRAW COMPLETED ROOMS (Polygons) ---
        designElements.rooms.forEach(roomPoints => {
            if (!roomPoints || roomPoints.length < 3) return;

            ctx.fillStyle = 'rgba(34, 197, 94, 0.3)'; // Green transparent
            ctx.strokeStyle = '#166534';
            ctx.lineWidth = 2;

            ctx.beginPath();
            const start = toScreen(roomPoints[0].x, roomPoints[0].y);
            ctx.moveTo(start.x, start.y);

            roomPoints.slice(1).forEach(p => {
                const pt = toScreen(p.x, p.y);
                ctx.lineTo(pt.x, pt.y);
            });

            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Label Center
            const centerX = roomPoints.reduce((sum, p) => sum + p.x, 0) / roomPoints.length;
            const centerY = roomPoints.reduce((sum, p) => sum + p.y, 0) / roomPoints.length;
            const labelPos = toScreen(centerX, centerY);

            ctx.fillStyle = '#166534';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText("ROOM", labelPos.x, labelPos.y);
        });

        // --- DRAW CURRENT DRAWING (Lines in progress) ---
        if (currentPoly.length > 0) {
            ctx.strokeStyle = '#2563eb'; // Blue
            ctx.lineWidth = 2;
            ctx.beginPath();

            const start = toScreen(currentPoly[0].x, currentPoly[0].y);
            ctx.moveTo(start.x, start.y);

            currentPoly.slice(1).forEach(p => {
                const pt = toScreen(p.x, p.y);
                ctx.lineTo(pt.x, pt.y);
            });

            // Draw rubber-band line
            const lastPt = currentPoly[currentPoly.length - 1];
            const screenMouse = toScreen(mousePos.x, mousePos.y);

            ctx.lineTo(screenMouse.x, screenMouse.y);
            ctx.stroke();

            // Draw anchor points
            currentPoly.forEach((p, i) => {
                const pt = toScreen(p.x, p.y);
                ctx.fillStyle = i === 0 ? '#16a34a' : '#2563eb';
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        // --- DRAW WALLS (Overlay) ---
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

        // --- DRAW DOORS ---
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

        // --- DRAW WINDOWS ---
        designElements.windows.forEach(win => {
            const pos = toScreen(win.x, win.y);
            ctx.fillStyle = '#3b82f6';
            ctx.beginPath();
            ctx.rect(pos.x - 5, pos.y - 5, 10, 10);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.font = '10px Arial';
            ctx.fillText("WINDOW", pos.x + 8, pos.y);
        });

    }, [walls, transform, designElements, currentPoly, mousePos]);

    // 3. INTERACTION
    const getMouseWorldPos = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;

        const worldX = (clickX - transform.offsetX) / transform.scale;
        const worldY = ((canvas.height - clickY) - transform.offsetY) / transform.scale;

        return { x: worldX, y: worldY };
    };

    const handleMouseMove = (e) => {
        setMousePos(getMouseWorldPos(e));
    };

    const handleCanvasClick = (e) => {
        const worldPos = getMouseWorldPos(e);

        if (mode === 'draw_room') {
            if (currentPoly.length > 2) {
                const start = currentPoly[0];
                const dist = Math.sqrt((worldPos.x - start.x) ** 2 + (worldPos.y - start.y) ** 2);
                if (dist < 0.5) {
                    const newRoom = [...currentPoly];
                    const updatedRooms = [...designElements.rooms, newRoom];
                    setDesignElements(prev => ({ ...prev, rooms: updatedRooms }));
                    setCurrentPoly([]);
                    onUpdateDesign(designElements.doors, updatedRooms, designElements.windows);
                    return;
                }
            }
            setCurrentPoly([...currentPoly, worldPos]);
        }
        else if (mode === 'door') {
            const newDoors = [...designElements.doors, { x: worldPos.x, y: worldPos.y, id: Date.now() }];
            setDesignElements(prev => ({ ...prev, doors: newDoors }));
            onUpdateDesign(newDoors, designElements.rooms, designElements.windows);
        }
        else if (mode === 'window') {
            const newWindows = [...designElements.windows, { x: worldPos.x, y: worldPos.y, id: Date.now() }];
            setDesignElements(prev => ({ ...prev, windows: newWindows }));
            onUpdateDesign(designElements.doors, designElements.rooms, newWindows);
        }
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
        if (mode === 'draw_room' && currentPoly.length > 0) {
            setCurrentPoly(currentPoly.slice(0, -1));
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-sm overflow-hidden" ref={containerRef}>
            <div className="flex gap-2 p-3 bg-gray-50 border-b overflow-x-auto">
                <button onClick={() => setMode('view')} className={`px-4 py-2 rounded-md text-sm ${mode === 'view' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>View</button>
                <button onClick={() => setMode('door')} className={`px-4 py-2 rounded-md text-sm ${mode === 'door' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Door</button>
                <button onClick={() => setMode('window')} className={`px-4 py-2 rounded-md text-sm ${mode === 'window' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Window</button>
                <button onClick={() => { setMode('draw_room'); setCurrentPoly([]); }} className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${mode === 'draw_room' ? 'bg-green-600 text-white shadow' : 'bg-white text-gray-700 border'}`}>✏️ Draw Room</button>
            </div>

            <div className="flex-1 relative bg-gray-50">
                <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    onClick={handleCanvasClick}
                    onMouseMove={handleMouseMove}
                    onContextMenu={handleContextMenu}
                    className="w-full h-full cursor-crosshair block"
                    style={{ touchAction: 'none' }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded text-xs text-gray-700 border shadow pointer-events-none">
                    Mode: {mode.toUpperCase()}
                </div>
            </div>
        </div>
    );
};

export default TwoDViewer;
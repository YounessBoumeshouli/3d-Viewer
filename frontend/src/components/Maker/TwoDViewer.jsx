import React, { useEffect, useRef, useState } from 'react';


const getClosestPointOnSegment = (p, a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    if (dx === 0 && dy === 0) return a;

    const lenSq = dx * dx + dy * dy;
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));

    return { x: a.x + t * dx, y: a.y + t * dy };
};

const snapToPoint = (point, walls, snapThreshold) => {
    if (snapThreshold <= 0) return point;
    let minDistanceSq = snapThreshold * snapThreshold;
    let snappedPoint = null;

    walls.forEach(wall => {
        const closestPointOnWall = getClosestPointOnSegment(point, wall.start, wall.end);
        const distSq = (point.x - closestPointOnWall.x) ** 2 + (point.y - closestPointOnWall.y) ** 2;

        if (distSq < minDistanceSq) {
            minDistanceSq = distSq;
            snappedPoint = closestPointOnWall;
        }
    });

    return snappedPoint || point;
};


const TwoDViewer = ({ walls, savedDesign, onUpdateDesign }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    
    const [transform, setTransform] = useState({ scale: 1, offsetX: 0, offsetY: 0 });

    
    const [designElements, setDesignElements] = useState({ doors: [], rooms: [], windows: [] });

    
    const [mode, setMode] = useState('view'); 
    const [currentPoly, setCurrentPoly] = useState([]); 
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); 

    
    const [snapIndicator, setSnapIndicator] = useState(null);

    
    useEffect(() => {
        if (savedDesign) {
            setDesignElements({
                doors: savedDesign.doors || [],
                rooms: savedDesign.rooms || [],
                windows: savedDesign.windows || []
            });
        }
    }, [savedDesign]);

    
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

    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        
        const toScreen = (x, y) => ({
            x: x * transform.scale + transform.offsetX,
            y: canvas.height - (y * transform.scale + transform.offsetY)
        });

        
        designElements.rooms.forEach(roomPoints => {
            if (!roomPoints || roomPoints.length < 3) return;

            ctx.fillStyle = 'rgba(34, 197, 94, 0.3)'; 
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

            
            const centerX = roomPoints.reduce((sum, p) => sum + p.x, 0) / roomPoints.length;
            const centerY = roomPoints.reduce((sum, p) => sum + p.y, 0) / roomPoints.length;
            const labelPos = toScreen(centerX, centerY);

            ctx.fillStyle = '#166534';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText("ROOM", labelPos.x, labelPos.y);
        });

        
        if (currentPoly.length > 0) {
            ctx.strokeStyle = '#2563eb'; 
            ctx.lineWidth = 2;
            ctx.beginPath();

            const start = toScreen(currentPoly[0].x, currentPoly[0].y);
            ctx.moveTo(start.x, start.y);

            currentPoly.slice(1).forEach(p => {
                const pt = toScreen(p.x, p.y);
                ctx.lineTo(pt.x, pt.y);
            });

            
            const lastPt = currentPoly[currentPoly.length - 1];
            const screenMouse = toScreen(mousePos.x, mousePos.y);

            ctx.lineTo(screenMouse.x, screenMouse.y);
            ctx.stroke();

            
            currentPoly.forEach((p, i) => {
                const pt = toScreen(p.x, p.y);
                ctx.fillStyle = i === 0 ? '#16a34a' : '#2563eb';
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        
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

        
        if (snapIndicator) {
            const pt = toScreen(snapIndicator.x, snapIndicator.y);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 6, 0, Math.PI * 2);
            ctx.fill();
        }

    }, [walls, transform, designElements, currentPoly, mousePos, snapIndicator]);

    
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
        const worldPos = getMouseWorldPos(e);
        const snapThreshold = transform.scale > 0 ? 10 / transform.scale : 0;
        const snappedPos = snapToPoint(worldPos, walls, snapThreshold);
        setMousePos(snappedPos);

        if (snappedPos !== worldPos) {
            setSnapIndicator(snappedPos);
        } else {
            setSnapIndicator(null);
        }
    };

    const handleCanvasClick = (e) => {
        const worldPos = getMouseWorldPos(e);
        const snapThreshold = transform.scale > 0 ? 10 / transform.scale : 0;
        const snappedPos = snapToPoint(worldPos, walls, snapThreshold);

        if (mode === 'draw_room') {
            if (currentPoly.length > 2) {
                const start = currentPoly[0];
                const dist = Math.sqrt((snappedPos.x - start.x) ** 2 + (snappedPos.y - start.y) ** 2);
                if (dist < snapThreshold) { 
                    const newRoom = [...currentPoly];
                    const updatedRooms = [...designElements.rooms, newRoom];
                    setDesignElements(prev => ({ ...prev, rooms: updatedRooms }));
                    setCurrentPoly([]);
                    onUpdateDesign(designElements.doors, updatedRooms, designElements.windows);
                    return;
                }
            }
            setCurrentPoly([...currentPoly, snappedPos]);
        }
        else if (mode === 'door') {
            const newDoors = [...designElements.doors, { x: snappedPos.x, y: snappedPos.y, id: Date.now() }];
            setDesignElements(prev => ({ ...prev, doors: newDoors }));
            onUpdateDesign(newDoors, designElements.rooms, designElements.windows);
        }
        else if (mode === 'window') {
            const newWindows = [...designElements.windows, { x: snappedPos.x, y: snappedPos.y, id: Date.now() }];
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
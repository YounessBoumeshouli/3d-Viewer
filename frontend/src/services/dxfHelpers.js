import { DxfParser } from 'dxf-parser';
import api from "../services/api.js";

export const fetchAndParseWalls = async (filePath) => {
    try {
        
        const response = await api.get(`/files/${filePath}`, {
            responseType: "text",
        });

        
        const processedData = response.data
            .split('\n')
            .filter(line => !line.trim().startsWith('999'))
            .join('\n');

        
        const parser = new DxfParser();
        const parsedDxf = parser.parseSync(processedData);

        
        const walls = [];
        parsedDxf.entities.forEach((entity) => {
            
            if ((entity.type === 'POLYLINE' || entity.type === 'LWPOLYLINE') &&
                entity.vertices && entity.vertices.length >= 2) {

                for (let i = 0; i < entity.vertices.length - 1; i++) {
                    walls.push({
                        start: { x: entity.vertices[i].x, y: entity.vertices[i].y },
                        end: { x: entity.vertices[i + 1].x, y: entity.vertices[i + 1].y }
                    });
                }
            }

            
            if (entity.type === 'LINE' && entity.vertices && entity.vertices.length === 2) {
                walls.push({
                    start: { x: entity.vertices[0].x, y: entity.vertices[0].y },
                    end: { x: entity.vertices[1].x, y: entity.vertices[1].y }
                });
            }
        });

        return walls;
    } catch (error) {
        console.error("Error parsing DXF:", error);
        return [];
    }
};
import { DxfParser } from 'dxf-parser';
import api from "../services/api.js";

export const fetchAndParseWalls = async (filePath) => {
    try {
        // 1. Fetch the raw DXF content
        const response = await api.get(`/files/${filePath}`, {
            responseType: "text",
        });

        // 2. Clean the data (remove 999 comments)
        const processedData = response.data
            .split('\n')
            .filter(line => !line.trim().startsWith('999'))
            .join('\n');

        // 3. Parse with DxfParser
        const parser = new DxfParser();
        const parsedDxf = parser.parseSync(processedData);

        // 4. Extract Walls (Polylines)
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
        });

        return walls;
    } catch (error) {
        console.error("Error parsing DXF:", error);
        return [];
    }
};
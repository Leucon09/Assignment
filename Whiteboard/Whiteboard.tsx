import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { exportToImage, exportToPDF } from '../../services/FileService';

const Whiteboard: React.FC = () => {
  import React, { useEffect } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import socket from '../../services/WebSocketService';

const Whiteboard: React.FC = () => {
  const [lines, setLines] = React.useState<any[]>([]);
  const [isDrawing, setIsDrawing] = React.useState(false);
  const [line, setLine] = React.useState<any>({ points: [] });

  useEffect(() => {
    socket.on('drawing', (data: any) => {
      const newLines = lines.concat([data]);
      setLines(newLines);
    });

    return () => {
      socket.off('drawing');
    };
  }, [lines]);

  const handleMouseDown = (e: any) => {
    setIsDrawing(true);
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLine({
        points: [pos.x, pos.y],
        stroke: 'black',
        strokeWidth: 2,
        lineCap: 'round',
        lineJoin: 'round',
      });
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLine((prev: any) => ({
        ...prev,
        points: [...prev.points, pos.x, pos.y],
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    socket.emit('drawing', line);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {lines.map((line, index) => (
          <Line key={index} {...line} />
        ))}
        <Line {...line} />
      </Layer>
    </Stage>
  );
};

export default Whiteboard;


  const handleExportImage = () => {
    exportToImage('whiteboard-container');
  };

  const handleExportPDF = () => {
    exportToPDF('whiteboard-container');
  };

  return (
    <div id="whiteboard-container">
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {/* Your existing Stage and Layer components */}
      </Stage>
      <button onClick={handleExportImage}>Export as Image</button>
      <button onClick={handleExportPDF}>Export as PDF</button>
    </div>
  );
};

export default Whiteboard;

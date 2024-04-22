class DrawingUtils {
    static drawLine(context: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number) {
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(endX, endY);
      context.stroke();
    }
  
    static clearCanvas(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  
  export default DrawingUtils;
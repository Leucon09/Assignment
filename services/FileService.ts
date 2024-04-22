import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const exportToImage = async (elementId: string) => {
  const canvas = await html2canvas(document.getElementById(elementId) as HTMLElement);
  const imageData = canvas.toDataURL('image/png');
  // Save or download the image data
};

const exportToPDF = async (elementId: string) => {
  const canvas = await html2canvas(document.getElementById(elementId) as HTMLElement);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF();
  pdf.addImage(imgData, 'PNG', 0, 0);
  pdf.save('whiteboard.pdf');
};

export { exportToImage, exportToPDF };

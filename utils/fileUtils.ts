import { GeneratedFile } from '../types';
import JSZip from 'jszip';

export async function downloadAsZip(files: GeneratedFile[], archiveName: string = 'design-system.zip') {
  const zip = new JSZip();

  files.forEach((file) => {
    zip.file(file.fileName, file.content);
  });

  const blob = await zip.generateAsync({ type: 'blob' });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = archiveName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
import { GeneratedFile } from '../types';

export function downloadFile(file: GeneratedFile) {
  const blob = new Blob([file.content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function downloadAllFiles(files: GeneratedFile[]) {
  // In a real app, this would zip the files. 
  // For this environment, we will trigger individual downloads with a slight delay.
  files.forEach((file, index) => {
    setTimeout(() => {
      downloadFile(file);
    }, index * 200);
  });
}
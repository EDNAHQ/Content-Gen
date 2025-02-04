export const createAudioRecorder = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  
  // List of MIME types to try, in order of preference
  const mimeTypes = [
    'audio/mp4',
    'audio/mpeg',
    'audio/mpga',
    'audio/wav',
    'audio/ogg',
    'audio/webm'
  ];

  // Find the first supported MIME type
  const supportedType = mimeTypes.find(type => MediaRecorder.isTypeSupported(type));
  
  if (!supportedType) {
    throw new Error('No supported audio MIME types found');
  }

  console.log('Using MIME type:', supportedType);
  
  return new MediaRecorder(stream, {
    mimeType: supportedType,
    audioBitsPerSecond: 128000 // Setting a reasonable bitrate
  });
};

export const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.readAsDataURL(blob);
  });
};
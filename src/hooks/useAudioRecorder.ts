import { useState, useRef, useCallback } from "react";
import { createAudioRecorder } from "@/utils/audioUtils";
import { toast } from "sonner";

export function useAudioRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const handleDataAvailable = useCallback((e: BlobEvent) => {
    if (e.data.size > 0) {
      chunksRef.current.push(e.data);
      console.log('Audio chunk received:', {
        size: e.data.size,
        type: e.data.type
      });
    }
  }, []);

  const startRecording = async () => {
    try {
      console.log('Requesting microphone access...');
      const mediaRecorder = await createAudioRecorder();
      console.log('Microphone access granted, initializing recorder...');
      
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
      console.log('Recording started with MIME type:', mediaRecorder.mimeType);
      
      setIsRecording(true);
      toast.success("Recording started");
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast.error("Could not access microphone. Please ensure microphone permissions are granted.");
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current || !isRecording) {
      console.error('No active recording to stop');
      return;
    }

    try {
      setIsProcessing(true);
      console.log('Stopping recording...');
      
      return new Promise<{ audioBlob: Blob, mimeType: string }>((resolve) => {
        mediaRecorderRef.current!.onstop = () => {
          const audioBlob = new Blob(chunksRef.current, { 
            type: mediaRecorderRef.current!.mimeType 
          });
          console.log('Recording stopped, created blob:', {
            size: audioBlob.size,
            type: audioBlob.type,
            chunks: chunksRef.current.length
          });
          
          mediaRecorderRef.current!.stream.getTracks().forEach(track => track.stop());
          resolve({
            audioBlob,
            mimeType: mediaRecorderRef.current!.mimeType
          });
        };
        mediaRecorderRef.current!.stop();
        setIsRecording(false);
        toast.success("Recording stopped");
      });
    } catch (error) {
      console.error('Error stopping recording:', error);
      toast.error("Failed to stop recording");
      setIsProcessing(false);
      throw error;
    }
  };

  return {
    isRecording,
    isProcessing,
    setIsProcessing,
    startRecording,
    stopRecording
  };
}
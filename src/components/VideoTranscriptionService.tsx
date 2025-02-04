import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function VideoTranscriptionService() {
  const [isUploading, setIsUploading] = useState(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      toast.error("Please select a video file");
      return;
    }

    try {
      setIsUploading(true);
      setUploadProgress(0);

      // Extract audio from video
      const audioContext = new AudioContext();
      const videoElement = document.createElement('video');
      videoElement.src = URL.createObjectURL(file);

      await new Promise((resolve) => {
        videoElement.onloadedmetadata = () => resolve(null);
      });

      const mediaStream = (videoElement as any).captureStream();
      const mediaStreamSource = audioContext.createMediaStreamSource(mediaStream);
      const mediaStreamDestination = audioContext.createMediaStreamDestination();
      mediaStreamSource.connect(mediaStreamDestination);

      // Play the video (muted) to extract audio
      videoElement.muted = true;
      await videoElement.play();

      // Record the audio stream
      const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        
        // Convert blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          const base64Data = base64Audio.split(',')[1];

          try {
            setUploadProgress(50);
            const { data, error } = await supabase.functions.invoke('transcribe-video', {
              body: { 
                audio: base64Data,
                fileName: file.name
              },
            });

            if (error) throw error;
            
            setUploadProgress(100);
            setTranscription(data.text);
            toast.success("Video transcribed successfully!");
          } catch (error) {
            console.error('Transcription error:', error);
            toast.error("Failed to transcribe video");
          } finally {
            setIsUploading(false);
            setUploadProgress(0);
            // Clean up
            videoElement.pause();
            URL.revokeObjectURL(videoElement.src);
            await audioContext.close();
          }
        };
      };

      // Start recording and let it run for the duration of the video
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
        videoElement.pause();
      }, videoElement.duration * 1000);

    } catch (error) {
      console.error('Error processing video:', error);
      toast.error("Failed to process video");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          className="hidden"
          ref={fileInputRef}
          disabled={isUploading}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full max-w-xs"
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Upload className="w-4 h-4 mr-2" />
          )}
          {isUploading ? "Processing..." : "Upload Video"}
        </Button>
      </div>

      {uploadProgress > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Processing video...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {transcription && (
        <div className="p-4 border rounded-lg bg-muted/50">
          <h3 className="mb-2 text-lg font-semibold">Transcription</h3>
          <p className="whitespace-pre-wrap text-sm">{transcription}</p>
        </div>
      )}
    </div>
  );
}
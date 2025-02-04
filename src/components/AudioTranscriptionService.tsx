import { useAudioRecorder } from "@/hooks/useAudioRecorder";
import { RecordButton } from "@/components/RecordButton";
import { supabase } from "@/integrations/supabase/client";
import { convertBlobToBase64 } from "@/utils/audioUtils";
import { toast } from "sonner";

interface AudioTranscriptionServiceProps {
  onTranscriptionComplete: (text: string) => void;
}

export function AudioTranscriptionService({ onTranscriptionComplete }: AudioTranscriptionServiceProps) {
  const { 
    isRecording, 
    isProcessing, 
    setIsProcessing,
    startRecording, 
    stopRecording 
  } = useAudioRecorder();

  const handleStopRecording = async () => {
    try {
      console.log('Stopping recording...');
      const { audioBlob, mimeType } = await stopRecording();
      
      if (!audioBlob) {
        console.error('No audio blob received after recording');
        toast.error("No audio recorded");
        return;
      }

      console.log('Audio recorded successfully:', {
        size: audioBlob.size,
        type: mimeType
      });

      const base64Audio = await convertBlobToBase64(audioBlob);
      console.log('Audio converted to base64, sending to transcribe function...');
      
      const { data, error } = await supabase.functions.invoke('transcribe-audio', {
        body: { 
          audio: base64Audio,
          mimeType: mimeType
        },
      });

      if (error) {
        console.error('Transcription function error:', error);
        throw error;
      }
      
      if (data?.text) {
        console.log('Transcription received:', data.text);
        onTranscriptionComplete(data.text);
        toast.success("Audio transcribed successfully");
      } else {
        console.error('No transcription text in response:', data);
        throw new Error("No transcription received");
      }
    } catch (error) {
      console.error('Transcription error:', error);
      toast.error("Failed to transcribe audio. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <RecordButton
        isRecording={isRecording}
        isProcessing={isProcessing}
        onStartRecording={startRecording}
        onStopRecording={handleStopRecording}
      />
    </div>
  );
}
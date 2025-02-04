import { VideoTranscriptionService } from "@/components/VideoTranscriptionService";

export default function VideoTranscription() {
  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-2xl font-bold mb-6">Transcribe</h1>
      <div className="max-w-3xl mx-auto">
        <VideoTranscriptionService />
      </div>
    </div>
  );
}
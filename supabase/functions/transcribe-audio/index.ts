import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Map MIME types to OpenAI-supported extensions
const mimeToExtension = {
  'audio/webm': 'webm',
  'audio/ogg': 'ogg',
  'audio/mpeg': 'mp3',
  'audio/mp4': 'mp4',
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
  'audio/mpga': 'mpga',
  'audio/oga': 'oga',
  'audio/flac': 'flac',
  'audio/m4a': 'm4a'
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { audio, mimeType } = await req.json()
    
    if (!audio) {
      throw new Error('No audio data provided')
    }

    console.log('Received audio with MIME type:', mimeType);

    // Get the correct extension for OpenAI
    const extension = mimeToExtension[mimeType as keyof typeof mimeToExtension] || 'mp3';
    console.log('Using file extension:', extension);

    // Convert base64 to binary
    const binaryAudio = Uint8Array.from(atob(audio), c => c.charCodeAt(0))
    
    // Create form data with the actual MIME type from the recorder
    const formData = new FormData()
    
    const audioBlob = new Blob([binaryAudio], { 
      type: mimeType
    })
    
    formData.append('file', audioBlob, `audio.${extension}`)
    formData.append('model', 'whisper-1')

    console.log('Processing audio with format:', mimeType, 'and extension:', extension)
    
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI API error:', errorText)
      throw new Error(`OpenAI API error: ${errorText}`)
    }

    const result = await response.json()
    console.log('Transcription received:', result)

    return new Response(
      JSON.stringify({ text: result.text }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in transcribe-audio function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
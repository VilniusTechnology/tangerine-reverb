const fs = require('fs');
const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();

// const config = {
//     encoding: encoding,
//     sampleRateHertz: sampleRateHertz,
//     languageCode: languageCode,
//   };

  const config = {
    encoding: 'LINEAR16',
    languageCode: `en-US`,
    // audioChannelCount: 2,
    // enableSeparateRecognitionPerChannel: true,
  };

  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file
  client.recognize(request).then(
    (response) => {
        const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');

      console.log(`Transcription: `, transcription);
    }
  );

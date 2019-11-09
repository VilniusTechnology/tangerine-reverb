const MicToSpeech = require('mic-to-speech');
const fs = require('fs');

const speech = require('@google-cloud/speech');

// Creates a client
const client = new speech.SpeechClient();
 
const options = {
    device: 'plug:dsnoop1',
    sampleRateHertz: '16000',
    channels: '1',
};

let micToSpeech = new MicToSpeech(options);
 
micToSpeech.on('speech', function(rawAudio) {
  // create filename
  let now = new Date();
  let filename = (now.getMonth() + 1) + "-" + now.getDate()
    + "-" + now.getFullYear() + ' ' + now.getHours()
    + ':' + now.getMinutes() + ':' + now.getSeconds() + '.raw';
 
    // write to a file and restart speech detection
    fs.writeFile(filename, rawAudio, function() {
        console.log('saved: ' + filename);
        micToSpeech.resume();
    });

    const config = {
        encoding: 'LINEAR16',
        languageCode: `en-US`,
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
});
 
micToSpeech.start();
console.log('Listening for speech');
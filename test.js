var mic = require('mic');
var fs = require('fs');
 
// const config = {
//     rate: 44100,
//     channels: 1,
//     device: '',
//     fileType: 'wav',
// };

const config = {
    rate: '16000',
    channels: '1',
    debug: true,
    device: 'plug:dsnoop1',
    exitOnSilence: 6
};

// arecord –D plughw:1,0 tempX.wav
// arecord -D plughw:1,0 helloworld6699.wav


var micInstance = mic(config);

var micInputStream = micInstance.getAudioStream();
 
var outputFileStream = fs.WriteStream('output.waw');
 
micInputStream.pipe(outputFileStream);
 
micInputStream.on('data', function(data) {
    console.log("Recieved Input Stream: " + data.length);
});
 
micInputStream.on('error', function(err) {
    cosole.log("Error in Input Stream: " + err);
});
 
micInputStream.on('startComplete', function() {
    console.log("Got SIGNAL startComplete will PAUSE");
    setTimeout(function() {
            micInstance.pause();
    }, 5000);
});
    
micInputStream.on('stopComplete', function() {
    console.log("Got SIGNAL stopComplete");
});
    
micInputStream.on('pauseComplete', function() {
    console.log("Got SIGNAL pauseComplete will RESUME");
    setTimeout(function() {
        micInstance.resume();
    }, 5000);
});
 
micInputStream.on('resumeComplete', function() {
    console.log("Got SIGNAL resumeComplete will STOP");
    setTimeout(function() {
        micInstance.stop();
    }, 5000);
});
 
micInputStream.on('silence', function() {
    console.log("Got SIGNAL silence");
});
 
micInputStream.on('processExitComplete', function() {
    console.log("Got SIGNAL processExitComplete");
});
 
micInstance.start();

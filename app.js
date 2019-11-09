// https://apiko.com/blog/how-to-create-home-automation-app-for-clap-detection-with-node-js-and-raspberry-pi/

var mic = require('mic');
var fs = require('fs');
var header = require('waveheader');
var _ = require('lodash');
const WavDecoder = require("wav-decoder");
const axios = require('axios');

const config = {
  rate: 44100,
  channels: 1,
  device: `plug:dsnoop1`,
  fileType: 'wav',
  exitOnSilence: 6,
};

 const baseUrl = 'http://tangerine.local:8081';
 const minTime = 500; // ms
 const threshold = 0.7;
 let time = null;
 let buffers = [];
 const micInstance =  mic(config);
 const stream = micInstance.getAudioStream();
 
 stream.on('silence', () => {
    console.log("Got SIGNAL silence");

    axios.get(`${baseUrl}/led/effects/play/1`)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          }); 
});

 stream.on('data', buffer => {
    console.log(`got data`);

    // const newTime = new Date().getTime(); // -> get new time
    // buffers.push(buffer); // -> save previous recorded data

    // const diff = newTime - time;
    // const eval = ( diff > minTime);
    // console.log(`${diff} > ${minTime} = ${eval}`);

    // if (eval) { // -> start do something if min time pass
    //     const headerBuf = header(config.rate, config); // ->  create wav header
    //     buffers.unshift(headerBuf); // -> set header in top of buffers
    //     const length = _.sum(buffers.map(b => b.length));
     
    //     WavDecoder.decode(Buffer.concat(buffers, length)) // -> decode buffers to float array
    //         .then(audioData => {
    //             const wave = audioData.channelData[0];
    //             const maxAmplitude = _.max(wave);

    //             if (maxAmplitude > threshold) {
    //             console.log('-----> clap'); // -> any logic here

    //             axios.get(`${baseUrl}/led/effects/play/1`)
    //             .then(function (response) {
    //                 console.log(response.data);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });  

    //             }
    //         })
    //         .catch(console.log);
     
    //     time = newTime; // -> reset the timer
    //     buffers = []; // free recorded data
    // }
 });
 
 time = new Date().getTime();
 micInstance.start();

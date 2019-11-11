// import ClapDetector from 'clap-detector'

var cld = require("clap-detector").default;
const axios = require('axios');
 
var CONFIG = {
    AUDIO_SOURCE: 'alsa plug:dsnoop1', // this is your microphone input. If you dont know it you can refer to this thread (http://www.voxforge.org/home/docs/faq/faq/linux-how-to-determine-your-audio-cards-or-usb-mics-maximum-sampling-rate)
    DETECTION_PERCENTAGE_START : '3%', // minimum noise percentage threshold necessary to start recording sound
    DETECTION_PERCENTAGE_END: '3%',  // minimum noise percentage threshold necessary to stop recording sound
    CLAP_AMPLITUDE_THRESHOLD: 0.085, // minimum amplitude threshold to be considered as clap
    CLAP_ENERGY_THRESHOLD: 0.1,  // maximum energy threshold to be considered as clap
    MAX_HISTORY_LENGTH: 10 // all claps are stored in history, this is its max length
}

const baseUrl = 'http://tangerine.local:8081';

const clap = new cld(CONFIG);
 
clap.addClapsListener(claps => {
  console.log("change tv channel")

}, { number: 1, delay: 0 })
 
clap.addClapsListener(claps => {
    console.log("change tv channel")
  }, { number: 1, delay: 0 })

clap.addClapsListener(claps => {
  console.log("turn tv on", claps)
}, { number: 2, delay: 1200 })
 
clap.addClapsListener(claps => {
  console.log("ZALIA BALTA BUS !!!", claps);

  axios.get(`${baseUrl}/led/effects/play/1`)
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

}, { number: 3, delay: 1900 })
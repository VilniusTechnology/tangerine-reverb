var gpio = require("gpio");

var gpio4 = gpio.export(17, {
    direction: gpio.DIRECTION.IN,
    ready: () => {
        console.log('Console LOG READI');
    }
 });

// bind to the "change" event
gpio4.on("change", function(val) {
   // value will report either 1 or 0 (number) when the value changes
   console.log(val)
});
      
// you can bind multiple events
var processPin4 = function(val) { console.log(val); };
gpio4.on("change", processPin4);

// var Gpio = require('onoff').Gpio;


// var inputPin = new Gpio(11, 'in', 'both'); //declare GPIO4 an output

// inputPin.watch( (err, value) => {
//     if (err) { //if an error
//       console.error('There was an error', err);
//         return;
//     }

//     console.log(value);
// });
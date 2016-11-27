var cmd=require('node-cmd');
// HomeKit types required
var types = require("./types.js")
var exports = module.exports = {};

var execute = function(accessory,characteristic,value){ console.log("executed accessory: " + accessory + ", and characteristic: " + characteristic + ", with value: " +  value + "."); }

exports.accessory = {
  displayName: "LEDLight",
  username: "1A:2B:3C:4D:5E:FF",
  pincode: "012-34-567",
  services: [{
    sType: types.ACCESSORY_INFORMATION_STYPE,
    characteristics: [{
    	cType: types.NAME_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "LEDLight",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "BlaBla...",
		designedMaxLength: 255
    },{
    	cType: types.MANUFACTURER_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "ESC",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "BlaBla...",
		designedMaxLength: 255
    },{
    	cType: types.MODEL_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "V1.0",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "BlaBla..",
		designedMaxLength: 255
    },{
    	cType: types.SERIAL_NUMBER_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "01R0E0Z0A00W",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "BlaBla..",
		designedMaxLength: 255
    },{
    	cType: types.IDENTIFY_CTYPE,
    	onUpdate: null,
    	perms: ["pw"],
		format: "bool",
		initialValue: false,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Identify Accessory...",
		designedMaxLength: 1
    }]
  },{
    sType: types.LIGHTBULB_STYPE,
    characteristics: [{
    	cType: types.NAME_CTYPE,
    	onUpdate: null,
    	perms: ["pr"],
		format: "string",
		initialValue: "LEDLight 1 Light Service",
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "BlaBla..",
		designedMaxLength: 255
    },{
    	cType: types.POWER_STATE_CTYPE,
    	onUpdate: function(value)
	{
    		console.log("Change:",value);
    		if (value) {
			cmd.run('sudo python /home/pi/HAP-NodeJS/python/light1.py');
          		console.log("On Success!");
    		} else {
        		cmd.run('sudo python /home/pi/HAP-NodeJS/python/light0.py');
        		console.log("Off Success!");
    		}
    	},
    	perms: ["pw","pr","ev"],
		format: "bool",
		initialValue: false,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Turn On the Light",
		designedMaxLength: 1
    },{
    	cType: types.HUE_CTYPE,
    	onUpdate: function(value) { console.log("Change:",value); execute("Test Accessory 1", "Light - Hue", value); },
    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Doesn’t actually adjust Hue of Light",
		designedMinValue: 0,
		designedMaxValue: 360,
		designedMinStep: 1,
		unit: "arcdegrees"
    },{
    	cType: types.BRIGHTNESS_CTYPE,
    	onUpdate: function(value) { console.log("Change:",value); execute("Test Accessory 1", "Light - Brightness", value); },
    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Doesn’t actually adjust Brightness of Light",
		designedMinValue: 0,
		designedMaxValue: 100,
		designedMinStep: 1,
		unit: "%"
    },{
    	cType: types.SATURATION_CTYPE,
    	onUpdate: function(value) { console.log("Change:",value); execute("Test Accessory 1", "Light - Saturation", value); },
    	perms: ["pw","pr","ev"],
		format: "int",
		initialValue: 0,
		supportEvents: false,
		supportBonjour: false,
		manfDescription: "Doesn’t actually adjust Saturation of Light",
		designedMinValue: 0,
		designedMaxValue: 100,
		designedMinStep: 1,
		unit: "%"
    }]
  }]
}

const config={
	"ignore": [
	  "^./node_modules"
	],
	"presets": [
		["@babel/preset-env", {
			"loose": true,
			"modules": false,
			"debug": false,
		}]
	],
};
module.exports=config;
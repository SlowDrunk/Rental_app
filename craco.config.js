const path = require("path");
module.exports = {
	webpack: {
		alias: {
			"@": path.join(__dirname, "./src"),
		},
	},
	style: {
		postcssOptions: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
};

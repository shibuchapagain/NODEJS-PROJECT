1. Setting Environments
npm init -y
npm install express
npm install ejs
npm install -D nodemon

package.json
"type":"module",
"main":"app.js",
"script":{
	"dev":"nodemon app"
},

import express from 'express';
cost app = express();
cost port = process.env.PORT || '8000'

app.listen(port, ()=>{
	console.log(`Listening at http://127.0.0.1:${port}`);
});

2. Creating Project Strucrures
controllers
	homeController.js	

views
	home.ejs
	

routers
	web.js

public
	css
	images
	js
app.js
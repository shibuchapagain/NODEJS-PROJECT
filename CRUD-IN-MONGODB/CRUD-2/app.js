import express from 'express';
const app = express();
const port = process.env.PORT || '8000';
import web from './routes/web.js';

app.set('view engine', 'ejs');
app.use('/', web);

app.listen(port, ()=>{
	console.log(`Listening at http://127.0.0.1:${port}`);
});
const express = require('express');
const app = express();
const basicAuth = require('express-basic-auth');

let status = true;

app.get('/api/status', (req, res, next) => {
	if (
		req.query.password === process.env.PASSWORD &&
		req.query.user === process.env.USER
	) {
		res.send(String(status));
	} else {
		next();
	}
});

function unauthorizedResponse(req) {
	return req.auth
		? 'Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
		: 'No credentials provided';
}

app.use(
	basicAuth({
		users: { [process.env.USER]: process.env.PASSWORD },
		challenge: true,
		unauthorizedResponse
	})
);

app.get('/api/status', (req, res) => res.send(String(status)));

app.get('/api/disable', (req, res) => {
	status = false;
	res.send('successfully disabled');
});

app.get('/api/enable', (req, res) => {
	status = true;
	res.send('successfully enabled');
});

app.get('/', (req, res) => {
	res.send(`
		Current Status: ${String(status)}
		<form action="/api/enable">
			<button>Enable</button>
		</form><br/><br/>
		<form action='/api/disable'>
			<button>Disable</button>
		</form>
	`);
});

module.exports = app;

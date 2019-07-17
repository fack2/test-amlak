const http = require('http');
const router = require('./router');

const server = http.createServer(router);
const PORT = 4000;

server.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}. Ready to accept requests!`);
});

console.log('server running on:' + PORT);

'use strict';
var Hapi, server;

// require dependencies
Hapi = require('hapi');

// create server
server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

// define routes
server.route({
	method: 'GET',
	path: '/',
	handler: function getHomeRoute(request, reply) {
		reply('Hello, World!');
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function getNameRoute(request, reply) {
		reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
	}
});

// start server
server.start(function startHapiServer() {
	console.log('Server running at:' + server.info.uri);
});

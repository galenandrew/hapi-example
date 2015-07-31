'use strict';
var Hapi, server, Good;

// require dependencies
Hapi = require('hapi');
Good = require('good');

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

// set up plugins
server.register({
	register: Good,
	options: {
		reporters: [{
			reporter: require('good-console'),
			events: {
				response: '*',
				log: '*'
			}
		}]
	}
}, function serverPluginCallback(err) {
	if(err) {
		throw err;
	}

	// start server
	server.start(function startHapiServer() {
		server.log('info', 'Server running at:' + server.info.uri);
	});
});

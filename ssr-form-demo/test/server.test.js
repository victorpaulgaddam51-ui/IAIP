const test = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { createServer } = require('node:http');
const app = require('../server');

function startServer() {
  const server = createServer(app);
  server.listen(0);
  return server;
}

test('GET / renders the form page', async () => {
  const server = startServer();
  await once(server, 'listening');
  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/`);
  const body = await response.text();
  assert.equal(response.status, 200);
  assert.match(body, /Welcome to the server-side demo/i);
  server.close();
});

test('POST /submit renders a personalized result', async () => {
  const server = startServer();
  await once(server, 'listening');
  const address = server.address();
  const response = await fetch(`http://127.0.0.1:${address.port}/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'name=Alex&email=alex@example.com'
  });
  const body = await response.text();
  assert.equal(response.status, 200);
  assert.match(body, /Alex/i);
  assert.match(body, /alex@example.com/i);
  server.close();
});

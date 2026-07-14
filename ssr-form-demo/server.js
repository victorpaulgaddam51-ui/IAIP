const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Server-Side Demo',
    message: 'Welcome to the server-side demo.'
  });
});

app.post('/submit', (req, res) => {
  const { name, email } = req.body;

  res.render('result', {
    title: 'Submission Result',
    name: name || 'Guest',
    email: email || 'No email provided'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;

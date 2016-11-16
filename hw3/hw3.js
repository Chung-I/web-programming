const express = require('express');

const app = express();

const path = require('path');

const bodyParser = require('body-parser');

const nunjucks = require('nunjucks');

app.set('views', path.join(__dirname, 'views')); // view engine setup
app.set('view engine', 'nunjucks');
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});


app.get('/', (req, res) => {
  res.render('index', { title: '首頁' });
});

app.get('/api/query', (req, res) => {
  res.json(req.query);
});

app.get('/api/users/:id', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'Joe',
      age: 18,
    },
    {
      id: 2,
      name: 'John',
      age: 22,
    }];
  res.json(users[req.params.id - 1]);
});

app.post('/api/body', (req, res) => {
  res.send(JSON.stringify(req.body));
});

app.use('/static', express.static('public'));
app.use((req, res) => {
  res.send('404');
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3001);

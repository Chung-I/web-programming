import { Router } from 'express';

const router = new Router();
const data = {
  users: [
  { avatar: 'http://xxx.com', name: 'John', age: 23 },
  { avatar: 'http://xxx.com', name: 'Amy', age: 18 },
  ]
};

// Write your restful api here:
router.get('/', (req, res) => {
  res.render('index', { title: '首頁' });
});

router.get('/users', (req, res) => {
  res.json(data.users);
});

router.get('/users/:id', (req, res) => {
  res.json(data.users[req.params.id - 1]);
});

router.use((req, res) => {
  res.send('404');
});

export default router;

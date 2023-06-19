export default function handler(req, res) {
  console.log('req',req.body)
  res.status(200) //.json({ text: 'Hello' });
  res.redirect('/main');
  }
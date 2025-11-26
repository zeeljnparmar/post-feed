const app = require('./app');
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Social Post Module listening on http://localhost:${PORT}`);
});

import app from './app';

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${port}`);
});

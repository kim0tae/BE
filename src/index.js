import express from 'express';

const app = express();
const PORT = 6666;

app.listen(PORT, () => {
  console.log(`Server Info : http://localhost:${PORT}`);
});

export default app;

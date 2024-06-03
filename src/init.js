import 'dotenv/config';
import app from './server.js';

const PORT = 8000;

const handleListening = () => {
  console.log(`✅ Server Info : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

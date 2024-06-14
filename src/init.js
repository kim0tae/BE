import 'dotenv/config';
import './db.js';
import app from './server.js';

const PORT = 8000;

const handleListening = () => {
  console.log(`✅ Server Info : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

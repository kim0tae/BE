import 'dotenv/config';
import app from './server.js';

const PORT = 6666;

const handleListening = () => {
  console.log(`✅ Server Info : http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);

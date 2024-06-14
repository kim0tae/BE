import mongoose from 'mongoose';

const dbURI = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(dbURI);

const db = mongoose.connection;
const handleOpen = () => console.log('✅ Connected to DB');
const handleError = (error) => console.log('❌ DB Error', error);

db.on('error', handleError);
db.once('open', handleOpen);

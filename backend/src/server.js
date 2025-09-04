import "dotenv/config";
import {connectDB} from './config/db.js'
import { app } from './app.js';

connectDB();

const PORT = process.env.PORT || 0;
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${server.address().port}`);
});
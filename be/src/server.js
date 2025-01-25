const app = require('./app');
const connectDB = require('./config/db');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
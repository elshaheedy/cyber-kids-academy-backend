const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');
const quizzesRouter = require('./routes/quizzes');

app.use('/users', usersRouter);
app.use('/courses', coursesRouter);
app.use('/quizzes', quizzesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

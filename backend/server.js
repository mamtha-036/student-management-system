const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tables synced successfully.');
  })
  .catch(err => {
    console.log('Sync error:', err);
  });

// TEST ROUTE
app.get('/test', (req, res) => {
  res.send('Test OK');
});

// AUTH ROUTES
app.use('/auth', authRoutes);

// STUDENT ROUTES
const studentRoutes = require('./routes/student.routes');
app.use('/students', studentRoutes);

// COURSE ROUTES
const courseRoutes = require('./routes/course.routes');
app.use('/courses', courseRoutes);

// ENROLLMENT ROUTES
const enrollmentRoutes = require('./routes/enrollment.routes');
app.use('/enrollments', enrollmentRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000.');
});





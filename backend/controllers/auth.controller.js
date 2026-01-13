const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {

  register: async (req, res) => {
    try {
      const { username, password, role } = req.body;

      const password_hash = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        password_hash,
        role
      });

      return res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ where: { username } });

      if (!user) return res.status(404).json({ message: 'User not found' });

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign(
        { user_id: user.user_id, role: user.role },
        'SECRETKEY',
        { expiresIn: '1h' }
      );

      return res.json({ message: 'Login successful', token });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

};




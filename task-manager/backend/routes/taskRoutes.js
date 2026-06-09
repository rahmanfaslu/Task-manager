const express = require('express');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

const router = express.Router();
router.use(protect);

router.get('/', async (req, res) => {
  try {
   
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});
 
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    const task = new Task({
      title,
      description,
      userId: req.userId,
    });
 
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task' });
  }
});
 
router.put('/:id', async (req, res) => {
  try {
    const { title, description, status } = req.body;
 
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, status },
      { new: true } 
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;

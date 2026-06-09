import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskCard from '../components/TaskCard.jsx';
import { getToken, getUserName } from '../utils/auth';

const API_URL = 'http://localhost:5000';

function Dashboard() { 
  const [tasks, setTasks] = useState([]); 
  const [showForm, setShowForm] = useState(false); 
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
 
  const userName = getUserName();
 
  useEffect(() => {
    const token = getToken();
 
    if (!token) {
      navigate('/login');
      return;
    }
 
    fetchTasks();
  }, [navigate]);
 
  const fetchTasks = async () => {
    try {
      const token = getToken();
      const res = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };
 
  const handleTaskAdded = (newTask) => {
    setTasks([newTask, ...tasks]);
  };
 
  const handleDelete = async (taskId) => {
    try {
      const token = getToken();
      await axios.delete(`${API_URL}/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      }); 
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };
 
  const handleToggle = async (taskId, currentStatus) => {
    try {
      const token = getToken();
      const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
      const res = await axios.put(
        `${API_URL}/api/tasks/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update the task in the list
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };
 
  const handleEdit = async (taskId, updatedData) => {
    try {
      const token = getToken();
      const res = await axios.put(
        `${API_URL}/api/tasks/${taskId}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update the task in the list
      setTasks(tasks.map((task) => (task._id === taskId ? res.data : task)));
    } catch (err) {
      console.error('Error editing task:', err);
    }
  };
 
  const pendingCount = tasks.filter((t) => t.status === 'pending').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-3xl mx-auto pt-8 px-4 pb-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, <span className="text-blue-600">{userName}</span>
          </h2>
          <p className="text-gray-500 mt-1">Here's an overview of your tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
            <p className="text-sm text-gray-500">Total Tasks</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">{pendingCount}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
            <p className="text-2xl font-bold text-green-500">{completedCount}</p>
            <p className="text-sm text-gray-500">Completed</p>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Your Tasks</h3>
          <button
            id="add-task-button"
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition flex items-center gap-2"
          >
            {showForm ? (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </>
            )}
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <TaskForm
            onTaskAdded={handleTaskAdded}
            onClose={() => setShowForm(false)}
          />
        )}

        {/* Task List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 mt-3">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500 text-lg">No tasks yet</p>
            <p className="text-gray-400 text-sm mt-1">Click "Add Task" to create your first task</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={handleDelete}
                onToggle={handleToggle}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:5000';

function TaskForm({ onTaskAdded, onClose }) { 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = getToken();

      const res = await axios.post(
        `${API_URL}/api/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onTaskAdded(res.data);

      // Close the form
      onClose();
    } catch (err) {
      setError('Failed to create task. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Create New Task</h3>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-4 text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Task Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Task Title
          </label>
          <input
            id="task-title-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="What needs to be done?"
            required
          />
        </div>

        {/* Task Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description (optional)
          </label>
          <textarea
            id="task-description-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-2.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            placeholder="Add some details..."
            rows={3}
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3">
          <button
            id="task-submit-button"
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 focus:outline-none transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;

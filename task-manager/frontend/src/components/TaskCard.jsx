import { useState } from 'react';

function TaskCard({ task, onDelete, onToggle, onEdit }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    onEdit(task._id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const isCompleted = task.status === 'completed';

  return (
    <div className={`bg-white rounded-xl shadow-sm border p-4 transition hover:shadow-md ${
      isCompleted ? 'border-green-200 bg-green-50/30' : 'border-gray-100'
    }`}>
      {isEditing ? ( 
        <div className="space-y-3">
          <input
            id={`edit-title-${task._id}`}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
            placeholder="Task title"
          />
          <textarea
            id={`edit-description-${task._id}`}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm"
            placeholder="Description"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-gray-500 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : ( 
        <div>
          {/* Title and Status */}
          <div className="flex items-start justify-between mb-2">
            <h4 className={`font-semibold text-gray-800 ${isCompleted ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h4>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                isCompleted
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {isCompleted ? '✓ Completed' : '⏳ Pending'}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`text-sm mb-3 ${isCompleted ? 'text-gray-400' : 'text-gray-500'}`}>
              {task.description}
            </p>
          )}

          {/* Action */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
            {/* Toggle*/}
            <button
              id={`toggle-${task._id}`}
              onClick={() => onToggle(task._id, task.status)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                isCompleted
                  ? 'bg-yellow-400 text-white hover:bg-yellow-500'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isCompleted ? 'Mark Pending' : 'Mark Complete'}
            </button>

            {/* Edit  */}
            <button
              id={`edit-${task._id}`}
              onClick={() => setIsEditing(true)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            >
              Edit
            </button>

            {/* Delete */}
            <button
              id={`delete-${task._id}`}
              onClick={() => onDelete(task._id)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition ml-auto"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;

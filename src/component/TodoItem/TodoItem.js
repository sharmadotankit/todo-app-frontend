import React, { useState } from 'react';
import './TodoItem.scss';

const TodoItem = ({ todo, onEdit, onComplete, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(todo._id, editedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div  style={{display:'flex'}}>
          <div className="text-container">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="form-control"
            />
          </div>
          
          <button onClick={handleSave} className="btn btn-success edit-btn">
            Save
          </button>
          <button onClick={handleCancel} className="btn btn-secondary edit-btn">
            Cancel
          </button>
        </div>
      ) : (
        <div className="text-container">
          <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
            {todo.text}
          </span>
        </div>
      )}

      <div>
        {!isEditing && (
          <>
            <button onClick={() => onComplete(todo._id)} className="btn btn-primary complete-btn">
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={handleEdit} className="btn btn-warning edit-btn">
              Edit
            </button>
            <button onClick={() => onDelete(todo._id)} className="btn btn-danger delete-btn">
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;

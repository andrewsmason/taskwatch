import React, { useState, useRef, useEffect } from 'react';
import './TaskManager.css';

function TaskManager({ isDarkMode }) {
  const [task, setTask] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef(null);
  const displayRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      adjustWidth(inputRef.current);
    } else if (!isEditing && displayRef.current) {
      adjustWidth(displayRef.current);
    }
  }, [isEditing, task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setIsEditing(false);
    }
  };

  const handleEdit = (e) => {
    if (e.target.type !== 'checkbox') {
      setIsEditing(true);
      setIsCompleted(false);
    }
  };

  const toggleComplete = (e) => {
    e.stopPropagation();
    setIsCompleted(!isCompleted);
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
    adjustWidth(e.target);
  };

  const adjustWidth = (element) => {
    if (element) {
      const maxWidth = 420; // Reverted back to 420px
      element.style.width = 'auto';
      const newWidth = Math.min(element.scrollWidth, maxWidth);
      element.style.width = `${newWidth}px`;
      if (formRef.current) {
        formRef.current.style.width = `${newWidth}px`;
      }
    }
  };

  return (
    <div className={`task-manager ${isDarkMode ? 'dark' : 'light'}`}>
      <form ref={formRef} onSubmit={handleSubmit}>
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Enter a task"
          />
        ) : (
          <div ref={displayRef} className="task-display" onClick={handleEdit}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={toggleComplete}
              onClick={(e) => e.stopPropagation()}
            />
            <span className={isCompleted ? 'completed' : ''}>{task}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default TaskManager;

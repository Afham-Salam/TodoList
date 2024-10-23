import React, { useState } from "react";

export default function TodoList() {
  const [tasks, setTasks] = useState([]); // Store tasks
  const [newTask, setNewTask] = useState(""); // Input data for adding tasks
  const [editIndex, setEditIndex] = useState(null); // Track which task is being edited
  const [editTask, setEditTask] = useState(""); // Temporary state for editing a task

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear the input after adding
    }
  };

  // Handle input for adding tasks
  const handleInput = (e) => {
    setNewTask(e.target.value);
  };

  // Delete task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Enable edit mode for a specific task
  const enableEdit = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index]);
  };

  // Save the edited task
  const saveEdit = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? editTask : task
    );
    setTasks(updatedTasks);
    setEditIndex(null); // Exit edit mode after saving
  };

  // Handle input for editing a task
  const handleEditInput = (e) => {
    setEditTask(e.target.value);
  };

  return (
    <div className="flex justify-center">
      <div className="w-[500px] shadow-lg m-4">
        <h1 className="text-center text-3xl font-bold mb-10">Todo List</h1>

        {/* Input for adding tasks */}
        <div className="flex gap-4 justify-center items-center">
          <input
            type="text"
            placeholder="Add Task"
            className="border-2 border-black w-64 h-10 p-3"
            value={newTask}
            onChange={handleInput}
          />
          <button
            className="bg-blue-800 text-white w-28 h-10"
            onClick={addTask}
          >
            Add Task
          </button>
        </div>

        {/* Display tasks */}
        <ul className="flex flex-col gap-2 mt-5">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center  shadow-xl pl-4 m-2 border-2"
            >
              {/* Edit mode */}
              {editIndex === index ? (
                <input
                  type="text"
                  className="border-2 border-black w-64 h-10 p-3"
                  value={editTask}
                  onChange={handleEditInput}
                />
              ) : (
                <span>{task}</span> // Display task
              )}

              {/* Action buttons */}
              <div className="flex gap-2">
                {/* Toggle between Save and Edit button */}
                {editIndex === index ? (
                  <button
                    className="bg-green-500 text-white px-2 py-1"
                    onClick={() => saveEdit(index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="bg-yellow-500 text-white px-2 py-1"
                    onClick={() => enableEdit(index)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

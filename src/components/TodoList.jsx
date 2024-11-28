import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

const TodoList = ({ todos, delTodo, update_todo, complete_todo }) => {
  const [editingTodo, setEditingTodo] = useState(null); // Stores the todo being edited

  // Function to handle editing
  const handleEdit = (todo) => {
    setEditingTodo(todo); // Set the todo to be edited
  };

  // Function to handle update submission
  const handleUpdate = (e) => {
    e.preventDefault();
    update_todo(e, editingTodo.id, editingTodo.task);
    setEditingTodo(null); // Close the modal
  };

  return (
    <>
      <div className="todo-list">
        {todos.map((todo) => (
          <div className="todo-list-item" key={todo.id}>
            <div className="task">
              <input
                type="checkbox"
                checked={todo.status === "Completed"}
                onChange={(e) => complete_todo(e, todo.id)}
              />
              <p
                id="t_task"
                className={todo.status === "Completed" ? "strike" : ""}
              >
                {todo.task}
              </p>
            </div>
            <div className="btn-container">
              <button className="edit">
                <TbEdit size={15} onClick={() => handleEdit(todo)} />
              </button>
              <button className="del">
                <AiFillDelete size={15} onClick={() => delTodo(todo.id)} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Section */}
      {editingTodo && (
        <div className="modal-container">
          <div className="modal">
            <h1>Update Todo</h1>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Update Task"
                value={editingTodo.task}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, task: e.target.value })
                }
                required
              />
              <button type="submit" id="add">
                Update
              </button>
            </form>
            <button
              className="cancel mod-btn"
              onClick={() => setEditingTodo(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;

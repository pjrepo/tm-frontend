import React, { useEffect, useState } from "react";
import "./Home.css";
import { AiOutlineEnter, AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { API_ENDPOINT } from "../../utils/apiendpoint";

const Home = () => {
  const [newTask, setNewTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [editTodoData, setEditTodoData] = useState("");
  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);

  const changeHandler = (event) => setNewTask(event.target.value);

  const enterHandler = async (event) => {
    event.preventDefault();
    const enteredTask = event.target.value.trim();
    if (!enteredTask && event.key === "Enter") {
    } else {
      if (event.key === "Enter") {
        try {
          if (!editTodoData) {
            await axios.post("/api/tasks", { title: newTask });
          } else {
            await axios.put(`api/tasks/${editTodoData._id}`, {
              title: newTask,
            });
          }
          setNewTask("");
          setEditTodoData("");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/api/tasks`);
      if (active) {
        const activeData = data.filter((task) => task.completed === false);
        setTaskList(activeData);
      } else if (inactive) {
        const inactiveData = data.filter((task) => task.completed === true);
        setTaskList(inactiveData);
      } else {
        setTaskList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allTasksHandler = () => {
    setActive(false);
    setInactive(false);
    getTasks();
  };

  const pendingTasksHandler = () => {
    setActive(true);
    setInactive(false);
    getTasks();
  };

  const completedTasksHandler = () => {
    setActive(false);
    setInactive(true);
    getTasks();
  };

  useEffect(() => {
    getTasks();
  }, [newTask, checked, active, inactive]);

  const clearAllHandler = async () => {
    try {
      await axios.delete("/api/tasks");
      setTaskList([]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkBoxHandler = async (event, id) => {
    setChecked(event.target.checked);
    try {
      await axios.put(`api/tasks/status/${id}`, {
        completed: event.target.checked,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (todoData) => {
    setNewTask(todoData.title);
    setEditTodoData(todoData);
  };

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="task-input">
        <AiOutlineEnter className="enter-icon" />
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={changeHandler}
          onKeyUp={enterHandler}
        />
      </div>
      <div className="controls">
        <div className="filters">
          <span
            className={!active && !inactive ? "active" : ""}
            onClick={allTasksHandler}
          >
            All
          </span>
          <span
            className={active ? "active" : ""}
            onClick={pendingTasksHandler}
          >
            Pending
          </span>
          <span
            className={inactive ? "active" : ""}
            onClick={completedTasksHandler}
          >
            Completed
          </span>
        </div>
        <button type="button" className="clear-btn" onClick={clearAllHandler}>
          Clear All
        </button>
      </div>
      <ul className="task-box overflow">
        {taskList.length > 0
          ? taskList.map((task) => {
              const { _id, title, completed } = task;
              return (
                <li key={_id} className="task">
                  <label htmlFor={_id}>
                    <input
                      type="checkbox"
                      onChange={(event) => checkBoxHandler(event, _id)}
                      checked={completed ? "checked" : ""}
                    />
                    <p className={completed ? "check" : ""}>{title}</p>
                  </label>
                  <div className="settings">
                    <AiFillEdit
                      className="edit-icon"
                      onClick={() => editHandler(task)}
                    />
                    <AiFillDelete
                      className="delete-icon"
                      onClick={() => deleteHandler(_id)}
                    />
                  </div>
                </li>
              );
            })
          : "No tasks available"}
      </ul>
    </div>
  );
};

export default Home;

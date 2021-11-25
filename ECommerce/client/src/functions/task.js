import axios from "axios";

export const createTask = async (task, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API}/task`, task, {
    headers: { authtoken },
  });

export const getTasks = async () =>
  await axios.get(`${process.env.REACT_APP_API}/tasks`);

export const getTaskByTitle = async (title) =>
  await axios.get(`${process.env.REACT_APP_API}/tasks/${title}`);

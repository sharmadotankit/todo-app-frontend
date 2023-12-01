import axios from "axios";
const backendUrl = process.env.REACT_APP_API_ENDPOINT;

export const connectToServer = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get(`${backendUrl}/connect-to-server`);
      resolve(response);
    } catch (err) {
      reject(err);
    }
  });
};

export const addTodo = async(token, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let header = {
        Authorization: `Bearer ${JSON.parse(token)}`,
        "Content-Type": "application/json",
      };
      let response = await axios.post(
        `${backendUrl}/user/add-todo`,
        data,
        { headers: header }
      );
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
};

export const editTodo = async(token, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let header = {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        };
        let response = await axios.put(
          `${backendUrl}/user/edit-todo`,
          data,
          { headers: header }
        );
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  };

  export const deleteTodo = async(token, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let header = {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        };
        let response = await axios.delete(
          `${backendUrl}/user/delete-todo/${data}`,
          { headers: header }
        );
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  };


  export const completeTodo = async(token, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let header = {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        };
        let response = await axios.put(
          `${backendUrl}/user/complete-todo`,
          data,
          { headers: header }
        );
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  };

  export const fetchTodoForUser = async(token,id) =>{
    return new Promise(async (resolve, reject) => {
      try {
        let header = {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "application/json",
        };
        let response = await axios.get(
          `${backendUrl}/user/fetch-todo-user/${id}`,
          { headers: header }
        );
        resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  }
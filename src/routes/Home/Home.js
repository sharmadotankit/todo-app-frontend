import React, { useContext, useState } from "react";
import useDocumentTitle from "../../utils/helper/useDocumentTitle";
import { ApplicationContext } from "../../context/context";
import { Button, FormControl } from "react-bootstrap";
import { addTodo } from "../../utils/actions/allActions";
import { toast } from "react-toastify";

export default function Home() {
  useDocumentTitle("Home");
  const { currentUser, todos, setTodos } = useContext(ApplicationContext);
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [todo, setTodo] = useState("");

  console.log("token", isLoggedIn);

  const handleValueChange = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmitClick = async () => {
    if (!todo) {
      toast.error("Please enter todo");
      return;
    }
    const response = await addTodo(token, todo);
    console.log("respseon", response);
    let localTodo = [...todos];
    localTodo.push(todo);
    setTodos(localTodo);
  };

  return (
    <div className="todo-container">
      {isLoggedIn == "false" ? (
        <div className="">
          <h1> Please login to use the Todo application</h1>

        </div>
      ) : (
        <>
          <div className="todo-wrapper">
            <FormControl
              type="text"
              value={todo}
              onChange={handleValueChange}
              placeholder="Enter todo"
            />
            <p></p>
            <Button onClick={handleSubmitClick}>Submit</Button>
          </div>
        </>
      )}
    </div>
  );
}

import React, { useContext, useEffect, useMemo, useState } from "react";
import useDocumentTitle from "../../utils/helper/useDocumentTitle";
import { ApplicationContext } from "../../context/context";
import { Button, FormControl } from "react-bootstrap";
import { toast } from "react-toastify";
import TodoItem from "../../component/TodoItem/TodoItem";
import { addTodo,editTodo,deleteTodo,completeTodo,fetchTodoForUser } from "../../utils/actions/allActions";
import {useNavigate} from "react-router-dom";

export default function Home() {
  useDocumentTitle("Home");
  const { currentUser, todos, setTodos } = useContext(ApplicationContext);
  const token = localStorage.getItem("token");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const [todo, setTodo] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{

    const fetchData = async()=>{
      try{
        if(!currentUser._id){
          navigate('/login')
        }else{
          const response =  await fetchTodoForUser(token,currentUser._id);
          if(response.status){
            setTodos(response.data)
          }
        }
        
      }catch(err){
        toast.error("Something went wrong")
      }
      
    }
    fetchData();
  },[])

  const filteredTodos = useMemo(() => {
    if (showCompleted) {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos.filter((todo) => !todo.completed);
    }
  }, [todos, showCompleted]);


  const handleValueChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = async() => {
    try{
      const newTodo = {text:todo, completed: false,userId:currentUser._id };
      const response  = await addTodo(token,newTodo);
      if(response.status){
        toast.success("Todo added successfully")
        setTodos([...todos, response.data]);
      }
    }catch(err){
      toast.error("Something went wrong")
    }
  };

  const handleEditTodo = async(id, newText) => {
    try{
      const data = {
        id,
        newText,
      }
      const response  = await editTodo(token,data);
      if(response.status){
        const updatedTodos = todos.map((todo) =>
          todo._id === id ? { ...todo, text: newText } : todo
        );
        setTodos(updatedTodos);
        toast.success("Todo edited successfully")
      } 
    }catch(err){
      toast.error("Something went wrong")
    }
    
  };

  const toggleComplete = async(id) => {
    try{
      let data ={
        id,
      }
      const response = await completeTodo(token,data);

      if(response.status){
        const updatedTodos = todos.map((todo) =>
        todo._id === response.data._id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      }
      
    }catch(err){
      toast.error("Something went wrong")
    }
  
  };

  const handleDeleteTodo = async(id) => {
    const response  = await deleteTodo(token,id);
    if(response.status){
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
    }
  };

  return (
    <div className="todo-container">
      {isLoggedIn === "false" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1> Please login to use the Todo application</h1>
        </div>
      ) : (
        <>
          <div className="todo-wrapper">
            <div className="input-wrapper">
              <FormControl
                type="text"
                value={todo}
                onChange={handleValueChange}
                placeholder="Enter todo"
              />
              <p></p>
                <>
                  <Button onClick={handleAddTodo}>Submit</Button>
                </>
            </div>
            <div>
            <label>
              Show Completed
              <input type="checkbox" checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />
            </label>
            </div>
            <div>
              <div className="card">
                  <h2>Todo List</h2>
                  {filteredTodos?.map((todo,i) => (
                    <TodoItem
                      key={i}
                      todo={todo}
                      onEdit={handleEditTodo}
                      onComplete={toggleComplete}
                      onDelete={handleDeleteTodo}
                    />
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

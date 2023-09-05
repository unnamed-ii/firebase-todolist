import React from 'react';
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {database} from "../firebase";

const Filters = ({setListOfTodo, getTodos}) => {
    const showCompletedTasks = () => {
        const todoListRef = collection(database, 'todos')
        getDocs(todoListRef)
            .then(response => {
                const todoList = response.docs.map(todo => ({
                    data: todo.data(),
                    id: todo.id
                }));
                let completedList = todoList.filter(todo => todo.data.isComplete === true)
                setListOfTodo(completedList)
            })
            .catch(error => console.log(error.message))
    }

    const showUncompletedTasks = () => {
        const todoListRef = collection(database, 'todos')
        getDocs(todoListRef)
            .then(response => {
                const todoList = response.docs.map(todo => ({
                    data: todo.data(),
                    id: todo.id
                }));
                let uncompletedList = todoList.filter(todo => todo.data.isComplete === false)
                setListOfTodo(uncompletedList)
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className="todo__filters">
            <button className="styled-button all" onClick={getTodos}>All</button>
            <button className="styled-button completed" onClick={showCompletedTasks}>Completed</button>
            <button className="styled-button not-completed" onClick={showUncompletedTasks}>Not completed</button>
        </div>
    );
};

export default Filters;
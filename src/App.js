import React, {useEffect, useState} from "react";
import Form from "./components/form";
import TodoList from "./components/todo-list";
import {collection, getDocs} from "firebase/firestore";
import {database} from "./firebase";

/**
 * Main component of the project
 * @returns {React.Component}
 */

function App() {
    const [listOfTodo, setListOfTodo] = useState([]);
    const [editingInputId, setEditingInputId] = useState('');
    console.log(listOfTodo)
    function getTodos(){
        const todoListRef = collection(database, 'todos')
        getDocs(todoListRef)
            .then(response => {
                const todoList = response.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }));
                setListOfTodo(todoList)
            })
            .catch(error => console.log(error.message))
    }

    /**
     * Function for removing all to-do's
     */
    const clearTodoList = () => {
        setListOfTodo([])
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="wrapper">
            <div className="todo">
                <div className="todo__title">
                    TO-DO LIST
                </div>
                <Form
                    listOfTodo={listOfTodo}
                    setListOfTodo={setListOfTodo}
                    buttonText={'Add new To-Do'}
                    getTodos={getTodos}
                />
                {!!listOfTodo.length &&
                <button onClick={clearTodoList} className="styled-button">
                    Remove all to-do
                </button>}
                <TodoList
                    listOfTodo={listOfTodo}
                    setEditingInputId={setEditingInputId}
                    setListOfTodo={setListOfTodo}
                    getTodos={getTodos}
                />
                {!!editingInputId &&
                <Form
                    listOfTodo={listOfTodo}
                    setListOfTodo={setListOfTodo}
                    editingInputId={editingInputId}
                    setEditingInputId={setEditingInputId}
                    buttonText={'Edit To-Do'}
                />}
            </div>
        </div>
    );
}

export default App;

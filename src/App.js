import React, {useEffect, useState} from "react";
import Form from "./components/form";
import TodoList from "./components/todo-list";
import {collection, deleteDoc, doc, getDocs} from "firebase/firestore";
import {database} from "./firebase";
import Filters from "./components/filters";

/**
 * Main component of the project
 * @returns {React.Component}
 */

function App() {
    const [listOfTodo, setListOfTodo] = useState([]);
    const [editingInputId, setEditingInputId] = useState('');

    function getTodos() {
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
    const clearTodoList = async () => {
        for (let i = 0; i < listOfTodo.length; i++) {
            const docRef = doc(database, 'todos', listOfTodo[i].id);
            await deleteDoc(docRef)
        }
        getTodos();
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
                <Filters
                    setListOfTodo={setListOfTodo}
                    getTodos={getTodos}
                />
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
                    getTodos={getTodos}
                />}
            </div>
        </div>
    );
}

export default App;

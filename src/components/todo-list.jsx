import React from 'react';
import Task from "./task";
import {doc, deleteDoc, updateDoc, collection} from 'firebase/firestore';
import {database} from "../firebase";

/**
 * Component for rendering full list of to-do's
 * @param {Array} listOfTodo - list of all to-do's
 * @param {function} setListOfTodo - set state function for listOfTodo
 * @param {string} editingInputId - input of editing to-do
 * @param {function} getTodos - getting data from server
 * @returns {React.Component}
 */

const TodoList = ({listOfTodo, setListOfTodo, setEditingInputId, getTodos}) => {

    /**
     * Function for toggling status of to-do
     * @param {Object} todo - data of todo
     */
    const toggleTodoStatus = async (todo) => {
        const todoRef = doc(database, 'todos', todo.id)
        await updateDoc(todoRef, {
            isComplete: !todo.data.isComplete
        })
        getTodos()
    }

    /**
     * Function for removing to-do
     * @param {string} id - id of the task to be deleted
     */
    const removeTodo = (id) => {
        const docRef = doc(database, 'todos', id);
        deleteDoc(docRef)
            .then(() => console.log('Todo was deleted'))
            .catch(error => console.log(error.message))

        getTodos();
        setListOfTodo(prev => prev.filter(todo => todo.id !== id));
    }

    return (
        <div className="todo__list">
            {listOfTodo.map(todo => (
                <Task
                    todo={todo}
                    key={todo.id}
                    id={todo.id}
                    title={todo.data.title}
                    description={todo.data.description}
                    date={todo.data.date}
                    file={todo.data.file}
                    isComplete={todo.data.isComplete}
                    toggleTodoStatus={toggleTodoStatus}
                    removeTodo={removeTodo}
                    setEditingInputId={setEditingInputId}
                />
            ))}
        </div>
    );
};

export default TodoList;
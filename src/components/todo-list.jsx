import React from 'react';
import Task from "./task";

/**
 * Component for rendering full list of to-do's
 * @param {Array} listOfTodo - list of all to-do's
 * @param {function} setListOfTodo - set state function for listOfTodo
 * @param {number} editingInputId - input of editing to-do
 * @returns {React.Component}
 */

const TodoList = ({listOfTodo, setListOfTodo, setEditingInputId}) => {

    /**
     * Function for toggling status of to-do
     * @param {number} id - id of the task whose status will be toggled
     */
    const toggleTodoStatus = (id) => {
        let updatedTodoList = listOfTodo.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setListOfTodo(updatedTodoList);
    }

    /**
     * Function for removing to-do
     * @param {number} id - id of the task to be deleted
     */
    const removeTodo = (id) => {
        setListOfTodo(prev => prev.filter(todo => todo.id !== id));
    }

    return (
        <div className="todo__list">
            {listOfTodo.map(todo => (
                <Task
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    date={todo.date}
                    files={todo.files}
                    isComplete={todo.isComplete}
                    toggleTodoStatus={toggleTodoStatus}
                    removeTodo={removeTodo}
                    setEditingInputId={setEditingInputId}
                />
            ))}
        </div>
    );
};

export default TodoList;
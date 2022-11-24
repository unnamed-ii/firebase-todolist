import React from 'react';
import {isDateEnding} from "../utils/isDateEnding";

const TodoList = ({listOfTodo, setListOfTodo, setEditingInputId}) => {
    const toggleTodoStatus = (id) => {
        let updatedTodoList = listOfTodo.map(i => {
            if (i.id === id) {
                i.isComplete = !i.isComplete
            }
            return i
        })
        setListOfTodo(updatedTodoList);
    }

    const removeTodo = (id) => {
        setListOfTodo(listOfTodo.filter(i => i.id !== id));
    }

    return (
        <div className="todo__list">
            {listOfTodo.map(todo => (
                <div className={"todo__list-item " + ((todo.isComplete || isDateEnding(todo.date)) && "completed")}
                     key={todo.id}>
                    <div className="todo__list-item__title">
                        Title: {todo.title}
                    </div>
                    <div className={"todo__list-item__description"}>
                        Description: {todo.description}
                    </div>
                    <div className="todo__list-item__date">
                        Date: {todo.date}
                    </div>
                    <div className="todo__list-item__file">
                        Files: {todo.file && todo.file.name}
                    </div>
                    <div className="todo__list-item__status">
                        Status: <span>{(todo.isComplete || isDateEnding(todo.date)) ? 'Completed' : 'Not completed'}</span>
                    </div>
                    <button className="todo__list-item__toggle" onClick={() => toggleTodoStatus(todo.id)}>
                        Toggle Status
                    </button>
                    <button className="todo__list-item__remove" onClick={() => removeTodo(todo.id)}>
                        Remove Todo
                    </button>
                    <button className="todo__list-item__remove" onClick={() => setEditingInputId(todo.id)}>
                        Edit Todo
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
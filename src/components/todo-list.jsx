import React from 'react';
import Task from "./task";

const TodoList = ({listOfTodo, setListOfTodo, setEditingInputId}) => {

    const toggleTodoStatus = (id) => {
        let updatedTodoList = listOfTodo.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setListOfTodo(updatedTodoList);
    }

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
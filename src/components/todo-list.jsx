import React from 'react';

const TodoList = ({listOfTodo,setListOfTodo, setEditingInputId}) => {
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
            {listOfTodo.map(i => (
                <div className={"todo__list-item " + (i.isComplete && "completed")} key={i.id}>
                    <div className="todo__list-item__title">
                        Title: {i.title}
                    </div>
                    <div className={"todo__list-item__description"}>
                        Description: {i.description}
                    </div>
                    <div className="todo__list-item__date">
                        Date: {i.date}
                    </div>
                    <div className="todo__list-item__file">
                        Files: {i.file && i.file.name}
                    </div>
                    <div className="todo__list-item__status">
                        Status: <span>{i.isComplete ? 'Completed' : 'Not completed'}</span>
                    </div>
                    <button className="todo__list-item__toggle" onClick={() => toggleTodoStatus(i.id)}>
                        Toggle Status
                    </button>
                    <button className="todo__list-item__remove" onClick={() => removeTodo(i.id)}>
                        Remove Todo
                    </button>
                    <button className="todo__list-item__remove" onClick={() => setEditingInputId(i.id)}>
                        Edit Todo
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
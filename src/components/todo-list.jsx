import React from 'react';
import {isDateEnding} from "../utils/isDateEnding";
import {ReactComponent as EditIcon} from "../icons/pen-to-square-solid.svg";
import {ReactComponent as RemoveIcon} from "../icons/xmark-solid.svg";
import {ReactComponent as EllipsisIcon} from "../icons/ellipsis-solid.svg";

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
                    <div className="todo__list-item__row">
                        Title:
                        <div>{todo.title}</div>
                    </div>
                    <div className="todo__list-item__row">
                        Description:
                        <div>{todo.description}</div>
                    </div>
                    <div className="todo__list-item__row">
                        Date:
                        <div>{todo.date}</div>
                    </div>
                    <div className="todo__list-item__row">
                        Files:
                        <div>{todo.file && todo.file.name}</div>
                    </div>
                    <div className="todo__list-item__row status">
                        Status:
                        <div>{(todo.isComplete || isDateEnding(todo.date)) ? 'Completed' : 'Not completed'}</div>
                    </div>
                    <div className="todo__list-item__ellipsis">
                        <EllipsisIcon />
                        <div className="buttons">
                            <button className="buttons__toggle" onClick={() => toggleTodoStatus(todo.id)}>
                                Toggle Status
                            </button>
                            <button className="buttons__remove" onClick={() => removeTodo(todo.id)}>
                                <RemoveIcon />
                            </button>
                            <button className="buttons__edit" onClick={() => setEditingInputId(todo.id)}>
                                <EditIcon />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
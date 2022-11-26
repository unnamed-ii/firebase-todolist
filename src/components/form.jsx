import React, {useRef, useState} from 'react';
import {ReactComponent as FileIcon} from "../icons/file-regular.svg";

/**
 * Component, which is used to add and edit to-do
 * @param {Array} listOfTodo - list of all to-do's
 * @param {function} setListOfTodo - set state function for listOfTodo
 * @param {number} [editingInputId] - input of editing to-do
 * @param {function} [setEditingInputId] - set state function for editingInputId
 * @param {string} buttonText - text of the button, which is possible in two way
 * @returns {React.Component}
 */

const Form = ({listOfTodo, setListOfTodo, editingInputId, setEditingInputId, buttonText}) => {
    const editingInput = !!editingInputId ? listOfTodo.find(todo => todo.id === editingInputId) : null;

    const [titleValue, setTitleValue] = useState(!!editingInputId ? editingInput.title : '');
    const [descriptionValue, setDescriptionValue] = useState(!!editingInputId ? editingInput.description : '');
    const [dateValue, setDateValue] = useState(!!editingInputId ? editingInput.date : '');
    const [files, setFiles] = useState(null);
    const inputFileRef = useRef(null);

    /**
     * Function for adding to-do
     */
    const addTodo = (e) => {
        e.preventDefault();

        const todo = {
            title: titleValue,
            date: dateValue,
            files: files,
            isComplete: false,
            description: descriptionValue,
            id: Math.floor(Math.random() * 10000),
        }

        if (todo.description.trim() !== '' && todo.title.trim() !== '') {
            setListOfTodo(prev => [todo, ...prev])
        } else {
            alert('You have not wrote "title" or "description"')
        }

        setTitleValue('');
        setDescriptionValue('');
        setDateValue('');
        setFiles(null);
        inputFileRef.current.value = null;
    }

    /**
     * Function for editing to-do
     */
    const editTodo = (e) => {
        e.preventDefault();

        let updatedTodoList = listOfTodo.map(todo => {
            if (todo.id === editingInputId) {
                todo.title = (!titleValue ? todo.title : titleValue);
                todo.description = (!descriptionValue ? todo.description : descriptionValue);
                todo.date = (!dateValue ? todo.date : dateValue);
                todo.file = (!files ? todo.file : files);
            }
            return todo
        })

        setTitleValue('');
        setDescriptionValue('');
        setDateValue('');
        setFiles(null);
        setListOfTodo(updatedTodoList);
        setEditingInputId(null);
    }

    return (
        <form onSubmit={!!editingInputId ? editTodo : addTodo}
              className={"todo__inputs-form " + (!!editingInputId && "edit")}>
            <div className="todo__inputs-form__inner">
                <input type="text"
                       onChange={(e) => setTitleValue(e.target.value)}
                       value={titleValue}
                       className="todo__inputs-form__input"
                       placeholder="Enter title"
                />
                <textarea
                       onChange={(e) => setDescriptionValue(e.target.value)}
                       value={descriptionValue}
                       className="todo__inputs-form__input"
                       placeholder="Enter description"
                       rows={7}
                />
                <input type="datetime-local"
                       onChange={(e) => setDateValue(e.target.value)}
                       value={dateValue}
                       className="todo__inputs-form__input"
                />
                <label htmlFor="input-type-file" className="input-file-label">
                    <FileIcon/> : {files ? files.name : "Choose Files"}
                    <input type="file"
                           className="todo__inputs-form__input"
                           onChange={(e) => setFiles(e.target.files[0])}
                           ref={inputFileRef}
                           id="input-type-file"
                    />
                </label>
                <button className="styled-button">{buttonText}</button>
            </div>
        </form>
    );
};

export default Form;
import React, {useRef, useState} from 'react';
import * as dayjs from 'dayjs';
import {addDoc, updateDoc, collection, doc} from 'firebase/firestore';
import {database} from "../firebase";
import {ReactComponent as FileIcon} from "../icons/file-regular.svg";

/**
 * Component, which is used to add and edit to-do
 * @param {Array} listOfTodo - list of all to-do's
 * @param {function} setListOfTodo - set state function for listOfTodo
 * @param {string} [editingInputId] - input of editing to-do
 * @param {function} [setEditingInputId] - set state function for editingInputId
 * @param {string} buttonText - text of the button, which is possible in two way
 * @param {function} getTodos - function for uploading to-do's from server
 * @returns {React.Component}
 */

const Form = ({listOfTodo, setListOfTodo, editingInputId, setEditingInputId, buttonText, getTodos}) => {
    const editingInput = !!editingInputId ? listOfTodo.find(todo => todo.id === editingInputId) : null;

    const [titleValue, setTitleValue] = useState(!!editingInputId ? editingInput.data.title : '');
    const [descriptionValue, setDescriptionValue] = useState(!!editingInputId ? editingInput.data.description : '');
    const [dateValue, setDateValue] = useState(!!editingInputId ? editingInput.data.date : '');
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
            // files: files,
            isComplete: false,
            description: descriptionValue,
        }

        if (todo.title.trim() === '') {
            alert('You have not wrote "title"')
        }

        if (todo.description.trim() === '') {
            alert('You have not wrote "description"')
        }

        const todoListRef = collection(database, 'todos')
        addDoc(todoListRef, todo)
            .then(response => {
                console.log(response.id)
            })
            .catch(error => {
                console.log(error.message)
            })


        setTitleValue('');
        setDescriptionValue('');
        setDateValue('');
        setFiles(null);
        inputFileRef.current.value = null;
        getTodos();
    }

    /**
     * Function for editing to-do
     */
    const editTodo = (e) => {
        e.preventDefault();

        const updatedTodoList = listOfTodo.map(todo => {
            if (todo.id === editingInputId) {
                todo.data.title = (!titleValue ? todo.data.title : titleValue);
                todo.data.description = (!descriptionValue ? todo.data.description : descriptionValue);
                todo.data.date = (!dateValue ? todo.data.date : dateValue);
                // todo.data.file = (!files ? todo.data.file : files);
            }
            return todo
        })

        const docRef = doc(database, 'todos', editingInputId)
        updateDoc(docRef, {
            title: editingInput.data.title,
            description: editingInput.data.description,
            isComplete: editingInput.data.isComplete,
            date: editingInput.data.date
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.message)
            })

        setTitleValue('');
        setDescriptionValue('');
        setDateValue('');
        setFiles(null);
        setListOfTodo(updatedTodoList);
        setEditingInputId('');
    }

    return (
        <form onSubmit={!!editingInputId ? editTodo : addTodo}
              onMouseUp={(e) => {
                  if (e.currentTarget === e.target) {
                      setEditingInputId('');
                  }
              }}
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
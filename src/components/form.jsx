import React, {useRef, useState} from 'react';
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {addDoc, updateDoc, collection, doc} from 'firebase/firestore';
import {database} from "../firebase";
import {ReactComponent as FileIcon} from "../icons/file-regular.svg";
import {isDateEnding} from "../utils/isDateEnding";

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

const Form = ({listOfTodo, editingInputId, setEditingInputId, buttonText, getTodos}) => {
    const editingInput = !!editingInputId ? listOfTodo.find(todo => todo.id === editingInputId) : null;

    const [titleValue, setTitleValue] = useState(!!editingInputId ? editingInput.data.title : '');
    const [descriptionValue, setDescriptionValue] = useState(!!editingInputId ? editingInput.data.description : '');
    const [dateValue, setDateValue] = useState(!!editingInputId ? editingInput.data.date : '');
    const inputFileRef = useRef(null);

    /**
     * Function for adding to-do
     */
    const addTodo = async (e) => {
        e.preventDefault();
        const todo = {
            title: titleValue,
            date: dateValue,
            isComplete: isDateEnding(dateValue),
            description: descriptionValue,
        }

        if (todo.title.trim() === '') {
            alert("title is empty");
        } else if (todo.description.trim() === '') {
            alert("description is empty");
        } else {
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
            getTodos();
        }
    }

    /**
     * Function for editing to-do
     */
    const editTodo = async (e) => {
        e.preventDefault();
        const updatingTodo = listOfTodo.find(todo => todo.id === editingInputId)
        const docRef = doc(database, 'todos', editingInputId)

        updateDoc(docRef, {
            title: (titleValue ? titleValue : updatingTodo.data.title),
            description: (descriptionValue ? descriptionValue : updatingTodo.data.description),
            isComplete: (dateValue ? dateValue : updatingTodo.data.date),
            date: (dateValue ? dateValue : updatingTodo.data.date)
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
        setEditingInputId('');
        getTodos();
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
                <button className="styled-button">{buttonText}</button>
            </div>
        </form>
    );
};

export default Form;
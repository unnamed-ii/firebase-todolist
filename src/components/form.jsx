import React, {useRef, useState} from 'react';
import {ReactComponent as FileIcon} from "../icons/file-regular.svg";

const Form = ({listOfTodo, setListOfTodo, editingInputId, setEditingInputId, buttonText}) => {
    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [file, setFile] = useState(null);
    const inputFileRef = useRef(null);

    const addTodo = (e) => {
        e.preventDefault();

        const todo = {
            title: titleValue,
            date: dateValue,
            file: file,
            isComplete: false,
            description: descriptionValue,
            id: Math.floor(Math.random() * 10000),
        }

        console.log(todo)

        if (todo.description.trim() !== '' && todo.title.trim() !== '') {
            setListOfTodo(prev => [todo, ...prev])
        } else {
            alert('You have not wrote "title" or "description"')
        }

        setTitleValue('');
        setDescriptionValue('');
        setDateValue('');
        setFile([]);
        inputFileRef.current.value = null;
    }

    const editTodo = (e) => {
        e.preventDefault();

        let updatedTodoList = listOfTodo.map(todo => {
            if (todo.id === editingInputId) {
                todo.title = (!titleValue ? todo.title : titleValue);
                todo.description = (!descriptionValue ? todo.description : descriptionValue);
                todo.date = (!dateValue ? todo.date : dateValue);
                todo.file = (!file ? todo.file : file);
            }
            return todo
        })

        setTitleValue('');
        setDescriptionValue('');
        setDateValue('');
        setFile([]);
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
                    <FileIcon/> : {file ? file.name : "Choose Files"}
                    <input type="file"
                           className="todo__inputs-form__input"
                           onChange={(e) => setFile(e.target.files[0])}
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
import React, {useRef, useState} from 'react';
import {ReactComponent as FileIcon} from "../icons/file-regular.svg";

const AddForm = ({listOfTodo, setListOfTodo}) => {
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

        if (todo.description.trim() !== '' && todo.title.trim() !== '') {
            setListOfTodo([todo, ...listOfTodo])
        } else {
            alert('You have not wrote "title" or "description"')
        }

        setTitleValue('');
        setDescriptionValue('');
        setDateValue('');
        setFile([]);
        inputFileRef.current.value = null;
    }


    return (
        <form onSubmit={addTodo} className="todo__inputs-form">
            <div className="todo__inputs-form__inner">
                <input type="text"
                       onChange={(e) => setTitleValue(e.target.value)}
                       value={titleValue}
                       className="todo__inputs-form__input"
                       placeholder="Enter title"
                />
                <input type="text"
                       onChange={(e) => setDescriptionValue(e.target.value)}
                       value={descriptionValue}
                       className="todo__inputs-form__input"
                       placeholder="Enter description"
                />
                <input type="datetime-local"
                       onChange={(e) => setDateValue(e.target.value)}
                       value={dateValue}
                       className="todo__inputs-form__input"
                />
                <label htmlFor="input-type-file" className="input-file-label">
                    <FileIcon/>
                    <input type="file"
                           className="todo__inputs-form__input"
                           onChange={(e) => setFile(e.target.files[0])}
                           ref={inputFileRef}
                           id="input-type-file"
                    />
                </label>
                <button className="styled-button">Add new to-do</button>
            </div>
        </form>
    );
};

export default AddForm;
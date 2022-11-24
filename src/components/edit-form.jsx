import React, {useState} from 'react';

const EditForm = ({listOfTodo, editingInputId, setEditingInputId, setListOfTodo}) => {
    const [editingTitleValue, setEditingTitleValue] = useState('');
    const [editingDescriptionValue, setEditingDescriptionValue] = useState('');
    const [editingDateValue, setEditingDateValue] = useState('');
    const [editingFile, setEditingFile] = useState(null);

    const editTodo = (e) => {
        e.preventDefault();

        let updatedTodoList = listOfTodo.map(i => {
            if (i.id === editingInputId) {
                i.description = (editingTitleValue === '' ? i.description : editingTitleValue);
                i.title = (editingDescriptionValue === '' ? i.title : editingDescriptionValue);
                i.date = (editingDateValue === '' ? i.date : editingDateValue);
                i.file = (editingFile === '' ? i.file : editingFile);
            }
            return i
        })

        setEditingTitleValue('');
        setEditingDescriptionValue('');
        setEditingDateValue('');
        setEditingFile([]);
        setListOfTodo(updatedTodoList);
        setEditingInputId(null);
    }

    return (
        <>
            {!!editingInputId &&
            <form onSubmit={(e) => editTodo(e)} className="todo__inputs-form edit">
                <div className="todo__inputs-form__inner">
                    <input type="text"
                           onChange={(e) => setEditingTitleValue(e.target.value)}
                           value={editingTitleValue}
                           className="todo__inputs-form__input"
                           placeholder="Enter title"
                    />
                    <input type="text"
                           onChange={(e) => setEditingDescriptionValue(e.target.value)}
                           value={editingDescriptionValue}
                           className="todo__inputs-form__input"
                           placeholder="Enter description"
                    />
                    <input type="datetime-local"
                           onChange={(e) => setEditingDateValue(e.target.value)}
                           value={editingDateValue}
                           className="todo__inputs-form__input"
                    />
                    <input type="file"
                           className="todo__inputs-form__input"
                           onChange={(e) => setEditingFile(e.target.files[0])}
                    />
                    <button className="styled-button">Edit</button>
                </div>
            </form>}
        </>
    );
};

export default EditForm;
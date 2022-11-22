import React, {useState} from "react";

function App() {
    const [listOfTodo, setListOfTodo] = useState([]);
    const [editingInputId, setEditingInputId] = useState(null);

    const [editingTitleValue, setEditingTitleValue] = useState('');
    const [editingDescriptionValue, setEditingDescriptionValue] = useState('');
    const [editingDateValue, setEditingDateValue] = useState('');
    const [editingFile, setEditingFile] = useState('');

    const [titleValue, setTitleValue] = useState('');
    const [descriptionValue, setDescriptionValue] = useState('');
    const [dateValue, setDateValue] = useState('');
    const [file, setFile] = useState(null);


    const addTodo = (e) => {
        e.preventDefault();

        let todo = {
            title: titleValue,
            date: dateValue,
            file: file,
            isComplete: false,
            description: descriptionValue,
            id: Math.floor(Math.random() * 10000),
        }

        if (todo.description.trim() !== '') {
            setListOfTodo([
                todo,
                ...listOfTodo
            ])
        } else {
            alert('Your todo is empty')
        }

        setTitleValue('')
        setDescriptionValue('')
        setDateValue('')
        setFile('')
    }

    const handleToggleTodoStatus = (id) => {
        let updatedTodoList = listOfTodo.map(i => {
            if (i.id === id) {
                i.isComplete = !i.isComplete
            }
            return i
        })
        setListOfTodo(updatedTodoList);
    }

    const handleRemoveTodo = (id) => {
        setListOfTodo(listOfTodo.filter(i => i.id !== id));
    }

    const handleEditTodo = (e) => {
        e.preventDefault();

        let updatedTodoList = listOfTodo.map(i => {
            if (i.id === editingInputId) {
                i.description = (editingDescriptionValue === '' ? i.description : editingDescriptionValue);
                i.title = (editingTitleValue === '' ? i.title : editingTitleValue);
                i.date = (editingDateValue === '' ? i.date : editingDateValue);
                i.file = (editingFile === '' ? i.file : editingFile);
            }
            return i
        })

        setEditingTitleValue('')
        setEditingDescriptionValue('');
        setEditingDateValue('')
        setEditingFile(null)

        setEditingInputId(null);
        setListOfTodo(updatedTodoList);
    }

    const handleClearTodoList = () => {
        setListOfTodo([])
    }

    return (
        <div className="wrapper">
            <div className="todo">
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
                        <input type="date"
                               onChange={(e) => setDateValue(e.target.value)}
                               value={dateValue}
                               className="todo__inputs-form__input"
                        />
                        <input type="file"
                               className="todo__inputs-form__input"
                               onChange={(e) => setFile(e.target.files[0])}
                        />
                        <button>Add new todo</button>
                    </div>
                </form>
                <div className="todo__list">
                    {listOfTodo.map(i => (
                        <div className="todo__list-item" key={i.id}>
                            <div className={"todo__list-item__title " + (i.isComplete && "completed")}>
                                {i.title}
                            </div>
                            <div className={"todo__list-item__description " + (i.isComplete && "completed")}>
                                {i.description}
                            </div>
                            <div className={"todo__list-item__date " + (i.isComplete && "completed")}>
                                {i.date}
                            </div>
                            <div className={"todo__list-item__file " + (i.isComplete && "completed")}>
                                {i.file}
                            </div>
                            <div className={"todo__list-item__status " + (i.isComplete && "completed")}>
                                {i.isComplete ? 'Completed' : 'Not completed'}
                            </div>
                            <button className="todo__list-item__toggle" onClick={() => handleToggleTodoStatus(i.id)}>
                                Toggle Status
                            </button>
                            <button className="todo__list-item__remove" onClick={() => handleRemoveTodo(i.id)}>
                                Remove Todo
                            </button>
                            <button className="todo__list-item__remove" onClick={() => setEditingInputId(i.id)}>
                                Edit Todo
                            </button>
                        </div>
                    ))}
                    {!!listOfTodo.length &&
                    <div onClick={handleClearTodoList} className="todo__list-remove__all">
                        Remove all todo
                    </div>
                    }
                </div>
                {!!editingInputId &&
                <form onSubmit={(e) => handleEditTodo(e)} className="todo__inputs-form edit">
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
                        <input type="date"
                               onChange={(e) => setEditingDateValue(e.target.value)}
                               value={editingDateValue}
                               className="todo__inputs-form__input"
                        />
                        <input type="file"
                               className="todo__inputs-form__input"
                               onChange={(e) => setEditingFile(e.target.files[0])}
                        />
                        <button>Edit</button>
                        <button>Cancel editing</button>
                    </div>
                </form>}
            </div>
        </div>
    );
}

export default App;

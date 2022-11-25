import React, {useState} from "react";
import Form from "./components/form";
import TodoList from "./components/todo-list";

function App() {
    const [listOfTodo, setListOfTodo] = useState([]);
    const [editingInputId, setEditingInputId] = useState(null);

    const clearTodoList = () => {
        setListOfTodo([])
    }

    return (
        <div className="wrapper">
            <div className="todo">
                <div className="todo__title">
                    TO-DO LIST
                </div>
                <Form
                    listOfTodo={listOfTodo}
                    setListOfTodo={setListOfTodo}
                    buttonText={'Add new To-Do'}
                />
                {!!listOfTodo.length &&
                <button onClick={clearTodoList} className="styled-button">
                    Remove all to-do
                </button>}
                <TodoList
                    listOfTodo={listOfTodo}
                    setEditingInputId={setEditingInputId}
                    setListOfTodo={setListOfTodo}
                />
                {!!editingInputId &&
                <Form
                    listOfTodo={listOfTodo}
                    setListOfTodo={setListOfTodo}
                    editingInputId={editingInputId}
                    setEditingInputId={setEditingInputId}
                    buttonText={'Edit To-Do'}
                />
                }
            </div>
        </div>
    );
}

export default App;

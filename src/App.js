import React, {useState} from "react";
import AddForm from "./components/add-form";
import EditForm from "./components/edit-form";
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
                <AddForm
                    listOfTodo={listOfTodo}
                    setListOfTodo={setListOfTodo}
                />
                <TodoList
                    listOfTodo={listOfTodo}
                    setEditingInputId={setEditingInputId}
                    setListOfTodo={setListOfTodo}
                />
                {!!listOfTodo.length &&
                <button onClick={clearTodoList} className="styled-button">
                    Remove all to-do
                </button>
                }
                <EditForm
                    listOfTodo={listOfTodo}
                    editingInputId={editingInputId}
                    setEditingInputId={setEditingInputId}
                    setListOfTodo={setListOfTodo}
                />
            </div>
        </div>
    );
}

export default App;

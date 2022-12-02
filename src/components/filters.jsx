import React from 'react';

const Filters = ({listOfTodo, setListOfTodo}) => {
    const showCompletedTasks = () => {



    }

    const showUncompletedTasks = () => {



    }

    const showAllTasks = () => {

    }

    return (
        <div className="todo__filters">
            <button className="styled-button all" onClick={showAllTasks}>All</button>
            <button className="styled-button completed" onClick={showCompletedTasks}>Completed</button>
            <button className="styled-button not-completed" onClick={showUncompletedTasks}>Not completed</button>
        </div>
    );
};

export default Filters;
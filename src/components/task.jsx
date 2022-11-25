import React from 'react';
import {isDateEnding} from "../utils/isDateEnding";
import {ReactComponent as EllipsisIcon} from "../icons/ellipsis-solid.svg";
import {ReactComponent as RemoveIcon} from "../icons/xmark-solid.svg";
import {ReactComponent as EditIcon} from "../icons/pen-to-square-solid.svg";

const Task = ({
                  id,
                  title,
                  description,
                  date,
                  file,
                  isComplete,
                  toggleTodoStatus,
                  removeTodo,
                  setEditingInputId
              }) => {
    const validatingStatus = isComplete || isDateEnding(date);

    return (
        <div className={"todo__list-item " + (validatingStatus && "completed")}>
            <div className="todo__list-item__row">
                Title:
                <div>{title}</div>
            </div>
            <div className="todo__list-item__row">
                Description:
                <div>{description}</div>
            </div>
            <div className="todo__list-item__row">
                Date:
                <div>{date}</div>
            </div>
            <div className="todo__list-item__row">
                Files:
                <div>{file && file.name}</div>
            </div>
            <div className="todo__list-item__row status">
                Status:
                <div>{validatingStatus ? 'Completed' : 'Not completed'}</div>
            </div>
            <div className="todo__list-item__ellipsis">
                <EllipsisIcon/>
                <div className="buttons">
                    <button className="buttons__toggle" onClick={() => toggleTodoStatus(id)}>
                        Toggle Status
                    </button>
                    <button className="buttons__remove" onClick={() => removeTodo(id)}>
                        <RemoveIcon/>
                    </button>
                    <button className="buttons__edit" onClick={() => setEditingInputId(id)}>
                        <EditIcon/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Task;
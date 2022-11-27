import React from 'react';
import {isDateEnding} from "../utils/isDateEnding";
import {ReactComponent as EllipsisIcon} from "../icons/ellipsis-solid.svg";
import {ReactComponent as RemoveIcon} from "../icons/xmark-solid.svg";
import {ReactComponent as EditIcon} from "../icons/pen-to-square-solid.svg";

/**
 * Component of single to-do
 * @param {number} id - id of to-do
 * @param {string} title - title of to-do
 * @param {string} description - description of to-do
 * @param {string} date - final date to finish to-do
 * @param files - files of to-do
 * @param {boolean} isComplete - status of to-do
 * @param {function} toggleTodoStatus - function to toggle status of to-do
 * @param {function} removeTodo - function for deleting to-do
 * @param {function} setEditingInputId - set state function for editingInputId
 * @returns {React.Component}
 */

const Task = ({
                  id,
                  title,
                  description,
                  date,
                  files,
                  isComplete,
                  toggleTodoStatus,
                  removeTodo,
                  setEditingInputId
              }) => {

    /**
     * Variable for checking status of to-do
     * @type {boolean}
     */
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
                {date ? 'Date:' : 'There is no final date'}
                <div>{date}</div>
            </div>
            <div className="todo__list-item__row">
                {files ? 'Files:' : 'There is no files were added'}
                <div>{files ? files.name : ''}</div>
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
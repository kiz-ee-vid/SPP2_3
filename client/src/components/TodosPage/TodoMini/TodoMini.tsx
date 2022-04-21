import React, {ChangeEvent, FC} from 'react';
import {TodoModel} from "../../../models/TodoModel";
import styles from "./TodoMini.module.css";
import {Link} from "react-router-dom";
import routes from "../../../constants/routes";
import {observer} from "mobx-react-lite";
import useTodosStore from "../../../stores/todos/useTodosStore";
import useAccountStore from "../../../stores/account/useAccountStore";

type Props = {
    todo: TodoModel
}

const TodoMini: FC<Props> = observer(({todo}) => {
    const {updateTodo, updateLocalTodo, updateTodos, deleteTodo, deleteLocalTodo, deleteFromTodos} = useTodosStore();
    const {account} = useAccountStore();

    const handleTodoDeletion = () => {
        if (window.confirm('Are you sure you want to delete note?')) {
            if (account) {
                deleteTodo(todo.id).then((res) => {
                    if (res) {
                        deleteFromTodos(todo.id);
                    }
                });
            } else {
                deleteLocalTodo(todo.id);
            }
        }
    }

    const handleTodoEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const newTodo: TodoModel = {...todo, isCompleted: e.target.checked};

        if (account) {
            updateTodo(todo.id, newTodo).then((res) => {
                if (res) {
                    updateTodos(todo.id, newTodo)
                }
            })
        } else {
            const res = updateLocalTodo(todo.id, newTodo);

            if (res) {
                updateTodos(todo.id, newTodo)
            }
        }
    }

    return (
        <div className={`${styles.container} ${
            todo.isCompleted ? styles.completed : 
                todo.plannedTo && new Date() > new Date(todo.plannedTo) ? styles.failed : ''
        }`}>
            <div className={styles.header}>
                <input className={styles.checkbox} type={'checkbox'} checked={todo.isCompleted} onChange={handleTodoEdit}/>
                <Link to={`${routes.todo.pathnameBase}/${todo.id}`} className={styles.name} title={'Go to note'}>{todo.name}</Link>
                <div className={styles.delete} title={'Delete note'} onClick={handleTodoDeletion}>{'×'}</div>
            </div>
            {todo.description &&
                <div className={styles.main}>
                    <div className={styles.desc}>{todo.description}</div>
                </div>
            }
            <div className={styles.footer}>
                <div className={styles.datetime}>
                    <span className={styles.param_name}>Created: </span>
                    {new Date(todo.createdAt).toLocaleString()}
                </div>
                {todo.plannedTo &&
                    <div className={styles.datetime}>
                        <span className={styles.param_name}>Planned on: </span>
                        {new Date(todo.plannedTo).toLocaleString()}
                    </div>
                }
            </div>
        </div>
    );
});

export default TodoMini;

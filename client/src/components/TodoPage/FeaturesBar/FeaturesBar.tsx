import React, {useEffect} from 'react';
import styles from './FeaturesBar.module.css';
import {observer} from "mobx-react-lite";
import useFeaturesBar from "../../../stores/featuresBar/useFeaturesBar";
import useTodosStore from "../../../stores/todos/useTodosStore";
import useAccountStore from "../../../stores/account/useAccountStore";
import {useNavigate} from "react-router-dom";
import routes from "../../../constants/routes";
import {TodoToEditDto} from "../../../dtos/TodoToEditDto";

const FeaturesBar = observer(() => {
    const { isInEditMode, changeEditMode, setIsInEditMode } = useFeaturesBar();
    const { currentTodo, deleteTodo, deleteLocalTodo, updateTodo, updateLocalTodo } = useTodosStore();
    const { account } = useAccountStore();
    const navigate = useNavigate();

    useEffect(() => {
       return () => setIsInEditMode(false);
    }, [])

    const handleTodoDeletion = () => {
        if (currentTodo) {
            if (window.confirm('Are you sure you want to delete the note?')) {
                if (account) {
                    deleteTodo(currentTodo.id).then(
                        () => navigate(routes.todos.pathnameBase)
                    );
                } else {
                    deleteLocalTodo(currentTodo.id);
                    navigate(routes.todos.pathnameBase);
                }
            }
        }
    }

    const handleTodoChange = () => {
        if (currentTodo) {
            if (account) {
                updateTodo(currentTodo.id, currentTodo as TodoToEditDto).then()
            } else {
                updateLocalTodo(currentTodo.id, currentTodo as TodoToEditDto);
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.button} ${isInEditMode ? styles.active : ''}`}
                 title={isInEditMode ? 'Exit edit mode' : 'Enter edit mode'}
                 onClick={() => {
                     if (isInEditMode){
                         handleTodoChange()
                     }
                     changeEditMode();
                 }}
            >
                {'✎'}
            </div>
            <div className={`${styles.button} ${styles.delete}`} title={'Delete node'}
                 onClick={() => handleTodoDeletion()}
            >
                {'×'}
            </div>
        </div>
    );
});

export default FeaturesBar;

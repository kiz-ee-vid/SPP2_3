import React from 'react';
import Page from "../Page/Page";
import styles from "./NotFound.module.css"

const NotFound = () => {
    return (
        <Page>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.error404}>404</div>
                    <div className={styles.text}>{"Page not found!"}</div>
                </div>
            </div>
        </Page>
    );
};

export default NotFound;

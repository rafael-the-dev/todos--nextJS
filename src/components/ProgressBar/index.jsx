import classNames from "classnames";
import { useContext } from 'react'
import { AppContext } from "src/context/AppContext";
import styles from './styles.module.css'

const Container = () => {
    const { isLoading } = useContext(AppContext);
    return (
        <div className="flex w-full">
            <span 
                aria-label="progress indicator" 
                className={classNames(styles.progress, { [styles.progressStart]: isLoading })}>
            </span>
        </div>
    );
};

export default Container;
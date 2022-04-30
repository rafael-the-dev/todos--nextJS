import classNames from "classnames";
import styles from './styles.module.css'

const Container = () => {
    return (
        <div className="flex w-full">
            <span aria-label="progress indicator" className={classNames(styles.progress)}></span>
        </div>
    );
};

export default Container;
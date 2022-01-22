import React from 'react'
import styles from './TextInput.module.css';

const TextInput = (props) => {
    return (
        <div>
            <input className={styles.input} type="text"  {...props} name="" id="" />
        </div>
    )
}

export default TextInput

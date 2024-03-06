import styles from './Select.module.css'

function Select({ text, name, options, handleOnChange, value }) {

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select
                name={name}
                id={name}
                onChange={handleOnChange}
                value={value || ''}>
                <option value={value}>{value || 'Selecione'}</option>
                {options.map((option) => (
                    <option value={option} key={option}>{option}</option>
                ))}
            </select>
        </div>
    )
}

export default Select
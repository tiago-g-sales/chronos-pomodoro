import styles from './styles.module.css';


type DefaultInputProps = {
    id: string;
    labelText: string;
} & React.ComponentProps<'input'>;



export  function DefaultInput({labelText, id, type, ...rest}: DefaultInputProps) {
    return (
    <>
        <label htmlFor="input">{labelText}</label>
        <input className={styles.input}  id={id} type={type} {...rest} />
    </>
    )
}
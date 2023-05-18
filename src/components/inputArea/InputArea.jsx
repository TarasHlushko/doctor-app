const InputArea = ({name, defaultValue, disabled}) => {
    const inputArea = e => {
        e.target.style.height = "";
        if (+e.target.scrollHeight > 110) {
            e.target.style.overflow = "scroll";
            e.target.style.height = 110 + "px";
        } else {
            e.target.style.height = e.target.scrollHeight + "px";
            e.target.style.overflow = "hidden";
        }
    }

    return (
        <textarea placeholder={" "} name={name} defaultValue={defaultValue} disabled={disabled}
                  onInput={inputArea}/>
    )
}

export default InputArea;
import "./buttons.css"
export default function TextButton ({ children, onClick }) {
    return (<button className="txt-btn"
    onClick={onClick}
    tabIndex={0}
    >{children}</button>)
}
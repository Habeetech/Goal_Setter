import "./buttons.css"
export default function TextButton ({ children, onClick }) {
    return (<button className="txt-btn"
    onClick={onClick}
    >{children}</button>)
}
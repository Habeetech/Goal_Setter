import "./buttons.css"
export default function SecondaryButton ({ children, onClick }) {
    return (<button className="sec-btn"
    onClick={onClick}
    tabIndex={0}
    >{children}</button>)
}
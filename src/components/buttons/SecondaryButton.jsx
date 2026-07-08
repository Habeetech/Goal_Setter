import "./buttons.css"
export default function SecondaryButton ({ children, onClick }) {
    return (<button className="sec-btn"
    onClick={onClick}
    >{children}</button>)
}
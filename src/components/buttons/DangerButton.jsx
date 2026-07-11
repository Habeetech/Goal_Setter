import "./buttons.css"
export default function DangerButton ({ children, onClick }) {
    return (<button className="danger-btn"
    onClick={onClick}
    >{children}</button>)
}
import "./buttons.css"
export default function DangerButton ({ children, onClick }) {
    return (<button className="danger-btn"
        tabIndex={0}
    onClick={onClick}
    >{children}</button>)
}
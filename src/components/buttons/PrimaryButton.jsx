import "./buttons.css"
export default function PrimaryButton ({ children, onClick }) {
    return (<button className="pry-btn"
    onClick={onClick}
    tabIndex={0}
    >{children}</button>)
}
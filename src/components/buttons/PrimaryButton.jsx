export default function PrimaryButton ({ children, onClick }) {
    return (<button className="pry-btn"
    onClick={onClick}
    >{children}</button>)
}
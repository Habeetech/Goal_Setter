import { useEffect } from "react"
import "./themeChanger.css"

export default function ChangeTheme () {
    function toggleTheme (e) {
        e.preventDefault();
        document.body.classList.toggle("dark");
        return;
    }
    return (
        <div className="theme">
            <button onClick={toggleTheme}>Toggle Theme</button>
            <div className="pri">
                <p>Primary Color</p>
            </div>
            <div className="sec">
                <p>Secondary Color</p>
            </div>
            <div className="acc">
                <p>Accent Color</p>
            </div>
            <div className="bac">
                <p>Background Color</p>
            </div>
            <div className="sur">
                <p>Surface Color</p>
            </div>
            <div className="txt">
                <p>Text Color</p>
            </div>
            <div className="mut">
                <p>muted Color</p>
            </div>
        </div>
    )
}
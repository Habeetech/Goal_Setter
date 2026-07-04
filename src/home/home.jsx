import { useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton.jsx";
import SecondaryButton from "../components/buttons/SecondaryButton.jsx"

export default function Home ({ theme, toggleTheme }) {
   return (
        <main className={`home ${theme}`}>
            <section className="top-btns">
                <PrimaryButton>Set Goal</PrimaryButton>
                <SecondaryButton onClick={toggleTheme}>Switch Theme</SecondaryButton>
            </section>
                <section className="goals-list-container">
                <h1>Your Goals</h1>
                <div className="goals-list">
                    <p>Some hardcoded value</p>
                    <p>Another hardcoded value</p>
                    <p>More hardcoded value</p>
                </div>
            </section>
        </main>
    )
}
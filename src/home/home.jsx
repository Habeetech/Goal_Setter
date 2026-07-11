import { useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton.jsx";
import SecondaryButton from "../components/buttons/SecondaryButton.jsx"
import TextButton from "../components/buttons/TextButton.jsx"
import ModalOverlay from "../components/ModalOverlay.jsx"
import CreateGoal from "../components/CreateGoal.jsx";
import ViewGoal from "../components/ViewGoal.jsx";
import formatDate from "../utils/formatDate.js"
import { SquarePen, ArrowLeftRight, List, ListX, ListCheck, Settings } from "lucide-react"
import "./home.css"

export default function Home({ theme, toggleTheme, goals, setGoals, user }) {
    const [openSetGoal, setOpenSetGoal] = useState(false);
    const [viewGoal, setViewGoal] = useState(null);
    const [selectionMode, setSelectionMode] = useState(false);

    const unCompleted = goals.filter(g => {
        if (!g.deadline) return false;
        const deadline = new Date(g.deadline);
        return !g.isCompleted && deadline instanceof Date && deadline >= Date.now();
    }) || [];
    const completed = goals.filter(g => g.isCompleted === true) || [];
    const unarchieved = goals.filter(g => {
        if (!g.deadline) return false;
        const deadline = new Date(g.deadline);
        return !g.isCompleted && deadline instanceof Date && deadline < Date.now();
    }) || [];
    return (
        <main className={`home ${theme}`}>
            {openSetGoal && <ModalOverlay
                onClose={() => setOpenSetGoal(false)}
            ><CreateGoal
                    onClose={() => setOpenSetGoal(false)}
                    setGoals={setGoals}
                /></ModalOverlay>}
            {viewGoal && <ModalOverlay
                onClose={() => setViewGoal(null)}
            >
                <ViewGoal 
                goal={viewGoal}
                />
            </ModalOverlay>}

            <section className="headers">
                <h1>Hey {user?.name || "Dreamer"}</h1>
                <div className="top-btns">
                    <PrimaryButton
                        onClick={() => setOpenSetGoal(true)}
                    >Set Goal <SquarePen size="1em" /></PrimaryButton>
                    <SecondaryButton onClick={toggleTheme}>Switch Theme <ArrowLeftRight size="1em" /></SecondaryButton>
                </div>
            </section>
            <section className="goals-list-container">
                <h2><List size="1em" /> Your Goals</h2>
                <div className="goals-list">
                    {unCompleted.length == 0 ? <p>You haven't set any goal yet. <TextButton
                        onClick={() => setOpenSetGoal(true)}
                    >Set a new goal now</TextButton></p> :
                        unCompleted.map(goal => <button
                            onClick={() => setViewGoal(goal)}
                            key={goal.id}
                            className="goal">
                            <p>{goal?.name}</p>
                            <p>{formatDate(goal?.deadline)}</p>
                        </button>)
                    }
                </div>
            </section>
            <section className="goals-list-container">
                <h2><ListCheck size="1em" /> Achieved Goals</h2>
                <div className="goals-list">
                    {completed.length == 0 ? <p>You haven't completed any of your goals. Keep working on them</p> :
                        completed.map(goal => <button
                            key={goal.id}
                             onClick={() => setViewGoal(goal)}
                            className="goal completed">
                            <p>{goal?.name}</p>
                            <p>{formatDate(goal?.completedAt)}</p>
                        </button>)
                    }
                </div>
            </section>
            <section className="goals-list-container">
                <h2><ListX size="1em" /> Unarchieved</h2>
                <div className="goals-list">
                    {unarchieved.length == 0 ? <p>No unachieved goals. Weldone!</p> :
                        unarchieved.map(goal => <button
                            key={goal.id}
                             onClick={() => setViewGoal(goal)}
                            className="goal failed">
                            <p>{goal?.name}</p>
                            <p>{formatDate(goal?.deadline)}</p>
                        </button>)
                    }
                </div>
            </section>
            <section className="settings-container">
                <h2><Settings size="1em" /> Settings</h2>
                <div className="settings">
                    <span>{user?.name || "Dreamer"} <TextButton>Change</TextButton></span>
                    <span>{theme === "dark" ? "Dark" : "Light"} <TextButton onClick={toggleTheme}>Change</TextButton></span>
                </div>
            </section>
        </main>
    )
}
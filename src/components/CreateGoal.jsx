import { useEffect, useState } from "react"
import InputField from "./forms/InputField";
import TextAreaField from "./forms/TextAreaField";
import { ArrowBigLeftDash, ArrowBigRightDash, CircleSmall } from "lucide-react"
import "./CreateGoal.css"
import PrimaryButton from "./buttons/PrimaryButton";
import SecondaryButton from "./buttons/SecondaryButton.jsx";
import TextButton from "./buttons/TextButton.jsx";
import formatDate from "../utils/formatDate.js"
import { motion } from "motion/react"
import { addGoal } from "../utils/goalOperations.js";

export default function CreateGoal({ onClose, setGoals }) {
    const today = new Date().toISOString().split("T")[0]
    const [timeLeft, setTimeLeft] = useState(0);
    const [step, setStep] = useState(1);
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [openCheckpointForm, setOpenCheckpointForm] = useState(false)
    const [goal, setGoal] = useState({
        name: "",
        description: "",
        deadline: "",
        createdAt: new Date().toISOString(),
        completedAt: null,
        isCompleted: false,
        benchmarks: []
    });

    const [checkpoint, setCheckpoint] = useState({
        name: "",
        date: null,
        isDone: false
    });

    useEffect(() => {
        if (timeLeft <= 0) {
            if (step === 6) {
                onClose();
            }
            return;
        }

        const timerId = setTimeout(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timerId);
    }, [timeLeft, step, onClose]);

    const handleCheckpointSave = () => {
        if(step === 4 && !checkpoint.name.trim()) {
            setError("Checkpoint is required");
            return;
        }

        setGoal(prev => ({
            ...prev,
            benchmarks: [...prev.benchmarks, { ...checkpoint, id: checkpoint.name + new Date().toISOString() }]
        }));

        setCheckpoint({
            name: "",
            date: null,
            isDone: false
        })
        setOpenCheckpointForm(false);
    }

    const handleGoalCreation = () => {
        const result = addGoal({
            ...goal,
            id: goal.name + new Date().toISOString()
        }, setGoals);

        if (!result.ok) {
            setMsg("Unable to save goal to local storage. Please try again or contact support");
        } else {
            setMsg("Goal created successfully!");
        }

        setStep(6);
        setTimeLeft(5);
    };

    const handleGoalChange = (target) => {
        setError("");
        setGoal(prev => ({ ...prev, [target.name]: target.value }));
    }

    const handleCheckpointChange = (target) => {
         setError("");
         setCheckpoint(prev => ({ ...prev, [target.name]: target.value }));
    }

    const handleNext = () => {
        if (step === 1 && !goal.name.trim()) {
            setError("Please enter your goal");
            return;
        } else if (step === 3 && !goal.deadline) {
            setError("Please set a deadline for your goal");
            return;
        }
        setError("");
        if (step < 5) {
            setOpenCheckpointForm(false)
            setStep(prev => prev + 1);
        }
    };

    return (<div className="create-goal-wrapper">
        {step === 1 && <div className="create-goal">
            <p className="create-goal-text">What do you want to achieve?</p>
            <InputField
                name="name"
                id="name"
                placeholder="Enter your goal here..."
                required={true}
                type="text"
                value={goal.name}
                onChange={(e) => { handleGoalChange(e.target) }}
                error={error}
            />
        </div>}
        {step === 2 && <div className="create-goal">
            <p className="create-goal-text">How will you describe this goal?</p>
            <TextAreaField
                name="description"
                id="description"
                placeholder="Describe your goal..."
                value={goal.description}
                onChange={(e) => { handleGoalChange(e.target) }}
                error={error}
            />
        </div>}
        {step === 3 && <div className="create-goal">
            <p className="create-goal-text">When do you want to achieve this goal?</p>
            <InputField
                name="deadline"
                id="deadline"
                min={today}
                required={true}
                type="date"
                value={goal.deadline}
                onChange={(e) => { handleGoalChange(e.target) }}
                error={error}
            />
        </div>}
        {step === 4 && <div className="create-goal">
            {goal.benchmarks.length > 0 && <div className="checkpoints">
                <p className="create-goal-text">Checkpoints</p>
                {goal.benchmarks.map(c => (<p key={c.id} className="checkpoint">
                    <CircleSmall />{c.name}
                </p>))}
            </div>}
            {(!openCheckpointForm && goal.benchmarks.length <= 0) && <p className="create-goal-text">Would you like to add a checkpoint to track your progress?</p>}
            {(openCheckpointForm && goal.benchmarks.length > 0) ? <p className="create-goal-text">Add more Checkpoint</p> :
                (goal.benchmarks.length <= 0 && openCheckpointForm) ?
                    <p className="create-goal-text">Add a Checkpoint</p> : ""}

            {openCheckpointForm && <div className="checkpoint-form">
                <InputField
                    label="Name:"
                    name="name"
                    id="name"
                    type="text"
                    value={checkpoint.name}
                    onChange={(e) => { handleCheckpointChange(e.target) }}
                    error={error}
                />
                <span className="action-btns">
                <TextButton
                    onClick={handleCheckpointSave}
                >Save</TextButton>
                <TextButton
                    onClick={() => { setOpenCheckpointForm(false); setStep(5) }}
                >Discard</TextButton>
                </span>
            </div>}
            {(goal.benchmarks.length > 0 && !openCheckpointForm) && <TextButton
                onClick={() => setOpenCheckpointForm(true)}
            >Add more checkpoint</TextButton>}
            {(!openCheckpointForm && goal.benchmarks.length <= 0) && <div className="checkpoints-action-btns">
                <PrimaryButton
                    onClick={() => setOpenCheckpointForm(true)}
                >Yes</PrimaryButton>
                <SecondaryButton
                    onClick={() => {
                        setOpenCheckpointForm(false)
                        setStep(5)
                    }}
                >Skip</SecondaryButton>
            </div>}
        </div>}
        {step === 5 && <div className="create-goal">
            <p className="create-goal-text">Confirm your goal</p>
            <p>Goal: {goal.name}</p>
            <p>Description: {goal.description || "Not Provided"}</p>
            <p>Deadline: {formatDate(goal.deadline) || "Not Provided"}</p>
            <div>Checkpoints: {goal.benchmarks.length > 0 ?
                goal.benchmarks.map(c => (<p key={c.id}>{c.name}</p>)) // ✅ FIXED: Added key here
                : "No Checkpoints"}</div>
        </div>
        }
        {!msg && <div className="form-nav-btns">
            <button
                className="form-nav-btn"
                disabled={step === 1}
                onClick={() => {
                    step > 1 ? setStep(prev => prev - 1) : setStep(1);
                    setError("");
                }}
            ><ArrowBigLeftDash /></button>
            {step === 5 && <motion.button
                className="create-goal-btn"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={handleGoalCreation}
            >Create</motion.button>}
            <button
                className="form-nav-btn"
                onClick={handleNext}
                disabled={step === 5}
            ><ArrowBigRightDash /></button>
        </div>}
        {(msg && step === 6) &&
            <div className="msg-wrapper">
                <p className="create-goal-text">{msg}</p>
                <p>Closes in {timeLeft} seconds... </p>
            </div>}
    </div>)
}
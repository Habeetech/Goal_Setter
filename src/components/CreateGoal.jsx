import { useState } from "react"
import InputField from "./forms/InputField";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react"
import "./CreateGoal.css"
import PrimaryButton from "./buttons/PrimaryButton";
import { motion } from "motion/react"

export default function CreateGoal() {
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [goal, setGoal] = useState({
        name: "",
        deadline: "",
        createdAt: new Date().toISOString(),
        isCompleted: false,
    });

    const handleChange = (target) => {
        setError("");
        setGoal(prev => ({ ...prev, [target.name]: target.value }));
    }
const handleNext = () => {
    console.log( step, error, goal);
    if (step === 1 && !goal.name.trim()) {
        setError("Goal name is required");
        console.log(error);
        return; 
    }
    setError("");
    console.log("no error", step, error);
    if (step < 5) {
        setStep(prev => prev + 1);
    }
};

    return (<div className="create-goal-wrapper">
        {step === 1 && <div className="create-goal">
            <p className="create-goal-text">What do you want to achieve?</p>
            <InputField
                name="name"
                id="name"
                required={true}
                type="text"
                value={goal.name}
                onChange={(e) => { handleChange(e.target); console.log(e.target) }}
                error={error}
                onBlur={(e) => e.target.focus()}
                autofocus={true}
            />
        </div>}
        <div className="form-nav-btns">
            <button
                className="form-nav-btn"
                disabled={step === 1}
                onClick={() => step > 1 ? setStep(prev => prev - 1) : setStep(1)}
            ><ArrowBigLeftDash /></button>
            {step === 5 && <motion.button
                className="create-goal-btn"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            >Create</motion.button>}
            <button
                className="form-nav-btn"
                onClick={handleNext}
                disabled={step === 5}
            ><ArrowBigRightDash /></button>
        </div>
    </div>)
}
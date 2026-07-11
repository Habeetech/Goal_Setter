import formatDate from "../utils/formatDate";
import "./ViewGoal.css"
import { CircleCheck, CircleX, CircleCheckBig, CheckCheck, X, SquarePen, Trash2 } from "lucide-react"
import TextButton from "./buttons/TextButton.jsx"
import PrimaryButton from "./buttons/PrimaryButton.jsx"
import DangerButton from "./buttons/DangerButton.jsx"
import InputField from "./forms/InputField.jsx";
import { updateGoal, removeGoal } from "../utils/goalOperations.js";
import { useRef, useState } from "react";
import TextAreaField from "./forms/TextAreaField.jsx";

export default function ViewGoal({ goal, onClose, setGoals }) {
    const today = new Date().toISOString().split("T")[0]
    const [checkpoint, setCheckpoint] = useState({
        name: "",
        date: null,
        isDone: false
    });
    const [editGoal, setEditGoal] = useState({
        name: goal.name,
        deadline: goal.deadline,
        description: goal.description
    })
    const [editField, setEditField] = useState("");
    const deadline = new Date(goal.deadline) < new Date();
    const handleDelete = () => {
        onClose();
        removeGoal(goal, setGoals);
    }
    const handleChange = (e) => {
        setEditGoal(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
    const handleSave = (e) => {
        const updated = { ...goal, ...editGoal }
        updateGoal(updated, setGoals);
        setEditField("")
    }
    const handleCheckpointSave = () => {
        if (!checkpoint.name) return;

        const updatedGoal = {
            ...goal,
            benchmarks: [...goal.benchmarks, { ...checkpoint, id: checkpoint.name + new Date().toISOString() }]
        };

        updateGoal(updatedGoal, setGoals);
        setEditField("");
    };
    const handleCheckpointDeletion = (id) => {
        const updatedBenchmarks = goal.benchmarks.filter(c => c.id !== id);
        updateGoal({ ...goal, benchmarks: updatedBenchmarks }, setGoals);
    };
    const markCheckpointHasDone = (checkpoint) => {
        const updatedBenchmarks = goal.benchmarks.map((point) => {
            if (point.id === checkpoint.id || goal.benchmarks.indexOf(point) <= goal.benchmarks.findIndex(p => p.id === checkpoint.id)) {
                return { ...point, isDone: true, date: new Date() };
            }
            return point;
        });
        updateGoal({ ...goal, benchmarks: updatedBenchmarks }, setGoals);
    };

    const unmarkCheckpointHasDone = (checkpoint) => {
        const targetIndex = goal.benchmarks.findIndex(p => p.id === checkpoint.id);

        const updatedBenchmarks = goal.benchmarks.map((point, index) => {
            if (index >= targetIndex) {
                return { ...point, isDone: false, date: null };
            }
            return point;
        });

        updateGoal({ ...goal, benchmarks: updatedBenchmarks }, setGoals);
    };
    const markHasCompleted = () => {
        const updatedBenchmarks = goal.benchmarks.map(c => ({ ...c, isDone: true, date: new Date() }));
        const updatedGoal = {
            ...goal,
            benchmarks: updatedBenchmarks,
            isCompleted: true,
            completedAt: new Date()
        };
        updateGoal(updatedGoal, setGoals);
    }
    return (<div className="viewgoal">


        {(editField !== "all" && editField !== "name") && <span className="content-edit">
            <h2>{goal.name} {goal.isCompleted && <CircleCheckBig size="1em" />}</h2>
            {(!goal.isCompleted && !deadline) &&
                <TextButton
                    onClick={() => setEditField("name")}
                >Change <SquarePen size="1em" /></TextButton>}
        </span>}
        {(editField === "name" || editField === "all") && <span className="content-edit">
            <InputField
                name="name"
                type="text"
                value={editGoal.name}
                onChange={(e) => handleChange(e)}
            />
            <div className="action-btns">
                <TextButton
                    onClick={handleSave}
                >Save <SquarePen size="1em" /></TextButton>
                <TextButton
                    onClick={() => setEditField("")}
                >Discard</TextButton>
            </div>
        </span>}

        {(editField !== "all" && editField !== "deadline") && <span >{goal.deadline ?
            <span className="content-edit">
                <p className="bold">{formatDate(goal.deadline)}</p>
                {(!goal.isCompleted && !deadline) && <TextButton
                    onClick={() => setEditField("deadline")}
                >Change <SquarePen size="1em" /></TextButton>}
            </span> :
            (!goal.isCompleted && !deadline) && <TextButton
                onClick={() => setEditField("deadline")}
            >Add Deadline <SquarePen size="1em" /></TextButton>
        }
        </span>}
        {(editField === "deadline" || editField === "all") && <span className="content-edit">
            <InputField
                name="deadline"
                type="date"
                min={today}
                value={editGoal.deadline}
                onChange={(e) => handleChange(e)}
            />
            <div className="action-btns">
                <TextButton
                    onClick={handleSave}
                >Save <SquarePen size="1em" /></TextButton>
                <TextButton
                    onClick={() => setEditField("")}
                >Discard</TextButton>
            </div>
        </span>}


        {(editField !== "description" && editField !== "all") && <span>{goal.description ? <span className="content-edit">
            <p>{goal.description}</p>
            {(!goal.isCompleted && !deadline) && <TextButton
                onClick={() => setEditField("description")}
            >Change <SquarePen size="1em" /></TextButton>}
        </span> :
            <span className="content-edit">
                <p>No Description</p>
                {(!goal.isCompleted && !deadline) && <TextButton
                    onClick={() => setEditField("description")}
                >Add Description <SquarePen size="1em" /></TextButton>}
            </span>
        }</span>}
        {(editField === "description" || editField === "all") && <span className="content-edit">
            <TextAreaField
                name="description"
                value={editGoal.description}
                onChange={(e) => handleChange(e)}
            />
            <div className="action-btns">
                <TextButton
                    onClick={handleSave}
                >Save <SquarePen size="1em" /></TextButton>
                <TextButton
                    onClick={() => setEditField("")}
                >Discard</TextButton>
            </div>
        </span>}
        <span className="content-edit">
            <h3>{goal.benchmarks.length > 0 ? "Checkpoints" : "No Checkpoints"}</h3>
            {(!goal.isCompleted &&
                !deadline &&
                editField !== "all" &&
                editField !== "checkpoint") && <TextButton
                    onClick={() => setEditField("checkpoint")}
                >Add Checkpoint <SquarePen size="1em" /></TextButton>}
        </span>
        {(editField === "checkpoint" || editField === "all") && <span className="content-edit">
            <InputField
                name="name"
                value={checkpoint.name}
                onChange={(e) => setCheckpoint({
                    name: e.target.value,
                    date: null,
                    isDone: false
                })}
            />
            <div className="action-btns">
                <TextButton
                    onClick={handleCheckpointSave}
                >Save <SquarePen size="1em" /></TextButton>
                <TextButton
                    onClick={() => setEditField("")}
                >Discard</TextButton>
            </div>
        </span>}


        <div className="checkpoint-wrapper">

            {goal.benchmarks.length > 0 && <p className="bold">Goal Set - {formatDate(goal.createdAt)}</p>}
            {goal.benchmarks.length > 0 && <progress
                value={goal.benchmarks[0].isDone ? 100 : 50}
                max={100}></progress>}
            {goal.benchmarks.length > 0 && <div>{
                goal.benchmarks.map((c, i) => <div
                    key={c.id}
                >
                    <div className="checkpoint">
                        <p
                            className={c.isDone ? "bold" : ""}
                        >{c.name} {(c.date && c.isDone) ? `- ${formatDate(c.date)}` :
                            (goal.deadline < new Date() && !c.isDone) ?
                                <CircleX /> : ""
                            }</p>
                        {(!goal.isCompleted && !deadline) && <div className="action-btns">
                            {!c.isDone && <TextButton
                                onClick={() => markCheckpointHasDone(c)}
                            >Mark <CheckCheck
                                    size="1em"
                                /></TextButton>}
                            {c.isDone && <TextButton
                                onClick={() => unmarkCheckpointHasDone(c)}
                            >Unmark <X
                                    size="1em"
                                /></TextButton>}
                            <TextButton
                                onClick={() => handleCheckpointDeletion(c.id)}
                            >Delete <Trash2 size="1em" /></TextButton>
                        </div>}
                    </div>
                    {goal.benchmarks.length - 1 > i && <progress
                        value={(i < goal.benchmarks.length && goal.benchmarks[i + 1].isDone) ? 100 : c.isDone ? 50 : 0
                        }
                        max={100}></progress>}
                </div>)}
                {goal.benchmarks.length > 0 &&
                    <progress
                        value={goal.isCompleted ? 100 : (goal.benchmarks[goal.benchmarks.length - 1]).isDone ? 50 : 0}
                        max={100}></progress>
                }
            </div>}
            <span>{goal.isCompleted ? <p className={`${goal.isCompleted ? "bold" : ""}`}>Completed - {formatDate(goal.completedAt)}</p> :
                (goal.deadline && new Date(goal.deadline) < new Date()) ?
                    <p>Deadline Passed - {formatDate(goal.deadline)} <CircleX
                        size="1em" /></p> : <p>In progress - {formatDate(goal.deadline)}</p>
            }</span>
        </div>
        <div className="goal-action-btns">
            {!goal.isCompleted && <PrimaryButton
                onClick={markHasCompleted}
            >Mark as Completed <CheckCheck /></PrimaryButton>}
            <DangerButton
                onClick={handleDelete}
                className="danger">Delete <Trash2 /></DangerButton>
        </div>
    </div>)
}
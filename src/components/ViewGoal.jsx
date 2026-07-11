import formatDate from "../utils/formatDate";
import "./ViewGoal.css"
import { CircleCheck, CircleX, CircleCheckBig, CheckCheck, X, SquarePen, Trash2 } from "lucide-react"
import TextButton from "./buttons/TextButton.jsx"
import PrimaryButton from "./buttons/PrimaryButton.jsx"
import DangerButton from "./buttons/DangerButton.jsx"
export default function ViewGoal({ goal }) {
    const deadline = new Date(goal.deadline) < new Date();
    return (<div className="viewgoal">
        <span className="content-edit">
            <h2>{goal.name} {goal.isCompleted && <CircleCheckBig size="1em" />}</h2>
            {(!goal.isCompleted && !deadline) && <TextButton>Change <SquarePen size="1em" /></TextButton>}
        </span>
        <span >{goal.deadline ?
            <span className="content-edit">
                <p className="bold">{formatDate(goal.deadline)}</p>
                {(!goal.isCompleted && !deadline) && <TextButton>Change <SquarePen size="1em" /></TextButton>}
            </span> :
            (!goal.isCompleted && !deadline) && <TextButton>Add Deadline <SquarePen size="1em" /></TextButton>
            }
            </span>

        <span>{goal.description ? <span className="content-edit">
            <p>{goal.description}</p> 
            {(!goal.isCompleted && !deadline) && <TextButton>Change <SquarePen size="1em" /></TextButton>}
        </span> :
            <span className="content-edit">
                <p>No Description</p>
                {(!goal.isCompleted && !deadline) && <TextButton>Add Description <SquarePen size="1em" /></TextButton>}
            </span>
        }</span>
        <span className="content-edit">
            <h3>{goal.benchmarks.length > 0 ? "Checkpoints" : "No Checkpoints"}</h3>
            {(!goal.isCompleted && !deadline) && <TextButton>Add Checkpoint <SquarePen size="1em" /></TextButton>}
        </span>
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
                            {!c.isDone && <TextButton>Mark <CheckCheck
                                size="1em"
                            /></TextButton>}
                            {c.isDone && <TextButton>Unmark <X
                                size="1em"
                            /></TextButton>}
                            <TextButton>Delete <Trash2 size="1em" /></TextButton>
                        </div>}
                    </div>
                    {goal.benchmarks.length - 1 > i && <progress
                        value={(i < goal.benchmarks.length && goal.benchmarks[i + 1].isDone ) ? 100 : c.isDone ? 50 : 0
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
            {!goal.isCompleted && <PrimaryButton>Mark as Completed <CheckCheck /></PrimaryButton>}
            <DangerButton className="danger">Delete <Trash2 /></DangerButton>
        </div>
    </div>)
}
import formatDate from "../utils/formatDate"

export default function ({ goals, setViewGoal }) {
    return (goals.map(goal => <button
        onClick={() => setViewGoal(goal)}
        key={goal.id}
        className="goal">
        <p>{goal?.name}</p>
        <p>{formatDate(goal?.deadline)}</p>
    </button>)
    )
}
 export const addGoal = (goal, setGoals) => {
    try {
      setGoals(prev => {
        const updated = [...prev, goal];
        window.localStorage.setItem("goal", JSON.stringify(updated));
        return updated;
      });
      return { ok: true };
    } catch (e) {
      console.error("Failed to save goal:", e);
      return { ok: false, error: e };
    }
  };
  export const removeGoal = (goals, setGoals) => {
     try {
      setGoals(goals);
       window.localStorage.setItem("goal", JSON.stringify(goals));
      return { ok: true };
    } catch (e) {
      console.error("Failed to remove goal:", e);
      return { ok: false, error: e };
    }
  }
    export const updateGoal = (goals, setGoals) => {
     try {
      setGoals(goals);
       window.localStorage.setItem("goal", JSON.stringify(goals));
      return { ok: true };
    } catch (e) {
      console.error("Failed to remove goal:", e);
      return { ok: false, error: e };
    }
  }
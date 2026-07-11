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
  export const removeGoal = (goal, setGoals) => {
     try {
      setGoals(prev => {
        const updated = prev.filter(g => g.id !== goal.id );
        window.localStorage.setItem("goal", JSON.stringify(updated));
        return updated;
      });
      return { ok: true };
    } catch (e) {
      console.error("Failed to remove goal:", e);
      return { ok: false, error: e };
    }
  }
    export const updateGoal = (goal, setGoals) => {
     try {
      setGoals(prev => {
        const updated = prev.map(g => g.id === goal.id ? goal : g);
        window.localStorage.setItem("goal", JSON.stringify(updated));
        return updated;
      });
      return { ok: true };
    } catch (e) {
      console.error("Failed to update goal:", e);
      return { ok: false, error: e };
    }
  }
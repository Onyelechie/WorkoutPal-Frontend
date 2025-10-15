import WorkoutCard from "../WorkoutCard/WorkoutCard";
import "./MyWorkouts.css";

// Will eventually fetch from backend
const workouts = [
  { title: "Cardio Blast", description: "High intensity cardio workout." },
  { title: "Strength Training", description: "Build muscle and strength." },
  { title: "Yoga Flow", description: "Relaxing yoga session." },
];

function MyWorkouts() {
  return (
    <>
      <div className="my-workouts-container">
        <h2>My Workouts</h2>
        <div className="workout-cards-container">
          {workouts.map((w, i) => (
            <WorkoutCard key={i} title={w.title} description={w.description} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MyWorkouts;
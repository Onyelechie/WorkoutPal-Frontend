import { notYetImplemented } from "../../utils/construction";
import "./WorkoutCard.css";

interface WorkoutCardProps {
  title: string;
  description: string;
}

function WorkoutCard({ title, description }: WorkoutCardProps) {
  return (
    <div className="workout-card">
      <h3 className="workout-title">{title}</h3>
      <p className="workout-desc">{description}</p>
      <button className="workout-btn" onClick={notYetImplemented}>
        View Details
      </button>
    </div>
  );
}

export default WorkoutCard;

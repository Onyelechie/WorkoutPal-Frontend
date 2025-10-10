import '../styles/routine-builder.css';
import { notYetImplemented } from '../utils/ViewUtils';
import WeeklyGrid from './templates/WeeklyGrid';

export default function RoutineBuilderView() {

    return (
        <>
        <div className="routine-builder-container">
            
            <header className="routine-builder-header">
            <button onClick={notYetImplemented}>Back</button>
            <h2 className="routine-builder-title">Plan your weekly workout routine!</h2>
            <button onClick={notYetImplemented}>Start today's workout</button>
            </header>

            <WeeklyGrid/>
        </div>
        </>
    
    );
}
import { notYetImplemented } from '../utils/ViewUtils';
import WeeklyGrid from './templates/WeeklyGrid';

import '../styles/routine-builder.css';

export default function RoutineBuilderView() {

    return (
        <>
        <div className="routine-builder-container">
            
            <header className="routine-builder-header">
            <button onClick={notYetImplemented}>Back</button>
            <h2 className="routine-builder-title">Plan your weekly workout routine!</h2>
            <div className="routine-builder-action-buttons grouped-buttons">
                <button onClick={notYetImplemented}>Edit routine</button>
                <button onClick={notYetImplemented}>Start today's workout</button>
            </div>
            </header>

            <WeeklyGrid/>
        </div>
        </>
    
    );
}
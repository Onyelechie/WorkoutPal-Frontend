import { notYetImplemented } from '../../utils/construction.ts';
import WeeklyGrid from '../../components/WeeklyGrid/WeeklyGrid.tsx';

import './RoutineBuilder.css';

export default function RoutineBuilder() {

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
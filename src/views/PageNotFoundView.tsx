import '../styles/global/styles.css';

import { useNavigate } from 'react-router-dom';

export default function PageNotFound() {
    const navigate = useNavigate();

    function goHome() {
        navigate("/landing");
    };

    return (
    <>
        {/* Inline styles used here to avoid bloating CSS files */}
        <div style={{textAlign: 'center', padding: '2em'}}>
            <h1>Page not found! {":("}</h1>
            <button onClick={goHome}>Go back to home page</button>
        </div>
    </>
    );
};
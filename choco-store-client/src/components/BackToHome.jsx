import { useNavigate } from "react-router-dom";

const BackToHome = () => {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate(-1);
    }

    return (
        <>
            <button onClick={handleBackToHome} className="btn-secondary">Back to Home</button>
        </>
    );
};

export default BackToHome;
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton: React.FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <button className="back-button" onClick={() => navigate(to)}>
      ⬅ Back
    </button>
  );
};

export default BackButton;

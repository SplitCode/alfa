import { useNavigate } from 'react-router-dom';
import { AiOutlineLeft } from 'react-icons/ai';
import './BackButton.css';

const BackButton: React.FC<{ to: string }> = ({ to }) => {
  const navigate = useNavigate();
  return (
    <button className="back-button" onClick={() => navigate(to)}>
      <AiOutlineLeft size={24} />
    </button>
  );
};

export default BackButton;

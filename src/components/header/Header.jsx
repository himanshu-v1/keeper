import { useNavigate } from "react-router-dom";
import './header.scss';
function Header() {
  const navigate = useNavigate();
  
  const logout = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="header">
      <h1>keEpr</h1>
      <i className="fa-solid fa-right-from-bracket" title='Logout' onClick={logout}></i>
    </div>
  );
}

export default Header;
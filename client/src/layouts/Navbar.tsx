import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../services/logoutService";
import { useNavigate, useLocation } from "react-router-dom";
import { useLoginStore } from "../store/loginStore";
import { checkLoginStatus } from "../services/authService";
import { useAuthStore } from "../store/authStore"
// import Icon from '../assets/twogether-high-resolution-logo.svg';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const { firstName, lastName, setFirstName, setLastName, clearFirstName, clearLastName } = useLoginStore();

  const { isLoggedIn, setLoggedIn } = useAuthStore();

  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleLoginStatus = async () => {
      const status = await checkLoginStatus();
      if (status === 200) {
        setLoggedIn(true);
      }
      else{
        setLoggedIn(false);
      }
    };
    handleLoginStatus();
  }, []);

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedLastName = localStorage.getItem('lastName');
    if (storedFirstName && storedLastName) {
      setFirstName(storedFirstName);
      setLastName(storedLastName);
    }
  }, []);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await logoutUser();
      setLoggedIn(false);
      clearFirstName();
      clearLastName();
      navigate("/");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <nav className="bg-background h-13 uppercase">
      <div className="max-w-6xl mx-auto h-full px-8 py-2 flex justify-between items-center">
        <Link to="/" className={`relative group transform duration-500 hover:scale-105 p-2 font-bold font-display self-center ${
        currentPath === "/" ? "text-highlight" : "text-secondary hover:text-highlight"
        }`}>
          HARİTA
          <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
          </span>
          <span className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
          </span>
          <span className="absolute top-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
          </span>
          <span className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
          </span>
        </Link>

        <div className="h-full">
          <div className="flex h-full gap-8">
            { isLoggedIn ? (
              <>
                <Link to={`/profile/${firstName}`} className={`relative group transform duration-500 hover:scale-105 p-2 font-bold font-display self-center ${
                currentPath === `/profile/${firstName}` ? "text-highlight" : "text-secondary hover:text-highlight"
                }`}>
                  {firstName} {lastName} 
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                  <span className="absolute top-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                </Link>
                <Link to="/login" onClick={handleLogout} className="relative group transform duration-500 p-2 hover:scale-105 text-secondary font-bold font-display hover:text-highlight self-center">
                  Çıkış yap
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                  <span className="absolute top-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                </Link>
              </>
              ) : (
              <>
                <Link to="/register" className={`relative group transform duration-500 hover:scale-105 p-2 font-bold font-display self-center ${
                currentPath === `/register` ? "text-highlight" : "text-secondary hover:text-highlight"
                }`}>
                  Kayıt ol
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                  <span className="absolute top-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                </Link>
                <Link to="/login" className={`relative group transform duration-500 hover:scale-105 p-2 font-bold font-display self-center ${
                currentPath === `/login` ? "text-highlight" : "text-secondary hover:text-highlight"
                }`}>
                  GİRİŞ YAP
                  <span className="absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 left-0 h-full w-0.5 origin-bottom scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                  <span className="absolute top-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-highlight duration-300 group-hover:scale-x-100">
                  </span>
                  <span className="absolute bottom-0 right-0 h-full w-0.5 origin-top scale-y-0 transform bg-highlight duration-300 group-hover:scale-y-100">
                  </span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

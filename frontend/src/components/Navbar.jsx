import { BarChart3, BrainCircuit, LogOut, Upload, Users } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { role, name, logout } = useAuth();
  const navigate = useNavigate();

  const links = {
    candidate: [
      { to: "/candidate", label: "Analyze", icon: Upload },
      { to: "/candidate/history", label: "History", icon: BarChart3 },
    ],
    recruiter: [
      { to: "/recruiter", label: "Dashboard", icon: BarChart3 },
      { to: "/recruiter/candidates", label: "Candidates", icon: Users },
    ],
    admin: [
      { to: "/admin", label: "Admin", icon: Users },
      { to: "/recruiter", label: "Analytics", icon: BarChart3 },
    ],
  };

  function signOut() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div className="brand-wrap">
        <BrainCircuit size={27} />
        <div>
          <div className="brand">ResumeAI</div>
          <div className="brand-caption">Talent Platform</div>
        </div>
      </div>

      {role && (
        <>
          <nav className="nav-links">
            {(links[role] || []).map(({ to, label, icon: Icon }) => (
              <NavLink key={to} to={to} end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                <Icon size={17} /> {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-user">
            <span>{name}</span>
            <small>{role}</small>
            <button className="icon-button" onClick={signOut} title="Logout">
              <LogOut size={18} />
            </button>
          </div>
        </>
      )}
    </header>
  );
}

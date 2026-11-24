
import { Bell, Search, UserCircle } from "lucide-react";

function Header() {
  return (
    <header className="header">

      <div className="header-title">
        <h2>Dashboard</h2>
        <p>Welcome back to ViniBank!</p>
      </div>

      <div className="header-actions">
        <Search size={20} />
        <Bell size={20} />

        <div className="user-profile">
          <UserCircle size={35} />

          <div>
            <strong>Vinicius</strong>
            <span>Personal Account</span>
          </div>
        </div>
      </div>

    </header>
  );
}

export default Header;

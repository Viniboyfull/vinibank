
import { useState, useRef, useEffect } from "react";

import {
  LayoutDashboard,
  ArrowLeftRight,
  CreditCard,
  Wallet,
  Settings,
  Menu,
  X,
} from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuToggleRef = useRef(null);
  const closeButtonRef = useRef(null);
  const sidebarRef = useRef(null);

  const wasOpenRef = useRef(false);


  //Focus management
  useEffect(() => {
  if (isOpen) {
    // When the menu opens, move focus inside it.
    closeButtonRef.current?.focus();
  } else if (wasOpenRef.current) {
    // When the menu closes, return focus to the menu button.
    menuToggleRef.current?.focus();
  }

  wasOpenRef.current = isOpen;
}, [isOpen]);


function handleTrapFocus(event) {
  if (event.key !== "Tab") return;

  const focusableElements = sidebarRef.current?.querySelectorAll(
    'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );

  if (!focusableElements?.length) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}



useEffect(() => {
  if (!isOpen) return;

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  }

  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [isOpen]);


  
  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        ref={menuToggleRef}
        className="mobile-menu-toggle"
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
      >
        <Menu size={26} />
      </button>

      {/* Dark overlay */}
      {isOpen && (
        <button
          className="sidebar-overlay"
          onClick={closeMenu}
          aria-label="Close navigation menu"
        />
      )}

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        onKeyDown={handleTrapFocus}
        className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
        >
        <div className="sidebar-header">
          <h2 className="logo">ViniBank</h2>

          <button
            ref={closeButtonRef}
            className="mobile-close-button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav aria-label="Main navigation">
          <ul>
            <li>
              <button type="button" onClick={closeMenu}>
                <LayoutDashboard />
                <span>Dashboard</span>
              </button>
            </li>

            <li> 
              <button type="button" onClick={closeMenu}>
                <ArrowLeftRight />
              <span>Transactions</span>
              </button>
            </li>

            <li> 
              <button type="button" onClick={closeMenu}>
              <CreditCard />
              <span>My Cards</span>
              </button>
            </li>

            <li> 
              <button type="button" onClick={closeMenu}>
              <Wallet />
              <span>My Wallet</span>
              </button>
            </li>

            <li> 
              <button type="button" onClick={closeMenu}>
              <Settings />
              <span>Settings</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;

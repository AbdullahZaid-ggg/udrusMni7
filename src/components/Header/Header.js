import '../../styles/header.css';

export default function Header({ darkMode, onToggleDarkMode }) {
  return (
    <header className="header">
      <div className="header-main">
        <div className="header-content">
          <img
            src="https://www.gravatar.com/avatar?d=identicon"
            alt="Logo"
            className="header-logo"
          />
          <div className="header-text">
            <h1 className="header-title">ادرس منيح</h1>
            <p className="header-subtitle">طريقك للنجاح</p>
          </div>
        </div>
        <button 
          className="dark-mode-btn" 
          onClick={onToggleDarkMode}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}
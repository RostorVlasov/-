import React from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import logoSvg from '../assets/images/logo.svg';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, targetId?: string) => {
    if (location.pathname === '/' || location.pathname === path) {
      if (targetId) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', path);
        }
      }
    } else {
      navigate(path);
    }
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          to="/"
          className="site-logo"
          aria-label="Кот Моне — На главную"
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <img
            src={logoSvg}
            alt="Кот Моне"
            className="site-logo-img"
          />
        </Link>
        <nav className="site-nav" aria-label="Основная навигация">
          <NavLink
            to="/colors"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/colors', 'colors')}
          >
            Палитра
          </NavLink>
          <NavLink
            to="/tech"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/tech', 'tech')}
          >
            Материал
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link nav-link--cta ${isActive ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, '/contact', 'contact')}
          >
            Заявка
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

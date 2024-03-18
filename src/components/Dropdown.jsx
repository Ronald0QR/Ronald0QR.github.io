// Dropdown.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dropdown.css';

const Dropdown = ({ title, items, handleItemClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const onItemClick = (item) => {
    handleItemClick(item); // Pasa el objeto completo del ítem al padre
    setShowDropdown(false);
  };

  const clickFuera = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickFuera);

    return () => {
      document.removeEventListener('click', clickFuera);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {title}
      </div>

      {showDropdown && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <Link key={index} to={item.link} className="dropdown-item" onClick={() => onItemClick(item)}>
              {item.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

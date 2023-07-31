import React, { useState, useEffect, useRef, useCallback } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { Navbar } from './navbar/Navbar';
import { freeze, unfreeze } from '../../common/scroll';

const Header = () => {
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const subMenuRef = useRef(null);
  const [toggleSubmenu, setToggleSubmenu] = useState({});

  const handleClickOutside = useCallback((event) => {
    if (toggleMenu) {
      if (menuRef.current && !menuRef.current.contains(event.target) && subMenuRef.current && !subMenuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        setToggleMenu(false)
        setToggleSubmenu({})
      } else if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
        subMenuRef.current && subMenuRef.current.contains(event.target) ? null : setToggleMenu(false)
      }
    }
  }, [menuRef, subMenuRef, buttonRef, toggleMenu, setToggleMenu, setToggleSubmenu])
  
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside, false);
    };
  }, [toggleMenu])

  const handleClickEscape = useCallback((event) => {
    if (toggleMenu) {
      if (event.key === 'Escape' || event.keyCode === 27) {
        setToggleMenu(false)
        setToggleSubmenu({})
      }
    }
  },[toggleMenu, setToggleMenu, setToggleSubmenu]);

  useEffect(() => {
    document.addEventListener('keydown', handleClickEscape, false);
    return () => {
      document.removeEventListener('keydown', handleClickEscape, false);
    };
  }, [toggleMenu]);  

  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if (width || height) {
      setToggleMenu(false)
      setToggleSubmenu({})
    }
  }, [width, height])

  useEffect(() => {
    toggleMenu ? freeze() : unfreeze();
  }, [toggleMenu])

  return (
    <header className='header'>
        <div className='container'>
          <nav className={`nav ${toggleMenu ? 'isActive' : ''}`}>
            <button ref={buttonRef} onClick={() => setToggleMenu(p => !p)} className='btn btn-danger'>
              <span className='text'>Categories</span>
              <span className='icon'>
                {toggleMenu ? (
                  <img alt='Menu Close' src='/times.svg' className='close' />
                  ) : (
                  <img alt='Menu Open' src='/hamburger.svg' className='open' />
                )}
              </span>
            </button>
            
            <Navbar active={toggleMenu} onToggle={setToggleSubmenu} ref={menuRef} subMenuRef={subMenuRef} toggleSubmenu={toggleSubmenu} setToggleSubmenu={setToggleSubmenu} />
          </nav>
        </div>
    </header>
  )
}

export default Header
import React, { useState, useEffect, forwardRef, useRef, useCallback } from 'react'
import useWindowDimensions from '../../../hooks/useWindowDimensions'
import { freeze, unfreeze } from '../../../common/scroll'

const menus = [
  {_id: 1, label: 'PC', children: [
    { _id: 'dfjfdsf', label: 'Monitor' },
    { _id: 'fsdfdfd', label: 'TV' },
    { _id: 'sdfjsdf', label: 'Gaming' },
    { _id: 'trtrttt', label: 'Video' },
    { _id: 'dfftgtt', label: 'Option' },
    { _id: 'fdfdfff', label: 'Select Image' },
    { _id: 'fgefdfd', label: 'Created at' },
    { _id: 'grfg5gr', label: 'Music' },
    { _id: 'sfsfdfg', label: 'Football' },
    { _id: 'efdfdfd', label: 'Funny' }
  ]},
  {_id: 2, label: 'Computers'},
  {_id: 3, label: 'Monitors'},
  {_id: 4, label: 'Gaming'},
  {_id: 5, label: 'Laptop'},
  {_id: 6, label: 'Exclusive Shop'},
  {_id: 7, label: 'Video'},
  {_id: 9, label: 'Design Studio'},
  {_id: 11, label: 'SSD & RAM'},
  {_id: 12, label: 'Memory'},
  {_id: 13, label: 'Tower'},
  {_id: 14, label: 'Power Storage'},
  {_id: 15, label: 'Keyboard & Mouse'},
  {_id: 16, label: 'Speakers'},
  {_id: 17, label: 'Moblie'},
  {_id: 19, label: 'HI-FI'},
  {_id: 20, label: 'Mulitmedia'},
  {_id: 21, label: 'Visiblity'},
  {_id: 22, label: 'Photo'},
]

const Submenu = forwardRef((props, ref) => {
  const { active, data } = props;
  const { children } = data;

  return (
    <div ref={ref} className={`submenu ${active ? 'isActive' : ''}`}>
      <h3 className='title'>{data.label}</h3>

      <div className='submenu-item'>
        {children && children.map(item => {
          return (
            <div key={item._id}>{item.label}</div>
          )
        })}
      </div>
    </div>
  )
})

const SubmenuMobile = forwardRef((props, ref) => {
  const { active } = props;
  const dropdownRef = useRef(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  useEffect(() => {
    if (active && dropdownRef.current !== null) {
      setDropdownHeight(dropdownRef.current.scrollHeight)
    } else {
      setDropdownHeight(0)
    }
  }, [ active, dropdownRef ])

  // return (
  //   <ul ref={dropdownRef} style={{ height: active ? `${dropdownHeight}px` : `0px` }} className={`submenu-mobile ${active ? 'isActive' : ''}`}>
  //     <p>Test</p>
  //   </ul>
  // )

  return (
    <ul ref={dropdownRef} className={`submenu-mobile ${active ? 'isActive' : ''}`}>
      <p>Test</p>
    </ul>
  )
})

const Navbar = forwardRef((props, ref) => {
  const { active, subMenuRef, toggleSubmenu, setToggleSubmenu } = props;

  useEffect(() => {
    setToggleSubmenu({})
  }, [active])

  const onToggle = (item) => {
    setToggleSubmenu(p => {
      const prevId = p._id;
      const nextId = item._id
      
      if (prevId !== nextId) {
        return item
      }

      return {};
    })
  }  

  const isActive = toggleSubmenu && Object.keys(toggleSubmenu).length > 0;

  return (
    <>
      <div ref={ref} className={`menu ${active ? 'isActive' : ''}`}>
        <div className='wrapper'>
          <div className='inner'>
            <ul>
              {menus.map((item, idx) => {
                return (
                  <div className={`menu-item-wrapper ${toggleSubmenu._id === item._id ? 'isActive' : ''}`} key={item._id}>
                    <li className={`menu-item ${toggleSubmenu._id === item._id ? 'isActive' : ''}`} onClick={() => onToggle(item)} key={item._id}>  
                      <span className='text'>{item.label}</span>
                      <span className='icon'>
                        <img alt='Submenu' src='/arrow.svg' className='Submenu' />
                      </span>
                    </li>

                    {/* <SubmenuMobile active={toggleSubmenu._id === item._id} /> */}
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      <Submenu ref={subMenuRef} active={isActive} data={toggleSubmenu} />
    </>
  )
})



const Header = () => {
  // Menu
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  
  // Submenu
  const subMenuRef = useRef(null);
  const [toggleSubmenu, setToggleSubmenu] = useState({});

  // Outside click event
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
  
  // WATCH USECALLBACK EVENT LISTENER FOR PRESS OUTSIDE ELEMENT OF THE SCOPE OUTSIDE 
  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside, false);
    return () => {
      // Unbind the event listener on clean up
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

  // WATCH USECALLBACK EVENT LISTENER FOR PRESS ESCAPE BUTTON
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('keydown', handleClickEscape, false);
    return () => {
      // Unbind the event listener on clean up
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
            
            <Navbar active={toggleMenu} ref={menuRef} subMenuRef={subMenuRef} toggleSubmenu={toggleSubmenu} setToggleSubmenu={setToggleSubmenu} />
          </nav>
        </div>
    </header>
  )
}

export default Header
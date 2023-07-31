import React, { forwardRef, useEffect } from 'react';
import { Submenu } from '../submenu/Submenu';
import { menus } from '../../../utils/menus';

export const Navbar = forwardRef((props, ref) => {
    const { active, onToggle, subMenuRef, toggleSubmenu, setToggleSubmenu } = props;
  
    useEffect(() => {
      setToggleSubmenu({})
    }, [active])
  
    const handleOnToggle = (item) => {
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
                      <li className={`menu-item ${toggleSubmenu._id === item._id ? 'isActive' : ''}`} onClick={() => handleOnToggle(item)} key={item._id}>  
                        <span className='text'>{item.label}</span>
                        <span className='icon'>
                          <img alt='Submenu' src='/arrow.svg' className='Submenu' />
                        </span>
                      </li>
                    </div>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
  
        <Submenu ref={subMenuRef} active={isActive} onToggle={onToggle} data={menus} toggleSubmenu={toggleSubmenu} />
      </>
    )
  })
  
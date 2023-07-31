import React, { forwardRef } from 'react'

export const Submenu = forwardRef((props, ref) => {
    const { active, data, onToggle, toggleSubmenu } = props;
    const currentSelected = data && data.find(item => item._id === toggleSubmenu._id)

    return (
        <div ref={ref} className={`submenu ${active ? 'isActive' : ''}`}>
            <div className='submenu-header'>
                <h3 className='title'>{currentSelected && currentSelected.label}</h3>
                <button onClick={() => onToggle({})} type='button'>Back</button>
            </div>
            
            <div className='submenu-item'>
                {/* {currentSelected && currentSelected.length > 0 && currentSelected.map(item => {
                    return <div key={item._id}>1</div>
                })} */}
            </div>
        </div>
    )
})
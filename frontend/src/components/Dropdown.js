import React, { useState, useRef, useEffect } from 'react'

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false)
    const options = ['1', '2', '3']
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleOptionClick = (option) => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, []);

    return (
        <div ref={dropdownRef} style={{position: 'relative', width: '200px'}}>
            <div
                onClick={toggleDropdown}
                style={{
                    padding: '10px',
                    border: '1px solid #ccc',
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
            >
                -==
            </div>

            {isOpen && (
                <ul
                    style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        border: '1px solid #ccc',
                        borderTop: 'none',
                        position: 'absolute',
                        width: '100%',
                        backgroundColor: '#fff',
                        zIndex: 1000
                    }}
                >
                    {options.map((option, index) => (
                        <li
                        key={index}
                        onClick={() => handleOptionClick(option)}
                        style={{
                            padding: '10px',
                            cursor: 'pointer',
                            borderBottom: '1px solid #eee'
                        }}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown;
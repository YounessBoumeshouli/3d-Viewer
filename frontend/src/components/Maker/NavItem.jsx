import React from 'react';

const NavItem = ({ label, active, onClick }) => {
return (
<div
    className={`px-4 py-3 cursor-pointer ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
onClick={onClick}
>
<span className="text-gray-700">{label}</span>
</div>
);
};

export default NavItem;
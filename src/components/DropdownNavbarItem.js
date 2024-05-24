import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';

const DropdownNavbarItem = () => {
  const [label, setLabel] = useState('Dropdown');
  const history = useHistory();

  const handleSelection = (selectedLabel, path) => {
    setLabel(selectedLabel);
    history.push(path);
  };

  return (
    <div className="navbar__item dropdown">
      <button className="dropdown__toggle">{label}</button>
      <ul className="dropdown__menu">
        <li className="dropdown__item" onClick={() => handleSelection('Item 1', '/docs/item1')}>
          Item 1
        </li>
        <li className="dropdown__item" onClick={() => handleSelection('Item 2', '/docs/item2')}>
          Item 2
        </li>
        <li className="dropdown__item" onClick={() => handleSelection('Item 3', '/docs/item3')}>
          Item 3
        </li>
      </ul>
    </div>
  );
};

export default DropdownNavbarItem;
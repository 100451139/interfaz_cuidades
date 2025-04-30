import React from 'react';
import { Building2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Building2 size={32} />
          <h1 className="header-title">Ayuntamiento Virtual</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
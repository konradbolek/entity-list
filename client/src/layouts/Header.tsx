import React from "react";

const Header = () => {
  return (
    <header className="py-4 bg-slate-600 flex">
      <div className="container mx-auto text-xl font-bold text-white flex-row">
        <div className="flex float-start">Entity List App</div>
        <div className="flex float-end">Konrad Bolek - Polcode</div>
      </div>
    </header>
  )
}

export default Header;

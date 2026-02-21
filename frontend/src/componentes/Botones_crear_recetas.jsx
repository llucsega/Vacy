import React from 'react';

const ActionButtons = () => {
  return (
    <div className="flex gap-3 mt-3 mb-3 px-2">
      {/* Botó Nueva Receta */}
      <button className="flex-1 bg-[#4b3621] text-[#f4ece1] py-4 rounded-[18px] flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform">
        <span className="font-extrabold text-[0.9rem] uppercase">Nueva Receta</span>
        <small className="text-[0.7rem] opacity-80 mt-0.5">+ Crear la tuya</small>
      </button>

      {/* Botó Ayuda Vacy */}
      <button className="relative flex-1 bg-white border-2 border-[#4b3621] text-[#4b3621] py-4 rounded-[18px] flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform">
        <span className="font-extrabold text-[0.9rem] uppercase">Ayuda Vacy</span>
        <small className="text-[0.7rem] opacity-80 mt-0.5">IA Generadora</small>
      </button>
    </div>
  );
};

export default ActionButtons;
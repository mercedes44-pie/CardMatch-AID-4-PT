
import React from 'react';

interface HeaderProps {
    onReset: () => void;
    onSave: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset, onSave }) => {
    return (
        <header className="h-12 shrink-0 bg-[#111718] border-b border-surface-border flex items-center justify-between px-4 z-30 shadow-md">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-8 text-primary">
                    <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>style</span>
                </div>
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white truncate">天天記牌</h1>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={onReset}
                    className="flex items-center gap-1 px-2 py-1 text-xs sm:text-sm font-medium text-[#9db4b9] hover:text-white hover:bg-surface-border rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                    <span className="hidden sm:inline">重置</span>
                </button>
                <button 
                    onClick={onSave}
                    className="bg-primary hover:bg-[#11b5d6] text-black text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(19,200,236,0.3)] transition-all flex items-center gap-1"
                >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    儲存
                </button>
            </div>
        </header>
    );
};

export default Header;


import React from 'react';
import { GridSize, GridState, CellContent, GameItem } from '../types';
import { GRID_CONFIGS, AVAILABLE_ITEMS, TargetIcon } from '../constants';

interface GameGridProps {
    gridSize: GridSize;
    gridState: GridState;
    onDrop: (e: React.DragEvent, cellKey: string) => void;
    onItemDragStart: (e: React.DragEvent, cellKey: string, content: CellContent) => void;
    onRemove: (cellKey: string) => void;
    selectedCell: string | null;
    onSelectCell: (cellKey: string | null) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ 
    gridSize, 
    gridState, 
    onDrop, 
    onItemDragStart, 
    onRemove,
    selectedCell,
    onSelectCell
}) => {
    const { rows, cols } = GRID_CONFIGS[gridSize];

    const renderCellContent = (cellKey: string) => {
        const content = gridState[cellKey];
        if (!content) return null;

        let item = AVAILABLE_ITEMS.find((i) => i.id === content.itemId);
        if (!item) return null;

        return (
            <div
                className={`w-full h-full rounded-xl ${item.colorClass} shadow-xl border-2 border-white/40 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-[1.05] transition-transform relative group`}
                draggable="true"
                onDragStart={(e) => {
                    e.stopPropagation();
                    onItemDragStart(e, cellKey, content);
                }}
            >
                <button 
                    className="absolute -top-3 -right-3 size-7 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center shadow-lg border-2 border-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove(cellKey);
                    }}
                >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                </button>

                {item.id === 'rainbow_boat' ? (
                    <div className="flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-white drop-shadow-md text-[40px] sm:text-[52px] leading-none -mb-3" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
                            {item.icon}
                        </span>
                        <span className="material-symbols-outlined text-white drop-shadow-md text-[24px] sm:text-[30px] leading-none" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
                            star
                        </span>
                    </div>
                ) : item.id === 'star_stick' ? (
                    <div className="flex flex-col items-center rotate-45 translate-y-1">
                        <span className="material-symbols-outlined text-white drop-shadow-md text-[36px] sm:text-[46px] leading-none" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
                            star
                        </span>
                        <div className="w-2.5 h-8 sm:h-10 bg-white rounded-full shadow-sm -mt-2"></div>
                    </div>
                ) : item.id === 'target' ? (
                    <TargetIcon />
                ) : (
                    <span className="material-symbols-outlined text-white text-4xl sm:text-6xl drop-shadow-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                    </span>
                )}
            </div>
        );
    };

    const cells = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellKey = `${r}-${c}`;
            const isSelected = selectedCell === cellKey;
            
            cells.push(
                <div
                    key={cellKey}
                    tabIndex={0}
                    className={`size-20 sm:size-28 lg:size-32 rounded-2xl bg-[#162629] border-2 transition-all flex items-center justify-center cursor-pointer outline-none
                        ${isSelected 
                            ? 'border-primary shadow-[0_0_15px_rgba(19,200,236,0.4)] scale-105 z-10' 
                            : 'border-dashed border-surface-border hover:border-primary/50'
                        }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelectCell(cellKey);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => onDrop(e, cellKey)}
                >
                    {!gridState[cellKey] && (
                        <span className={`material-symbols-outlined text-3xl pointer-events-none transition-opacity ${isSelected ? 'text-primary opacity-80' : 'text-surface-border opacity-30'}`}>
                            {isSelected ? 'touch_app' : 'add'}
                        </span>
                    )}
                    {renderCellContent(cellKey)}
                </div>
            );
        }
    }

    return (
        <section 
            className="flex-1 overflow-auto bg-[radial-gradient(#192b2f_1.5px,transparent_1.5px)] [background-size:24px_24px] flex items-center justify-center p-4 lg:p-8"
            onClick={() => onSelectCell(null)}
        >
            <div 
                className="bg-[#111718] p-5 sm:p-8 rounded-[2rem] border-2 border-surface-border shadow-[0_0_50px_rgba(0,0,0,0.5)] relative"
                onClick={(e) => e.stopPropagation()}
            >
                <div 
                    className="grid gap-4 sm:gap-6" 
                    style={{ 
                        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                        minWidth: 'fit-content' 
                    }}
                >
                    {cells}
                </div>
            </div>
        </section>
    );
};

export default GameGrid;

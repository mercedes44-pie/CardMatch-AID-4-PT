
import React from 'react';
import { AVAILABLE_ITEMS, TargetIcon } from '../constants';
import { GameItem } from '../types';

interface ItemTrayProps {
    onDragStart: (e: React.DragEvent, item: GameItem) => void;
}

const ItemTray: React.FC<ItemTrayProps> = ({ onDragStart }) => {
    return (
        <section className="h-28 shrink-0 bg-[#162629] border-t border-surface-border flex flex-col z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.2)]">
            <div className="flex-1 flex items-center px-4 overflow-x-auto scrollbar-hide">
                <div className="flex items-center gap-4 mx-auto w-max px-2 py-2">
                    {AVAILABLE_ITEMS.map((item, index) => (
                        <div
                            key={item.id}
                            className={`size-16 card-base ${item.colorClass} group cursor-grab active:cursor-grabbing relative`}
                            draggable="true"
                            onDragStart={(e) => onDragStart(e, item)}
                        >
                            {/* Shortcut badge */}
                            <div className="absolute -top-1.5 -left-1.5 size-5 bg-black/80 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-bold text-white z-10 pointer-events-none">
                                {index + 1}
                            </div>

                            {item.id === 'rainbow_boat' ? (
                                <div className="flex flex-col items-center justify-center">
                                    <span className="material-symbols-outlined text-white drop-shadow-md text-[28px] leading-none -mb-2" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
                                        {item.icon}
                                    </span>
                                    <span className="material-symbols-outlined text-white drop-shadow-md text-[16px] leading-none" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
                                        star
                                    </span>
                                </div>
                            ) : item.id === 'star_stick' ? (
                                <div className="flex flex-col items-center rotate-45 translate-y-0.5">
                                    <span className="material-symbols-outlined text-white drop-shadow-md text-[22px] leading-none" style={{ fontVariationSettings: "'FILL' 1, 'wght' 700" }}>
                                        star
                                    </span>
                                    <div className="w-1.5 h-5 bg-white rounded-full shadow-sm -mt-1"></div>
                                </div>
                            ) : item.id === 'target' ? (
                                <TargetIcon />
                            ) : (
                                <span className="material-symbols-outlined card-icon">
                                    {item.icon}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ItemTray;


import React from 'react';
import { GridSize } from '../types';

interface GridSelectorProps {
    currentSize: GridSize;
    onSizeChange: (size: GridSize) => void;
}

const GridSelector: React.FC<GridSelectorProps> = ({ currentSize, onSizeChange }) => {
    const sizes: GridSize[] = ['2x4', '3x4', '2x6', '3x6', '2x8', '3x8'];

    return (
        <section className="h-12 shrink-0 bg-[#101f22] border-b border-surface-border flex items-center justify-center relative z-20">
            <div className="w-full overflow-x-auto scrollbar-hide flex justify-start sm:justify-center px-4">
                <div className="flex items-center gap-1 bg-surface-border/50 p-1 rounded-lg border border-surface-border mx-auto my-1.5 shrink-0">
                    {sizes.map((size) => (
                        <label key={size} className="cursor-pointer group relative">
                            <input
                                className="peer sr-only"
                                name="grid_size"
                                type="radio"
                                value={size}
                                checked={currentSize === size}
                                onChange={() => onSizeChange(size)}
                            />
                            <span className="block px-3 py-1 rounded text-xs font-medium text-[#9db4b9] peer-checked:bg-[#111718] peer-checked:text-primary peer-checked:shadow-sm transition-all group-hover:text-white">
                                {size}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GridSelector;

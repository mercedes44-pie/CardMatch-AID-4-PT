
import React from 'react';
import { GameItem, GridSize } from './types';

export const GRID_CONFIGS: Record<GridSize, { rows: number; cols: number }> = {
    '2x4': { rows: 2, cols: 4 },
    '3x4': { rows: 3, cols: 4 },
    '2x6': { rows: 2, cols: 6 },
    '3x6': { rows: 3, cols: 6 },
    '2x8': { rows: 2, cols: 8 },
    '3x8': { rows: 3, cols: 8 },
};

export const AVAILABLE_ITEMS: GameItem[] = [
    { id: 'anchor', icon: 'anchor', type: 'material', colorClass: 'card-magenta' },
    { id: 'wine', icon: 'wine_bar', type: 'material', colorClass: 'card-red' },
    { id: 'target', icon: 'target', type: 'svg', colorClass: 'card-orange' }, // Inserted here (3rd position)
    { id: 'compass', icon: 'explore', type: 'material', colorClass: 'card-green' },
    { id: 'music', icon: 'music_note', type: 'material', colorClass: 'card-yellow' },
    { id: 'sailing', icon: 'sailing', type: 'material', colorClass: 'card-purple' },
    { id: 'search', icon: 'search', type: 'material', colorClass: 'bg-card-9' },
    { id: 'rainbow_boat', icon: 'directions_boat', type: 'material', colorClass: 'card-rainbow' },
    { id: 'star_stick', icon: 'star', type: 'material', colorClass: 'bg-card-8' },
];

export const TargetIcon = () => (
    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-md select-none pointer-events-none fill-current" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12.55 2 13 2.45 13 3V5.07C15.86 5.53 18.06 7.74 18.5 10.6H21C21.55 10.6 22 11.05 22 11.6V12.4C22 12.95 21.55 13.4 21 13.4H18.5C18.06 16.27 15.85 18.47 13 18.93V21C13 21.55 12.55 22 12 22S11 21.55 11 21V18.93C8.14 18.47 5.94 16.26 5.5 13.4H3C2.45 13.4 2 12.95 2 12.4V11.6C2 11.05 2.45 10.6 3 10.6H5.5C5.94 7.73 8.15 5.53 11 5.07V3C11 2.45 11.45 2 12 2M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7M12 9C13.66 9 15 10.34 15 12S13.66 15 12 15 9 13.66 9 12 10.34 9 12 9Z" />
    </svg>
);


export type GridSize = '2x4' | '3x4' | '2x6' | '3x6' | '2x8' | '3x8';

export interface GameItem {
    id: string;
    icon: string;
    type: 'material' | 'svg';
    colorClass: string;
}

export interface CellContent {
    itemId: string;
    instanceId: string;
}

export type GridState = Record<string, CellContent | null>;

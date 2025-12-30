
import React, { useState, useCallback, useEffect } from 'react';
import { GridSize, GridState, GameItem, CellContent } from './types';
import Header from './components/Header';
import GridSelector from './components/GridSelector';
import GameGrid from './components/GameGrid';
import ItemTray from './components/ItemTray';
import RotationOverlay from './components/RotationOverlay';
import { AVAILABLE_ITEMS } from './constants';

const App: React.FC = () => {
    const [gridSize, setGridSize] = useState<GridSize>('3x6');
    const [gridState, setGridState] = useState<GridState>({});
    const [selectedCell, setSelectedCell] = useState<string | null>(null);

    // Drag-and-drop tracking
    const [draggedItem, setDraggedItem] = useState<GameItem | null>(null);
    const [draggedFromCell, setDraggedFromCell] = useState<string | null>(null);

    const handleReset = useCallback(() => {
        setGridState({});
        setSelectedCell(null);
    }, []);

    const handleSave = useCallback(() => {
        console.log('Saving layout:', gridState);
        alert('佈局已儲存！');
    }, [gridState]);

    const handleSizeChange = (newSize: GridSize) => {
        setGridSize(newSize);
        setSelectedCell(null); // Clear selection on size change to avoid orphan selection
    };

    const handleTrayDragStart = (e: React.DragEvent, item: GameItem) => {
        setDraggedItem(item);
        setDraggedFromCell(null);
        e.dataTransfer.setData('source', 'tray');
    };

    const handleCellDragStart = (e: React.DragEvent, cellKey: string, content: CellContent) => {
        setDraggedItem({ 
            id: content.itemId, 
            icon: '', 
            type: 'material', 
            colorClass: '' 
        });
        setDraggedFromCell(cellKey);
        e.dataTransfer.setData('source', 'grid');
    };

    const handleDrop = (e: React.DragEvent, targetCellKey: string) => {
        e.preventDefault();
        
        if (!draggedItem) return;

        setGridState((prev) => {
            const newState = { ...prev };

            if (draggedFromCell) {
                const itemMoving = newState[draggedFromCell];
                delete newState[draggedFromCell];
                newState[targetCellKey] = itemMoving!;
            } else {
                newState[targetCellKey] = {
                    itemId: draggedItem.id,
                    instanceId: Math.random().toString(36).substr(2, 9),
                };
            }

            return newState;
        });

        setDraggedItem(null);
        setDraggedFromCell(null);
        setSelectedCell(targetCellKey);
    };

    const handleRemove = (cellKey: string) => {
        setGridState((prev) => {
            const newState = { ...prev };
            delete newState[cellKey];
            return newState;
        });
    };

    const placeItemAtCell = useCallback((itemId: string, cellKey: string) => {
        setGridState((prev) => ({
            ...prev,
            [cellKey]: {
                itemId,
                instanceId: Math.random().toString(36).substr(2, 9),
            }
        }));
    }, []);

    // Handle Keyboard 1-9
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!selectedCell) return;
            
            const key = parseInt(e.key);
            if (key >= 1 && key <= 9) {
                const item = AVAILABLE_ITEMS[key - 1];
                if (item) {
                    placeItemAtCell(item.id, selectedCell);
                }
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                handleRemove(selectedCell);
            } else if (e.key === 'Escape') {
                setSelectedCell(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedCell, placeItemAtCell]);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <RotationOverlay />
            
            <Header onReset={handleReset} onSave={handleSave} />
            
            <main className="flex-1 flex flex-col overflow-hidden relative">
                <GridSelector 
                    currentSize={gridSize} 
                    onSizeChange={handleSizeChange} 
                />
                
                <GameGrid 
                    gridSize={gridSize}
                    gridState={gridState}
                    onDrop={handleDrop}
                    onItemDragStart={handleCellDragStart}
                    onRemove={handleRemove}
                    selectedCell={selectedCell}
                    onSelectCell={setSelectedCell}
                />
                
                <ItemTray onDragStart={handleTrayDragStart} />
            </main>
        </div>
    );
};

export default App;

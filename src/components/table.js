import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const Table = ({ rows, columns, cellWidth, cellHeight }) => {
    const renderCells = () => {
        const cells = [];

        for (let row = 0; row < rows; row++) {
            for (let column = 0; column < columns; column++) {
                const x = 10 + column * cellWidth;
                const y = 1000 + row * cellHeight;

                const isEvenRow = row % 2 === 0;
                const isEvenColumn = column % 2 === 0;

                const cellText = isEvenRow && isEvenColumn ? 'четный' : '';

                cells.push(
                    <Rect
                        key={`${row}-${column}`}
                        x={x}
                        y={y}
                        width={cellWidth}
                        height={cellHeight}
                        stroke="black"
                        strokeWidth={1}
                    />
                );

                cells.push(
                    <Text
                        key={`text-${row}-${column}`}
                        x={x}
                        y={y}
                        width={cellWidth}
                        height={cellHeight}
                        text={cellText}
                        align="center"
                        verticalAlign="middle"
                    />
                );
            }
        }

        return cells;
    };

    return renderCells()

};

export default Table;

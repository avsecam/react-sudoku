import React, { useContext, useEffect, useState } from "react"
import { SudokuContext } from "./context"

type CellProps = {
	number: number,
	index: [number, number],
}
export const Cell = ({ number, index }: CellProps) => {
	const [currentValue, setValue] = useState<number>(number) // Default to 0
	const { data, changeCellData } = useContext(SudokuContext)

	const numberInContext: number = data[index[0]][index[1]]
	useEffect(() => {
		setValue(numberInContext)
	}, [numberInContext])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: [number, number]) => {
		const numberValue: number = Number.parseInt(e.target.value) | 0
		const numberValueClamped: number = (numberValue < 1) ? 0 : (numberValue > 9) ? 9 : numberValue // Clamp within [0, 9]
		changeCellData(numberValueClamped, index)
		setValue(numberValueClamped)
	}

	return (
		<>
			<div className="cell">
				<input
					type="number"
					value={currentValue}
					onChange={(e) => handleChange(e, index)}
				/>
			</div>
		</>
	)
}
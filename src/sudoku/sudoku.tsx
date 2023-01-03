import React, { useContext } from "react"
import { Cell } from "./cell"
import { SudokuContext } from "./context"
import "./styles.css"
import { numberOfCellsInGroup } from "./utils"

export const SudokuContainer = () => {
	const { data, attemptToSolve, clearBoard } = useContext(SudokuContext)

	let cells: JSX.Element[] = []
	for (var i = 0; i < numberOfCellsInGroup; ++i) {
		for (var j = 0; j < numberOfCellsInGroup; ++j) {
			const number: number = (data[i][j] !== undefined) ? data[i][j] : 0
			cells.push(
				<Cell number={number} index={[i, j]} key={(i * numberOfCellsInGroup) + j} />
			)
		}
	}
	return (
		<>
			<div className="actions">
				<button onClick={attemptToSolve}>Solve</button>
				<button onClick={clearBoard}>Clear</button>
			</div>
			<div className="container">
				{cells}
			</div>
		</>
	)
}
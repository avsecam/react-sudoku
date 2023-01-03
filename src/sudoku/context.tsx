import React, { createContext, useEffect, useState } from "react"
import { numberOfCellsInGroup } from "./utils"

type TSudokuContext = {
	data: number[][],
	changeCellData: (number: number, idx: [number, number]) => void,
	attemptToSolve: () => void,
	clearBoard: () => number[][],
}

export const SudokuContext = createContext({} as TSudokuContext)

type SudokuProviderProps = {
	children: JSX.Element,
}
export const SudokuProvider = (props: SudokuProviderProps) => {
	const [data, setData] = useState<number[][]>(
		[
			[9, 7, 1, 5, 0, 0, 8, 4, 2],
			[0, 0, 6, 9, 0, 0, 0, 1, 0],
			[0, 0, 0, 8, 0, 2, 0, 0, 9],
			[5, 0, 0, 0, 0, 0, 7, 9, 0],
			[0, 0, 7, 6, 0, 8, 3, 0, 0],
			[0, 2, 8, 0, 0, 0, 0, 0, 5],
			[7, 0, 0, 1, 0, 5, 0, 0, 0],
			[0, 4, 0, 0, 0, 9, 1, 0, 0],
			[8, 1, 9, 0, 0, 7, 2, 5, 4]
		]
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	const changeCellData = (number: number, idx: [number, number]) => {
		let newData: number[][] = data
		newData[idx[0]][idx[1]] = number

		setData(newData)
	}

	const attemptToSolve = async () => {
		let boardAsString: string = ""
		for (var i = 0; i < numberOfCellsInGroup; ++i) {
			for (var j = 0; j < numberOfCellsInGroup; ++j) {
				if (data[i][j] > 0 && data[i][j] < 10) boardAsString += data[i][j].toString()
				else boardAsString += "."
			}
		}

		await fetch("http://localhost:8010/proxy", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ sudoku: [boardAsString] }),
		})
			.then(res => res.json())
			.then(val => {
				const solution: string[] = [...val.data[0].solution]

				let newData: number[][] = clearBoard()
				for (var i = 0; i < numberOfCellsInGroup; ++i) {
					for (var j = 0; j < numberOfCellsInGroup; ++j) {
						newData[i][j] = Number.parseInt(solution[(i * numberOfCellsInGroup) + j])
					}
				}
				setData(newData)
			})
			.catch(err => console.error(err))
	}

	const clearBoard = () => {
		const newData: number[][] = Array<number[]>(9).fill([]).map(() => Array<number>(9).fill(0))
		setData(newData)
		return newData
	}

	return (
		<SudokuContext.Provider value={{ data, changeCellData, attemptToSolve, clearBoard }}>
			{props.children}
		</SudokuContext.Provider>
	)
}
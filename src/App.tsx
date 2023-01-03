import './App.css';
import React from 'react';
import { SudokuContainer } from './sudoku/sudoku';
import { SudokuProvider } from './sudoku/context';

const App = () => {
	return (
		<div className='App'>
			<SudokuProvider>
				<SudokuContainer />
			</SudokuProvider>
		</div>
	)
}

export default App;

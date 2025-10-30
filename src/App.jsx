import styles from "./app.module.css";
import { useState } from 'react';

function App() {
	let [value, setValue] = useState('');
	let [list, setList] = useState([]);
	let [error, setError] = useState('');

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение');

		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const isValueValid = value.length >= 3;

	const onAddButtonClick = () => {
		if (isValueValid) {
			setValue('');
			setError('');
			// 1. Через updatedList:
			// const updatedList = [...list, { id, value }];
			// setList(updatedList);
			// console.log('updatedList:', updatedList);
			// 2. Или в одну строку:
			// setList([...list, { id: Date.now(), value }]);
			// 3. Через updater-функцию:
			setList((prevList) => [...prevList, { id: Date.now(), value }]);
		}
	}

	return (
		<div className={styles['app']}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles['error']}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles['button']} onClick={onInputButtonClick}>Ввести новое</button>
				<button className={styles['button']} disabled={!isValueValid} onClick={onAddButtonClick}>Добавить в список</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length > 0 ? (
					<ul className={styles['list']}>
						{list.map(item => (
							<li key={item.id} className={styles['list-item']}>{item.value}</li>
						))}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	)
}

export default App

import { Button, Input } from '@mantine/core';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import Image from 'next/image';

import { IconSearch } from '@/assets/icons';
import { SearchForm } from '@/components/vacancies/types';

import { useStyles } from './styles';

const INPUT_PADDING = 24;
const SEARCH_ICON_WIDTH = 13;
const SEARCH_ICON_X_PADDINGS = 23;

interface VacanciesSearchProps {
	control: Control<SearchForm>;
	onChange: React.FormEventHandler<HTMLFormElement>;
}

const VacanciesSearch: React.FC<VacanciesSearchProps> = ({
	onChange,
	control,
}) => {
	const { classes } = useStyles({
		iconSectionWidth: SEARCH_ICON_WIDTH + SEARCH_ICON_X_PADDINGS,
	});

	const [buttonWidth, setButtonWidth] = useState<number>();
	const searchButtonRef = useRef<HTMLButtonElement>(null);

	useLayoutEffect(() => {
		const buttonRect = searchButtonRef.current?.getBoundingClientRect();
		const width = buttonRect ? buttonRect.width + INPUT_PADDING : 0;

		setButtonWidth(width);
	}, []);

	return (
		<form onSubmit={onChange}>
			<Controller
				name="search"
				render={({ field }) => (
					<Input
						{...field}
						data-elem="search-input"
						size="lg"
						radius="md"
						placeholder="Введите название вакансии"
						className={classes.searchInput}
						icon={
							<Image src={IconSearch} alt="" className={classes.searchIcon} width={13} />
						}
						iconWidth={SEARCH_ICON_WIDTH + SEARCH_ICON_X_PADDINGS}
						rightSectionWidth={buttonWidth}
						rightSection={
							<Button
								ref={searchButtonRef}
								data-elem="search-button"
								type="submit"
								className={classes.inputButton}
								size="xs"
							>
								Поиск
							</Button>
						}
					/>
				)}
				control={control}
			/>
		</form>
	);
};

export default VacanciesSearch;

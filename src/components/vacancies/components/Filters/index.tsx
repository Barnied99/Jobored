import { yupResolver } from '@hookform/resolvers/yup';
import { Button, NumberInput, Paper, Stack, Select } from '@mantine/core';
import Image from 'next/image';
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { Controller, useForm } from 'react-hook-form';

import { IconChevronDown } from '@/assets/icons';
import { FormGroup } from '@/components/common/component';
import { Catalogue, FiltersForm } from '@/components/vacancies/types';

import { FiltersHeader } from './components';
import { useStyles } from './styles';
import { filterSchema } from './validation';

const PAYMENT_STEP = 50;

interface FiltersProps {
	fields?: Catalogue[];
	values?: FiltersForm;
	sticky?: boolean;
	onChange: (values: FiltersForm) => void;
	className?: string;
	experienceKey: any;
	typework: any;
}

const Filters: React.FC<FiltersProps> = ({
	fields,
	values = { catalogues: '', payment_from: 0, payment_to: 0, expirience: '' },
	sticky,
	onChange,
	className,
	experienceKey,
	typework
}) => {
	const { handleSubmit, control, reset } = useForm<{ type_of_work: string; catalogues: string; expirience: string; payment_from: number; payment_to: number; typework: string }>({ //any
		resolver: yupResolver(filterSchema),
		defaultValues: values,
	});

	const [top, setTop] = useState<number>();

	const paperRef = useRef<HTMLFormElement>(null);
	const { classes, cx } = useStyles();

	const handledFields = useMemo(
		() =>
			fields?.map((field) => ({
				label: field.title_trimmed,
				value: field.key.toString(),
			})) ?? [],
		[fields]
	);

	const handledReferences = useMemo(
		() =>
			experienceKey?.map((field) => ({
				label: field[1],
				value: field[0],
			})) ?? [],
		[experienceKey]
	);

	const handledTypeWork = useMemo(
		() =>
			typework?.map((field) => ({
				label: field[1],
				value: field[0],
			})) ?? [],
		[typework]
	);

	const onSubmit = useCallback(
		(formValues: FiltersForm) => {
			const from = formValues.payment_from
				? Number(formValues.payment_from)
				: 0;

			const to = formValues.payment_to ? Number(formValues.payment_to) : 0;
			onChange({
				catalogues: formValues.catalogues,
				payment_from: from,
				payment_to: to,
				expirience: formValues.expirience,
				type_of_work: formValues.type_of_work
			});
		},
		[onChange]
	);

	const onReset = useCallback(() => {
		reset();
		onChange({ catalogues: '', payment_from: 0, payment_to: 0, expirience: '', type_of_work: '' });
	}, [onChange]);

	useEffect(() => {
		reset(values);
	}, [values]);

	useEffect(() => {
		setTop(paperRef.current?.getBoundingClientRect().top);
	}, []);

	return (
		<Paper
			radius="md"
			ref={paperRef}
			onSubmit={handleSubmit(onSubmit)}
			component="form"
			className={cx(className, classes.filterDesktop__wrapper)}
			pos={sticky ? 'sticky' : undefined}
			top={sticky ? top : undefined}
			withBorder
		>
			<FiltersHeader onFiltersReset={onReset} />

			<Stack spacing={16} mt={27}>
				<FormGroup title="Отрасль">
					<Controller
						name="catalogues"
						render={({ field }) => (
							<Select
								data={handledFields}
								data-elem="industry-select"
								{...field}
								size="md"
								placeholder="Выберите отрасль"
								className={classes.filters__select}
								rightSection={
									<Image
										src={IconChevronDown}
										alt=""
										className={classes.chevronDownIcon}
									/>
								}
							/>
						)}
						control={control}//
					/>
				</FormGroup>

				<FormGroup title="Оклад">
					<Controller
						name="payment_from"
						render={({ field, fieldState }) => (
							<NumberInput
								data-elem="salary-from-input"
								defaultValue={0}
								size="md"
								placeholder="От"
								error={fieldState.error ? fieldState.error.message : undefined}
								{...field}
								className={classes.numberInput}
								step={PAYMENT_STEP}
							/>
						)}
						control={control}//
					/>

					<Controller
						name="payment_to"
						render={({ field, fieldState }) => (
							<NumberInput
								data-elem="salary-to-input"
								defaultValue={0}
								size="md"
								placeholder="До"
								error={fieldState.error ? fieldState.error.message : undefined}
								{...field}
								className={classes.numberInput}
								step={PAYMENT_STEP}
							/>
						)}
						control={control}//
					/>
				</FormGroup>

				<FormGroup title="Опыт">
					<Controller
						name="expirience"
						render={({ field }) => (
							<Select
								data={handledReferences}
								data-elem="expiriences-select"
								{...field}
								size="md"
								placeholder="Выберите опыт"
								className={classes.filters__select}
								rightSection={
									<Image
										src={IconChevronDown}
										alt=""
										className={classes.chevronDownIcon}
									/>
								}
							/>
						)}
						control={control}//
					/>
				</FormGroup>
				<FormGroup title="График">
					<Controller
						name="type_of_work"
						render={({ field }) => (
							<Select
								data={handledTypeWork}
								data-elem="expiriences-select"
								{...field}
								size="md"
								placeholder="Выберите график"
								className={classes.filters__select}
								rightSection={
									<Image
										src={IconChevronDown}
										alt=""
										className={classes.chevronDownIcon}
									/>
								}
							/>
						)}
						control={control}//
					/>
				</FormGroup>
			</Stack>
			<Button
				mt={20}
				className={classes.filterButton}
				fullWidth
				size="md"
				type="submit"
				data-elem="search-button"
			>
				Применить
			</Button>
		</Paper>
	);
};

export default Filters;

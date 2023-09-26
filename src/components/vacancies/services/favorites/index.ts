import { clearToken, getToken, setToken } from '@/components/common/services';
import { FAVORITE_VACANCIES_KEY } from '@/components/vacancies/constants';

const handleStorageVacancies = (vacanciesString: string | null) => {
	const keys = vacanciesString
		? (JSON.parse(vacanciesString) as number[]) || []
		: [];

	return keys.filter((key) => typeof key === 'number');
};

export const resetFavoriteVacancies = () => clearToken(FAVORITE_VACANCIES_KEY);

export const getFavoriteVacancies = () => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const parsedVacancies = handleStorageVacancies(vacanciesJSON);

		return parsedVacancies;
	} catch (err) {
		resetFavoriteVacancies();
		return [];
	}
};

export const addFavoriteVacancy = (key: number) => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const parsedVacancies = handleStorageVacancies(vacanciesJSON);

		setToken(FAVORITE_VACANCIES_KEY, JSON.stringify([...parsedVacancies, key]));
	} catch (err) {
		resetFavoriteVacancies();
	}
};

export const deleteFavoriteVacancy = (key: number) => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const keys = handleStorageVacancies(vacanciesJSON);

		const newVacancies = keys.filter((vacancyKey) => vacancyKey !== key);

		setToken(FAVORITE_VACANCIES_KEY, JSON.stringify(newVacancies));
	} catch (err) {
		resetFavoriteVacancies();
	}
};

export const isFavoriteVacancy = (key: number) => {
	const vacanciesJSON = getToken(FAVORITE_VACANCIES_KEY);

	try {
		const parsedVacancies = handleStorageVacancies(vacanciesJSON);

		return parsedVacancies.map((vacancy) => vacancy).includes(key);
	} catch (err) {
		resetFavoriteVacancies();
		return false;
	}
};

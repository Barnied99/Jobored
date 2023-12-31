import { jobsApi } from '@/components/common/api';
import { Vacancy } from '@/components/vacancies/types';

export const getVacancy = async (id: string | number): Promise<Vacancy> => {
	return jobsApi.get(`http://localhost:5232/api/2.0/vacancies/${id}/`).then((res) => res.data);
};

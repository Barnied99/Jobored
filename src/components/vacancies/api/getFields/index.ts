import { jobsApi } from '@/components/common/api';
import { Catalogue } from '@/components/vacancies/types';

export const getFields = async (): Promise<Catalogue[]> => {
	return await jobsApi.get('http://localhost:5232/api/2.0/catalogues/').then((res) => res.data);
};




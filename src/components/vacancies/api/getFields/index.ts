import { jobsApi } from '@/components/common/api';
import { Catalogue } from '@/components/vacancies/types';

export const getFields = async (): Promise<Catalogue[]> => {
	return jobsApi.get('/api/2.0/catalogues/').then((res) => res.data);
};

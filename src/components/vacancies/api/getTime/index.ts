import { jobsApi } from '@/components/common/api';
import { Catalogue } from '@/components/vacancies/types';

export const getTime = async (): Promise<Catalogue[]> => {
    return await jobsApi.get('http://localhost:5232/api/2.0/references/').then((res) => res.data);
};




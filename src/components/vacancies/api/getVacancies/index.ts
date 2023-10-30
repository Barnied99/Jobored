import { jobsApi } from '@/components/common/api';

import { GetVacanciesRequest, GetVacanciesResponse } from './dto';

export const getVacancies = async (
	params: GetVacanciesRequest
): Promise<GetVacanciesResponse> => {
	const { pageIdx, count, fields, paymentFrom, paymentTo, keyword, ids, typeWork, expirience } =
		params;
	return jobsApi
		.get('http://localhost:5232/api/2.0/vacancies/', {
			params: {
				page: pageIdx,
				count,
				catalogues: fields,
				payment_from: paymentFrom,
				payment_to: paymentTo,
				type_of_work: typeWork,
				expirience: expirience,
				keyword,
				published: 1,
				no_agreement: 1,
				ids,
			},
		})
		.then((res) => res.data);
};





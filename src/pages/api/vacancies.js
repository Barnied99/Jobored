import { jobsApi } from '../../components/common/api';
// import { GetVacanciesRequest, GetVacanciesResponse } from '../../components/vacancies/api/getVacancies/dto';

export default async function getVacanciesNew(params) {
    const { pageIdx, count, fields, paymentFrom, paymentTo, keyword, ids } =
        params;
    try {
        const vacancies = await jobsApi.get('http://localhost:5232/api/2.0/vacancies/', {
            params: {
                page: pageIdx,
                count,
                catalogues: fields,
                payment_from: paymentFrom,
                payment_to: paymentTo,

                keyword,
                published: 1,
                no_agreement: 1,

                ids,
            },
        }

        );
        return vacancies.data
    } catch (error) {
        console.error('Error fetching vacancies:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}









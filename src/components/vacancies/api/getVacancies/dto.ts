import { Vacancy } from '@/components/vacancies/types';

export interface GetVacanciesRequest {
	/*** Starts with zero **/
	pageIdx: number;

	count: number;

	fields?: string;
	paymentFrom?: number | string;
	paymentTo?: number | string;

	keyword?: string;

	ids?: number[];
}

export interface GetVacanciesResponse {
	more: boolean;
	objects: Vacancy[];
	subscription_active: boolean;
	subscription_id: number;
	total: number;
}

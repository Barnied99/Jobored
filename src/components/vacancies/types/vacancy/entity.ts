import { Catalogue } from '../catalogue/entity';

type VacancyCatalog = Omit<
	Catalogue,
	'title_rus' | 'title_trimmed' | 'url_rus'
>;

export interface Vacancy {
	id: number;
	catalogues: VacancyCatalog[];
	firm_name: string;
	payment_from: number;
	payment_to: number;
	currency: string;
	town: {
		id: number;
		title: string;
	};
	profession: string;
	type_of_work: { id: number; title: string };
	vacancyRichText: string;
}

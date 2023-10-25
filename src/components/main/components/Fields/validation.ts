import * as yup from 'yup';

export const filterSchema = yup.object({
    type_of_work: yup.string().optional().default(''),
    catalogues: yup.string().optional().default(''),
});

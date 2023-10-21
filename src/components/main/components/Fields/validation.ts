import * as yup from 'yup';

export const filterSchema = yup.object({
    catalogues: yup.string().optional().default(''),
});

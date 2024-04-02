import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        catalogues: { type: [], required: true, unique: true },
        firm_name: { type: String, required: true },
        payment_from: { type: Number, required: true },
        payment_to: { type: Number, required: true },
        currency: { type: String, required: true },
        town: { type: { id: Number, title: String }, required: true, default: 0 },
        profession: { type: String, required: true, default: 0 },
        type_of_work: { type: Number, required: true, default: 0 },
        description: { type: { id: Number, title: String }, required: true },
        vacancyRichText: { type: String, default: false },
    },
    {
        timestamps: true,
    }
)

export interface Catalogue {
    key: number;
    title: string;
    title_trimmed: string;
    title_rus: string;
    url_rus: string;
}

type VacancyCatalog = Omit<
    Catalogue,
    'title_rus' | 'title_trimmed' | 'url_rus'
>;

const ProductModel =
    mongoose.models.Product || mongoose.model('Product', productSchema)

export default ProductModel

export type Product = {
    _id?: string
    id: number
    catalogues: VacancyCatalog[]
    firm_name: string
    payment_from: number
    payment_to: number
    currency: string
    town: {
        id: number
        title: string
    };
    profession: string
    type_of_work: { id: number; title: string }
    vacancyRichText: string
}






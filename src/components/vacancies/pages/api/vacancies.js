// import { getVacancies, getFields } from '@/components/vacancies/api';

// export default async function handler(req, res) {
//     try {
//         if (req.method === 'GET') {
//             if (req.query.type === 'catalogues') {
//                 const catalogues = await getFields();
//                 res.status(200).json(catalogues);
//             } else if (req.query.type === 'vacancies') {
//                 const vacancies = await getVacancies();
//                 res.status(200).json(vacancies);
//             } else {
//                 res.status(400).json({ message: 'Invalid Request' });
//             }
//         } else {
//             res.status(405).json({ message: 'Method Not Allowed' });
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


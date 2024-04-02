import type { NextApiRequest, NextApiResponse } from 'next'

import UserModel from '@/lib/models/UsersModel'
import data from '@/lib/data'
import dbConnect from '@/lib/dbconnect'
// import ProductModel from '@/lib/models/FavoriteModels'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { users } = data
    await dbConnect()
    await UserModel.deleteMany()
    await UserModel.insertMany(users)


    return res.json({
        message: 'seeded successfully',
        users,
    })
}


// export default function handler(req, res) {
//     res.status(200).json('hello')
// }
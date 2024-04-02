import bcrypt from 'bcryptjs'

const data = {
    users: [

        {
            name: 'Jane',
            email: 'user@example.com',
            password: bcrypt.hashSync('123456'),
            isAdmin: false,
        },
    ],

}

export default data

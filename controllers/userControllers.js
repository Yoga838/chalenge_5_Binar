const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(5);

    return bcrypt.hash(password, salt)
}

const prisma = new PrismaClient();

module.exports = {
    registerUser: async (req, res) => {
        try {
            const user = await prisma.users.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: await cryptPassword(req.body.password),
                    profiles: {
                        create: {
                            identity_number: req.body.identity_number,
                            identity_type: req.body.identity_type,
                            address: req.body.address
                        }
                    }
                }
            });
            res.status(200).json({
                message: `Data Berhasil Dibuat Rincian data : ${JSON.stringify(user)}`
            });
        } catch (error) {
            res.status(500).json({ error: "Terdapat Error ketika membuat user baru" });
        }
    },
    loginUser: async(req, res) => {
        const findUser = await prisma.users.findFirst({
            where: {
                email: req.body.email
            }
        })

        if(!findUser) {
            return res.status(404).json({
                error: 'User not exists'
            });
        }

        if(bcrypt.compareSync(req.body.password, findUser.password)) {
            const token = jwt.sign({ id: findUser.id} , 'secret_key', { expiresIn : '6h'})

            return res.status(200).json({
                data: {
                    token
                }
            })
        }

        return res.status(403).json({
            error: 'Invalid credentials'
        })
    },
    getProfile: async(req, res) => {
        const user = await prisma.users.findUnique({
            where: {
                id: res.user.id
            }
        })

        return res.status(200).json({
            data: user
        })
    },
    getUser: async (req, res) => {
        try {
            const dataUser = await prisma.users.findMany({});
            res.status(200).json({
                dataUser
            });
        } catch (error) {
            res.status(500).json({ error: "Terjadi kesalahan ketika mengambil data" });
        }
    },

    getUserById: async (req, res) => {
        try {
            const Id = parseInt(req.params.id);
            const dataUser = await prisma.users.findFirst({
                where: {
                    id: Id
                }
            });
            if (dataUser) {
                res.status(200).json({
                    dataUser
                });
            } else {
                res.status(404).json({ error: "User yang anda cari tidak ditemukan" });
            }
        } catch (error) {
            res.status(500).json({ error: "terjadi kesalahan ketika mengambil data yang anda inginkan" });
        }
    }
}

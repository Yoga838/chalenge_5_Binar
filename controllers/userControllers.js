const { PrismaClient } = require('@prisma/client');
const { compare, hash } = require("bcrypt");

const prisma = new PrismaClient();

module.exports = {
    registerUser: async (req,res) => {
        const password =  await hash(req.body.password, 10)
        const user = await prisma.users.create({
            data:{
                name: req.body.name,
                email: req.body.email,
                password : password,
                profiles:{
                    create:{
                        identity_number : req.body.identity_number,
                        identity_type : req.body.identity_type,
                        address :req.body.address
                    }
                }
            }
        });
        return res.json({
            message:`Data Berhasil Dibuat Rincian data : ${JSON.stringify(user)}`
        })
    },
    getUser: async (req,res) => {
        const dataUser = await prisma.users.findMany({})
        res.json({
            dataUser
        })
    },
    getUserById: async(req,res) => {
        const Id = parseInt(req.params.id)   
        const dataUser = await prisma.users.findFirst({
            where:{
                id:Id
            }
        })
        res.json({
            dataUser
        })
    }
}
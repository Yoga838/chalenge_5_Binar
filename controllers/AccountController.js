const { PrismaClient } = require('@prisma/client');
const { compare, hash } = require("bcrypt");

const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");


module.exports = {
    registerAccount: async (req,res) => {
        const dataUser = await prisma.users.findFirst({
            where:{
                id: parseInt(req.body.id)
            }
        }) 
        const uniqueNumber = uuidv4();
        const Register = await prisma.bank_accounts.create({
            data:{
                bank_name : dataUser.name,
                bank_account_number : uniqueNumber,
                balance : req.body.balance,
                user_id: req.body.id,
            }
        })

        const serializedBankAccounts = {
            id : Register.id,
            bank_name : Register.bank_name,
            bank_account_number : Register.bank_account_number,
            balance : Register.balance.toString(),
            user_id : Register.user_id

          }

        res.json({
            data : serializedBankAccounts
        })
    },
    getAccounnt: async (req,res) => {
        const DataAccount = await prisma.bank_accounts.findMany({})

        function serializeBigInt(obj) {
            if (typeof obj === 'bigint') {
              return obj.toString();
            }
            return obj;
          }

          const serializedBankAccounts = DataAccount.map(account => ({
            ...account,
            balance: serializeBigInt(account.balance),
          })); 

        res.json({
            data:serializedBankAccounts
        })
    },
    getDetailAccount: async(req,res) => {
        const getId = parseInt(req.params.id)   
        const getDetailAccount = await prisma.bank_accounts.findFirst({
            where:{
                id:getId
            }
        })
        
        const serializedBankAccounts = {
            id : getDetailAccount.id,
            bank_name : getDetailAccount.bank_name,
            bank_account_number : getDetailAccount.bank_account_number,
            balance : getDetailAccount.balance.toString(),
            user_id : getDetailAccount.user_id
          }
        res.json({
            data:serializedBankAccounts
        })
        
    }
}
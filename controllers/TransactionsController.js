const { PrismaClient } = require('@prisma/client');
const { compare, hash } = require("bcrypt");

const prisma = new PrismaClient();
const { v4: uuidv4 } = require("uuid");

module.exports = {
  makeTransactions: async (req, res) => {
    try {
      const sourceAccount = await prisma.bank_accounts.findFirst({
        where: {
          id: parseInt(req.body.source_account_id)
        }
      })
      const destinationAccount = await prisma.bank_accounts.findFirst({
        where: {
          id: parseInt(req.body.destination_account_id)
        }
      })
      if (sourceAccount && destinationAccount && sourceAccount.balance >= req.body.amount && !(req.body.source_account_id == req.body.destination_account_id)) {
        const amountminus = await prisma.bank_accounts.update({
          where: {
            id: parseInt(req.body.source_account_id)
          },
          data: {
            balance: BigInt(parseInt(sourceAccount.balance) - parseInt(req.body.amount))
          }
        })
        const amountplus = await prisma.bank_accounts.update({
          where: {
            id: parseInt(req.body.destination_account_id)
          },
          data: {
            balance: BigInt(parseInt(destinationAccount.balance) + parseInt(req.body.amount))
          }
        })
        if (amountminus && amountplus) {
          const transaction = await prisma.bank_account_transactions.create({
            data: {
              source_account_id: req.body.source_account_id,
              destination_account_id: req.body.destination_account_id,
              amount: req.body.amount
            }
          })
          const returnData = {
            id: transaction.id,
            source_account_id: transaction.source_account_id,
            destination_account_id: transaction.destination_account_id,
            amount: transaction.amount.toString()
          }
          res.status(200).json({
            data: returnData
          })
        }

      } else {
        res.status(200).json({
          message: "Akun Tujuan Salah/Akun Asal Salah/ Saldo Akun Asal Tidak mencukup Transaksi "
        })
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getAllTransactions: async (req, res) => {
    try {
      const getTransactions = await prisma.bank_account_transactions.findMany({})

      function serializeBigInt(obj) {
        if (typeof obj === 'bigint') {
          return obj.toString();
        }
        return obj;
      }

      const returnData = getTransactions.map(account => ({
        ...account,
        amount: serializeBigInt(account.balance),
      }));
      res.status(200).json({
        data: returnData
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getDetailTransaction: async (req, res) => {
    try {
      const getId = parseInt(req.params.id)
      const getDetail = await prisma.bank_account_transactions.findFirst({
        where: {
          id: parseInt(getId)
        }
      })
      const returnData = {
        id: getDetail.id,
        source_account_id: getDetail.source_account_id,
        destination_account_id: getDetail.destination_account_id,
        amount: getDetail.amount.toString()
      }
      res.status(200).json({
        data: returnData
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

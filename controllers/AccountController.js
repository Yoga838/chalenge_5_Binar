const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

module.exports = {
  registerAccount: async (req, res) => {
    try {
      const { id, balance } = req.body;
      const dataUser = await prisma.users.findFirst({
        where: { id: parseInt(id) }
      });

      if (!dataUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const uniqueNumber = uuidv4();
      const Register = await prisma.bank_accounts.create({
        data: {
          bank_name: dataUser.name,
          bank_account_number: uniqueNumber,
          balance,
          user_id: id,
        }
      });

      res.status(200).json({
        data: {
          id: Register.id,
          bank_name: Register.bank_name,
          bank_account_number: Register.bank_account_number,
          balance: Register.balance.toString(),
          user_id: Register.user_id
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  },

  getAccounnt: async (req, res) => {
    try {
      const dataAccounts = await prisma.bank_accounts.findMany({});

      const serializedBankAccounts = dataAccounts.map(account => ({
        id: account.id,
        bank_name: account.bank_name,
        bank_account_number: account.bank_account_number,
        balance: account.balance.toString(),
        user_id: account.user_id
      }));

      res.status(200).json({ data: serializedBankAccounts });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  },

  getDetailAccount: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const getDetailAccount = await prisma.bank_accounts.findFirst({
        where: { id }
      });

      if (!getDetailAccount) {
        return res.status(404).json({ error: 'Account not found' });
      }

      res.status(200).json({
        data: {
          id: getDetailAccount.id,
          bank_name: getDetailAccount.bank_name,
          bank_account_number: getDetailAccount.bank_account_number,
          balance: getDetailAccount.balance.toString(),
          user_id: getDetailAccount.user_id
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while processing your request' });
    }
  }
};

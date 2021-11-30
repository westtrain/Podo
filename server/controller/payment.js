const { User } = require("../models");

module.exports = {
  getUsersPaymentInfo: async (req, res) => {
    try {
      return res.status(404).json({ message: "Failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getPaymentPointWithdrawal: async (req, res) => {
    try {
      return res.status(404).json({ message: "Failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  changeCard: async (req, res) => {
    try {
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  changeAccount: async (req, res) => {
    try {
      return res.status(404).json({ message: "failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  createParty: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  updateOTTLoginInfo: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  changeMemberNum: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  joinParty: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  leaveParty: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};

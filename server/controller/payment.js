const { Payment } = require("../models");

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
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  changeSettlement: async (req, res) => {
    try {
      return res.status(422).json({ message: "Insufficient parameters supplied" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  enrollCard: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  enrollAccount: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  enrollSettlement: async (req, res) => {
    try {
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};

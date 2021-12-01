const { User } = require("../models");

module.exports = {
  getUsersParty: async (req, res) => {
    try {
      const usersParties = await Parties.findAll({
        raw: true,
      });
      return res.status(200).json({ data: usersParties });
      return res.status(404).json({ message: "failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getParty: async (req, res) => {
    try {
      return res.status(404).json({ message: "failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getAllParties: async (req, res) => {
    try {
      return res.status(404).json({ message: "failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getFilteredParties: async (req, res) => {
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

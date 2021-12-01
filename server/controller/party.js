const db = require("../models");
const { Party } = require("../models");

module.exports = {
  getUsersParty: async (req, res) => {
    const userId = req.userId;
    const usersParties = [];
    // console.log(userId);
    try {
      const allUsersPartiesId = await db.sequelize.models.User_party.findAll({
        attributes: ["party_id"],
        where: {
          user_id: userId,
        },
        raw: true,
      });
      for (let i = 0; i < allUsersPartiesId.length; i++) {
        const usersParty = await Party.findOne({
          where: {
            id: allUsersPartiesId[i].party_id,
          },
          raw: true,
        });
        // console.log(usersParty);
        usersParties[i] = usersParty;
      }

      if (!usersParties) {
        return res.status(404).json({ message: "failed" });
      }
      return res.status(200).json({ data: usersParties });
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

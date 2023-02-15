import mongoose from "mongoose";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/user";

const handler = async (req, res) => {
  const { method } = req;
  const ObjectId = mongoose.Types.ObjectId;
  switch (method) {
    case 'GET':
      const users = await User
      .aggregate()
      .lookup({ from: 'sectors', localField: 'sector_ids', foreignField: '_id', as: 'related_sectors'})
      res.status(200).json(users);
      break;
    case 'POST':
      const { user: { name, sector_ids, terms } } = req.body;
      const formattedSectorIds = sector_ids.map(sec => new ObjectId(sec));
      let user = new User({ name, sector_ids: formattedSectorIds, terms });
      await user.save();
      res.status(201).json({ message: "Data inserted successfully!" });
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default connectDB(handler);
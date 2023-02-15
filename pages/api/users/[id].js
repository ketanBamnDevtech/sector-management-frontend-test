import mongoose from "mongoose";
import connectDB from "../../../lib/mongodb";
import User from "../../models/user";

const handler = async (req, res) => {
  const { query, method, body } = req;
  const id = query.id
  switch (method) {
    case 'GET':
      const user = await User.findById(id);
      res.status(200).json(user);
      break;
    case 'PUT':
      const { name, sector_ids, terms } = body.user;
      const formattedSectorIds = sector_ids.map(sec => sec);
      await User.findOneAndUpdate({_id: id}, { name: name, sector_ids: formattedSectorIds, terms: terms }, { new: true })
      res.status(200).json({ message: 'Data updated successfully' })
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default connectDB(handler);


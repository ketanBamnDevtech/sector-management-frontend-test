import connectDB from "../../../lib/mongodb";
import Sector from "../../../models/sector";

const handler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const sectors = await Sector.find({})
      res.status(200).json(sectors);
      break;
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default connectDB(handler);
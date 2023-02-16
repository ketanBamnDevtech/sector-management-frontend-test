import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  mongoose.set("strictQuery", false);

  await mongoose.connect(process.env.mongodburl, {
    useNewUrlParser: true
  });
  return handler(req, res);
};

export default connectDB;

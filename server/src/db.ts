import mongoose from 'mongoose';

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/munchTestDB'
    : process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .catch(() => {
    process.exit(1);
  });

mongoose.connection.on('error', (err) => {
  console.log(err);
});

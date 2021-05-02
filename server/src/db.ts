import mongoose from 'mongoose';

const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/munchTestDB'
    : process.env.MONGO_URI;

export default function db() {
  return {
    connect() {
      mongoose
        .connect(MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
        })
        .catch(() => {
          process.exit(1);
        });
    },
    disconnect() {
      mongoose.disconnect();
    },
  };
}

mongoose.connection.on('error', (err) => {
  console.log(err);
});

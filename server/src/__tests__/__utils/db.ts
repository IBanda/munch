import mongoose from 'mongoose';

function db() {
  return {
    connect() {
      mongoose
        .connect('mongodb://localhost:27017/munchTestDB', {
          useFindAndModify: false,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
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
export default db;

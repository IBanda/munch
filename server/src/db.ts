import mongoose from 'mongoose';

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch(() => {
    process.exit(1);
  });

mongoose.connection.on('error', (err) => {
  console.log(err);
});

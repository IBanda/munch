'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const MONGO_URI =
  process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/munchTestDB'
    : process.env.MONGO_URI;
function db() {
  return {
    connect() {
      mongoose_1.default
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
      mongoose_1.default.disconnect();
    },
  };
}
exports.default = db;
mongoose_1.default.connection.on('error', (err) => {
  console.log(err);
});

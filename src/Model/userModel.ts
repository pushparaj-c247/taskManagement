import mongoose, { AggregatePaginateModel } from "mongoose";
import { obj } from "../interfaces/userInterface";
import bcrypt from "bcrypt";
import mongoosePaginate from "mongoose-aggregate-paginate-v2";


const UserSchema = new mongoose.Schema<obj>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
/* eslint-disable */

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});
/* eslint-disable */
UserSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate();

  if (update.password) {
    bcrypt.genSalt(10, (errB, salt) => {
      if (errB) {
        return next(errB);
      }

      bcrypt.hash(update.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        console.log();

        update.password = hash;

        this.setUpdate(update);
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.validatePassword = function (passwords: string) {
  return bcrypt.compare(passwords, this.password)
};
UserSchema.plugin(mongoosePaginate)
/* eslint-disable */
export default mongoose.model<obj, AggregatePaginateModel<obj>>("user", UserSchema);

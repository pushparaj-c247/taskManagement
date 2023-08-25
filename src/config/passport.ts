import passport from "passport";
import passportJWT from "passport-jwt";
import UserSchema from "../Model/userModel";

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const opts: any = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ABcdefg";

export default passport.use(
  new JWTStrategy(opts, async function (jwt_payload, done) {
    const userT = await UserSchema.findOne({ email: jwt_payload.email });
    if (userT) {
      return done(null, userT);
    } else {
      return done(null, false);
    }
  })
);

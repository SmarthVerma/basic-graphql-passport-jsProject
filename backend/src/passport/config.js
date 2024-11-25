import { GraphQLLocalStrategy } from "graphql-passport";
import { dbConnect } from "../db/dbConnect.js";
import passport from "passport";
import bcrypt from "bcryptjs";


export const configurePassport = async () => {
    const prisma = await dbConnect()

    passport.use(new GraphQLLocalStrategy(
        async (
            username,
            password,
            done
        ) => {
            const email = username
            try {
                // querying the user from the database by email
                const user = await prisma.user.findUnique({
                    where: { email },
                })

                // if user not found
                if (!user) {
                    return done(null, false, { info: false, message: "User not found" });
                }

                // Check if the password is correct
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    return done(null, false, { info: false, message: "Incorrect password" });
                }
                return done(null, user)
            } catch (error) {
                return done(error, false)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
}
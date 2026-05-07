import jwt from "jsonwebtoken";

export const generateToken = (userId: string, role: string) => {
  //Payload store essential info but not sensitive
  const payload = { id: userId, role };
  const secret = process.env.JWT_SECRET;
  const lifespan = "7d";

  return jwt.sign(payload, secret as string, {
    expiresIn: lifespan,
  });
};

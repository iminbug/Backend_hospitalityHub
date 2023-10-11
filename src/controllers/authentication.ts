import express from "express";

import {getUserByEmail, createUser, getUserByPhone} from "../db/users";
import {authentication, random} from "../helpers";
import {get} from "lodash";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email, phone, password} = req.body;

    if ((!email && !phone) || !password) {
      return res.sendStatus(400);
    }

    let user;
    if (email) {
      user = await getUserByEmail(email).select(
        "+authentication.salt +authentication.password"
      );
    } else if (phone) {
      user = await getUserByPhone(phone).select(
        "+authentication.salt +authentication.password"
      );
    }

    if (!user) {
      return res.sendStatus(400);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      return res.sendStatus(403);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie("BACKEND-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password, username, phone} = req.body;

    if (!email || !password || !username || !phone) {
      return res.sendStatus(400);
    }

    const existingUser =
      (await getUserByEmail(email)) || (await getUserByPhone(phone));

    if (existingUser) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      phone,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

import * as bcrypt from 'bcrypt';
import type {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {AppDataSource} from '../data-source';
import {Elien} from '../entity/user/Elien';
import {Permission} from '../entity/user/permission/permission';

const express = require('express');
const router = express.Router();
router.get(
  '/elien',
  async (req: Request, res: Response) => {
    const elien = await AppDataSource.getRepository(Elien)
      .find();
    res.status(200)
      .send(elien);
  },
);
router.post(
  '/elien',
  async (req: Request, res: Response) => {
    try {
      if (req.body.password.length < 7) {
        return res.send('Password to short');
      }

      const hashedKeyGenPassw = await bcrypt.hash(
        req.body.password,
        13,
      );
      const elienLocal = {
        name: req.body.name,
        password: hashedKeyGenPassw,
      };
      const elien = await AppDataSource.getRepository(Elien)
        .create(elienLocal);
      await AppDataSource.getRepository(Elien)
        .save(elien);
      res.status(201)
        .send('User created');
    } catch (e) {
      console.log(e);
      res.status(500)
        .send(e);
    }
  },
);
router.post(
  '/elien/login',
  async (req: Request, res: Response) => {
    try {
      const eliens = await AppDataSource.getRepository(Elien)
        .find();
      const elien = eliens.find(res => res.name === req.body.name);
      const accessToken = jwt.sign(
        {elien},
        process.env.ACCESS_TOKEN_SECRET,
      );
      elien.token = accessToken ?? accessToken;
      const elienDAO = await AppDataSource.getRepository(Elien)
        .createQueryBuilder('elien')
        .leftJoinAndSelect('elien.permission', 'permission')
        .where({id: elien.id})
        .getOne();
      const permissionDAO = await AppDataSource.getRepository(Permission)
        .createQueryBuilder('permission')
        .where({id: elienDAO.permission.id})
        .leftJoinAndSelect('permission.inbox', 'inbox')
        .leftJoinAndSelect('inbox.actionEmail', 'action')
        .leftJoinAndSelect('inbox.filterLabel', 'filterLabel')
        .getOne();
      const permission = permissionDAO;
      await AppDataSource.getRepository(Elien)
        .save(elienDAO);
      if (await bcrypt.compare(
        req.body.password,
        elien.password,
      )) {
        res.send({
          message: 'Success',
          permission: {
            inbox: {
              actions: await permission.inbox.actionEmail,
              label: await permission.inbox.filterLabel,
            },
          },
          token: accessToken,
        });
      } else {
        res.send('Not allowed');
      }
    } catch (e) {
      console.log(e);
      res.status(500)
        .send('Dont have allowed ');
    }
  },
);

export function authenticationToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (error, user) => {
      if (error) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    },
  );
}

export default router;

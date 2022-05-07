import express from 'express';
import NodemailerMailAdapter from './adapters/nodemailer/nodemailer-mail-adapter';
import SubmitFeedbackFunction from './functions/submit-feedback-function';
import PrismaFeedbacksRepository from './repositories/prisma/prisma-feedbacks-repository';

const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();
  const submitFeedbackFunction = new SubmitFeedbackFunction(
    prismaFeedbacksRepository,
    nodemailerMailAdapter,
  );

  await submitFeedbackFunction.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).json({
    message: 'Data created',
  });
});

export default routes;

import prisma from '../../prisma';
import { FeedbackCreateData, FeedbacksRepository } from '../feedbacks-repository';

class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot }: FeedbackCreateData) {
    await prisma.feedback.create({
      data: {
        type,
        comment,
        screenshot,
      },
    });
  }
}

export default PrismaFeedbacksRepository;

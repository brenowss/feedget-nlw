import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repository';

interface SubmitFeedbackFunctionRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

class SubmitFeedbackFunction {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(req: SubmitFeedbackFunctionRequest) {
    const { type, comment, screenshot } = req;

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        screenshot && `<img src="${screenshot}" style="max-width: 100%" />`,
        '</div>',
      ].join('\n'),
    });
  }
}

export default SubmitFeedbackFunction;

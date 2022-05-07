import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '0901d61b130966',
        pass: '215e6f291dbef1',
      },
    });

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Breno Fiorese <brenoc.fiorese@hotmail.com.br>',
      subject,
      html: body,
    });
  }
}

export default NodemailerMailAdapter;

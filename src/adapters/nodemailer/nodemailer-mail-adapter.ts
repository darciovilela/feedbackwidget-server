import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ec574bbedf2a89",
      pass: "36a03cdb69668f"
    }
  });


export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Darcio Vilela <darciovilela@yahoo.com>',
            subject,
            html: body,
        
        })
        
    }
}
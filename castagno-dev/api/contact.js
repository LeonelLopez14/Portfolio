import { Resend } from 'resend';
import process from 'process';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, mail, subject, message } = req.body;
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from:    'Portfolio <onboarding@resend.dev>',
            to:      'castagno.dev@gmail.com',
            subject: subject ? subject : 'Nuevo mensaje desde el portfolio',
            html:
                '<h3>Nuevo mensaje de ' + name + '</h3>' +
                '<p><strong>Email:</strong> ' + mail + '</p>' +
                '<p><strong>Asunto:</strong> ' + (subject || 'Sin asunto') + '</p>' +
                '<hr/>' +
                '<p>' + message + '</p>',
            replyTo: mail,
        });
        res.status(200).json({ ok: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
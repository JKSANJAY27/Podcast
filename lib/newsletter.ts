import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async function subscribeToNewsletter(email: string) {
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) throw error;
}

async function sendNewEpisodeNotification(episode: {
    title: string;
    description: string;
    url: string;
  }) {
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email');

    if (error) throw error;

    const emailPromises = subscribers.map(subscriber => 
      transporter.sendMail({
        from: process.env.SMTP_FROM,
        to: subscriber.email,
        subject: `New Episode: ${episode.title}`,
        html: `
          <h1>New Episode Released!</h1>
          <h2>${episode.title}</h2>
          <p>${episode.description}</p>
          <p><a href="${episode.url}">Listen Now</a></p>
        `,
      })
    );

    await Promise.all(emailPromises);
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method === 'POST') {
            const {email} = req.body
        try {
            if(req.url?.includes("subscribe")){
                await subscribeToNewsletter(email)
                return  res.status(200).json({message: "Succesfully Subscribed"})
            } else if(req.url?.includes("send")){
                const {episode} = req.body
               await sendNewEpisodeNotification(episode);
               return res.status(200).json({message:"Succesfully sent emails"})

            }
           return res.status(404).json({error:"Not Found"})
        } catch (error:any) {
           return  res.status(500).json({ error: error.message })
        }
      }
     return res.status(404).json({ error: 'Not Found' })
    }
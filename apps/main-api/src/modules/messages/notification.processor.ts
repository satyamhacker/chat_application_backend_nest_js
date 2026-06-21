import { Processor, Process } from '@nestjs/bull';
import type { Job } from 'bull';
import { Logger } from '@nestjs/common';


@Processor('notification-queue')
export class NotificationProcessor {
    private readonly logger = new Logger(NotificationProcessor.name);

    // Jab bhi is queue mein job aayega, yeh function async tareeke se background me chalega
    @Process('send-mention-email')
    async handleMentionEmail(job: Job<{ email: string; mentionedBy: string }>) {
        this.logger.log(`Sending email to ${job.data.email} in background...`);

        // Yahan actual email bhejne ka logic aayega (e.g., SendGrid/Nodemailer)
        // Simulating heavy task
        await new Promise((resolve) => setTimeout(resolve, 2000));

        this.logger.log(`Email sent successfully to ${job.data.email}!`);
    }
}


import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CleanupService {
    private readonly logger = new Logger(CleanupService.name);

    // Yeh task har raat midnight (12:00 AM) ko automatically chalega
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    handleCron() {
        this.logger.debug(
            'Running nightly cleanup task: Removing obsolete cache and temp files...',
        );

        // Yahan aage chalkar hum database ki cleanup query run karenge
    }
}


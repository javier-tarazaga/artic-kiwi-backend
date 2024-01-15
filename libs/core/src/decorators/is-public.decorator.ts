import { SetMetadata } from '@nestjs/common';

/**
 * Decorator used to indicated if a specific route should be made public or not. If public,
 * then it will bypass the global a guard.
 */
export const Public = () => SetMetadata('isPublic', true);

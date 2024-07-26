import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    host: process.env.DATABASE_HOST,
    name: process.env.DATABASE_NAME,
    debug: process.env.DATABASE_DEBUG === 'true' || false,    
  }),
);

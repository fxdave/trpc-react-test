import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../back';

export const trpc = createTRPCReact<AppRouter>();

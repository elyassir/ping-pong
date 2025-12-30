
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Makes the module available globally
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Export so other modules can use the service
})
export class PrismaModule {}
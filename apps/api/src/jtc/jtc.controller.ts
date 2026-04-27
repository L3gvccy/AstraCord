import { Controller } from '@nestjs/common';
import { JtcService } from './jtc.service';

@Controller('jtc')
export class JtcController {
  constructor(private readonly jtcService: JtcService) {}
}

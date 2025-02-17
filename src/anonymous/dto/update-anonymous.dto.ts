import { PartialType } from '@nestjs/swagger';
import { CreateAnonymousDto } from './create-anonymous.dto';

export class UpdateAnonymousDto extends PartialType(CreateAnonymousDto) {}

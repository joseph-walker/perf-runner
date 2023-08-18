import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Statistic {
	@Field((type) => Float)
	mean: number;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  name!: string;

  @Prop({ required: true })
  description!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  website!: string;

  @Prop({ required: true })
  admin!: string;

  @Prop({ default: 0 })
  totalComments!: number;

  @Prop({ default: 0 })
  totalRating!: number;

  @Prop({ default: true })
  exists!: boolean;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

// Create indexes for search functionality
CompanySchema.index({ name: 'text', description: 'text' });
CompanySchema.index({ name: 1 });
CompanySchema.index({ website: 1 });

export class CompanyResponseDto {
  _id!: string;
  name!: string;
  description!: string;
  location!: string;
  website!: string;
  admin!: string;
  totalComments!: number;
  totalRating!: number;
  exists!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class SearchResponseDto {
  companies!: CompanyResponseDto[];
  pagination!: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

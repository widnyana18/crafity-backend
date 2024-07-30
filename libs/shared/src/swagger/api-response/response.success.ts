import { ApiProperty } from '@nestjs/swagger';

export class DeletingData {
  /** Success deleting suatu data */
  @ApiProperty({
    description: 'Berisi description tentang success',
    example: 'Berhasil menghapus data',
    type: String,
  })
  message: string;

  @ApiProperty({
    description: 'Berisi status code yang di dapatkan',
    example: 200,
    type: Number,
  })
  statuCode: number;
}
export class ShowingData {
  @ApiProperty({
    description: 'seberapa banyak data yang di peroleh',
    example: 200,
    type: Number,
  })
  totalItems: number;

  @ApiProperty({
    description:
      'Berisi data dari pagination bila datanya biasanya array object jika tidak ada cuma array kosong',
    type: Array<any>,
  })
  data: Array<any>;
}

import { ApiProperty } from '@nestjs/swagger';

interface ApiResponseInterface<T> {
  code: string;
  message: string;
  isError?: boolean;
  isSucces?: boolean;
  data?: Array<T> | T;
}

export class ApiResponse<T> {
  @ApiProperty({
    type: 'string',
    description: 'El codigo de respuesta para solicitud',
  })
  code: string;

  @ApiProperty({
    description: 'Mensaje con el contexto de la respuesta de la solicitud',
  })
  message: string;

  @ApiProperty({
    description: 'Menciona si la respuesta a sido un error',
    default: false,
  })
  isError?: boolean;

  @ApiProperty({
    description: 'Menciona si la respuesta a sido un exito',
    default: false,
  })
  isSucces?: boolean;

  @ApiProperty({
    description:
      'En caso de que la solicitud requiera de una respuesta, este campo lo devuelve',
  })
  data?: Array<T> | T;

  constructor({
    code,
    message,
    data,
    isError = false,
    isSucces = false,
  }: ApiResponseInterface<T>) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.isError = isError;
    this.isSucces = isSucces;
  }

  static fail<K>(info: ApiResponseInterface<K>) {
    return new ApiResponse<K>(info);
  }

  static ok<K>(info: ApiResponseInterface<K>) {
    return new ApiResponse<K>(info);
  }
}

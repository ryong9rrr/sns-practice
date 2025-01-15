import {
  MongooseModule as _MongooseModule,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, SchemaOptions } from 'mongoose';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  // email
  @ApiProperty({
    example: 'abc123@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  // password
  @ApiProperty({
    example: '123123',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hashedPassword: string;

  // nickname
  @ApiProperty({
    example: 'abc123',
    description: 'nickname',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  // imgUrl
  @ApiProperty({
    example: 'https://...',
    description: 'imgUrl',
  })
  @Prop({
    default: 'https://cdn-icons-png.flaticon.com/128/847/847969.png',
  })
  @IsString()
  imgUrl: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    nickname: string;
    imgUrl: string;
  };
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    nickname: this.nickname,
    imgUrl: this.imgUrl,
  };
});
export const MongooseModule = _MongooseModule.forFeature([
  { name: User.name, schema: UserSchema },
]);

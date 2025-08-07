import { Entity, Column, BeforeInsert, BeforeUpdate, Index } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcryptjs';

import { BaseEntity } from '../../common/entities/base.entity';
import { Role } from '../../common/enums/role.enum';

@Entity('users')
@Index(['email'], { unique: true })
@Index(['username'], { unique: true })
export class User extends BaseEntity {
  @ApiProperty({ description: 'User email address' })
  @Column({ unique: true, length: 255 })
  @Transform(({ value }: { value: string }) => value?.toLowerCase()?.trim())
  email: string;

  @ApiProperty({ description: 'User first name' })
  @Column({ length: 50 })
  firstName: string;

  @ApiProperty({ description: 'User last name' })
  @Column({ length: 50 })
  lastName: string;

  @ApiProperty({ description: 'Username' })
  @Column({ length: 30, nullable: true, unique: true })
  username?: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ description: 'User role' })
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @ApiProperty({ description: 'Whether the user account is active' })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'Whether the user email is verified' })
  @Column({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({ description: 'Last login timestamp' })
  @Column({ nullable: true })
  lastLoginAt?: Date;

  @Exclude()
  @Column({ nullable: true })
  refreshToken?: string;

  // Virtual properties
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  // Methods
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password && !this.password.startsWith('$2')) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

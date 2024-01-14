import { Injectable } from '@nestjs/common';
import { UserCredential } from '../domain';
import { UserCredentialMapper } from '../mappers';
import { UserCredentialPersistedEntity } from '../entities';
import { ClientSession, Db, ObjectId } from 'mongodb';
import { UniqueEntityID } from '@app/core/domain';

@Injectable()
export class UserCredentialsRepository {
  constructor(
    private readonly db: Db,
    private readonly mapper: UserCredentialMapper,
  ) {}

  async findOneById(id: string): Promise<UserCredential | null> {
    const userCredential = await this.db
      .collection<UserCredentialPersistedEntity>('userCredentials')
      .findOne({
        _id: new ObjectId(id),
      });

    if (!userCredential) {
      return null;
    }
    return this.mapper.toDomain(userCredential, new UniqueEntityID(id));
  }

  async findOne(
    providerType: string,
    providerId: string,
  ): Promise<UserCredential | null> {
    const userCredential = await this.db
      .collection<UserCredentialPersistedEntity>('userCredentials')
      .findOne({
        providerType,
        providerId,
      });

    if (!userCredential) {
      return null;
    }

    return this.mapper.toDomain(
      userCredential,
      new UniqueEntityID(userCredential._id),
    );
  }

  async create(userCredential: UserCredential): Promise<UserCredential> {
    const rawUserCredential = this.mapper.toPersistence(userCredential);

    const persisted = await this.db
      .collection<Omit<UserCredentialPersistedEntity, 'id'>>('userCredentials')
      .insertOne(rawUserCredential);

    return this.mapper.toDomain(
      rawUserCredential,
      new UniqueEntityID(persisted.insertedId),
    );
  }

  async update(userCredential: UserCredential): Promise<UserCredential | null> {
    const rawUserCredential = this.mapper.toPersistence(userCredential);

    await this.db
      .collection<UserCredentialPersistedEntity>('userCredentials')
      .updateOne(
        { _id: new ObjectId(userCredential.id.toString()) },
        { $set: rawUserCredential },
      );

    return this.findOneById(userCredential.id.toString());
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.db
      .collection<UserCredentialPersistedEntity>('userCredentials')
      .deleteOne({ _id: new ObjectId(id) });

    return deleted.acknowledged;
  }

  async deleteUserInfo(
    userId: UniqueEntityID,
    session?: ClientSession,
  ): Promise<boolean> {
    const deleted = await this.db
      .collection<UserCredentialPersistedEntity>('userCredentials')
      .deleteMany({ userId: userId.toValue() }, { session });

    return deleted.acknowledged;
  }
}

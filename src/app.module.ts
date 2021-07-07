import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserRepository } from './adapters/driven/persistance/user.repository';
import { UserController } from './adapters/driving/controllers/user.controller';

import { JwtStrategy } from './adapters/driving/guards/jwt.service';
import { UserService } from './application/services/user.service';
import { AccountService } from './application/services/account.service';
import { AccountController } from './adapters/driving/controllers/account.controller';
import { TransactionRepository } from './adapters/driven/persistance/transaction.repository';
import { UserSchema } from './application/port/out/schemas/user.schema';
import { TransactionSchema } from './application/port/out/schemas/transaction.schema';
import { AuthenticationService } from './adapters/driving/guards/authentication-service';
import { BlockSchema } from './application/port/out/schemas/block.schema';
import { InitGenesis } from './application/services/init.service';
import { GenesisBlockService } from './application/services/genesisBlock.service';
import { BlockRepository } from './adapters/driven/persistance/block.repository';

@Module({
  imports: [MongooseModule.forRoot('mongodb://David-Admin:David-Admin@cluster0-shard-00-00.xtkxd.mongodb.net:27017,cluster0-shard-00-01.xtkxd.mongodb.net:27017,cluster0-shard-00-02.xtkxd.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-heaao6-shard-0&authSource=admin&retryWrites=true&w=majority'),
  MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  MongooseModule.forFeature([{name: 'Transaction', schema: TransactionSchema}]),
  MongooseModule.forFeature([{name: 'Block', schema: BlockSchema}]),
  PassportModule.register({defaultStrategy: 'jwt'}),
  JwtModule.register({
    secret: 'topSecret',
    signOptions: {
      expiresIn: 3600
    }
  })],
  controllers: [UserController, AccountController],
  providers: [UserService, UserRepository, JwtStrategy
    , AccountService, TransactionRepository, AuthenticationService, InitGenesis, GenesisBlockService, BlockRepository],
  exports: [JwtStrategy, PassportModule]
})
export class AppModule {}

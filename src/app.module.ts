import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharacterController } from './controllers/characters.controller';
import { CharacterService } from './services/character.service';
import { ConfigModule } from '@nestjs/config';
import { GraphqlRickAnMortyService } from './services/graphql.rnm.service';
import { PassthroughController } from './controllers/passthrough.controller';
import { RedisModule } from './redis/redis.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SeederService } from './services/seeder.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CharacterResolver } from './graphql/resolver/character.resolver';
import { DababaseConfigService } from './services/database.config.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    })
  ],
  controllers: [AppController, CharacterController, PassthroughController],
  providers: [
    AppService, 
    CharacterService, 
    GraphqlRickAnMortyService, 
    SeederService,     
    DababaseConfigService,
    CharacterResolver,
  ],
})
export class AppModule { }

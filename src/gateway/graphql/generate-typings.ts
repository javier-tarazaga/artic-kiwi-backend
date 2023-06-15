import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/gateway/**/*.graphql'],
  path: join(process.cwd(), 'src/gateway/graphql.types.ts'),
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    // This will transform our custom scalars to proper Typescript types
    DateTime: 'Date',
    JSONObject: 'any',
    Upload: '_Upload',
  },
  additionalHeader: "import { Upload as _Upload } from './scalars';", // File defined in the gateway client lib
});

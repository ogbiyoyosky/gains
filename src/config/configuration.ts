export default () => ({
  APP: {
    NAME: process.env.APP_NAME,
    HOST: process.env.APP_HOST,
    PORT: Number(process.env.APP_PORT) || 8080,
  },
  database: {
    TYPE: process.env.DATABASE_TYPE,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    NAME: process.env.DATABASE_NAME,
    USERNAME: process.env.DATABASE_USERNAME,
    PASSWORD: process.env.DATABASE_PASSWORD,
    ENTITIES: ['dist/**/*.entity.js'],
  },
  redis: {
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT),
    KEY: process.env.REDIS_KEY,
  }
});

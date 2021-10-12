export default () => ({
  APP: {
    NAME: process.env.APP_NAME,
    HOST: process.env.APP_HOST,
    PORT: Number(process.env.APP_PORT) || 8080,
  },
  jwt: {
    JWT_AUTH_SECRET: "secret",
    EXPIRES_IN: '1d'
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
  mailTrap: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
  },
  redis: {
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT),
    KEY: process.env.REDIS_KEY,
  }
});

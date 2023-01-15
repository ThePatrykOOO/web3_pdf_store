import { ModelCtor, Sequelize } from 'sequelize-typescript';

export async function testingDb(models: ModelCtor[]): Promise<Sequelize> {
  const testingDb: Sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
  testingDb.addModels(models);
  await testingDb.sync();
  return testingDb;
}

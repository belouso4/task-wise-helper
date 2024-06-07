import { JsonDB, Config } from 'node-json-db';

var jsonDB = new JsonDB(new Config("./data/settings", true, false, '/'));

export default jsonDB;
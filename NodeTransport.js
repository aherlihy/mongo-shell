import MongoClient from 'mongodb';

const URI = 'mongodb://localhost:27017';

class NodeTransport {
  constructor() {
    async function getDb() {
      return await MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    this.client = getDb();

    async function runCommand(databaseName, cmd) {
      const db = this.client.db(databaseName);
      return await db.command(cmd, (error, result) => {
        return result;
      });
    }

    this.command = (databaseName, cmd) => {
      console.log(`running cmd ${cmd} on db ${databaseName} in NodeTransport`);
      return runCommand(databaseName, cmd);
    }
  }
}

export default NodeTransport;

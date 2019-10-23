class NodeTransport {
  constructor(ctx, client) { // optional client
    this.client = client;
    this.runCommand = (databaseName, cmd) => {
      const db = this.client.db(databaseName);
      return db.command(cmd)
    };
  }

}

export default NodeTransport;

import NodeTransport from './NodeTransport.js';

class CLIServiceProvider {
  constructor(ctx, client) {
    this.ctx = ctx;
    this.nodeTransport = new NodeTransport(ctx, client);
    this.runCommand = this.nodeTransport.runCommand;
  }
}

export default CLIServiceProvider;

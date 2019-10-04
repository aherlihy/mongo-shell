import NodeTransport from './NodeTransport.js';

class CLIServiceProvider {
  constructor(ctx) {
    this.ctx = ctx;
    this.nodeTransport = new NodeTransport(ctx);
    this.command = this.nodeTransport.command;
  }
}

export default CLIServiceProvider;

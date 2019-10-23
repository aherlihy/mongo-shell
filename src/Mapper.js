/**
 * TODO: determine the best way to set public/private
 */

import { Database } from './ShellApi';

class Mapper {
  constructor(ctx, serviceProvider) {
    this._ctx = ctx;
    this._ctx.db = new Database(this, 'test');
    this._privateVar = null;
    this._serviceProvider = serviceProvider;

    this.runCommand = (cmd) => {
      return this._serviceProvider.runCommand(this._ctx.db.database, cmd);
    };
    
    this.use = (db) => {
      this._ctx.db = new Database(this, db);
    };
  }

}

export default Mapper;

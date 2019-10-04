/**
 * TODO: determine the best way to set public/private
 */
class DB {
  constructor(db, ctx, serviceProvider) {
    this.ns = db;
    this.ctx = ctx;
    this.serviceProvider = serviceProvider;
    this.runCommand = (cmd) => {
      return serviceProvider.command(this.ns, cmd);
    }
  };
}



class Mapper {
  constructor(ctx, serviceProvider) {
    this._ctx = ctx;
    this._ctx.db = new DB('test', ctx, serviceProvider);
    this._privateVar = null;
    this._serviceProvider = serviceProvider;

    this._use = (callback, db) => {
      console.log(`set db to ${db} from ${this._ctx.db}`);
      this._ctx.db = new DB(db, this._ctx, this._serviceProvider);
      callback();
    };
    this._help = (callback) => {
      console.log('calling help from shellApi');
      callback();
    };
    this._updatePublicVar = (callback, val) => {
      console.log(`updating publicVar=${val}`);
      this._ctx.publicVar = val;
      callback();
    };
    this._updatePrivateVar = (callback, val) => {
      console.log(`updating privateVar=${val} from ${this._privateVar}`);
      this._privateVar = val;
      callback();
    };

    this.publicFunc = (val) => {
      console.log(`calling public function with ${val}`);
      this._use(() => {}, val);
      this._ctx.publicVar = val;
    };
  }

}

export default Mapper;

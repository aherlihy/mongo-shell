class ShellApi {
  constructor(ctx) {
    this._currentDB = null;
    this._ctx = ctx;

    this._use = (callback, db) => {
      console.log(`set db to ${db} from ${this._currentDB}`);
      this._currentDB = db;
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

    this.publicFunc = (val) => {
      console.log(`calling public function with ${val}`);
      this._use(() => {}, val);
      this._ctx.publicVar = val;
    };
  }

}

export default ShellApi;

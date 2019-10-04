import Mapper from './Mapper.js';

/**
 * TODO: this will be generated from YAML
 */
class ShellApi {
  constructor(ctx, serviceProvider) {
    this.mapper = new Mapper(ctx, serviceProvider);
    Object.assign(this, this.mapper);
  }
}

export default ShellApi;

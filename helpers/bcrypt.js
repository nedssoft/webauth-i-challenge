const md5 = require("md5");

module.exports = {
  /**
   *
   *
   * @param { string } rawPass - the password to be hashed
   * @param { object } [option={}] - object containing salt and rounds
   * @returns {string} 
   */
  hash(rawPass, option = {}) {
    /**
     * salt is optional, if not provided it will be set to current timestamp
     */
    const salt = option.salt ? option.salt : new Date().getTime();

    /**
     * rounds is optional, if not provided it will be set to 10
     */
    const rounds = option.rounds ? option.rounds : 10;
    let hashed = md5(rawPass + salt);
    for (let i = 0; i <= rounds; i++) {
      hashed = md5(hashed);
    }
    return `${rounds}.${salt}.${hashed}`;
  },
  /**
   *
   *
   * @param {string} rawPass - the raw password
   * @param { string } hashedPass - the hashed password
   * @returns
   */
  compare(rawPass, hashedPass) {
    try {
      const [ rounds, salt, ...hashed ] = hashedPass.split('.');
      const hashedRaw = this.hash(rawPass, { salt, rounds });
      if (hashedPass === hashedRaw) {
        return true;
      }
      throw Error("Invalid passphrase");
    } catch (error) {
      throw Error(error.message);
    }
  }
};

'use strict'

class GeneratorId {
  constructor({ limitOfCharacters }) {
    this.limitOfCharacters = limitOfCharacters;
    this.halfOfLimitCharacters = this.getHalfOfLimitCharacters();
    this.possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  }

  getHalfOfLimitCharacters() {
    return parseInt(this.limitOfCharacters / 2);
  }

  getGeneratedId(idFromSource) {
    return this.limitedGeneration() + idFromSource + this.limitedGeneration();
  }

  limitedGeneration() {
    var temporalText = '';
    for (var i = 0; i < this.halfOfLimitCharacters; i++) {
      temporalText += this.possible.charAt(Math.floor(Math.random() * this.possible.length));
    }

    return temporalText;
  }
}

module.exports = GeneratorId;

import chai from 'chai';
import SomeObject from '../src';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my SomeObject library', () => {
  before(() => {
    lib = new SomeObject();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('SomeObject');
    });
  });
});

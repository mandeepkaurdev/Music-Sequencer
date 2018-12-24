//By Stone, tests for playing functions

const chai = require('chai');
const server = require('./server');
const expect = chai.expect;

let request;

let testArray = new Array();
testArray[0] = new Array(false, true, false, true, false, true, false);

describe('playColumn', function () {
  beforeEach(function () {
    testArray[0] = [false, true, false, true, false, true, false];
  });
  it('should only play all true notes in the column', function () {
    expect(playColumn(testArray[0])).to.equal(true);
    expect(playColumn(testArray[0])).to.equal(true);
  });
  testArray[0][0] = 'test';
  it('should not play anything if non-boolean values are found', function () {
    expect(playColumn(testArray[0])).to.equal(false);
  });
});

describe('playButton', function () {
  playVar = 0;
  it('should set the play frontend global variable to 1', function () {
    expect(playButton()).to.equal(playVar === 1);
  });
  it('should set the play frontend global variable back to 0 if it is 1.', function () {
    expect(playButton()).to.equal(playVar === 0);
  });
  it('should set the play frontend global variable to 1 again', function () {
    expect(playButton()).to.equal(playVar === 1);
  });
  it('should be repeatable, and always change the variable.', function () {
    expect(playButton()).to.equal(playVar === 0);
  });
});
const chai = require('chai');
const server = require('./server');
const expect = chai.expect;

let request;



describe('slider returns proper value', function () {
    it('should display the BPM', function () {
        expect(Tone.Transport.bpm.value).to.equal(Interface.Slider.Value);
    })
});

describe('slider change value on drag', function () {
    it('should adjust tempo value when slider is triggered', function () {
        expect(slider.on('change', function (val) { return val; })).to.equal(Tone.Transport.bpm.value);
    })
});

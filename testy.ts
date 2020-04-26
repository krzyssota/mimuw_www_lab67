import { fib } from './modulfib';
import { expect } from "chai";

import "mocha";


describe("Fibonacci", () => {

    it("should equal 0 for call with 0", () => {

        expect(fib(0)).to.equal(0);

    });
    it("should equal 1 for call with 2", () => {

        expect(fib(2)).to.equal(1);

    });
    it("should not be equal 10 for call with 3", () => {

        expect(fib(3)).to.not.equal(10)

    });

});

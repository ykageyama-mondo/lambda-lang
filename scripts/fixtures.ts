import type {FibonacciInput, FibonacciOutput} from '../src/node/types';

interface LambdaFixture<TInput, TOutput> {
  input: TInput;
  expected: TOutput;
}

interface FixtureType {
  fibonacci: LambdaFixture<FibonacciInput, FibonacciOutput>;
}

export const fixtures: FixtureType = {
  fibonacci: {
    input: {n: 10},
    expected: 55,
  },
};

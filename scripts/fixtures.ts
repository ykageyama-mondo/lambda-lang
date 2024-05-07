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
    input: {n: 93}, // Max representable in uint64
    expected: 12_200_160_415_121_876_738n,
  },
};

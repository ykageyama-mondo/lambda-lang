import {coldStart} from './coldStart';
import type {FibonacciInput} from './types';

console.log('Cold start detected', new Date().toISOString());

function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

export async function main(event: FibonacciInput) {
  coldStart();
  return fibonacci(event.n);
}

import {coldStart} from './coldstart';
import type {FibonacciInput} from './types';

console.log('Cold start detected', new Date().toISOString());

function fibonacci(n: number): bigint {
  if (n === 0 || n === 1) {
    return BigInt(n);
  }
  let sum = 0n;
  let prev = 0n;
  let curr = 1n;
  for (let i = 1; i < n; i++) {
    sum = prev + curr;
    prev = curr;
    curr = sum;
  }
  return sum;
}

export async function main(event: FibonacciInput) {
  coldStart();
  return fibonacci(event.n).toString();
}

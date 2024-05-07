import assert from 'assert';


import {fixtures} from './fixtures';
import {invokeLambda} from './lib/aws/lambda';
import {getLambdas} from './lib/exports';
import {parseLogs} from './lib/logs';

async function main() {
  const lambdas = await getLambdas();

  const lambdasGroupedByType = lambdas.reduce((acc, lambda) => {
    if (!acc[lambda.type]) {
      acc[lambda.type] = [];
    }
    acc[lambda.type].push(lambda);
    return acc;
  }, {} as Record<string, typeof lambdas>);

  const fibonacciLambdas = lambdasGroupedByType.fibonacci;

  const results: Record<string, any> = {};

  for (const lambda of fibonacciLambdas) {
    const output = await invokeLambda(lambda.arn, fixtures.fibonacci.input);
    const response = JSON.parse(Buffer.from(output.Payload!).toString());
    assert(response === fixtures.fibonacci.expected, `Expected ${fixtures.fibonacci.expected}, got ${response}`);

    const metrics = parseLogs(output.LogResult);

    results[lambda.language] = {
      [lambda.type]: metrics,
    };

  }

  console.log(JSON.stringify(results, null, 2));
}

main()
  .then(() => {
    console.log('Done!');
  })
  .catch((e) => {
    console.error(e);
  });

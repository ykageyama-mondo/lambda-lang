import assert from 'assert';

import {fixtures} from './fixtures';
import {invokeLambda} from './lib/aws/lambda';
import {getLambdas} from './lib/exports';
import {exportToGraph} from './lib/graph';
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

  const results: Record<string, Record<string, ReturnType<typeof parseLogs>>> = {};

  for (const lambda of fibonacciLambdas) {
    console.log(`Invoking ${lambda.language} ${lambda.type}`);
    const output = await invokeLambda(lambda.arn, fixtures.fibonacci.input);
    const data = Buffer.from(output.Payload!).toString();
    const response = BigInt(data.replace(/"/g, ''));
    assert(response === fixtures.fibonacci.expected, `Expected ${fixtures.fibonacci.expected}, got ${response}`);

    const metrics = parseLogs(output.LogResult!);
    if (!results[lambda.type]) {
      results[lambda.type] = {};
    }
    results[lambda.type][lambda.language] = metrics;

  }

  const durationFibRecord = Object.entries(results.fibonacci).reduce((agg, [language, metrics]) => {
    agg[language] = metrics.duration;
    return agg;
  }, {} as Record<string, any>);

  const coldStartFibRecord = Object.entries(results.fibonacci).reduce((agg, [language, metrics]) => {
    agg[language] = metrics.initDuration;
    return agg;
  }, {} as Record<string, any>);

  const memUsageFibRecord = Object.entries(results.fibonacci).reduce((agg, [language, metrics]) => {
    agg[language] = metrics.maxMemoryUsed;
    return agg;
  }, {} as Record<string, any>);


  await exportToGraph('Fibonacci Duration Benchmark', durationFibRecord);
  await exportToGraph('Fibonacci Memory Usage Benchmark', memUsageFibRecord, 'MB');
  if (Object.values(coldStartFibRecord).every((v) => v)) {
    await exportToGraph('Fibonacci Cold Start Benchmark', coldStartFibRecord);
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

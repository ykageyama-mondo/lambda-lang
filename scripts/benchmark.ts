import assert from 'assert';
import fs, {mkdirSync} from 'fs';
import path from 'path';

import {fixtures} from './fixtures';
import {invokeLambda} from './lib/aws/lambda';
import {getLambdas} from './lib/exports';
import {exportToGraph} from './lib/graph';
import {parseLogs} from './lib/logs';

const warmupIterations = 10;
const iterations = 1_000;

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

  const results: Record<string, Record<string, Array<ReturnType<typeof parseLogs>>>> = {};

  for (let i = 0; i < warmupIterations; i++) {
    for (const lambda of fibonacciLambdas) {
      await invokeLambda(lambda.arn, fixtures.fibonacci.input);
    }
  }

  for (let i = 0; i < iterations; i++) {
    process.stdout.write(`Iteration ${i + 1}\r`);

    for (const lambda of fibonacciLambdas) {
      const output = await invokeLambda(lambda.arn, fixtures.fibonacci.input);
      const data = Buffer.from(output.Payload!).toString();
      const response = BigInt(data.replace(/"/g, ''));
      assert(response === fixtures.fibonacci.expected, `Expected ${fixtures.fibonacci.expected}, got ${response}`);

      const metrics = parseLogs(output.LogResult!);
      if (!results[lambda.type]) {
        results[lambda.type] = {};
      }
      if (!results[lambda.type][lambda.language]) {
        results[lambda.type][lambda.language] = [];
      }
      results[lambda.type][lambda.language].push(metrics);

    }

  }

  const stats = Object.entries(results.fibonacci).reduce((agg, [language, metrics]) => {
    const avgDuration = metrics.reduce((acc, v) => acc + v.duration, 0) / metrics.length;
    const avgMemory = metrics.reduce((acc, v) => acc + v.maxMemoryUsed, 0) / metrics.length;

    agg.duration[language] = avgDuration;
    agg.memory[language] = avgMemory;
    return agg;
  }, {
    duration: {},
    memory: {},
  });

  // const coldStartFibRecord = Object.entries(results.fibonacci).reduce((agg, [language, metrics]) => {
  //   agg[language] = metrics.initDuration;
  //   return agg;
  // }, {} as Record<string, any>);

  await exportToGraph('Fibonacci Duration Benchmark', stats.duration);
  await exportToGraph('Fibonacci Memory Usage Benchmark', stats.memory, 'MB');
  // if (Object.values(coldStartFibRecord).every((v) => v)) {
  //   await exportToGraph('Fibonacci Cold Start Benchmark', coldStartFibRecord);
  // }
  console.log(JSON.stringify(results, null, 2));

  const outputDir = path.resolve(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    mkdirSync(outputDir);
  }
  fs.writeFileSync(path.join(outputDir, 'results.json'), JSON.stringify(results, null, 2));
}

main()
  .then(() => {
    console.log('Done!');
  })
  .catch((e) => {
    console.error(e);
  });

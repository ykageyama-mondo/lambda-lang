import * as d3 from 'd3-array';

import results from '../output/results.json';

const stats = Object.entries(results.fibonacci).reduce((agg, [language, metrics]) => {
  const durations = metrics.map((v) => v.duration).sort((a, b) => a - b);
  const memoryUsages = metrics.map((v) => v.maxMemoryUsed).sort((a, b) => a - b);

  const duration = {
    min: d3.min(durations),
    max: d3.max(durations),
    mean: d3.mean(durations),
    median: d3.median(durations),
    stdDev: d3.deviation(durations),
  };

  const memoryUsage = {
    min: d3.min(memoryUsages),
    max: d3.max(memoryUsages),
    mean: d3.mean(memoryUsages),
    median: d3.median(memoryUsages),
    stdDev: d3.deviation(memoryUsages),
  };

  agg[language] = {
    duration, memoryUsage,
  };
  return agg;
}, {});


console.log(JSON.stringify(stats, null, 2));

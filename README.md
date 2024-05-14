# Lambda Lang

## Fibonacci benchmark

### Cold start duration (single iteration)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/Fibonacci Cold Start Benchmark-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./assets/Fibonacci Cold Start Benchmark-light.svg">
    <img alt="Bar chart with benchmark results" src="/assets/Fibonacci Cold Start Benchmark-light.svg">
  </picture>
</p>

### Average execution duration (1000 iterations on warm lambdas)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/Fibonacci Duration Benchmark-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./assets/Fibonacci Duration Benchmark-light.svg">
    <img alt="Bar chart with benchmark results" src="/assets/Fibonacci Duration Benchmark-light.svg">
  </picture>
</p>

### Average memory usage (1000 iterations on warm lambdas)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/Fibonacci Memory Usage Benchmark-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./assets/Fibonacci Memory Usage Benchmark-light.svg">
    <img alt="Bar chart with benchmark results" src="/assets/Fibonacci Memory Usage Benchmark-light.svg">
  </picture>
</p>

## Getting started

### Prerequisites

- [Node.js v20](https://nodejs.org/en/)
- [Go >= v1.1](https://golang.org/dl/)
- [Rust >= v1.7](https://www.rust-lang.org/tools/install)
- `cargo-zigbuild` if you want fast builds

### Installation

1. Clone the repository
2. Install the dependencies
```bash
pnpm install
```
3. Deploy the project
```bash
pnpm run deploy
```
4. Run the benchmark
```bash
pnpm run benchmark
```
5. If you want to also benchmark cold starts

```bash
pnpm run benchmark:cold
```

### TODO

- [ ] More iterations
- [ ] Warm lambda comparison
- [ ] Logged time vs real time
- [ ] Timeseries of benchmarks against iteration count from cold
- [ ] More iterations for cold start
- [ ] More languages
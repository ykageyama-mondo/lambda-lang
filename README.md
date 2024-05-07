# Lambda Lang

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
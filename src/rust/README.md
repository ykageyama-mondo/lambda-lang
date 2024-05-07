# Rust lambda

## How to get started

1. Install the `cargo-lambda` cargo subcommand
- https://www.cargo-lambda.info/guide/installation.html

2. Create a new lambda by running
```bash
cargo lambda new my-lambda
```

3. Add the new lambda to the root `Cargo.toml` file workspace members
4. Update the stack with the new lambda
5. Install `cargo-zigbuild` to build the lambda locally without a docker container
```bash
cargo install cargo-zigbuild
```
6. Deploy with `pnpm run deploy`

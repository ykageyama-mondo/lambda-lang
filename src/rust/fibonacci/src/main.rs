mod coldstart;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};

use serde::Deserialize;

#[derive(Deserialize)]
struct FibonacciInput {
    n: u32,
}

fn fibonacci(n: u32) -> u32 {
    match n {
        0 => 0,
        1 => 1,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

async fn function_handler(event: LambdaEvent<FibonacciInput>) -> Result<u32, Error> {
    coldstart::cold_start();

    let n = event.payload.n;

    Ok(fibonacci(n))
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    run(service_fn(function_handler)).await
}

mod coldstart;
use lambda_runtime::{run, service_fn, tracing, Error, LambdaEvent};

use serde::Deserialize;

#[derive(Deserialize)]
struct FibonacciInput {
    n: u128,
}

fn fibonacci(n: u128) -> u128 {
    if (n == 0) || (n == 1) {
        return n;
    }
    let mut sum = 0;
    let mut prev= 0;
    let mut curr = 1;
    for _ in 1..n {
        sum = prev + curr;
        prev = curr;
        curr = sum;
    }
    sum
}

async fn function_handler(event: LambdaEvent<FibonacciInput>) -> Result<u128, Error> {
    coldstart::cold_start();

    let n = event.payload.n;

    Ok(fibonacci(n))
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    run(service_fn(function_handler)).await
}

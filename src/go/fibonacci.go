package main

import (
	"context"
	"fmt"
	"lambdaLang/lib"

	"github.com/aws/aws-lambda-go/lambda"
)

func fibonacci(n uint64) uint64 {
	if n == 0 || n == 1 {
		return n
	}
	var sum, prev uint64 = 0, 0
	var curr uint64 = 1
	for i := uint64(1); i < n; i++ {
		sum = prev + curr
		prev = curr
		curr = sum
	}
	fmt.Println("Fibonacci for ", n, " is: ", sum)
	return sum
}

type FibonacciInput struct {
	N uint64 `json:"n"`
}

func handler(ctx context.Context, event FibonacciInput) (uint64, error) {
	lib.ColdStart()
	fmt.Println("Calculating fibonacci for: ", event.N)

	return fibonacci(event.N), nil
}

func main() {
	lambda.Start(handler)
}

package main

import (
	"context"
	"fmt"
  "lambdaLang/lib"
	"github.com/aws/aws-lambda-go/lambda"
)

func fibonacci(n uint) uint {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

type FibonacciInput struct {
	N uint `json:"n"`
}

func handler(ctx context.Context, event FibonacciInput) (uint, error) {
  lib.ColdStart()
	fmt.Println("Calculating fibonacci for: ", event.N)

	return fibonacci(event.N), nil
}

func main() {
	lambda.Start(handler)
}

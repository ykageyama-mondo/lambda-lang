using System.Collections;
using Amazon.Lambda.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
// public static System.Collections.IDictionary GetEnvironmentVariables();

namespace FibonacciLambda;

public class Input
{
    public ulong n { get; set; }
}

public class Function
{

    /// <summary>
    /// A simple function that takes a string and does a ToUpper
    /// </summary>
    /// <param name="input"></param>
    /// <param name="context"></param>
    /// <returns></returns>
    public ulong FunctionHandler(Input input, ILambdaContext context)
    {
        var result = Fibonacci(input.n);
        Console.WriteLine($"Fibonacci({input.n}) = {result}");
        return result;
    }

    public ulong Fibonacci(ulong n)
    {
        if (n == 0 || n == 1) {
            return n;
        }
        ulong sum = 0;
        ulong prev = 0;
        ulong curr = 1;
        for (ulong i = 1; i < n; i++) {
            sum = prev + curr;
            prev = curr;
            curr = sum;
        }
        return sum;
    }
}
using System.Collections;
using Amazon.Lambda.Core;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]
// public static System.Collections.IDictionary GetEnvironmentVariables();

namespace FibonacciLambda;

public class Input
{
    public uint n { get; set; }
}

public class Function
{

    /// <summary>
    /// A simple function that takes a string and does a ToUpper
    /// </summary>
    /// <param name="input"></param>
    /// <param name="context"></param>
    /// <returns></returns>
    public uint FunctionHandler(Input input, ILambdaContext context)
    {
        return Fibonacci(input.n);
    }

    public uint Fibonacci(uint n)
    {
        if (n == 0 || n == 1) {
            return n;
        }
        uint sum = 0;
        uint prev = 0;
        uint curr = 1;
        for (var i = 1; i < n; i++) {
            sum = prev + curr;
            prev = curr;
            curr = sum;
        }
        return sum;
    }
}
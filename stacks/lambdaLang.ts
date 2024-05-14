import {GoFunction} from '@aws-cdk/aws-lambda-go-alpha';
import {RustFunction} from '@cdklabs/aws-lambda-rust';
import type {StackProps} from 'aws-cdk-lib';
import {Duration, Stack, BundlingOutput} from 'aws-cdk-lib';
import {Code, Runtime, Function} from 'aws-cdk-lib/aws-lambda';
import {NodejsFunction} from 'aws-cdk-lib/aws-lambda-nodejs';
import type {Construct} from 'constructs';

export class LambdaLangStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const nodeLambda = new NodejsFunction(this, 'FibonacciNodeLambda', {
      entry: 'src/node/fibonacci.ts',
      handler: 'main',
      runtime: Runtime.NODEJS_20_X,
      bundling: {
        minify: true,
      },
      timeout: Duration.seconds(30),
    });

    const goLambda = new GoFunction(this, 'FibonacciGoLambda', {
      entry: 'src/go/fibonacci.go',
      timeout: Duration.seconds(30),
    });

    const rustLambda = new RustFunction(this, 'FibonacciRustLambda', {
      entry: 'src/rust',
      binaryName: 'fibonacci',
      timeout: Duration.seconds(30),
    });


    const csharpLambda = new Function(this, 'CSharpLambda', {
      runtime: Runtime.DOTNET_8,
      handler: 'Fibonacci::FibonacciLambda.Function::FunctionHandler',
      code: Code.fromAsset('src/csharp/Fibonacci', {
        bundling: {
          image: Runtime.DOTNET_8.bundlingImage,
          user: 'root',
          outputType: BundlingOutput.ARCHIVED,
          command: [
            '/bin/sh',
            '-c',
            ' dotnet tool install -g Amazon.Lambda.Tools' +
            ' && dotnet build' +
            ' && dotnet lambda package --output-package /asset-output/function.zip',
          ],
        },
      }),
      timeout: Duration.seconds(30),
    });

    this.exportValue(nodeLambda.functionArn, {
      name: 'Node:fibonacci:LambdaArn',
    });
    this.exportValue(goLambda.functionArn, {
      name: 'Go:fibonacci:LambdaArn',
    });
    this.exportValue(rustLambda.functionArn, {
      name: 'Rust:fibonacci:LambdaArn',
    });
    this.exportValue(csharpLambda.functionArn, {
      name: 'CSharp:fibonacci:LambdaArn',
    });
  }
}

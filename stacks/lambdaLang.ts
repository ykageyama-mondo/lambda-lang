import {GoFunction} from '@aws-cdk/aws-lambda-go-alpha';
import {RustFunction} from '@cdklabs/aws-lambda-rust';
import type {StackProps} from 'aws-cdk-lib';
import {Duration, Stack} from 'aws-cdk-lib';
import {Runtime} from 'aws-cdk-lib/aws-lambda';
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

    this.exportValue(nodeLambda.functionArn, {
      name: 'Node:fibonacci:LambdaArn',
    });
    this.exportValue(goLambda.functionArn, {
      name: 'Go:fibonacci:LambdaArn',
    });
    this.exportValue(rustLambda.functionArn, {
      name: 'Rust:fibonacci:LambdaArn',
    });
  }
}

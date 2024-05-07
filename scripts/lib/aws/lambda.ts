import {InvokeCommand, LambdaClient, LogType} from '@aws-sdk/client-lambda';

const lambdaClient = new LambdaClient({
  region: 'ap-southeast-2',
});


export function invokeLambda(arn: string, payload?: any) {
  return lambdaClient.send(new InvokeCommand({
    FunctionName: arn,
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(payload),
    LogType: LogType.Tail,
  }));
}

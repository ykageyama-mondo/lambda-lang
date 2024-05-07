import {CloudFormationClient, DescribeStacksCommand} from '@aws-sdk/client-cloudformation';

const cfnClient = new CloudFormationClient({
  region: 'ap-southeast-2',
});

export async function getLambdas() {
  const response = await cfnClient.send(new DescribeStacksCommand({
    StackName: 'LambdaLangStack',
  }));
  const stack = response.Stacks?.[0];
  if (!stack) {
    throw new Error('Stack not found');
  }

  const cfnExports = stack.Outputs?.filter((output) => output.ExportName?.endsWith('LambdaArn'));
  if (!cfnExports || cfnExports.length === 0) {
    throw new Error('Lambda exports not found');
  }

  const lambdas = cfnExports.map((exp) => {
    const [language, type] = exp.ExportName!.split(':');

    return {
      type,
      language,
      arn: exp.OutputValue!,
    };
  });

  return lambdas;
}

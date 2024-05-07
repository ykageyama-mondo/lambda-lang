import {App} from 'aws-cdk-lib';

import {LambdaLangStack} from './lambdaLang';

const app = new App();
const tags = {
  Solution: 'LambdaLang',
  EnvironmentName: 'LambdaLang',
};

new LambdaLangStack(app, 'LambdaLangStack', {
  tags,
  stackName: 'LambdaLangStack',
});

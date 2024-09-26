#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { QuicksightCustomParameterDisplayStack } from '../lib/quicksight-custom-parameter-display-stack';

const app = new cdk.App();
new QuicksightCustomParameterDisplayStack(app, 'QuicksightCustomParameterDisplayStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

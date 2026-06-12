// @ts-check
import { defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  timeout: 30*1000,
  expect:
  {
    timeout: 40*1000,
  },
  reporter: [
    ['html'],
  ['list'],
  ['allure-playwright']
],
  use: {
    browserName: 'chromium',
    headless: false,
    //browserName: 'webkit',
    screenshot: 'on',
    trace: 'on'
  },
});
module.exports = config;


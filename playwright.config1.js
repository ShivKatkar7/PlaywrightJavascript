// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config = defineConfig({
  testDir: './tests',
  retries: 2,
  timeout: 30*1000,
  expect: {
    timeout: 40*1000,
  },
  reporter: 'html',
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure',
        videoDir: 'test-results/videos',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
      }
    },
    {
      name : 'safari',
      use: {
        browserName : 'webkit',
        headless : true,
        screenshot : 'off',
        trace : 'on',//off,on 
        ...devices['iPhone 11'],    
      }
    }
  ]
});

module.exports = config;


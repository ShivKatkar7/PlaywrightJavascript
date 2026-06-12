import { test as baseTest } from "@playwright/test";

interface TestDataOrder{
  username: string;
  password: string;
  productName: string;
};

export const customTest=baseTest.extend<{testDataOrder:TestDataOrder}>(
  {
    testDataOrder:{
      username: "shivanikatkar@gmail.com",
      password: "Shivani@7213",
      productName: "ZARA COAT 3"
    }
  }
)
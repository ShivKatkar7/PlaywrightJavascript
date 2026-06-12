//const { test, expect } = require('../TestData/fixture');
const {test, expect} = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager');
//const{customTest} = require('../TestData/fixture');

import { customTest }  from '../TestData/fixture';
//first convert Json -> to string -> then convert to JS object
const dataset = JSON.parse(JSON.stringify (require('../TestData/placeOrdertestdata.json')));

for (const data of dataset)
{
test(`Client app login ${data.productName}`, async ({page})=>
{
    const pomanageobj = new POManager(page);
    const loginpageobj = pomanageobj.getLoginPage();
    const dashboardpageobj = pomanageobj.getdashboardpage();
    const checkoutPageobj = pomanageobj.getcheckoutpage();
    const orderdetailpageobj = pomanageobj.getOrderDetailPage();
    const vieworderpageobj = pomanageobj.getViewOrderPage();

    await loginpageobj.landingonLoginPage();
    await loginpageobj.validLogin(data.username, data.password);
    await dashboardpageobj.searchProductAddCart(data.productName);
    await dashboardpageobj.navigateToCart();
    await checkoutPageobj.checkboutpagedetails(data.productName);
    const orderID = await orderdetailpageobj.orderdetailsvalidation();
    await vieworderpageobj.verifyorderID(orderID);
});
}

customTest(`Client app login1`, async ({page, testdataORder})=>
{
    const pomanageobj = new POManager(page);
    const loginpageobj = pomanageobj.getLoginPage();
    const dashboardpageobj = pomanageobj.getdashboardpage();
    const checkoutPageobj = pomanageobj.getcheckoutpage();
    const orderdetailpageobj = pomanageobj.getOrderDetailPage();
    const vieworderpageobj = pomanageobj.getViewOrderPage();

    await loginpageobj.landingonLoginPage();
    await loginpageobj.validLogin(testdataORder.username, testdataORder.password);
    await dashboardpageobj.searchProductAddCart(testdataORder.productName);
    await dashboardpageobj.navigateToCart();
    await checkoutPageobj.checkboutpagedetails(testdataORder.productName);
    const orderID = await orderdetailpageobj.orderdetailsvalidation();
    await vieworderpageobj.verifyorderID(orderID);
});
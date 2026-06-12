import {test, expect, Page} from '@playwright/test';
import {POManager} from '../pageobjectsTS/POManager';
import {customTest} from '../TestData/fixture';
import placeOrderTestData from '../TestData/placeOrdertestdata.json';

//first convert Json -> to string -> then convert to JS object
const dataset = JSON.parse(JSON.stringify(placeOrderTestData));

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

customTest(`Client app login1`, async ({page, testDataOrder})=>
{
    const pomanageobj = new POManager(page);
    const loginpageobj = pomanageobj.getLoginPage();
    const dashboardpageobj = pomanageobj.getdashboardpage();
    const checkoutPageobj = pomanageobj.getcheckoutpage();
    const orderdetailpageobj = pomanageobj.getOrderDetailPage();
    const vieworderpageobj = pomanageobj.getViewOrderPage();

    await loginpageobj.landingonLoginPage();
    await loginpageobj.validLogin(testDataOrder.username, testDataOrder.password);
    await dashboardpageobj.searchProductAddCart(testDataOrder.productName);
    await dashboardpageobj.navigateToCart();
    await checkoutPageobj.checkboutpagedetails(testDataOrder.productName);
    let orderID: any;
    orderID = await orderdetailpageobj.orderdetailsvalidation();
    await vieworderpageobj.verifyorderID(orderID);
});
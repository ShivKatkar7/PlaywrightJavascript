import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import{CheckOutPage }from './CheckOutPage';
import{OrderDetailsPage }from './OrderDetailsPage';
import{ViewOrderpage }from './ViewOrderpage';
import {Page, Locator, expect} from '@playwright/test';


export class POManager
{
    pagepara:Page;
    loginpageobj: LoginPage;
    dashboardpageobj:DashboardPage;
    checkoutPageobj:CheckOutPage;
    orderdetailpageobj: OrderDetailsPage;
    vieworderpageobj:ViewOrderpage;

    constructor(pagepara:Page )
    {
        this.pagepara = pagepara;
        this.loginpageobj = new LoginPage(this.pagepara);
        this.dashboardpageobj = new DashboardPage(this.pagepara);
        this.checkoutPageobj = new CheckOutPage(this.pagepara);
        this.orderdetailpageobj = new OrderDetailsPage(this.pagepara);
        this.vieworderpageobj = new ViewOrderpage(this.pagepara);
    }

    getLoginPage()
    {
        return this.loginpageobj;
    }

    getdashboardpage()
    {
        return this.dashboardpageobj;
    }

    getcheckoutpage()
    {
        return this.checkoutPageobj;
    }

    getOrderDetailPage()
    {
        return this.orderdetailpageobj;
    }

    getViewOrderPage()
    {
        return this.vieworderpageobj;
    }
}

module.exports = {POManager};
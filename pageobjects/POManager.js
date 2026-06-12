const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CheckOutPage} = require('./CheckOutPage');
const {OrderDetailsPage} = require('./OrderDetailsPage');
const {ViewOrderpage} = require('./ViewOrderpage');

class POManager
{
    constructor(pagepara)
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
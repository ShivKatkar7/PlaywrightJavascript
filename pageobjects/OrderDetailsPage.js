const{expect} = require('@playwright/test');

class OrderDetailsPage {

    constructor(pagepara) 
    {
        this.pagepara = pagepara;
        this.thankyoutext = pagepara.locator(".hero-primary");
        this.orderID = pagepara.locator(".em-spacer-1 .ng-star-inserted");
        this.myorderlink = pagepara.locator("[routerlink*='myorders']");
        this.body = pagepara.locator("tbody");
        this.row = pagepara.locator("tbody tr");
    }

    async orderdetailsvalidation() 
    {
        await expect(this.thankyoutext).toHaveText(" Thankyou for the order. ");
        const orderID = await this.orderID.textContent();
        console.log(orderID);
        await this.myorderlink.first().click();
        await this.body.waitFor();
        const row = await this.row;
        for (let i = 0; i < await row.count(); i++) {
            const rowOrderID = await row.nth(i).locator("th").textContent();
                if (orderID.includes(rowOrderID)) 
                {
                await row.nth(i).locator("button").first().click();
                break;
                }
        }
        return orderID;
    }
}

module.exports ={OrderDetailsPage}
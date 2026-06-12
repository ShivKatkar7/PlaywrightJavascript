const{expect} = require('@playwright/test');

class ViewOrderpage
{
    constructor(pagepara)
    {
        this.pagepara = pagepara;
        this.viewpageorderid = pagepara.locator(".col-text");
    }

    async verifyorderID(orderID)
    {
        const viewpageOrderID = await this.viewpageorderid.textContent();
        expect(orderID.includes(viewpageOrderID)).toBeTruthy();
    }
}

module.exports = {ViewOrderpage}
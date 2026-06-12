import {Page, Locator, expect} from '@playwright/test';

export class ViewOrderpage
{
    pagepara:Page;
    viewpageorderid:Locator;
    constructor(pagepara:Page)
    {
        this.pagepara = pagepara;
        this.viewpageorderid = pagepara.locator(".col-text");
    }

    async verifyorderID(orderID:any)
    {
        const viewpageOrderID = await this.viewpageorderid.textContent();
        expect(orderID.includes(viewpageOrderID)).toBeTruthy();
    }
}

module.exports = {ViewOrderpage}
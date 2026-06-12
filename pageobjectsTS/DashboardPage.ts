import {Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    pagepara:Page;
    product : Locator;
    productText: Locator;
    cartLink :Locator;
    firstproductoncheckout : Locator;

    constructor(pagepara:Page) {
        this.pagepara = pagepara;
        this.product = pagepara.locator(".card-body");
        this.productText = pagepara.locator(".card-body b");
        this.cartLink = pagepara.locator("[routerlink*='cart']");
        this.firstproductoncheckout = pagepara.locator("div li");
    }

    async searchProductAddCart(ProductName: string) {
        await this.productText.first().waitFor();
        const titles = await this.productText.allTextContents();
        console.log(titles);
        //we need to fetch  ZARA COAT 3
        const count = await  this.product.count();
        for (let i = 0; i < count; i++) {
            if (await  this.product.nth(i).locator("b").textContent() === ProductName) {
                await  this.product.nth(i).locator(":text('Add To Cart')").click();
                break;
            }
        }
    }

    async navigateToCart()
    {
        await this.cartLink.click();
        await this.firstproductoncheckout.first().waitFor();
    }
}

module.exports ={DashboardPage};
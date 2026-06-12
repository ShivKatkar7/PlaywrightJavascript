import {Page, Locator, expect} from '@playwright/test';

export class CheckOutPage
{
    pagepara:Page ;
    checkoutbutton:Locator;
    input1:Locator;
    cvvinput:Locator;
    banknameinput:Locator;
    countrydrod:Locator;
    droddown:Locator;
    placeorderbtn: Locator;

    constructor(pagepara:Page)
    {
        this.pagepara = pagepara;      
        this.checkoutbutton = pagepara.locator("button:has-text('Checkout')");
        this.input1 = pagepara.locator("select.input.ddl");
        this.cvvinput = pagepara.locator(".field.small");
        this.banknameinput = pagepara.locator("input[type='text']");
        this.countrydrod = pagepara.locator("[placeholder*='Country']");
        this.droddown = pagepara.locator(".ta-results");
        this.placeorderbtn = pagepara.locator(".action__submit");
    }

    async checkboutpagedetails(productName: string)
    {
        const bool = await this.pagepara.locator("h3:has-text('"+productName+"')").isVisible();
        expect(bool).toBeTruthy();
        await this.checkoutbutton.click();
        await this.input1.first().selectOption('04');
        await this.input1.nth(1).selectOption('26');
        await this.cvvinput.nth(1).locator(".input.txt").fill("752");
        await this.banknameinput.nth(2).fill("HDFC");
        await  this.countrydrod.pressSequentially('ind');
        const dropdown = await this.droddown;
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for(let i=0; i< optionsCount;i++)
        {
            let text:any;
            text = await dropdown.locator("button").nth(i).textContent();
            if(text.trim() === "India")
            {
            await dropdown.locator("button").nth(i).click();
            break;
            }
        }
        await this.placeorderbtn.click();
    } 
}

module.exports = {CheckOutPage};
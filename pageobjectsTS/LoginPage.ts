import{Page, Locator, expect} from '@playwright/test';

export class LoginPage
{
    pagepara:Page;
    sigInbutton:Locator;
    userName: Locator;
    password: Locator;

constructor(pagepara:Page)
{
    this.pagepara = pagepara;
    this.sigInbutton = pagepara.locator("#login");
    this.userName = pagepara.locator("#userEmail")
    this.password = pagepara.locator("#userPassword");
}

async landingonLoginPage()
{
    await this.pagepara.goto("https://rahulshettyacademy.com/client/#/auth/login");
}

async validLogin(uname:string, pwd:string)
{
    await this.userName.fill(uname);
    await this.password.fill(pwd);
    await this.sigInbutton.click();
    await this.pagepara.waitForLoadState("networkidle");
}
}

module.exports = {LoginPage};

    
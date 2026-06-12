class LoginPage
{


constructor(pagepara)
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

async validLogin(uname, pwd)
{
    await this.userName.fill(uname);
    await this.password.fill(pwd);
    await this.sigInbutton.click();
    await this.pagepara.waitForLoadState("networkidle");
}
}

module.exports = {LoginPage};

    
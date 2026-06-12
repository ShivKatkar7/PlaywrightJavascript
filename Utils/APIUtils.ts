export class APIUtils
{
    apiContext:any;
    loginPayload:String;
    
    constructor(apiContext:any, loginPayload:string)   
    {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    } 
    

    //login API call to get the token
    async getToken()
    {
    const loginResponse = await this.apiContext.post(
        "https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: this.loginPayload
        });
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    //create order API calls
    async createOrder(orderPayload:string)
    {
        //created an object for response
        let response = 
        {
            token:String, 
            orderID:String
        };

            response.token = await this.getToken();
        
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
                    {
                        data : orderPayload,
                        headers : 
                        {
                            'Authorization' : response.token,
                            'content-type' : 'application/json'
                        },
                    })
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            const orderID = orderResponseJson.orders[0];
            response.orderID = orderID;
            console.log(orderID);
            return response;
    }
    
}
module.exports = {APIUtils};

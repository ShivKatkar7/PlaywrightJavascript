Feature: Ecommerce validations

  @Regression
  Scenario: Placing the order
  Given login to ecommerce application with "shivanikatkar@gmail.com" and "Shivani@7213"
  When Add "ZARA COAT 3" to the cart
  Then verify "ZARA COAT 3" is displayed in the cart and with valid details place order
  Then verify order is present in the OrderHistory
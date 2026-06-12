Feature: Ecommerce validations

@Validations
  Scenario: Placing the order
  Given login to ecommerce2 application with "shivanikatkar@gmail.com" and "Shivani@7213"
  Then verify error message is displayed
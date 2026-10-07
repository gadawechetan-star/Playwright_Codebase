Feature: Ecommerce validation

  Scenario: User places an order successfully
    Given a login to a ecommerce application with "username" and "password"
    When the user adds a product to the cart named "ZARA COAT 3"
    Then Verify that the product "ZARA COAT 3" is added to the cart
    When the 
    And the user enters valid shipping and payment information
    Then the order should be placed successfully
    And the user should see an order confirmation message

    
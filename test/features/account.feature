Feature: Account
    In order to check my account's performance,
    as an investor,
    I want to see my account's summary.

    Scenario: Account summary calculation
        Given my account holds the following assets
            | asset_class   | market_value | percent_allocation | percent_return |
            | US Stocks     |         9000 |               0.90 |         0.0510 |
            | Cash          |         1000 |               0.10 |         0.0000 |

        And my investment in the account is 9500

        When I calculate the account summary

        Then I should get the following account summary
            | market_value | earnings | cash |
            |        10000 |      500 | 1000 |

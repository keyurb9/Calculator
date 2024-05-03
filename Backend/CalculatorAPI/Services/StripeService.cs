using Azure;
using CalculatorAPI.Models;
using CalculatorAPI.Services.Interfaces;
using Stripe;
using System.Diagnostics;

namespace CalculatorAPI.Services
{
    public class StripeService : IStripeService
    {

        public StripeService()
        {

        }

        public string CreateCustomer(Client client)
        {
            var options = new CustomerCreateOptions
            {
                Name = client.Name,
                Email = client.Email,
            };
            var service = new CustomerService();
            var response = service.Create(options);

            return response.Id;

        }

        public string CreatePaymentMethod(string stripeCustId)
        {
            try
            {
                // Set Stripe Token options based on customer data
                var cardTokenOptions = new CardCreateOptions
                {
                    Source = "tok_visa_debit",
                };

                // Create new Card Token
                var cardService = new CardService();
                var cardResponse = cardService.Create(stripeCustId, cardTokenOptions);
            }

            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

            return "Subscribed";
        }

        public string CreateSubscription(string stripeCustId)
        {

            try
            {
                var options = new SubscriptionCreateOptions
                {
                    Customer = stripeCustId,
                    Items = new List<SubscriptionItemOptions>
                    {
                        new SubscriptionItemOptions { Price = "price_1PCOYjB3ZXgQpUeX8G9z61U9" },
                    },
                };
                var service = new SubscriptionService();
                service.Create(options);
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex);
            }

            return "Subscribed";
        }
    }
}

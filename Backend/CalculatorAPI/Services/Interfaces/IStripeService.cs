using CalculatorAPI.Models;

namespace CalculatorAPI.Services.Interfaces
{
    public interface IStripeService
    {
        string CreateCustomer(Client client);

        string CreatePaymentMethod(string stripeCustId);

        string CreateSubscription(string stripeCustId);
    }
}

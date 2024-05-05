using System.ComponentModel.DataAnnotations;

namespace CalculatorAPI.Models
{
    public class StripeClient
    {
        [Key]
        public int CustomerId { get; set; }
        public int ClientId { get; set; }
        public string StripeCustomerId { get; set; }
    }
}

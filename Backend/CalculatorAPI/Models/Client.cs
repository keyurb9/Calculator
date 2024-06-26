﻿using System.ComponentModel.DataAnnotations;

namespace CalculatorAPI.Models
{
    public class Client
    {
        [Key]
        public int ClientId { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string CardNo { get; set; }

        public string Expiry { get; set; }

        public int Cvc { get; set; }

        public string Country { get; set; }

    }
}

using CalculatorAPI.DB;
using CalculatorAPI.Models;
using CalculatorAPI.Services;
using CalculatorAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System.Threading;

namespace CalculatorAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ClientDBContext _clientContext;

        private readonly IStripeService _stripeService;

        public ClientController(ClientDBContext clientContext, IStripeService stripeService)
        {
            _clientContext = clientContext;
            _stripeService = stripeService;
        }

        // GET: api/Client
        [HttpGet]
        public ActionResult<IEnumerable<Client>> GetClients()
        {
            return _clientContext.Client.ToList();
        }

        // GET: api/Client/1
        [HttpGet("{id}")]
        public ActionResult<Client> GetClient(int id)
        {
            var client = _clientContext.Client.Find(id);
            if (client == null)
            {
                return NotFound();
            }
            return client;
        }

        // POST: api/Client
        [HttpPost]
        public ActionResult<Client> CreateClient(Client client)
        {
            if (client == null)
            {
                return BadRequest();
            }
            try
            {
                string stripeId = createStripeCustomer(client);
                if (stripeId.Length > 0)
                {
                    _clientContext.Client.Add(client);
                    _clientContext.SaveChanges();
                    CreatedAtAction(nameof(GetClient), new { id = client.ClientId }, client);


                    _clientContext.StripeClient.Add(new Models.StripeClient()
                    {
                        CustomerId = 0,
                        ClientId = client.ClientId,
                        StripeCustomerId = stripeId,

                    });
                    _clientContext.SaveChanges();

                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok(client);
        }

        private string createStripeCustomer(Client client)
        {
            string id = _stripeService.CreateCustomer(client);
            string paymentMethod = _stripeService.CreatePaymentMethod(id);
            string subscription = _stripeService.CreateSubscription(id);
            return id;
        }

    }
}



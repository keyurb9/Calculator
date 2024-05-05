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

        // GET: Client/signin/keyur2k2@gmail.com/dummy12345
        [HttpGet]
        [Route("SignIn/{email}/{password}")]
        public ActionResult<Client> SignIn(string email, string password)
        {
            var client = _clientContext.Client.FirstOrDefault(x => x.Email.Equals(email) && x.Password.Equals(password));
            if (client == null)
            {
                return NotFound();
            }
            return client;
        }

        // POST: api/SignUp
        [HttpPost]
        [Route("SignUp")]
        public ActionResult<Client> SignUp(Client client)
        {
            if (client == null)
            {
                return BadRequest();
            }

            try
            {
                var existingClient = _clientContext.Client.FirstOrDefault(x => x.Email.Equals(client.Email));
                if (existingClient != null)
                {
                    return Conflict("User already exists");
                }

                string stripeId = createStripeCustomer(client);
                //string stripeId = "Hello";
                if (stripeId.Length > 0)
                {
                    client.CardNo = client.CardNo.Substring(client.CardNo.Length - 4);
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



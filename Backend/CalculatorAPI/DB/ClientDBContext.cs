using Microsoft.EntityFrameworkCore;
using CalculatorAPI.Models;

namespace CalculatorAPI.DB
{
    public partial class ClientDBContext : DbContext
    {
        public ClientDBContext(DbContextOptions
        <ClientDBContext> options)
            : base(options)
        {
        }
        public virtual DbSet<Client> Client { get; set; }

        public virtual DbSet<StripeClient> StripeClient { get; set; }
    }
}

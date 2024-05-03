using CalculatorAPI.DB;
using CalculatorAPI.Services.Interfaces;
using CalculatorAPI.Services;
using Microsoft.EntityFrameworkCore;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ClientDBContext>(options => options.UseSqlServer(connectionString));

StripeConfiguration.ApiKey = builder.Configuration.GetValue<string>("StripeKey");

// Add services to the container.
builder.Services.AddControllers();

//add services
builder.Services.AddScoped<TokenService>();
builder.Services.AddScoped<CustomerService>();
builder.Services.AddScoped<ChargeService>();
builder.Services.AddScoped<IStripeService, StripeService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

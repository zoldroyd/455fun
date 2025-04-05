using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// ✅ CORS setup (allow all for local dev)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ✅ Existing services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Apply CORS before routing
app.UseCors("AllowAll");

// ✅ Existing pipeline config
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();


// ✅ Handle preflight CORS for the proxy route
app.MapMethods("/api/azure-recommendations", new[] { "OPTIONS" }, () => Results.Ok());

// ✅ Azure ML Proxy Route
app.MapPost("/api/azure-recommendations", async (HttpRequest request) =>
{
    var azureEndpoint = "http://a51ac870-e3ca-4a21-918b-990b835235e2.eastus2.azurecontainer.io/score";
    var apiKey = "p7B6AcymgI2Py8x6si6dVlBd0tdDdOdq";

    using var reader = new StreamReader(request.Body);
    var body = await reader.ReadToEndAsync();

    var httpClient = new HttpClient();
    httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

    var content = new StringContent(body, Encoding.UTF8, "application/json");

    try
    {
        var response = await httpClient.PostAsync(azureEndpoint, content);
        var resultJson = await response.Content.ReadAsStringAsync();

        if (response.IsSuccessStatusCode)
        {
            var parsed = JsonSerializer.Deserialize<object>(resultJson);
            return Results.Ok(parsed);
        }

        return Results.Problem(resultJson);
    }
    catch (Exception ex)
    {
        return Results.Problem($"Error calling Azure ML: {ex.Message}");
    }
});




app.Run();

// Simple record for deserializing POST input
record InputPayload(string Id);

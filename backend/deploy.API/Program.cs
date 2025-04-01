using deploy.API.Services;

var builder = WebApplication.CreateBuilder(args);

// ✅ Register services BEFORE app.Build()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// ✅ Register other services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<SavToJsonService>();


var app = builder.Build(); // 🚨 No more service modifications after this!

// ✅ Apply CORS before mapping controllers
app.UseCors("AllowAll");

app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
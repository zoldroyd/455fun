using deploy.API.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

[Route("api/recommendations")]
[ApiController]
public class RecommendationsController : ControllerBase
{
    private readonly SavToJsonService _savService;

    public RecommendationsController(SavToJsonService savService)
    {
        _savService = savService;
    }

    [HttpGet]
    public IActionResult GetRecommendations()
    {
        _savService.ConvertSavToJson();  // Convert before returning data

        string jsonData = _savService.GetJsonData();
        return Content(jsonData, "application/json");
    }
}


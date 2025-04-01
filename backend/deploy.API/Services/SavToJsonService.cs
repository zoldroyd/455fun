namespace deploy.API.Services;

using System;
using System.Diagnostics;
using System.IO;
using Microsoft.AspNetCore.Hosting;

public class SavToJsonService
{
    private readonly IWebHostEnvironment _env;
    private readonly string _pythonScriptPath;
    private readonly string _jsonFilePath;

    public SavToJsonService(IWebHostEnvironment env)
    {
        _env = env;
        _pythonScriptPath = Path.Combine(_env.WebRootPath, "Scripts", "convert_sav_to_json.py");
        _jsonFilePath = Path.Combine(_env.WebRootPath, "Data", "data.json");
    }

    public void ConvertSavToJson()
    {
        try
        {
            ProcessStartInfo start = new ProcessStartInfo
            {
                FileName = "python",  // Ensure Python is installed
                Arguments = _pythonScriptPath, // Run Python script
                UseShellExecute = false,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                CreateNoWindow = true
            };

            using (Process process = Process.Start(start))
            {
                using (StreamReader reader = process.StandardOutput)
                {
                    Console.WriteLine(reader.ReadToEnd());
                }
                using (StreamReader reader = process.StandardError)
                {
                    string error = reader.ReadToEnd();
                    if (!string.IsNullOrEmpty(error))
                    {
                        Console.WriteLine("Python Error: " + error);
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error running Python script: " + ex.Message);
        }
    }

    public string GetJsonData()
    {
        if (!File.Exists(_jsonFilePath))
            return "{}";  // Return empty JSON if no data

        return File.ReadAllText(_jsonFilePath);
    }
}

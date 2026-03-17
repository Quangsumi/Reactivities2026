using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.ComponentModel.DataAnnotations;

namespace Api.Controllers;

[AllowAnonymous]
public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
        => await context.Activities.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivity(string id)
    {
        var activity = await context.Activities.FindAsync(id);
        if (activity == null) return NotFound();
        return activity;
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(Activity activity)
    {
        var dbActivity = await context.Activities.FindAsync(activity.Id);
        if (dbActivity == null) return NotFound();

        dbActivity.Title = activity.Title;
        dbActivity.Description = activity.Description;
        dbActivity.Category = activity.Category;
        dbActivity.Date = activity.Date;
        dbActivity.City = activity.City;
        dbActivity.Venue = activity.Venue;

        await context.SaveChangesAsync();
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult> CreateActivity(Activity activity)
    {
        context.Activities.Add(activity);
        await context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetActivities), new { id = activity.Id }, activity);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        var dbActivity = await context.Activities.FindAsync(id);
        if (dbActivity == null) return NotFound();
        
        context.Activities.Remove(dbActivity);
        await context.SaveChangesAsync();
        return NoContent();
    }
}

public class CreateActivityDto 
{
    [Required]
    public string Title { get; set; }

    public DateTime Date { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string Category { get; set; }

    public bool IsCancelled { get; set; }

    [Required]
    public string City { get; set; }

    [Required]
    public string Venue { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }
}

public class UpdateActivityDto
{
    [Required]
    public string Id { get; set; }

    [Required]
    public string Title { get; set; }

    public DateTime Date { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string Category { get; set; }

    public bool IsCancelled { get; set; }

    [Required]
    public string City { get; set; }

    [Required]
    public string Venue { get; set; }

    public double Latitude { get; set; }

    public double Longitude { get; set; }
}
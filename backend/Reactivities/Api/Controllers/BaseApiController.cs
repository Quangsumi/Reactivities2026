using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
}

public class ActivitiesController(AppDbContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivities()
        => await context.Activities.ToListAsync();

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
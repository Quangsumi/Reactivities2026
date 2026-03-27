using Application.Activities.Commands;
using Application.Activities.Contracts;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<ActivityDto>>> GetActivities()
    {
        var activities = await mediator.Send(new GetActivitiesQuery());
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivity(string id)
    {
        var activity = await mediator.Send(new GetActivityQuery { Id = id });
        if (activity is null) return NotFound();
        return Ok(activity);
    }

    [HttpPut]
    public async Task<ActionResult> EditActivity(ActivityDto activity)
    {
        var updated = await mediator.Send(new UpdateActivityCommand { Activity = activity });
        if (updated is null) return NotFound();
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult> CreateActivity(ActivityDto activity)
    {
        var created = await mediator.Send(new CreateActivityCommand { Activity = activity });

        return CreatedAtAction(nameof(GetActivity), new { id = created.Id }, created);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        var deleted = await mediator.Send(new DeleteActivityCommand { Id = id });
        if (!deleted) return NotFound();
        return NoContent();
    }
}
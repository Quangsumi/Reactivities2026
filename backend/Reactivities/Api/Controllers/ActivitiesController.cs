using Application.Activities.Commands;
using Application.Activities.Dtos;
using Application.Activities.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ActivitiesController(IMediator mediator) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<ActivityDto>>> GetActivities()
    {
        var activities = await mediator.Send(new GetActivities.Query());
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ActivityDto>> GetActivity(string id)
    {
        var activity = await mediator.Send(new GetActivity.Query { Id = id });
        if (activity is null) return NotFound();
        return Ok(activity);
    }

    [HttpPut("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> EditActivity(string id, ActivityDto activity)
    {
        activity.Id = id;
        var updated = await mediator.Send(new UpdateActivity.Command { Activity = activity });
        if (updated is null) return NotFound();
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult> CreateActivity(ActivityDto activity)
    {
        var created = await mediator.Send(new CreateActivity.Command { Activity = activity });

        return CreatedAtAction(nameof(GetActivity), new { id = created.Id }, created);
    }

    [HttpDelete("{id}")]
    [Authorize(Policy = "IsActivityHost")]
    public async Task<ActionResult> DeleteActivity(string id)
    {
        var deleted = await mediator.Send(new DeleteActivity.Command { Id = id });
        if (!deleted) return NotFound();
        return NoContent();
    }

    [HttpPost("{id}/attend")]
    public async Task<ActionResult> UpdateAttenace(string id)
    {
        var updated = await mediator.Send(new UpdateAttendance.Command { ActivityId = id });
        if (!updated) return BadRequest();
        return NoContent();
    }
}
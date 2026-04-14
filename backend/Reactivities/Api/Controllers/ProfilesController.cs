using Application.Users.Commands;
using Application.Users.Dtos;
using Application.Users.Queries;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class ProfilesController(IMediator mediator) : BaseApiController
{
    [HttpGet("{userId}")]
    public async Task<ActionResult<UserProfileDto>> GetProfile(string userId)
    {
        var rs = await mediator.Send(new GetProfile.Query { Id = userId });
        return Ok(rs);
    }

    [HttpGet("{userId}/photos")]
    public async Task<ActionResult<List<Photo>>> GetPhotos(string userId)
    {
        var rs = await mediator.Send(new GetProfilePhotos.Query { Id = userId });
        return Ok(rs);
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<Photo>> AddPhoto(IFormFile file)
    {
        var rs = await mediator.Send(new AddPhoto.Command { File = file });
        return Ok(rs);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProfile(UpdateProfile.Command command)
    {
        var rs = await mediator.Send(command);
        return Ok(rs);
    }

    [HttpPut("set-main/{photoId}")]
    public async Task<IActionResult> SetMain(string photoId)
    {
        var rs = await mediator.Send(new SetMainPhoto.Command { Id = photoId });
        return Ok(rs);
    }

    [HttpDelete("photos/{photoId}")]
    public async Task<ActionResult> DeletePhoto(string photoId)
    {
        var rs = await mediator.Send(new DeletePhoto.Command { Id = photoId });
        return Ok(rs);
    }
}

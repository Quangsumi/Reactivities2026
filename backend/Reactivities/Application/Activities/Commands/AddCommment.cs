using Application.Activities.Dtos;
using Application.Common.Repositories;
using Application.Common.Services;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Activities.Commands;

public class AddCommment
{
    public class Command : IRequest<CommentDto>
    {
        public required string Body { get; set; }
        public required string ActivityId { get; set; }
    }

    public class Handler(IApplicationDbContext dbContext, IUserService userService, IMapper mapper) : IRequestHandler<Command, CommentDto>
    {
        public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await dbContext.Activities.FirstOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if(activity is null) throw new Exception("Activity not found");

            var currentUser = await userService.GetCurrentUserAsync(includePhotos: false, cancellationToken);

            var newComment = new Comment
            {
                UserId = currentUser.Id,
                ActivityId = activity.Id,
                Body = request.Body,
            };

            dbContext.Comments.Add(newComment);
            await dbContext.SaveChangesAsync(cancellationToken);

            return mapper.Map<CommentDto>(newComment);
        }
    }
}
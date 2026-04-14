using Application.Common.Repositories;
using Application.Common.Services;
using Application.Users.Dtos;
using AutoMapper;

namespace Application.Users.Commands;

public class UpdateProfile 
{
    public class Command : MediatR.IRequest<UserProfileDto>
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
    }

    public class Handler(IUserService userService, IApplicationDbContext dbContext, IMapper mapper) : MediatR.IRequestHandler<Command, UserProfileDto>
    {
        public async Task<UserProfileDto> Handle(Command request, CancellationToken cancellationToken)
        {
            var currentUser = await userService.GetCurrentUserAsync(includePhotos: true, cancellationToken);

            currentUser.DisplayName = request.DisplayName;
            currentUser.Bio = request.Bio;

            dbContext.Users.Update(currentUser);
            await dbContext.SaveChangesAsync(cancellationToken);

            return mapper.Map<UserProfileDto>(currentUser);
        }
    }
}

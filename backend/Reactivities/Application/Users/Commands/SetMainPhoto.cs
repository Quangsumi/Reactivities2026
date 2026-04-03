using Application.Common.Repositories;
using Application.Common.Services;
using MediatR;

namespace Application.Users.Commands;

public class SetMainPhoto
{
    public class Command : IRequest<bool>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUnitOfWork unitOfWork, IUserService userService) : IRequestHandler<Command, bool>
    {
        public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userService.GetCurrentUserAsync(includePhotos: true, cancellationToken);

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);

            if (photo == null) throw new Exception("Photo not found");

            user.ImageUrl = photo.Url;

            var result = await unitOfWork.SaveChangesAsync(cancellationToken) > 0;
            
            return result;
        }
    }
}

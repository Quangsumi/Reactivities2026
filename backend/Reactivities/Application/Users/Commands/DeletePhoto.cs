using Application.Common.Repositories;
using Application.Common.Services;

namespace Application.Users.Commands;

public class DeletePhoto
{
    public class Command : MediatR.IRequest<bool>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUnitOfWork unitOfWork, IUserService userService, IPhotoService photoService) : MediatR.IRequestHandler<Command, bool>
    {
        public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userService.GetCurrentUserAsync(includePhotos: true, cancellationToken)
                ?? throw new Exception("Unauthrozied user");

            var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id)
                ?? throw new Exception("Photo not found");

            if(photo.Url == user.ImageUrl)
                throw new Exception("You cannot delete your main photo");

            await photoService.DeletePhoto(photo.PublicId);

            user.Photos.Remove(photo);

            var rs = await unitOfWork.SaveChangesAsync(cancellationToken);

            return rs > 0;
        }
    }
}

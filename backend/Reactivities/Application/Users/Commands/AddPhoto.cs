using Application.Common.Repositories;
using Application.Common.Services;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Users.Commands;

public class AddPhoto
{
    public class Command : MediatR.IRequest<Photo>
    {
        public required IFormFile File { get; set; }
    }

    public class Handler(IPhotoService photoService, IUserService userService, IUnitOfWork unitOfWork) : MediatR.IRequestHandler<Command, Photo>
    {
        public async Task<Photo> Handle(Command request, CancellationToken cancellationToken)
        {
            var uploadResult = await photoService.UploadPhoto(request.File);

            if (uploadResult == null) throw new Exception("Failed to upload photo");

            var user = await userService.GetCurrentUserAsync(includePhotos: true, cancellationToken);

            var photo = new Photo
            {
                Url = uploadResult.Url,
                PublicId = uploadResult.PublicId,
                UserId = user.Id
            };

            user.ImageUrl ??= photo.Url;

            await unitOfWork.Photos.AddPhotoAsync(photo, cancellationToken);
            await unitOfWork.SaveChangesAsync(cancellationToken);

            return photo;
        }
    }
}
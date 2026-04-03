using Application.Common.Repositories;
using Domain;

namespace Persistence.Repositories;

public class PhotoRepository(AppDbContext context) : IPhotoRepository
{
    public async Task<Photo> AddPhotoAsync(Photo photo, CancellationToken cancellationToken)
    {
        context.Photos.Add(photo);
        return photo;
    }

    public async Task<bool> DeletePhotoAsync(Photo photo, CancellationToken cancellationToken)
    {
        context.Photos.Remove(photo);
        return true;
    }
}

using Domain;

namespace Application.Common.Repositories;

public interface IPhotoRepository
{
    Task<Photo> AddPhotoAsync(Photo photo, CancellationToken cancellationToken);
    Task<bool> DeletePhotoAsync(Photo photo, CancellationToken cancellationToken);
}

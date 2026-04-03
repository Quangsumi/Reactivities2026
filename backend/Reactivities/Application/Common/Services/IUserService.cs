using Domain;

namespace Application.Common.Services;

public interface IUserService
{
    string GetUserId();
    Task<User> GetCurrentUserAsync(bool includePhotos, CancellationToken cancellationToken);
}

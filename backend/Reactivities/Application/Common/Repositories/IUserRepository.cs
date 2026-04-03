using Domain;

namespace Application.Common.Repositories;

public interface IUserRepository
{
    Task<User?> GetUser(string id, CancellationToken cancellationToken);

    Task<User?> GetUserWithPhotos(string id, CancellationToken cancellationToken);
}

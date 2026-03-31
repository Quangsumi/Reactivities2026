using Domain;

namespace Application.Users.Repositories;

public interface IUserRepository
{
    Task<User?> GetUserById(string id, CancellationToken cancellationToken);
}

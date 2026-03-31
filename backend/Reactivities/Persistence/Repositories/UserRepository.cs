using Application.Users.Repositories;
using Domain;

namespace Persistence.Repositories;

public class UserRepository(AppDbContext dbContext) : IUserRepository
{
    public async Task<User?> GetUserById(string id, CancellationToken cancellation)
    {
        var user = await dbContext.Users.FindAsync([id], cancellation);

        return user;
    }
}

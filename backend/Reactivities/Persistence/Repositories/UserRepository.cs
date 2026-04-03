using Application.Common.Repositories;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class UserRepository(AppDbContext dbContext) : IUserRepository
{
    public async Task<User?> GetUser(string id, CancellationToken cancellation)
    {
        var user = await dbContext.Users.FindAsync([id], cancellation);

        return user;
    }

    public async Task<User?> GetUserWithPhotos(string id, CancellationToken cancellationToken)
    {
        var user = await dbContext.Users
            .Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.Id == id, cancellationToken);

        return user;
    }
}

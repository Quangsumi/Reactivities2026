using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Repositories;

public interface IApplicationDbContext
{
    DbSet<Activity> Activities { get; }
    DbSet<User> Users { get; }
    DbSet<Photo> Photos { get; }
    DbSet<Comment> Comments { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

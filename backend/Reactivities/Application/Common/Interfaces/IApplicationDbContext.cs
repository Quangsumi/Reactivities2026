using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Activity> Activities { get; }
    DbSet<User> Users { get; }
    DbSet<Photo> Photos { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}

using Application.Common.Repositories;
using Persistence.Repositories;

namespace Persistence;

public class UnitOfWork(AppDbContext context) : IUnitOfWork, IAsyncDisposable
{
    private IActivityRepository? _activities;
    private IPhotoRepository? _photos;

    public IActivityRepository Activities =>
        _activities ??= new ActivityRepository(context);

    public IPhotoRepository Photos =>
        _photos ??= new PhotoRepository(context);

    public async Task<int> SaveChangesAsync(CancellationToken ct = default)
    {
        return await context.SaveChangesAsync(ct);
    }

    public async ValueTask DisposeAsync() => await context.DisposeAsync();
}

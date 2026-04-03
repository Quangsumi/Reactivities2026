namespace Application.Common.Repositories;

public interface IUnitOfWork
{
    IActivityRepository Activities { get; }
    IPhotoRepository Photos { get; }
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}

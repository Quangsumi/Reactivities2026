using Domain;

namespace Application.Activities.Repositories;

public interface IActivityRepository
{
    Task<List<Activity>> ListAsync(CancellationToken cancellationToken);
    Task<Activity?> GetByIdAsync(string id, CancellationToken cancellationToken);
    Task AddAsync(Activity activity, CancellationToken cancellationToken);
    Task<Activity?> UpdateAsync(Activity activity, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(string id, CancellationToken cancellationToken);
}


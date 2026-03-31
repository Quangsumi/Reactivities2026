using Domain;

namespace Application.Activities.Repositories;

public interface IActivityRepository
{
    Task<List<Activity>> ListAsync(bool includeAttendees, CancellationToken cancellationToken);
    Task<Activity?> GetByIdAsync(string id, CancellationToken cancellationToken);
    Task<int> AddAsync(Activity activity, CancellationToken cancellationToken);
    Task<Activity?> UpdateAsync(Activity activity, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(string id, CancellationToken cancellationToken);
    Task<bool> SaveChangeAsync(CancellationToken cancellationToken);
}


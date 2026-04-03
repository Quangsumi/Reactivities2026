using Domain;

namespace Application.Common.Repositories;

public interface IActivityRepository
{
    Task<int> AddAsync(Activity activity, CancellationToken cancellationToken);
    Task<Activity?> UpdateAsync(Activity activity, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(string id, CancellationToken cancellationToken);
}


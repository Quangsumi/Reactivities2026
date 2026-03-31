using Domain;

namespace Application.Common.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetCurrentUserAsync(CancellationToken cancellationToken);
}

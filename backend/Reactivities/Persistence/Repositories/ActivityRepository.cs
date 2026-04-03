using Application.Common.Repositories;
using Domain;

namespace Persistence.Repositories;

public class ActivityRepository(AppDbContext context) : IActivityRepository
{
    public async Task<int> AddAsync(Activity activity, CancellationToken cancellationToken)
    {
        context.Activities.Add(activity);
        return 1;
    }

    public async Task<Activity?> UpdateAsync(Activity activity, CancellationToken cancellationToken)
    {
        var dbActivity = await context.Activities.FindAsync([activity.Id], cancellationToken);
        if (dbActivity is null) return null;

        // Update all fields (simple CRUD model).
        dbActivity.Title = activity.Title;
        dbActivity.Description = activity.Description;
        dbActivity.Category = activity.Category;
        dbActivity.Date = activity.Date;
        dbActivity.City = activity.City;
        dbActivity.Venue = activity.Venue;
        dbActivity.Latitude = activity.Latitude;
        dbActivity.Longitude = activity.Longitude;
        dbActivity.IsCancelled = activity.IsCancelled;

        return dbActivity;
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken cancellationToken)
    {
        var dbActivity = await context.Activities.FindAsync([id], cancellationToken);
        if (dbActivity is null) return false;

        context.Activities.Remove(dbActivity);
        return true;
    }
}


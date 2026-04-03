using Application.Common.Repositories;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class ActivityRepository(AppDbContext context) : IActivityRepository
{
    public async Task<List<Activity>> ListAsync(bool includeAttendees, CancellationToken cancellationToken)
    {
        var activities = context.Activities.AsQueryable();

        if (includeAttendees)
        {
            activities = activities.Include(x => x.Attendees).ThenInclude(x => x.User);
        }

        return await activities.ToListAsync(cancellationToken);
    }

    public async Task<Activity?> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        return await context.Activities
            .Include(x => x.Attendees)
            .ThenInclude(x => x.User)
            .Where(x => x.Id == id)
            .FirstOrDefaultAsync(cancellationToken);
    }

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


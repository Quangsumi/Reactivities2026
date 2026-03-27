using Application.Activities.Repositories;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence.Repositories;

public class EfActivityRepository(AppDbContext context) : IActivityRepository
{
    public async Task<List<Activity>> ListAsync(CancellationToken cancellationToken)
    {
        return await context.Activities.ToListAsync(cancellationToken);
    }

    public async Task<Activity?> GetByIdAsync(string id, CancellationToken cancellationToken)
    {
        return await context.Activities.FindAsync([id], cancellationToken);
    }

    public async Task AddAsync(Activity activity, CancellationToken cancellationToken)
    {
        context.Activities.Add(activity);
        await context.SaveChangesAsync(cancellationToken);
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

        await context.SaveChangesAsync(cancellationToken);
        return dbActivity;
    }

    public async Task<bool> DeleteAsync(string id, CancellationToken cancellationToken)
    {
        var dbActivity = await context.Activities.FindAsync([id], cancellationToken);
        if (dbActivity is null) return false;

        context.Activities.Remove(dbActivity);
        await context.SaveChangesAsync(cancellationToken);
        return true;
    }
}


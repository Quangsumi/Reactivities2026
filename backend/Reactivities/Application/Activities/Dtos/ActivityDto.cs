using Application.Users.Dtos;

namespace Application.Activities.Dtos;

public class ActivityDto
{
    // Keep Id as a string to match the current entity model and front-end expectations.
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Title { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public bool IsCancelled { get; set; }
    public string HostDisplayName { get; set; } = string.Empty;
    public string HostId { get; set; } = string.Empty;

    // location details
    public string City { get; set; } = string.Empty;
    public string Venue { get; set; } = string.Empty;
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    public ICollection<UserProfileDto> Attendees { get; set; } = [];
    public ICollection<CommentDto> Comments { get; set; } = [];

}

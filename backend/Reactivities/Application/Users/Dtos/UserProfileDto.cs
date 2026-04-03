using Domain;

namespace Application.Users.Dtos;

public class UserProfileDto
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }

    public ICollection<Photo> Photos { get; set; } = [];
}

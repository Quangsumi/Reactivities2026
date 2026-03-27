using Application.Activities.Contracts;

namespace Application.Activities.Queries;

public class GetActivityQuery : MediatR.IRequest<ActivityDto?>
{
    public string Id { get; set; } = string.Empty;
}


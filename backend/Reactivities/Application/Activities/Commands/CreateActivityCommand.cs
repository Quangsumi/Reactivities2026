using Application.Activities.Contracts;

namespace Application.Activities.Commands;

// Command DTO input stays identical to API contract.
public class CreateActivityCommand : MediatR.IRequest<ActivityDto>
{
    public ActivityDto Activity { get; set; } = default!;
}


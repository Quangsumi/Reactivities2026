using Application.Activities.Contracts;

namespace Application.Activities.Commands;

public class UpdateActivityCommand : MediatR.IRequest<ActivityDto?>
{
    public ActivityDto Activity { get; set; } = default!;
}


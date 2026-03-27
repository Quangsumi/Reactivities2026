namespace Application.Activities.Commands;

public class DeleteActivityCommand : MediatR.IRequest<bool>
{
    public string Id { get; set; } = string.Empty;
}


namespace Application.Activities.Commands;

public class UpdateAttendanceCommand : MediatR.IRequest<bool>
{
    public required string ActivityId { get; set; }
}


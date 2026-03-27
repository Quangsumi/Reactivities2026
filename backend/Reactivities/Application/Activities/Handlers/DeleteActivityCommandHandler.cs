using Application.Activities.Repositories;

namespace Application.Activities.Handlers;

public class DeleteActivityCommandHandler : MediatR.IRequestHandler<Application.Activities.Commands.DeleteActivityCommand, bool>
{
    private readonly IActivityRepository _repository;

    public DeleteActivityCommandHandler(IActivityRepository repository)
    {
        _repository = repository;
    }

    public async Task<bool> Handle(Application.Activities.Commands.DeleteActivityCommand request, CancellationToken cancellationToken)
    {
        return await _repository.DeleteAsync(request.Id, cancellationToken);
    }
}


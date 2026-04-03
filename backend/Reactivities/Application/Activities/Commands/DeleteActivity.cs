using Application.Common.Repositories;
using MediatR;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<bool>
    {
        public string Id { get; set; } = string.Empty;
    }

    public class Handler(IUnitOfWork unitOfWork) : IRequestHandler<Command, bool>
    {
        public async Task<bool> Handle(Command request, CancellationToken cancellationToken)
        {
            var result = await unitOfWork.Activities.DeleteAsync(request.Id, cancellationToken);
            if (result)
                await unitOfWork.SaveChangesAsync(cancellationToken);
            return result;
        }
    }
}



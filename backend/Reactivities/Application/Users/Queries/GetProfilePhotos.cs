using Application.Common.Repositories;
using Domain;

namespace Application.Users.Queries;

public class GetProfilePhotos
{
    public class Query : MediatR.IRequest<ICollection<Photo>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUnitOfWork unitOfWork) : MediatR.IRequestHandler<Query, ICollection<Photo>>
    {
        public async Task<ICollection<Photo>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await unitOfWork.Users.GetUserWithPhotos(request.Id, cancellationToken);

            return profile?.Photos ?? [];
        }
    }
}
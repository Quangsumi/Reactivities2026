using Application.Common.Repositories;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries;

public class GetProfilePhotos
{
    public class Query : MediatR.IRequest<ICollection<Photo>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IApplicationDbContext context) : MediatR.IRequestHandler<Query, ICollection<Photo>>
    {
        public async Task<ICollection<Photo>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Photos
                .Where(p => p.UserId == request.Id)
                .ToListAsync(cancellationToken);
        }
    }
}
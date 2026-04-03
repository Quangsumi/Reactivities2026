using Application.Activities.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Common.Repositories;

namespace Application.Activities.Queries;

public class GetActivities
{
    public class Query : IRequest<List<ActivityDto>>
    {

    }

    public class Handler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<Query, List<ActivityDto>>
    {
        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
        }
    }
}

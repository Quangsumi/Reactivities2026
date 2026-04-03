using Application.Activities.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MediatR;

namespace Application.Activities.Queries;

public class GetActivity
{
    public class Query : IRequest<ActivityDto?>
    {
        public string Id { get; set; } = string.Empty;
    }

    public class Handler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<Query, ActivityDto?>
    {
        public async Task<ActivityDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Activities
                .Where(x => x.Id == request.Id)
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
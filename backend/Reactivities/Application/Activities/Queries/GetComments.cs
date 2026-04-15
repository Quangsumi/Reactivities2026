using Application.Activities.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Common.Repositories;

namespace Application.Activities.Queries;

public class GetComments
{
    public class Query : IRequest<List<CommentDto>>
    {
        public required string ActivityId { get; set; }
    }

    public class Handler(IApplicationDbContext context, IMapper mapper) : IRequestHandler<Query, List<CommentDto>>
    {
        public async Task<List<CommentDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var rs = await context.Comments
                .Where(x => x.ActivityId == request.ActivityId)
                .OrderByDescending(x => x.CreatedAt)
                .ProjectTo<CommentDto>(mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            return rs;
        }
    }
}
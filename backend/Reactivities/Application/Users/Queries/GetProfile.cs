using Application.Common.Repositories;
using Application.Users.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries;

public class GetProfile
{
    public class Query : MediatR.IRequest<UserProfileDto?>
    {
        public required string Id { get; set; }
    }

    public class Handler(IApplicationDbContext context, IMapper mapper) : MediatR.IRequestHandler<Query, UserProfileDto?>
    {
        public async Task<UserProfileDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context.Users
                .Where(u => u.Id == request.Id)
                .ProjectTo<UserProfileDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
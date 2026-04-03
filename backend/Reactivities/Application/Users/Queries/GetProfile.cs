using Application.Common.Repositories;
using Application.Users.Dtos;
using AutoMapper;

namespace Application.Users.Queries;

public class GetProfile
{
    public class Query : MediatR.IRequest<UserProfileDto?>
    {
        public required string Id { get; set; }
    }

    public class Handler(IUnitOfWork unitOfWork, IMapper mapper) : MediatR.IRequestHandler<Query, UserProfileDto?>
    {
        public async Task<UserProfileDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await unitOfWork.Users.GetUserWithPhotos(request.Id, cancellationToken);

            return mapper.Map<UserProfileDto>(profile);
        }
    }
}
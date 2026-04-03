using Application.Activities.Dtos;
using Application.Common.Repositories;
using AutoMapper;
using MediatR;

namespace Application.Activities.Queries;

public class GetActivity
{
    public class Query : IRequest<ActivityDto?>
    {
        public string Id { get; set; } = string.Empty;
    }

    public class Handler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<Query, ActivityDto?>
    {
        public async Task<ActivityDto?> Handle(Query request, CancellationToken cancellationToken)
        {
            var entity = await unitOfWork.Activities.GetByIdAsync(request.Id, cancellationToken);
            return entity is null ? null : mapper.Map<ActivityDto>(entity);
        }
    }
}
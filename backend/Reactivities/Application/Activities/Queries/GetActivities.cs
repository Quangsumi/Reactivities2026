using Application.Activities.Dtos;
using Application.Common.Repositories;
using AutoMapper;
using Domain;
using MediatR;

namespace Application.Activities.Queries;

public class GetActivities
{
    public class Query : IRequest<List<ActivityDto>>
    {

    }

    public class Handler(IUnitOfWork unitOfWork, IMapper mapper) : IRequestHandler<Query, List<ActivityDto>>
    {
        public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<Activity> entities = await unitOfWork.Activities.ListAsync(includeAttendees: true, cancellationToken);
            return mapper.Map<List<ActivityDto>>(entities);
        }
    }
}

using Application.Activities.Contracts;

namespace Application.Activities.Queries;

public class GetActivitiesQuery : MediatR.IRequest<List<ActivityDto>>
{
}


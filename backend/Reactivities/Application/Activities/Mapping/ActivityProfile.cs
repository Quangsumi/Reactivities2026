using Application.Activities.Contracts;
using AutoMapper;
using Domain;

namespace Application.Activities.Mapping;

public class ActivityProfile : Profile
{
    public ActivityProfile()
    {
        CreateMap<Activity, ActivityDto>().ReverseMap();
    }
}


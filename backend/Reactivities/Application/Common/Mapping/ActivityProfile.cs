using Application.Activities.Dtos;
using Application.Users.Dtos;
using AutoMapper;
using Domain;

namespace Application.Common.Mapping;

public class ActivityProfile : Profile
{
    public ActivityProfile()
    {
        CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostId, o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.UserId))
            .ForMember(d => d.HostDisplayName, o => o.MapFrom(s => s.Attendees.FirstOrDefault(a => a.IsHost)!.User.DisplayName))
            .ReverseMap();

        CreateMap<ActivityAttendee, UserProfileDto>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.UserId))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl));

        CreateMap<Comment, CommentDto>()
            .ForMember(d => d.UserId, o => o.MapFrom(s => s.User.Id))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName));
    }
}


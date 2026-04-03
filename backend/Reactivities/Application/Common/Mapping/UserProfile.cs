using Application.Users.Dtos;
using AutoMapper;
using Domain;

namespace Application.Common.Mapping;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserProfileDto>().ReverseMap();
    }
}

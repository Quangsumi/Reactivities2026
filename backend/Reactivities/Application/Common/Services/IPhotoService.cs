using Application.Users.Dtos;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Services;

public interface IPhotoService
{
    Task<PhotoUploadResultDto?> UploadPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}

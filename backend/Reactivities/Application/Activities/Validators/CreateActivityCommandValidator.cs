using Application.Activities.Commands;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityCommandValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityCommandValidator()
    {
        RuleFor(x => x.Activity.Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => x.Activity.Description).NotEmpty().WithMessage("Description is required");
        RuleFor(x => x.Activity.Category).NotEmpty().WithMessage("Category is required");
        RuleFor(x => x.Activity.City).NotEmpty().WithMessage("City is required");
        RuleFor(x => x.Activity.Venue).NotEmpty().WithMessage("Venue is required");

        RuleFor(x => x.Activity.Date)
            .NotEqual(default(DateTime))
            .WithMessage("Date is required");

        RuleFor(x => x.Activity.Latitude)
            .InclusiveBetween(-90, 90)
            .Must(lat => !double.IsNaN(lat) && !double.IsInfinity(lat))
            .WithMessage("Latitude is invalid");

        RuleFor(x => x.Activity.Longitude)
            .InclusiveBetween(-180, 180)
            .Must(lng => !double.IsNaN(lng) && !double.IsInfinity(lng))
            .WithMessage("Longitude is invalid");
    }
}


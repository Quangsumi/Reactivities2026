using Application.Activities.Commands;
using FluentValidation;

namespace Application.Activities.Validators;

public class DeleteActivityCommandValidator : AbstractValidator<DeleteActivity.Command>
{
    public DeleteActivityCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("Id is required");
    }
}


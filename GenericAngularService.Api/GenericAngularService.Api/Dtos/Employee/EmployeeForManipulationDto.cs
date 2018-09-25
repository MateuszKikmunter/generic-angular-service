using System.ComponentModel.DataAnnotations;

namespace GenericAngularService.Api.Dtos.Employee
{
    public class EmployeeForManipulationDto : EmployeeBase
    {
        public int? CompanyId { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public override string FirstName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public override string LastName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        [EmailAddress]
        public override string Email { get; set; }

        [Required]
        public override bool Active { get; set; }
    }
}

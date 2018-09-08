using System.ComponentModel.DataAnnotations;

namespace GenericAngularService.Api.Dtos
{
    public abstract class EmployeeBase
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public string FirstName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public string LastName { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public bool Active { get; set; }
    }
}

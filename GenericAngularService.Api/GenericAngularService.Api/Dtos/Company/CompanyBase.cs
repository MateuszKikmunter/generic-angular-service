using System;
using System.ComponentModel.DataAnnotations;

namespace GenericAngularService.Api.Dtos.Company
{
    public class CompanyBase
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public string Name { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(155)]
        public string Industry { get; set; }

        [Required]
        public DateTimeOffset Founded { get; set; }
    }
}

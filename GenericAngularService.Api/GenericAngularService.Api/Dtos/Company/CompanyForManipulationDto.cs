using System;
using System.ComponentModel.DataAnnotations;

namespace GenericAngularService.Api.Dtos.Company
{
    public class CompanyForManipulationDto : CompanyBase
    {
        [Required(AllowEmptyStrings = false)]
        [MaxLength(255)]
        public override string Name { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(155)]
        public override string Industry { get; set; }

        [Required]
        public override DateTimeOffset Founded { get; set; }
    }
}

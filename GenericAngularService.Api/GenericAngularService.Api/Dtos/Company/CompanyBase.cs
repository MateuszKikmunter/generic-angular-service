using System;

namespace GenericAngularService.Api.Dtos.Company
{
    public class CompanyBase
    {
        public virtual string Name { get; set; }

        public virtual string Industry { get; set; }

        public virtual DateTimeOffset Founded { get; set; }
    }
}

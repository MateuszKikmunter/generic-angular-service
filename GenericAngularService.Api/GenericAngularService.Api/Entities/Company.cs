using System;
using System.Collections.Generic;

namespace GenericAngularService.Api.Entities
{
    public class Company
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Industry { get; set; }

        public DateTimeOffset Founded { get; set; }

        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
    }
}

namespace GenericAngularService.Api.Dtos.Employee
{
    public abstract class EmployeeBase
    {
        public virtual string FirstName { get; set; }

        public virtual string LastName { get; set; }

        public virtual string Email { get; set; }

        public virtual bool Active { get; set; }
    }
}

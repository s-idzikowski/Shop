using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;

namespace Shop.Service.AuthorizationRoles
{
    public class AdministratorHandler : AuthorizationHandler<AdministratorRole>
    {
        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AdministratorRole requirement)
        {
            context.Succeed(requirement);

            await Task.CompletedTask;
        }
    }
}
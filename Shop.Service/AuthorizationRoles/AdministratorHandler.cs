﻿using Microsoft.AspNetCore.Authorization;
using Shop.Service.Repositories;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Claims;
using System;

namespace Shop.Service.AuthorizationRoles
{
    public class AdministratorHandler : AuthorizationHandler<AdministratorRole>
    {
        private readonly IUserRepository userRepository;



        public AdministratorHandler(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }



        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, AdministratorRole requirement)
        {
            context.Succeed(requirement);

            var userId = new Guid(context.User.Claims.Single(o => o.Type == ClaimTypes.NameIdentifier).Value);

            var status = await userRepository.HasRole(userId, Roles.Administrator);

            if (!status)
            {
                context.Fail();
            }

            await Task.CompletedTask;
        }
    }
}
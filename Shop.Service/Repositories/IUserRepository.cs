﻿using Grpc.Core;
using Shop.Service.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public interface IUserRepository
    {
        Task<User> SignIn(User user, string password, ServerCallContext context);
        Task<User> Register(RegisterData registerData, ServerCallContext context);

        Task<User> GetByUsername(string username);
        Task<User> GetByEmailAddress(string emailAddress);
        Task<User> GetById(Guid id);

        Task AddOperations(Guid userId, IEnumerable<Operation> operations);
    }
}
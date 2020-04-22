using Shop.Service.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public interface IUserRepository
    {
        Task Register(User user);

        Task<User> GetByUsername(string username);
        Task<User> GetByEmailAddress(string emailAddress);
        Task<User> GetById(Guid userId);

        Task AddOperations(Guid userId, IEnumerable<Operation> operations);
        Task<List<Operation>> GetUserOperations(Guid id);
        Task<List<AddressData>> GetUserAddresses(Guid id);

        Task ChangePassword(User user);
        Task ChangeAddresses(User user);
        Task ChangeInformation(User user);

        Task<bool> HasRole(Guid userId, Roles role);
        Task AddRole(Guid userId, Roles role);
    }
}
using Shop.Service.Models;
using System;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public interface IUserRepository
    {
        Task<User> SignIn(SignInData signInData);
        Task Register(User user);
        Task UpdateAuthToken(User user);

        Task<User> GetByUsername(string username);
        Task<User> GetByEmailAddress(string emailAddress);
        Task<User> GetByAuthToken(string authToken);
        Task<User> GetById(Guid id);
    }
}
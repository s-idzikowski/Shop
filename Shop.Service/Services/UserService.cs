using System.Collections.Generic;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.Extensions.Logging;

namespace Shop.Service
{
    public class UserService : User.UserBase
    {
        private readonly ILogger<UserService> _logger;

        public UserService(ILogger<UserService> logger)
        {
            _logger = logger;
        }

        public override Task<GetUserResponse> GetUserById(GetUserRequest request, ServerCallContext context)
        {
            UserData userData = new UserData();

            if (request.UserId == 1)
            {
                userData.Username = "Slawek";
                userData.Password = "Slawekpassword";
            }
            if (request.UserId == 2)
            {
                userData.Username = "Lukasz";
                userData.Password = "Lukaszpassword";
            }
            if (request.UserId != 1 || request.UserId != 2)
            {
                userData.Username = "SPADAJ";
                userData.Password = "SPADAJ";
            }

            return Task.FromResult(new GetUserResponse() { UserData = userData });
        }

        public override async Task GetAllUsers(GetAllUsersRequest request, IServerStreamWriter<GetUserResponse> responseStream, ServerCallContext context)
        {
            List<UserData> usersData = new List<UserData>()
            {
                new UserData
                {
                    Username = "Slawek",
                    Password = "Slawekpassword"
                },
                new UserData
                {
                    Username = "Lukasz",
                    Password = "Lukaszpassword"
                },
                new UserData
                {
                    Username = "Kuba",
                    Password = "Kubapassword"
                }
            };

            foreach (var user in usersData)
            {
                await responseStream.WriteAsync(new GetUserResponse() { UserData = user });
            }
        }
    }
}
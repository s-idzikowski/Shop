using System;
using System.Collections.Generic;
using System.Linq;
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
            GetUserResponse response = new GetUserResponse();
            
            if (request.UserId == 1)
            {
                response.Username = "Slawek";
                response.Password = "Slawekpassword";
            }
            if (request.UserId == 2)
            {
                response.Username = "Lukasz";
                response.Password = "Lukaszpassword";
            }
            if (request.UserId != 1 || request.UserId !=2)
            {
                response.Username = "SPADAJ";
                response.Password = "SPADAJ";
            }
            
            return Task.FromResult(response);
        }

        public override async Task GetAllUsers(GetAllUsersRequest request, IServerStreamWriter<GetUserResponse> responseStream, ServerCallContext context)
        {
            List<GetUserResponse> responses = new List<GetUserResponse>()
            {
                new GetUserResponse
                {
                    Username = "Slawek",
                    Password = "Slawekpassword"
                },
                new GetUserResponse
                {
                    Username = "Lukasz",
                    Password = "Lukaszpassword"
                },
                new GetUserResponse
                {
                    Username = "Kuba",
                    Password = "Kubapassword"
                }
            };

            foreach (var user in responses)
            {
                await responseStream.WriteAsync(user);
            }
        }
    }
}
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Core;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        // TEMP:
        private readonly static ICollection<SignInData> Users = new List<SignInData>() { new SignInData() { Username = "test", Password = "test" } };

        public override Task<SignInResponse> UserSignIn(SignInRequest request, ServerCallContext context)
        {
            SignInData user = Users.FirstOrDefault(o => o.Username == request.SignInData.Username && o.Password == request.SignInData.Password);

            StatusCode statusCode;
            UserData userData;

            if (user != null)
            {
                statusCode = StatusCode.Ok;
                userData = new UserData()
                {
                    Username = user.Username,
                    AuthKey = "123"
                };
            }
            else
            {
                statusCode = StatusCode.SigninNotFound;
                userData = null;
            }

            return Task.FromResult(new SignInResponse()
            {
                StatusCode = statusCode,
                UserData = userData
            });
        }

        public override Task<GetUserResponse> GetUserById(GetUserRequest request, ServerCallContext context)
        {
            UserData userData = new UserData();

            if (request.UserId == 1)
            {
                userData.Username = "Slawek";
                userData.AuthKey = "123";
            }
            if (request.UserId == 2)
            {
                userData.Username = "Lukasz";
                userData.AuthKey = "1234";
            }
            if (request.UserId != 1 || request.UserId != 2)
            {
                userData.Username = "SPADAJ";
                userData.AuthKey = "12345";
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
                    AuthKey = "123"
                },
                new UserData
                {
                    Username = "Lukasz",
                    AuthKey = "1234"
                },
                new UserData
                {
                    Username = "Kuba",
                    AuthKey = "12345"
                }
            };

            foreach (var user in usersData)
            {
                await responseStream.WriteAsync(new GetUserResponse() { UserData = user });
            }
        }
    }
}
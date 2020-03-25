using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Shop.Service.Models;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        public override async Task<SignInResponse> UserSignIn(SignInRequest request, ServerCallContext context)
        {
            User user = await userRepository.GetByUsername(request.SignInData.Username);

            await userRepository.SignIn(user, request.SignInData.Password, context);

            StatusCode statusCode;
            UserData userData;

            if (user != null)
            {
                if (user.IsBanned)
                {
                    statusCode = StatusCode.SigninAccountBan;
                    userData = null;
                }
                else
                {
                    statusCode = StatusCode.Ok;
                    userData = user.GetUserData();
                }
            }
            else
            {
                statusCode = StatusCode.SigninNotFound;
                userData = null;
            }

            return await Task.FromResult(new SignInResponse()
            {
                StatusCode = statusCode,
                UserData = userData
            });
        }

        public override async Task<RegisterResponse> UserRegister(RegisterRequest request, ServerCallContext context)
        {
            // Password:
            // TODO - ONLY VALIDATE!
            //return await Task.FromResult(new RegisterResponse()
            //{
            //    StatusCode = StatusCode.RegisterPasswordNotValid
            //});

            // Username:
            User user = await userRepository.GetByUsername(request.RegisterData.Username);
            if (user != null)
            {
                return await Task.FromResult(new RegisterResponse()
                {
                    StatusCode = StatusCode.RegisterUsernameOccupied
                });
            }

            // Email:
            user = await userRepository.GetByEmailAddress(request.RegisterData.EmailAddress);
            if (user != null)
            {
                return await Task.FromResult(new RegisterResponse()
                {
                    StatusCode = StatusCode.RegisterEmailOccupied
                });
            }

            // Insert database:
            user = await userRepository.Register(request.RegisterData, context);

            StatusCode statusCode;
            UserData userData;

            if (user != null)
            {
                statusCode = StatusCode.Ok;
                userData = user.GetUserData();
            }
            else
            {
                statusCode = StatusCode.DatabaseError;
                userData = null;
            }

            return await Task.FromResult(new RegisterResponse()
            {
                StatusCode = statusCode,
                UserData = userData
            });
        }

        [Authorize]
        public override async Task<LogoutResponse> UserLogout(UserRequest request, ServerCallContext context)
        {
            //await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.LogOut, context.Host));

            return await Task.FromResult(new LogoutResponse()
            {
                StatusCode = StatusCode.Ok
            });
        }

        [Authorize]
        public override async Task<UserResponse> GetUser(UserRequest request, ServerCallContext context)
        {

            return await Task.FromResult(new UserResponse()
            {
                StatusCode = StatusCode.Ok
            });
            // todo
            return await Task.FromResult(new UserResponse()
            {
                StatusCode = StatusCode.Unathorized
            });
        }
    }
}
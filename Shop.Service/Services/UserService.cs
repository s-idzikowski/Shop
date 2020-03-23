using System.Threading.Tasks;
using Grpc.Core;
using Shop.Service.Models;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        public override async Task<SignInResponse> UserSignIn(SignInRequest request, ServerCallContext context)
        {
            User user = await Authorize(context);

            if (user != null)
            {
                user.AuthToken = null;
                await userRepository.UpdateAuthToken(user);

                return await Task.FromResult(new SignInResponse()
                {
                    StatusCode = StatusCode.Unathorized
                });
            }

            user = await userRepository.SignIn(request.SignInData);

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

                    user.AuthToken = await user.GenerateAuthKey(context);
                    await userRepository.UpdateAuthToken(user);

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
            User user = await Authorize(context);

            if (user != null)
            {
                user.AuthToken = null;
                await userRepository.UpdateAuthToken(user);

                return await Task.FromResult(new RegisterResponse()
                {
                    StatusCode = StatusCode.Unathorized
                });
            }

            // Password:
            // TODO - ONLY VALIDATE!
            //return await Task.FromResult(new RegisterResponse()
            //{
            //    StatusCode = StatusCode.RegisterPasswordNotValid
            //});

            // Username:
            user = await userRepository.GetByUsername(request.RegisterData.Username);
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
            user = User.New(context, request.RegisterData);
            await userRepository.Register(user);

            StatusCode statusCode;
            UserData userData;

            if (user != null)
            {
                statusCode = StatusCode.Ok;

                user.AuthToken = await user.GenerateAuthKey(context);
                await userRepository.UpdateAuthToken(user);

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

        public override async Task<LogoutResponse> UserLogout(LogoutRequest request, ServerCallContext context)
        {
            User user = await Authorize(context);

            if (user != null)
            {
                user.AuthToken = null;
                await userRepository.UpdateAuthToken(user);

                return await Task.FromResult(new LogoutResponse()
                {
                    StatusCode = StatusCode.Ok
                });
            }

            return await Task.FromResult(new LogoutResponse()
            {
                StatusCode = StatusCode.Unathorized
            });
        }

        public override async Task<UserResponse> GetUser(UserRequest request, ServerCallContext context)
        {
            User user = await Authorize(context);

            if (user != null)
            {
                return await Task.FromResult(new UserResponse()
                {
                    StatusCode = StatusCode.Ok,
                    UserData = user.GetUserData()
                });
            }

            return await Task.FromResult(new UserResponse()
            {
                StatusCode = StatusCode.Unathorized
            });
        }
    }
}
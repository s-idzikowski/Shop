using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Shop.Service.Models;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        public override async Task<BasicResponse> UserSignIn(SignInRequest request, ServerCallContext context)
        {
            User user = await userRepository.GetByUsername(request.SignInData.Username);

            if (user == null)
            {
                return await GetResponse(StatusCode.SigninNotFound);
            }

            string token = await user.GenerateToken(request.SignInData.Password, config.GetSection("AppSettings:Token").Value);

            if (string.IsNullOrEmpty(token))
            {
                await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Failedlogin, context.Peer));

                return await GetResponse(StatusCode.SigninNotFound);
            }
            else
            {
                await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Login, context.Peer));

                return await GetResponse(StatusCode.Ok, token);
            }
        }

        public override async Task<BasicResponse> UserRegister(RegisterRequest request, ServerCallContext context)
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
                return await GetResponse(StatusCode.RegisterUsernameOccupied);
            }

            // Email:
            user = await userRepository.GetByEmailAddress(request.RegisterData.EmailAddress);
            if (user != null)
            {
                return await GetResponse(StatusCode.RegisterEmailOccupied);
            }

            user = User.New(context, request.RegisterData);
            user.HashPassword();

            await userRepository.Register(user);
            await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Register, context.Peer));

            string token = await user.GenerateToken(request.RegisterData.Password, config.GetSection("AppSettings:Token").Value);

            return await GetResponse(StatusCode.Ok, token);
        }

        [Authorize]
        public override async Task<BasicResponse> UserLogout(UserRequest request, ServerCallContext context)
        {
            //await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.LogOut, context.Host));

            return await GetResponse(StatusCode.Ok);
        }

        [Authorize]
        public override async Task<UserResponse> GetUser(UserRequest request, ServerCallContext context)
        {
            //User user = await userRepository.GetById(Guid.Parse(request.UserId));

            return await Task.FromResult(new UserResponse()
            {
                StatusCode = StatusCode.DatabaseError,
                //UserData = user.GetUserData()
            });
        }

        [Authorize]
        public override Task<UserOperationsResponse> GetUserOperations(UserRequest request, ServerCallContext context)
        {
            //User user = await userRepository.GetById(Guid.Parse(request.UserId));

            //var result = new Operations();

            //foreach (var operation in user.Operations)
            //{
            //    result.UserOperation.Add(new UserOperation
            //    {
            //        Ip = operation.Ip,
            //        Time = operation.Time.ToString(),
            //        Type = operation.Type
            //    });
            //}

            //return await Task.FromResult(result);

            return base.GetUserOperations(request, context);
        }



        private Task<BasicResponse> GetResponse(StatusCode statusCode, string authorization = default)
        {
            if (string.IsNullOrEmpty(authorization))
            {
                return Task.FromResult(new BasicResponse()
                {
                    StatusCode = statusCode
                });
            }
            else
            {
                return Task.FromResult(new BasicResponse()
                {
                    StatusCode = statusCode,
                    Authorization = authorization
                });
            }
        }
    }
}
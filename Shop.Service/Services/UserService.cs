using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Grpc.Core;
using Microsoft.AspNetCore.Authorization;
using Shop.Service.Extensions;
using Shop.Service.Models;

namespace Shop.Service
{
    public partial class WebService : Service.ServiceBase
    {
        [AllowAnonymous]
        public override async Task<BasicResponse> UserSignIn(SignInRequest request, ServerCallContext context)
        {
            User user = await userRepository.GetByUsername(request.SignInData.Username);

            if (user == null)
            {
                return await GetResponse(StatusCode.SigninNotFound);
            }

            string token = await user.GenerateToken(request.SignInData.Password, ConfigToken);

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

        [AllowAnonymous]
        public override async Task<BasicResponse> UserRegister(RegisterRequest request, ServerCallContext context)
        {
            // Password validate:
            if (!User.IsValidatePassword(request.RegisterData.Password))
            {
                return await GetResponse(StatusCode.PasswordNotValid);
            }

            // Username validate:
            // TODO !!!!!

            // Username in database:
            User user = await userRepository.GetByUsername(request.RegisterData.Username);
            if (user != null)
            {
                return await GetResponse(StatusCode.UsernameOccupied);
            }

            // Email validate:
            // TODO !!!!!

            // Email in database:
            user = await userRepository.GetByEmailAddress(request.RegisterData.EmailAddress);
            if (user != null)
            {
                return await GetResponse(StatusCode.EmailOccupied);
            }

            user = User.New(context, request.RegisterData);
            user.HashPassword();

            await userRepository.Register(user);
            await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Register, context.Peer));

            string token = await user.GenerateToken(request.RegisterData.Password, ConfigToken);

            return await GetResponse(StatusCode.Ok, token);
        }

        [Authorize]
        public override async Task<BasicResponse> UserLogout(UserRequest request, ServerCallContext context)
        {
            User user = await userRepository.GetById(User.GetGuidFromHeaders(context.RequestHeaders));

            await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Logout, context.Peer));

            return await GetResponse(StatusCode.Ok);
        }

        [Authorize]
        public override async Task<UserResponse> GetUser(UserRequest request, ServerCallContext context)
        {
            User user = await userRepository.GetById(User.GetGuidFromHeaders(context.RequestHeaders));

            return await Task.FromResult(new UserResponse()
            {
                StatusCode = StatusCode.Ok,
                UserData = user.GetUserData()
            });
        }

        [Authorize]
        public override async Task<UserOperationsResponse> GetUserOperations(UserRequest request, ServerCallContext context)
        {
            List<Operation> operations = await userRepository.GetUserOperations(User.GetGuidFromHeaders(context.RequestHeaders));

            var userOperationsResponse = new UserOperationsResponse()
            {
                StatusCode = StatusCode.Ok
            };

            foreach (Operation operation in operations)
            {
                var operationData = new OperationData()
                {
                    Ip = operation.Ip,
                    Time = operation.Time.ToString(),
                    Type = operation.Type,
                };

                if (operation.ValueBefore?.Any() ?? false)
                {
                    operationData.ValueBefore.Add(operation.ValueBefore.GetListOfValue());
                }

                if (operation.ValueAfter?.Any() ?? false)
                {
                    operationData.ValueAfter.Add(operation.ValueAfter.GetListOfValue());
                }

                userOperationsResponse.OperationData.Add(operationData);
            }

            return await Task.FromResult(userOperationsResponse);
        }

        [Authorize]
        public override async Task<BasicResponse> UserChangePassword(ChangePasswordRequest request, ServerCallContext context)
        {
            // Password validate 1:
            if (request.OldPassword == request.NewPassword)
            {
                return await GetResponse(StatusCode.ChangepasswordSame);
            }

            // Password validate 2:
            if (!User.IsValidatePassword(request.NewPassword))
            {
                return await GetResponse(StatusCode.PasswordNotValid);
            }

            User user = await userRepository.GetById(User.GetGuidFromHeaders(context.RequestHeaders));

            string token = await user.GenerateToken(request.OldPassword, ConfigToken);

            if (string.IsNullOrEmpty(token))
            {
                return await GetResponse(StatusCode.ChangepasswordWrongOldPassword);
            }
            else
            {
                var beforePassword = user.GetPasswords();

                user.HashPassword(Encoding.UTF8.GetBytes(request.NewPassword));

                await userRepository.ChangePassword(user);
                await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Changepassword, context.Peer, beforePassword, user.GetPasswords()));

                return await GetResponse(StatusCode.Ok, token);
            }
        }

        [Authorize]
        public override async Task<UserAddressesResponse> GetUserAddresses(UserRequest request, ServerCallContext context)
        {
            List<AddressData> addresses = await userRepository.GetUserAddresses(User.GetGuidFromHeaders(context.RequestHeaders));

            var userAddressesResponse = new UserAddressesResponse()
            {
                StatusCode = StatusCode.Ok,
            };

            if (addresses?.Count > 0)
            {
                userAddressesResponse.AddressData.Add(addresses);
            }

            return await Task.FromResult(userAddressesResponse);
        }

        [Authorize]
        public override async Task<BasicResponse> UserChangeAddresses(ChangeAddressesRequest request, ServerCallContext context)
        {
            User user = await userRepository.GetById(User.GetGuidFromHeaders(context.RequestHeaders));

            user.Addresses = await userRepository.GetUserAddresses(user.Id);
            var beforeAddresses = user.Addresses.GetOperations();

            user.Addresses = request.AddressData.ToList();

            await userRepository.ChangeAddresses(user);
            await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Changeaddresses, context.Peer, beforeAddresses, user.Addresses.GetOperations()));

            return await GetResponse(StatusCode.Ok);
        }

        [Authorize]
        public override async Task<BasicResponse> UserChangeInformation(ChangeInformationRequest request, ServerCallContext context)
        {
            User user = await userRepository.GetById(User.GetGuidFromHeaders(context.RequestHeaders));

            bool requireUpdate = false;

            // Username in database:
            if (user.Username != request.UserData.Username)
            {
                requireUpdate = true;

                User userUsername = await userRepository.GetByUsername(request.UserData.Username);
                if (userUsername != null)
                {
                    return await GetResponse(StatusCode.UsernameOccupied);
                }
            }

            // Email validate:
            // TODO !!!!!

            // Email in database:
            if (user.EmailAddress != request.UserData.Email)
            {
                requireUpdate = true;

                User userEmail = await userRepository.GetByEmailAddress(request.UserData.Email);
                if (userEmail != null)
                {
                    return await GetResponse(StatusCode.EmailOccupied);
                }
            }

            // Telephone in database:
            if (user.Telephone != request.UserData.Telephone)
            {
                requireUpdate = true;
            }

            if (requireUpdate)
            {
                var beforeInformations = user.GetInfromations();

                user.SetNewInfromations(request.UserData);

                await userRepository.ChangeInformation(user);
                await userRepository.AddOperations(user.Id, Operation.GetOne(OperationTypes.Changeinformation, context.Peer, beforeInformations, user.GetInfromations()));

                return await GetResponse(StatusCode.Ok);
            }

            return await GetResponse(StatusCode.EmptyChanges);
        }
    }
}
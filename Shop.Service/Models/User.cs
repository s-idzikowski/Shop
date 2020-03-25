using Grpc.Core;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Service.Models
{
    public class User
    {
        [BsonId]
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string EmailAddress { get; set; }

        public string AuthToken { get; set; }
        public bool IsBanned { get; set; }
        public DateTime LastLogin { get; set; }

        public ICollection<Operation> Operations { get; set; } = new List<Operation>();



        public UserData GetUserData()
        {
            return new UserData()
            {
                Username = Username,
                AuthKey = AuthToken,
                Email = EmailAddress,
            };
        }

        internal static User New(ServerCallContext context, RegisterData registerData)
        {
            return new User()
            {
                Username = registerData.Username,
                PasswordHash = registerData.Password,
                EmailAddress = registerData.EmailAddress,

                Operations = new List<Operation>() {
                    new Operation()
                    {
                        Type = OperationTypes.Register,
                        Time = DateTime.Now,
                        Ip = context.Host,
                        Headers = context.RequestHeaders
                    }
                }
            };
        }

        public Task<string> GenerateAuthKey(ServerCallContext context, bool newLoginTime = true)
        {
            if (newLoginTime)
            {
                Operations.Add(new Operation()
                {
                    Type = OperationTypes.Login,
                    Time = DateTime.Now,
                    Ip = context.Host,
                    Headers = context.RequestHeaders
                });
                LastLogin = DateTime.Now;
            }

            return Task.Run(() =>
            {
                using (var hasher = new HMACSHA512(Convert.FromBase64String(AuthKeySalt)))
                {
                    var messageBytes = Encoding.Default.GetBytes($"{context.Host}-{AuthKeyPattern}");
                    var hash = hasher.ComputeHash(messageBytes);
                    return Convert.ToBase64String(hash);
                }
            });
        }

        public bool CheckAuthKey(string authToken)
        {
            return AuthToken == authToken;
        }

        private readonly string AuthKeySalt = $"SlTcADdX";
        private string AuthKeyPattern => $"{Id}-{Username}-{LastLogin.ToString()}";
    }
}
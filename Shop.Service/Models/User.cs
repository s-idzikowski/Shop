using Grpc.Core;
using MongoDB.Bson.Serialization.Attributes;
using System;
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
        public byte[] PasswordHash2 { get; set; }
        public byte[] PasswordSalt2 { get; set; }
        public string EmailAddress { get; set; }

        public string AuthToken { get; set; }
        public bool IsBanned { get; set; }

        public DateTime LoginTime { get; set; }
        public string LoginIp { get; set; }

        public DateTime RegisterTime { get; set; }
        public string RegisterIp { get; set; }



        public UserData GetUserData()
        {
            return new UserData()
            {
                Username = Username,
                AuthKey = AuthToken,
                Email = EmailAddress,

                RegisterTime = RegisterTime.ToString(),
                RegisterIp = RegisterIp,

                LoginTime = LoginTime.ToString(),
                LoginIp = LoginIp,
            };
        }

        internal static User New(ServerCallContext context, RegisterData registerData)
        {
            return new User()
            {
                Username = registerData.Username,
                PasswordHash = registerData.Password,
                EmailAddress = registerData.EmailAddress,

                RegisterIp = context.Host,
                RegisterTime = DateTime.Now
            };
        }

        public Task<string> GenerateAuthKey(ServerCallContext context, bool newLoginTime = true)
        {
            if (newLoginTime)
                LoginTime = DateTime.Now;

            LoginIp = context.Host;

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
        private string AuthKeyPattern => $"{Id}-{Username}-{LoginTime.ToString()}";
    }
}
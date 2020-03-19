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
        public string EmailAddress { get; set; }

        public string AuthToken { get; set; }
        public bool IsBanned { get; set; }
        public DateTime LoginTime { get; set; }



        public UserData GetUserData()
        {
            return new UserData()
            {
                Username = Username,
                AuthKey = AuthToken,
            };
        }

        internal static User New(RegisterData registerData)
        {
            return new User()
            {
                Username = registerData.Username,
                PasswordHash = registerData.Password,
                EmailAddress = registerData.EmailAddress,
            };
        }

        public Task<string> GenerateAuthKey(ServerCallContext context, bool newLoginTime = true)
        {
            if (newLoginTime)
                LoginTime = DateTime.Now;

            return Task.Run(() =>
            {
                using (var hasher = new HMACSHA512(Convert.FromBase64String(Salt)))
                {
                    var messageBytes = Encoding.Default.GetBytes($"{context.Peer}-{HashPattern}");
                    var hash = hasher.ComputeHash(messageBytes);
                    return Convert.ToBase64String(hash);
                }
            });
        }

        public bool CheckAuthKey(string authToken)
        {
            return AuthToken == authToken;
        }

        private readonly string Salt = $"SlTcADdX";
        private string HashPattern => $"{Id}-{Username}-{LoginTime.ToString()}";
    }
}
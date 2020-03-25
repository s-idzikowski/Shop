using Grpc.Core;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string EmailAddress { get; set; }

        public bool IsBanned { get; set; }

        public ICollection<Operation> Operations { get; set; } = new List<Operation>();

        [BsonIgnore]
        public string AuthorizationToken { get; set; }



        public UserData GetUserData()
        {
            return new UserData()
            {
                UserId = Id.ToString(),
                Authorization = AuthorizationToken,

                Username = Username,
                Email = EmailAddress,
            };
        }



        public void HashPassword()
        {
            byte[] password = PasswordHash;
            using (var hmac = new HMACSHA512())
            {
                PasswordSalt = hmac.Key;
                PasswordHash = hmac.ComputeHash(password);
            }
        }

        internal static User New(ServerCallContext context, RegisterData registerData)
        {
            return new User()
            {
                Username = registerData.Username,
                PasswordHash = Encoding.UTF8.GetBytes(registerData.Password),
                EmailAddress = registerData.EmailAddress,
            };
        }

        public Task<string> GenerateToken(string password, string configToken)
        {
            return Task.Run(() =>
            {
                using (var hmac = new HMACSHA512(PasswordSalt))
                {
                    var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                    bool verifyPassword = true;
                    for (int i = 0; i < computedHash.Length; i++)
                    {
                        if (computedHash[i] != PasswordHash[i])
                            verifyPassword = false;
                    }

                    if (!verifyPassword)
                        return default;
                }

                // create token
                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, Id.ToString()),
                    new Claim(ClaimTypes.Name, Username),
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configToken));

                var creeds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(claims),
                    Expires = DateTime.Now.AddHours(24),
                    SigningCredentials = creeds
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var token = tokenHandler.CreateToken(tokenDescriptor);

                Console.WriteLine("TOKEN: " + token.ToString());
                //Console.WriteLine("TOKENDOLOGOWANIA: " + tokenHandler.WriteToken(token));

                return $"Bearer {tokenHandler.WriteToken(token)}";
            });
        }
    }
}
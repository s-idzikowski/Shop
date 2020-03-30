using Grpc.Core;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
        public string Telephone { get; set; }

        public bool IsBanned { get; set; }

        public List<Operation> Operations { get; set; } = new List<Operation>();
        public List<AddressData> Addresses { get; set; } = new List<AddressData>();



        public UserData GetUserData()
        {
            return new UserData()
            {
                Username = Username,
                Email = EmailAddress,
            };
        }



        public void HashPassword(byte[] newPassword = null)
        {
            byte[] password = newPassword ?? PasswordHash;
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

                return CreateToken(configToken);
            });
        }

        private string CreateToken(string configToken)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configToken));

            var creeds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(Claims),
                Expires = DateTime.Now.AddHours(24),
                SigningCredentials = creeds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            //Console.WriteLine("TOKEN: " + token.ToString());
            //Console.WriteLine("TOKENDOLOGOWANIA: " + tokenHandler.WriteToken(token));

            return $"{TokenPrefix}{tokenHandler.WriteToken(token)}";
        }

        private static readonly string TokenPrefix = "Bearer ";

        private Claim[] Claims => new Claim[]
        {
            new Claim(ClaimTypes.NameIdentifier, Id.ToString()),
            new Claim(ClaimTypes.Name, Username),
        };

        public static Guid GetGuidFromHeaders(Metadata headers)
        {
            return new Guid(GetFromHeaders(headers, "nameid"));
        }

        private static string GetFromHeaders(Metadata headers, string claimType)
        {
            string fullToken = headers.Single(o => o.Key == "authorization").Value;
            string token = fullToken.Remove(0, TokenPrefix.Length);
            var tokenS = new JwtSecurityTokenHandler().ReadToken(token) as JwtSecurityToken;
            return tokenS.Claims.First(claim => claim.Type == claimType).Value;
        }

        public static bool IsValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                return false;

            return password.Length >= 40;
        }
    }
}
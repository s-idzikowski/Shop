using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Shop.Service.Database;
using Shop.Service.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Shop.Service.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext db;
        private readonly string BackEndSalt = "s@lt{0}2=<02>=0";
        private readonly IConfiguration config;


        public UserRepository(AppDbContext db, IConfiguration config)
        {
            this.db = db;
            this.config = config;
        }


        private void HashPassword(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<User> SignIn(SignInData signInData)
        {

            User user = await db.Users.Find(u => u.Username == signInData.Username).SingleOrDefaultAsync();
            if (user == null) return null;

            using (var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt2))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(signInData.Password));

                bool verifyPassword = true;
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash2[i])
                        verifyPassword = false;
                }
                if (!verifyPassword) return null;
            }

            // create token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));
            
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
            Console.WriteLine("TOKENDOLOGOWANIA: " + tokenHandler.WriteToken(token));

            return user;
        }

        public Task Register(User user)
        {
            HashPassword(user.PasswordHash, out byte[] passwordHash, out byte[] passwordSalt);
            user.PasswordHash2 = passwordHash;
            user.PasswordSalt2 = passwordSalt;

            return db.Users.InsertOneAsync(user);
        }

        public Task UpdateAuthToken(User user)
        {
            FilterDefinition<User> filter = Builders<User>.Filter
                .Eq(o => o.Id, user.Id);

            UpdateDefinition<User> update = Builders<User>.Update
                .Set(o => o.AuthToken, user.AuthToken)
                .Set(o => o.LoginTime, user.LoginTime)
                .Set(o => o.LoginIp, user.LoginIp);

            return db.Users.UpdateOneAsync(filter, update);
        }

        public Task<User> GetByUsername(string username)
        {
            return db.Users.Find(o => o.Username == username).SingleOrDefaultAsync();
        }

        public Task<User> GetByEmailAddress(string emailAddress)
        {
            return db.Users.Find(o => o.EmailAddress == emailAddress).SingleOrDefaultAsync();
        }

        public Task<User> GetByAuthToken(string authToken)
        {
            return db.Users.Find(o => o.AuthToken == authToken).SingleOrDefaultAsync();
        }

        public Task<User> GetById(Guid id)
        {
            return db.Users.Find(o => o.Id == id).SingleOrDefaultAsync();
        }
    }
}
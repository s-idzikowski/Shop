using Shop.Service.Models;
using System.Collections.Generic;

namespace Shop.Service.Extensions
{
    public static class UserExtension
    {
        public static List<Value> GetInfromation(this User user)
        {
            return new List<Value>()
            {
                new Value(PropertyNames.Username, user.Username),
                new Value(PropertyNames.Email, user.EmailAddress),
                new Value(PropertyNames.Telephone, user.Telephone),
            };
        }

        public static List<List<Value>> GetInfromations(this User user)
        {
            return new List<List<Value>>()
            {
                user.GetInfromation()
            };
        }



        public static List<Value> GetPassword(this User user)
        {
            return new List<Value>()
            {
                new Value(PropertyNames.PasswordHash, user.PasswordHash.Password()),
                new Value(PropertyNames.PasswordSalt, user.PasswordSalt.Password()),
            };
        }

        public static List<List<Value>> GetPasswords(this User user)
        {
            return new List<List<Value>>()
            {
                user.GetPassword()
            };
        }
    }
}
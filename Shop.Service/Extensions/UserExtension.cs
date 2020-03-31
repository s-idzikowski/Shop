using Shop.Service.Models;
using System.Collections.Generic;

namespace Shop.Service.Extensions
{
    public static class UserExtension
    {
        public static string GetInfromation(this User user)
        {
            return $"Nazwa użytkownika: '{user.Username}'{ExtensionHelper.Separator}" +
                $"Adres e-mail: '{user.EmailAddress}'{ExtensionHelper.Separator}" +
                $"Telefon: '{user.Telephone}'{ExtensionHelper.Separator}";
        }

        public static List<string> GetInfromations(this User user)
        {
            return new List<string>()
            {
                GetInfromation(user)
            };
        }


        private static string Password(this byte[] bytes)
        {
            return System.Text.Encoding.UTF8.GetString(bytes);
        }

        public static string GetPassword(this User user)
        {
            return $"Hasło hash: '{user.PasswordHash.Password()}'{ExtensionHelper.Separator}" +
                $"Hasło salt: '{user.PasswordSalt.Password()}'{ExtensionHelper.Separator}";

        }

        public static List<string> GetPasswords(this User user)
        {
            return new List<string>()
            {
                GetPassword(user)
            };
        }
    }
}
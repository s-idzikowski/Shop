using System.Collections.Generic;
using System.Linq;

namespace Shop.Service.Extensions
{
    public static class RoleExtension
    {
        public static string ToStringSeparator(this List<Roles> roles)
        {
            return string.Join(";", roles.Select(o => (int)o));
        }
    }
}
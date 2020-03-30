using System;
using System.Collections.Generic;
using System.Linq;

namespace Shop.Service.Extensions
{
    public static class AddressDataExtension
    {
        private static readonly string separator = $";{Environment.NewLine}";

        public static string GetOperation(this AddressData address)
        {
            return $"Imię: '{address.FirstName}'{separator}" +
                $"Nazwisko: '{address.LastName}'{separator}" +
                $"Ulica: '{address.Street}'{separator}" +
                $"Numer domu: '{address.Place}'{separator}" +
                $"Kod pocztowy: '{address.ZipCode}'{separator}" +
                $"Miejscowość: '{address.City}'{separator}";
        }

        public static List<string> GetOperations(this AddressData address)
        {
            return new List<string>()
            {
                GetOperation(address)
            };
        }

        public static List<string> GetOperations(this List<AddressData> addresses)
        {
            return addresses.Select((o) => o.GetOperation()).ToList();
        }
    }
}
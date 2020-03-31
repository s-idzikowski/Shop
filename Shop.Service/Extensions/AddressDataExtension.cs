using System.Collections.Generic;
using System.Linq;

namespace Shop.Service.Extensions
{
    public static class AddressDataExtension
    {
        public static string GetOperation(this AddressData address)
        {
            return $"Imię i nazwisko: '{address.Name}'{ExtensionHelper.Separator}" +
                $"Ulica: '{address.Street}'{ExtensionHelper.Separator}" +
                $"Lokal: '{address.Place}'{ExtensionHelper.Separator}" +
                $"Kod pocztowy: '{address.ZipCode}'{ExtensionHelper.Separator}" +
                $"Miejscowość: '{address.City}'{ExtensionHelper.Separator}";
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
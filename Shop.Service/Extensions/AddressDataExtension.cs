using Shop.Service.Models;
using System.Collections.Generic;
using System.Linq;

namespace Shop.Service.Extensions
{
    public static class AddressDataExtension
    {
        public static List<Value> GetOperation(this AddressData address)
        {
            return new List<Value>()
            {
                new Value(PropertyNames.Name, address.Name),
                new Value(PropertyNames.Street, address.Street),
                new Value(PropertyNames.Place, address.Place),
                new Value(PropertyNames.Zipcode, address.ZipCode),
                new Value(PropertyNames.City, address.City),
            };
        }

        public static List<List<Value>> GetOperations(this AddressData address)
        {
            return new List<List<Value>>()
            {
                address.GetOperation()
            };
        }

        public static List<List<Value>> GetOperations(this List<AddressData> addresses)
        {
            return addresses.Select((o) => o.GetOperation()).ToList();
        }
    }
}
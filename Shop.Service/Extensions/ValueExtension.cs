using Shop.Service.Models;
using System.Collections.Generic;
using System.Linq;

namespace Shop.Service.Extensions
{
    public static class ValueExtension
    {
        public static ValueData GetValue(this Value value)
        {
            return new ValueData() { PropertyName = value.propertyName, PropertyValue = value.propertyValue };
        }

        public static List<ValueData> GetValueData(this List<Value> list)
        {
            return list.Select(o => o.GetValue()).ToList();
        }

        public static List<ListOfValue> GetListOfValue(this List<List<Value>> list)
        {
            return list.Select(o =>
            {
                var listOfValue = new ListOfValue();
                listOfValue.Value.Add(o.GetValueData());
                return listOfValue;
            }).ToList();
        }
    }
}
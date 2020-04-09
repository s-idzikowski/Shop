namespace Shop.Service.Models
{
    public class Value
    {
        public PropertyNames propertyName { get; set; }
        public string propertyValue { get; set; }

        public Value(PropertyNames propertyName, string propertyValue)
        {
            this.propertyName = propertyName;
            this.propertyValue = propertyValue ?? string.Empty;
        }
    }
}
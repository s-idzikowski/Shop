using MongoDB.Bson.Serialization;

namespace Shop.Service.Database
{
    public static class DbMapper
    {
        public static void Configure()
        {
            //BsonClassMap.RegisterClassMap<ListOfValue>(cm =>
            //{
            //    cm.MapMember(c => c.Value);

            //    cm.MapProperty(c => c.Value);
            //});

            //BsonClassMap.RegisterClassMap<Google.Protobuf.Collections.RepeatedField<ValueData>>(cm =>
            //{
            //    cm.AutoMap();
            //});

            //BsonClassMap.RegisterClassMap<ValueData>(cm =>
            //{
            //    cm.MapMember(c => c.PropertyName);
            //    cm.MapMember(c => c.PropertyValue);

            //    cm.MapProperty(c => c.PropertyName);
            //    cm.MapProperty(c => c.PropertyValue);
            //});
        }
    }
}
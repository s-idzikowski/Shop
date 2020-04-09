using System;
using System.Collections.Generic;

namespace Shop.Service.Models
{
    public class Operation
    {
        public OperationTypes Type { get; set; }
        public DateTime Time { get; set; }
        public string Ip { get; set; }
        public List<List<Value>> ValueBefore { get; set; } = new List<List<Value>>();
        public List<List<Value>> ValueAfter { get; set; } = new List<List<Value>>();



        public Operation()
        {
        }

        public Operation(OperationTypes type, string ip)
        {
            Time = DateTime.Now;
            Type = type;
            Ip = ip;
        }

        public Operation(OperationTypes type, string ip, List<List<Value>> before, List<List<Value>> after) : this(type, ip)
        {
            ValueBefore = before;
            ValueAfter = after;
        }

        public static List<Operation> GetOne(OperationTypes type, string ip, List<List<Value>> before = default, List<List<Value>> after = default)
        {
            return new List<Operation>()
            {
                new Operation(type, ip, before, after)
            };
        }
    }
}
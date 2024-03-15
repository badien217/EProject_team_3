using Application.Interfaces.SendMessage;
using Domain.Common;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace infrastructure.RabbitMq
{
    public class SendMessage<T> : ISendMessageRabbitMQ<T> where T : class, IEntityBase, new()
    {
        void ISendMessageRabbitMQ<T>.SendMessage<T1>(T1 message)
        {
            var factory = new ConnectionFactory
            {
                HostName = "localhost",
                Port = 5672,
                UserName = "admin",
                Password ="badien217",
                VirtualHost = "/",

        };
            var connection = factory.CreateConnection();
            using var channel = connection.CreateModel();
            channel.QueueDeclare("e_project3", exclusive: false);

            var json = JsonConvert.SerializeObject(message);
            var body = Encoding.UTF8.GetBytes(json);

            channel.BasicPublish(exchange: "", routingKey: "e_project3", body: body);
        }
    }
}

using System;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Shop.Service.AuthorizationRoles;
using Shop.Service.Database;
using Shop.Service.Repositories;

namespace Shop.Service
{
    public class Startup

    {
        private readonly IConfiguration config;
        private readonly int messageSize = 2; // 2 MB
        public Startup(IConfiguration config)
        {
            this.config = config;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddGrpc(options =>
            {
                options.MaxReceiveMessageSize = messageSize * 1024 * 1024;
                options.MaxSendMessageSize = messageSize * 1024 * 1024;
            });
            services.AddCors();

            services.AddSingleton<IMongoClient>(s => new MongoClient("mongodb://admin:SasaAdmin@77.55.213.192:27017/?authSource=admin"));
            services.AddScoped(s => new AppDbContext(s.GetRequiredService<IMongoClient>(), "ShopDb"));

            services.AddTransient<IUserRepository, UserRepository>()
                    .AddTransient(serviceProvider => new Lazy<IUserRepository>(() => serviceProvider.GetRequiredService<IUserRepository>()));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(nameof(Roles.Administrator), policy =>
                {
                    //policy.AuthenticationSchemes.Add(JwtBearerDefaults.AuthenticationScheme);
                    //policy.RequireAuthenticatedUser();
                    policy.Requirements.Add(new AdministratorRole());
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            DbMapper.Configure();

            app.UseRouting();

            app.UseGrpcWeb();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapGrpcService<WebService>().EnableGrpcWeb();

                endpoints.MapGet("/", async context =>
                {
                    await context.Response.WriteAsync("Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");
                });
            });
        }
    }
}
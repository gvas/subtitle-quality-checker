using JavaScriptViewEngine;
using JavaScriptViewEngine.Pool;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SubtitleEvaluation.Web.Services;
using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.OptionsModel;

namespace SubtitleEvaluation.Web
{
    public class Startup
    {
        private string webRootPath;

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            webRootPath = hostingEnvironment.WebRootPath;

            Configuration = new ConfigurationBuilder()
              .AddEnvironmentVariables()
              .Build();

            VroomJs.AssemblyLoader.EnsureLoaded();
        }

        private IConfigurationRoot Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddJsEngine<ReactEnvironmentInitializer>();
            services.Configure<JsPoolOptions>(options =>
            {
                options.WatchPath = webRootPath;
                options.WatchFiles = new List<string>
                {
                     Path.Combine(webRootPath, "server.bundle.js")
                };
                options.WatchDebounceTimeout = (int)TimeSpan.FromSeconds(2).TotalMilliseconds;
            });

            services
              .AddOptions()
              .Configure<HostingOptions>(Configuration);
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IHostingEnvironment env, IOptions<HostingOptions> optionsAccessor)
        {
            var options = optionsAccessor.Value;

            if (options.VirtualApplicationRootPath != "")
            {
                // workaround for bug in hosting app in IIS virtual directory https://github.com/aspnet/IISIntegration/issues/14#issuecomment-190574696
                app.Map(options.VirtualApplicationRootPath, (app1) => this.Configure1(app1, loggerFactory, env));
            }
            else
            {
                this.Configure1(app, loggerFactory, env);
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure1(IApplicationBuilder app, ILoggerFactory loggerFactory, IHostingEnvironment env)
        {
            loggerFactory
                .AddConsole()
                .AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseIISPlatformHandler()
                .UseStaticFiles()
                .UseJsEngine(); // Gives a js engine to each request.

            app
                .UseMvcWithDefaultRoute()
                .Use((context, next) =>
                {
                    context.Response.StatusCode = 404;
                    return next();
                });
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}

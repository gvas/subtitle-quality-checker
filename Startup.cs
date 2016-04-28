using JavaScriptViewEngine;
using JavaScriptViewEngine.Pool;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SubtitleEvalution.Web.Services;
using System;
using System.Collections.Generic;
using System.IO;

namespace SubtitleEvalution.Web
{
    public class Startup
    {
        private string webRootPath;

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            webRootPath = hostingEnvironment.WebRootPath;

            VroomJs.AssemblyLoader.EnsureLoaded();
        }

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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            loggerFactory
                .AddConsole()
                .AddDebug();

            app
                .UseIISPlatformHandler()
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

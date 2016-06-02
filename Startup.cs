using JavaScriptViewEngine;
using JavaScriptViewEngine.Pool;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;

namespace SubtitleEvaluation.Web
{
    public class Startup
    {
        private string webRootPath;

        public Startup(IHostingEnvironment hostingEnvironment)
        {
            webRootPath = hostingEnvironment.WebRootPath;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddJsEngine();
            services.Configure<RenderPoolOptions>(options =>
            {
                options.WatchPath = webRootPath;
                options.WatchFiles = new List<string>
                {
                     Path.Combine(webRootPath, "server.bundle.js")
                };
                options.WatchDebounceTimeout = (int)TimeSpan.FromSeconds(2).TotalMilliseconds;
            });
            services.Configure<NodeRenderEngineOptions>(options =>
            {
                options.ProjectDirectory = webRootPath;
                options.GetArea = (area) =>
                {
                    switch (area)
                    {
                        case "default":
                            return "server.bundle";
                        default:
                            return area;
                    }
                };
            });
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IHostingEnvironment env)
        {
            loggerFactory
                .AddConsole()
                .AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles()
                .UseJsEngine(); // Gives a js engine to each request.

            app
                .UseMvcWithDefaultRoute()
                .Use((context, next) =>
                {
                    context.Response.StatusCode = 404;
                    return next();
                });
        }
    }
}

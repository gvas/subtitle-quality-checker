using JavaScriptViewEngine;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.IO;

namespace SubtitleEvaluation.Web.Services
{
    public class ReactEnvironmentInitializer : IJsEngineInitializer
    {
        private readonly IHostingEnvironment hostingEnvironment;
        private readonly ILogger<ReactEnvironmentInitializer> logger;

        public ReactEnvironmentInitializer(IHostingEnvironment hostingEnvironment, ILogger<ReactEnvironmentInitializer> logger)
        {
            this.hostingEnvironment = hostingEnvironment;
            this.logger = logger;
        }

        public void Initialize(IJsEngine engine)
        {
            try
            {
                engine.ExecuteFile(Path.Combine(hostingEnvironment.WebRootPath, "server.bundle.js"));
            }
            catch (Exception ex)
            {
                logger.LogError("Could not initialize the React server-side environment.", ex);
            }
        }
    }
}

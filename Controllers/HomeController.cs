using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.OptionsModel;

namespace SubtitleEvalution.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly HostingOptions hostingOptions;

        public HomeController(IOptions<HostingOptions> optionsAccessor)
        {
            this.hostingOptions = optionsAccessor.Value;
        }

        public IActionResult Index()
        {
            // {auto} is a magic string in the JavaScriptViewEngine library
            return View("js-{auto}", new SubtitleEvaluation.Web.ViewModels.Home.Index
            {
                VirtualApplicationRootPath = hostingOptions.VirtualApplicationRootPath,
                UserAgent = Request.Headers["User-Agent"]
            });
        }

        [Route("results")]
        public IActionResult Results()
        {
            return RedirectToAction("Index");
        }

        [Route("settings")]
        public IActionResult Settings()
        {
            return View("js-{auto}", new SubtitleEvaluation.Web.ViewModels.Home.Settings
            {
                VirtualApplicationRootPath = hostingOptions.VirtualApplicationRootPath,
                UserAgent = Request.Headers["User-Agent"]
            });
        }

        [Route("about")]
        public IActionResult About()
        {
            return View("js-{auto}", new SubtitleEvaluation.Web.ViewModels.Home.About
            {
                VirtualApplicationRootPath = hostingOptions.VirtualApplicationRootPath,
                UserAgent = Request.Headers["User-Agent"]
            });
        }
    }
}
